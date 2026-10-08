// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { Transform } from "node:stream";
import { AbortError } from "./abort-controller/AbortError.js";
import type {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  RequestBodyType,
  TlsSettings,
  TransferProgressEvent,
} from "./interfaces.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { RestError } from "./restError.js";
import type { IncomingMessage } from "node:http";
import type { Socket } from "node:net";
import { TLSSocket } from "node:tls";
import { logger } from "./log.js";
import { Sanitizer } from "./util/sanitizer.js";

const DEFAULT_TLS_SETTINGS = {};

// PROTOTYPE ONLY: fixed per-attempt fallback; no public configuration or policy enablement.
const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

function headerValues(headers: unknown, headerName: string): unknown[] {
  const values: unknown[] = [];
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      if (String(headers[i]).toLowerCase() === headerName) {
        values.push(headers[i + 1]);
      }
    }
  } else if (headers && typeof headers === "object") {
    for (const [name, value] of Object.entries(headers)) {
      if (name.toLowerCase() === headerName) {
        values.push(...(Array.isArray(value) ? value : [value]));
      }
    }
  }
  return values;
}

function expectsContinue(request: PipelineRequest): boolean {
  const headers =
    request.requestOverrides && "headers" in request.requestOverrides
      ? request.requestOverrides.headers
      : request.headers.toJSON();
  return headerValues(headers, "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function isStreamComplete(stream: NodeJS.ReadableStream): Promise<void> {
  if (stream.readable === false) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const handler = (): void => {
      resolve();
      stream.removeListener("close", handler);
      stream.removeListener("end", handler);
      stream.removeListener("error", handler);
    };

    stream.on("close", handler);
    stream.on("end", handler);
    stream.on("error", handler);
  });
}

function isArrayBuffer(body: any): body is ArrayBuffer | ArrayBufferView {
  return body && typeof body.byteLength === "number";
}

class ReportTransform extends Transform {
  private loadedBytes = 0;
  private progressCallback: (progress: TransferProgressEvent) => void;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _transform(chunk: string | Buffer, _encoding: string, callback: Function): void {
    this.push(chunk);
    this.loadedBytes += chunk.length;
    try {
      this.progressCallback({ loadedBytes: this.loadedBytes });
      callback();
    } catch (e: any) {
      callback(e);
    }
  }

  constructor(progressCallback: (progress: TransferProgressEvent) => void) {
    super();
    this.progressCallback = progressCallback;
  }
}

/**
 * A HttpClient implementation that uses Node's "https" module to send HTTPS requests.
 * @internal
 */
class NodeHttpClient implements HttpClient {
  private cachedHttpAgent?: http.Agent;
  private cachedHttpsAgents: WeakMap<TlsSettings, https.Agent> = new WeakMap();

  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    if (request.abortSignal) {
      if (request.abortSignal.aborted) {
        throw new AbortError("The operation was aborted. Request has already been canceled.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      request.abortSignal.addEventListener("abort", abortListener);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (request.timeout > 0) {
      timeoutId = setTimeout(() => {
        const sanitizer = new Sanitizer();
        logger.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
        abortController.abort();
      }, request.timeout);
    }

    const acceptEncoding = request.headers.get("Accept-Encoding");
    const shouldDecompress =
      acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");

    const waitForContinue =
      expectsContinue(request) &&
      (typeof request.body === "function" || getBodyLength(request.body ?? null) !== 0);
    let body: RequestBodyType | undefined;
    let uploadSource: NodeJS.ReadableStream | undefined;
    let uploadReportStream: ReportTransform | undefined;
    let uploadError: ((error: Error) => void) | undefined;
    let uploadStopped = false;
    if (
      request.body &&
      typeof request.body !== "function" &&
      !request.headers.has("Content-Length")
    ) {
      const bodyLength = getBodyLength(request.body);
      if (bodyLength !== null) {
        request.headers.set("Content-Length", bodyLength);
      }
    }

    const prepareBody = (onError?: (error: Error) => void): RequestBodyType | undefined => {
      body = typeof request.body === "function" ? request.body() : request.body;
      if (isReadableStream(body)) {
        uploadSource = body;
        uploadError = onError;
        if (uploadError) {
          uploadSource.once("error", uploadError);
        }
      }
      if (body && !request.headers.has("Content-Length")) {
        const bodyLength = getBodyLength(body);
        if (bodyLength !== null) {
          request.headers.set("Content-Length", bodyLength);
        }
      }
      if (body && request.onUploadProgress) {
        const onUploadProgress = request.onUploadProgress;
        uploadReportStream = new ReportTransform(onUploadProgress);
        uploadReportStream.on("error", (e) => {
          logger.error("Error in upload progress", e);
          onError?.(e);
        });
        if (isReadableStream(body)) {
          body.pipe(uploadReportStream);
        } else {
          uploadReportStream.end(
            isArrayBuffer(body)
              ? ArrayBuffer.isView(body)
                ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
                : Buffer.from(body)
              : body,
          );
        }

        body = uploadReportStream;
      }
      return body;
    };
    const stopUpload = (): void => {
      uploadStopped = true;
      if (uploadSource && uploadError) {
        uploadSource.removeListener("error", uploadError);
      }
      if (uploadReportStream) {
        uploadSource?.unpipe(uploadReportStream);
        uploadReportStream.destroy();
      }
    };

    let responseStream: NodeJS.ReadableStream | undefined;
    try {
      const res = await this.makeRequest(
        request,
        abortController,
        waitForContinue ? undefined : prepareBody(),
        waitForContinue ? prepareBody : undefined,
        waitForContinue ? stopUpload : undefined,
      );

      const headers = getResponseHeaders(res);

      const status = res.statusCode ?? 0;
      const response: PipelineResponse = {
        status,
        headers,
        request,
      };

      // Responses to HEAD must not have a body.
      // If they do return a body, that body must be ignored.
      if (request.method === "HEAD") {
        // call resume() and not destroy() to avoid closing the socket
        // and losing keep alive
        res.resume();
        return response;
      }

      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        responseStream.pipe(downloadReportStream);
        responseStream = downloadReportStream;
      }

      if (
        // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
        request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
        request.streamResponseStatusCodes?.has(response.status)
      ) {
        response.readableStreamBody = responseStream;
      } else {
        response.bodyAsText = await streamToText(responseStream);
      }

      return response;
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      // clean up event listener
      if (request.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (!uploadStopped && isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(responseStream)) {
          downloadStreamDone = isStreamComplete(responseStream);
        }
        Promise.all([uploadStreamDone, downloadStreamDone])
          .then(() => {
            // eslint-disable-next-line promise/always-return
            if (abortListener) {
              request.abortSignal?.removeEventListener("abort", abortListener);
            }
          })
          .catch((e) => {
            logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
      }
    }
  }

  private makeRequest(
    request: PipelineRequest,
    abortController: AbortController,
    initialBody?: RequestBodyType,
    deferredBody?: (onError: (error: Error) => void) => RequestBodyType | undefined,
    stopUpload?: () => void,
  ): Promise<http.IncomingMessage> {
    const url = new URL(request.url);

    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    const options: http.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides,
    };
    const knownLength =
      typeof request.body === "function" ? null : getBodyLength(request.body ?? null);
    if (
      deferredBody &&
      knownLength !== null &&
      headerValues(options.headers, "content-length").length === 0 &&
      headerValues(options.headers, "transfer-encoding").length === 0
    ) {
      options.headers = Array.isArray(options.headers)
        ? [...options.headers, "Content-Length", String(knownLength)]
        : { ...options.headers, "Content-Length": String(knownLength) };
    }

    return new Promise<http.IncomingMessage>((resolve, reject) => {
      let body = initialBody;
      let state: "waiting" | "sending" | "terminal" = deferredBody ? "waiting" : "sending";
      let fallback: ReturnType<typeof setTimeout> | undefined;
      let connectionSocket: Socket | undefined;
      let responseReceived = false;
      const connectEvent = isInsecure ? "connect" : "secureConnect";
      const req = (isInsecure ? http : https).request(options, (res) => {
        responseReceived = true;
        state = "terminal";
        cleanupWait();
        if (deferredBody && !req.writableFinished) {
          // Do not end unfinished framing or destroy the readable final response.
          // Node retires this socket after the response drains instead of pooling it.
          req.shouldKeepAlive = false;
          if (body && isReadableStream(body)) {
            body.unpipe(req);
          }
          stopUpload?.();
        }
        resolve(res);
      });

      function cleanupWait(): void {
        if (!deferredBody) {
          return;
        }
        clearTimeout(fallback);
        fallback = undefined;
        req.removeListener("continue", sendOnce);
        req.removeListener("socket", onSocket);
        connectionSocket?.removeListener(connectEvent, flushAndWait);
      }

      req.once("error", (err: Error & { code?: string }) => {
        state = "terminal";
        cleanupWait();
        if (body && isReadableStream(body)) {
          body.unpipe(req);
        }
        stopUpload?.();
        reject(
          new RestError(err.message, { code: err.code ?? RestError.REQUEST_SEND_ERROR, request }),
        );
      });

      const onAbort = (): void => {
        state = "terminal";
        cleanupWait();
        if (body && isReadableStream(body)) {
          body.unpipe(req);
        }
        stopUpload?.();
        const abortError = new AbortError(
          "The operation was aborted. Rejecting from abort signal callback while making request.",
        );
        req.destroy(abortError);
        reject(abortError);
      };
      abortController.signal.addEventListener("abort", onAbort);
      req.once("close", () => {
        state = "terminal";
        cleanupWait();
        stopUpload?.();
        abortController.signal.removeEventListener("abort", onAbort);
        if (!responseReceived) {
          reject(new RestError("Request closed before a response", { request }));
        }
      });

      const writeBody = (): void => {
        if (body && isReadableStream(body)) {
          body.pipe(req);
        } else if (body) {
          if (typeof body === "string" || Buffer.isBuffer(body)) {
            req.end(body);
          } else if (isArrayBuffer(body)) {
            req.end(
              ArrayBuffer.isView(body)
                ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
                : Buffer.from(body),
            );
          } else {
            logger.error("Unrecognized body type", body);
            req.destroy(new RestError("Unrecognized body type"));
          }
        } else {
          req.end();
        }
      };
      function sendOnce(): void {
        if (state !== "waiting" || req.destroyed || abortController.signal.aborted) {
          return;
        }
        state = "sending";
        cleanupWait();
        try {
          body = deferredBody?.((error) => req.destroy(error));
          writeBody();
        } catch (error) {
          req.destroy(error instanceof Error ? error : new Error(String(error)));
        }
      }
      function flushAndWait(): void {
        if (state !== "waiting" || req.destroyed || abortController.signal.aborted) {
          return;
        }
        req.flushHeaders();
        fallback = setTimeout(sendOnce, EXPECT_CONTINUE_TIMEOUT_IN_MS);
      }
      function onSocket(socket: Socket): void {
        connectionSocket = socket;
        if (socket.connecting || (socket instanceof TLSSocket && socket.alpnProtocol === null)) {
          socket.once(connectEvent, flushAndWait);
        } else {
          flushAndWait();
        }
      }
      if (abortController.signal.aborted) {
        onAbort();
      } else if (deferredBody) {
        req.on("continue", sendOnce);
        req.once("socket", onSocket);
      } else {
        writeBody();
      }
    });
  }

  private getOrCreateAgent(request: PipelineRequest, isInsecure: boolean): http.Agent {
    const disableKeepAlive = request.disableKeepAlive;

    // Handle Insecure requests first
    if (isInsecure) {
      if (disableKeepAlive) {
        // keepAlive:false is the default so we don't need a custom Agent
        return http.globalAgent;
      }

      if (!this.cachedHttpAgent) {
        // If there is no cached agent create a new one and cache it.
        this.cachedHttpAgent = new http.Agent({ keepAlive: true });
      }
      return this.cachedHttpAgent;
    } else {
      if (disableKeepAlive && !request.tlsSettings) {
        // When there are no tlsSettings and keepAlive is false
        // we don't need a custom agent
        return https.globalAgent;
      }

      // We use the tlsSettings to index cached clients
      const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;

      // Get the cached agent or create a new one with the
      // provided values for keepAlive and tlsSettings
      let agent = this.cachedHttpsAgents.get(tlsSettings);

      if (agent && agent.options.keepAlive === !disableKeepAlive) {
        return agent;
      }

      logger.info("No cached TLS Agent exist, creating a new Agent");
      agent = new https.Agent({
        // keepAlive is true if disableKeepAlive is false.
        keepAlive: !disableKeepAlive,
        // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
        ...tlsSettings,
      });

      this.cachedHttpsAgents.set(tlsSettings, agent);
      return agent;
    }
  }
}

function getResponseHeaders(res: IncomingMessage): HttpHeaders {
  const headers = createHttpHeaders();
  for (const header of Object.keys(res.headers)) {
    const value = res.headers[header];
    if (Array.isArray(value)) {
      if (value.length > 0) {
        headers.set(header, value[0]);
      }
    } else if (value) {
      headers.set(header, value);
    }
  }
  return headers;
}

function getDecodedResponseStream(
  stream: IncomingMessage,
  headers: HttpHeaders,
): NodeJS.ReadableStream {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    const unzip = zlib.createGunzip();
    stream.pipe(unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    stream.pipe(inflate);
    return inflate;
  }

  return stream;
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];

    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
    stream.on("error", (e) => {
      if (e && e?.name === "AbortError") {
        reject(e);
      } else {
        reject(
          new RestError(`Error reading response as text: ${e.message}`, {
            code: RestError.PARSE_ERROR,
          }),
        );
      }
    });
  });
}

/** @internal */
export function getBodyLength(body: RequestBodyType): number | null {
  if (!body) {
    return 0;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (isReadableStream(body)) {
    return null;
  } else if (isArrayBuffer(body)) {
    return body.byteLength;
  } else if (typeof body === "string") {
    return Buffer.from(body).length;
  } else {
    return null;
  }
}

/**
 * Create a new HttpClient instance for the NodeJS environment.
 * @internal
 */
export function createNodeHttpClient(): HttpClient {
  return new NodeHttpClient();
}
