// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { types } from "node:util";
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
import { isRestError, RestError } from "./restError.js";
import type { IncomingMessage } from "node:http";
import { logger } from "./log.js";
import { Sanitizer } from "./util/sanitizer.js";
import { toError } from "./util/error.js";
import {
  effectiveHeaders,
  hasExpectContinue,
  headerPairs,
  headerValues,
} from "./util/expectContinue.js";
import {
  destroyBodyStream,
  disposeBodyStream,
  monitorBodyStreamErrors,
  startBodyStream,
} from "./util/nodeBody.js";
import { setRequestCompletion } from "./util/requestCompletion.js";

const DEFAULT_TLS_SETTINGS = {};
const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function monitorStreamCompletion(stream: NodeJS.ReadableStream, onComplete: () => void): void {
  if (stream.readable === false) {
    onComplete();
    return;
  }

  const handler = (): void => {
    stream.removeListener("close", handler);
    stream.removeListener("end", handler);
    stream.removeListener("error", handler);
    onComplete();
  };

  stream.on("close", handler);
  stream.on("end", handler);
  stream.on("error", handler);
}

function isArrayBuffer(body: unknown): body is ArrayBuffer | ArrayBufferView {
  return types.isArrayBuffer(body) || ArrayBuffer.isView(body);
}

function arrayBufferToBuffer(body: ArrayBuffer | ArrayBufferView): Buffer {
  if (Buffer.isBuffer(body)) {
    return body;
  }

  return ArrayBuffer.isView(body)
    ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
    : Buffer.from(body);
}

/**
 * Adds the framing header Node would otherwise defer until the body is sent, converts raw
 * array headers to an object, and removes `Expect` from `options.headers` so that it can be
 * set once the socket is available.
 * @returns the removed `Expect` header value, if any.
 */
function prepareExpectContinueHeaders(
  options: http.RequestOptions,
  bodyLength: number | null,
): http.OutgoingHttpHeaders[string] {
  if (
    headerValues(options.headers, "content-length").length === 0 &&
    headerValues(options.headers, "transfer-encoding").length === 0
  ) {
    const name = bodyLength === null ? "Transfer-Encoding" : "Content-Length";
    const value = bodyLength === null ? "chunked" : String(bodyLength);
    if (Array.isArray(options.headers)) {
      options.headers = Array.isArray(options.headers[0])
        ? [...options.headers, [name, value]]
        : [...options.headers, name, value];
    } else {
      options.headers = { ...options.headers, [name]: value };
    }
  }

  let headers: http.OutgoingHttpHeaders;
  if (Array.isArray(options.headers)) {
    headers = Object.create(null);
    for (const [name, value] of headerPairs(options.headers) as [string, string][]) {
      http.validateHeaderName(name);
      http.validateHeaderValue(name, value);
      const key = name.toLowerCase();
      const previous = headers[key];
      headers[key] =
        previous === undefined
          ? value
          : [...(Array.isArray(previous) ? previous : [String(previous)]), value];
    }
    if (headerValues(headers, "host").length > 0) {
      options.setHost = false;
    }
  } else {
    headers = (options.headers ?? {}) as http.OutgoingHttpHeaders;
  }

  let expectHeader: http.OutgoingHttpHeaders[string];
  const deferredHeaders = { ...headers };
  for (const [name, value] of Object.entries(deferredHeaders)) {
    if (name.toLowerCase() === "expect" && value !== undefined) {
      http.validateHeaderValue(name, String(value));
      expectHeader = value;
      delete deferredHeaders[name];
    }
  }
  options.headers = deferredHeaders;
  return expectHeader;
}

interface NodeRequestResult {
  response: IncomingMessage;
  requestComplete: Promise<void>;
  isRequestComplete: () => boolean;
}

function createDeferred(): { promise: Promise<void>; resolve: () => void } {
  let complete!: () => void;
  const promise = new Promise<void>((resolve) => {
    complete = resolve;
  });
  return { promise, resolve: complete };
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

function toRequestError(error: Error & { code?: string }, request: PipelineRequest): Error {
  if (error.name === "AbortError" || isRestError(error)) return error;
  return new RestError(error.message, {
    code: error.code ?? RestError.REQUEST_SEND_ERROR,
    request,
  });
}

interface NodeRequestAttemptConfig {
  request: PipelineRequest;
  abortSignal: AbortSignal;
  negotiate: boolean;
  body: RequestBodyType | undefined;
  bodyLength: number | null;
  expectHeader: http.OutgoingHttpHeaders[string];
  isInsecure: boolean;
  options: http.RequestOptions;
  resolve: (result: NodeRequestResult) => void;
  reject: (error: unknown) => void;
}

/**
 * Manages the state and resources for one Node HTTP request attempt.
 *
 * Each retry, redirect, or authentication resend creates a new attempt. The attempt coordinates
 * optional `Expect: 100-continue` negotiation, exactly-once body dispatch, upload ownership and
 * cleanup, early final responses, cancellation, and outgoing request completion.
 *
 * The attempt transitions from `waiting` for upload permission, to `sending` while the body may
 * flow, and finally to `terminal`, where no new body work can start. The incoming response and
 * outgoing request can complete independently, so `requestComplete` remains separate from the
 * promise that resolves when response headers arrive.
 *
 * @internal
 */
class NodeRequestAttempt {
  private readonly request: PipelineRequest;
  private readonly abortSignal: AbortSignal;
  private readonly negotiate: boolean;
  private body: RequestBodyType | undefined;
  private readonly bodyLength: number | null;
  private readonly expectHeader: http.OutgoingHttpHeaders[string];
  private readonly resolve: (result: NodeRequestResult) => void;
  private readonly reject: (error: unknown) => void;
  private readonly req: http.ClientRequest;
  private readonly requestComplete: Promise<void>;
  private readonly resolveRequestComplete: () => void;

  private state: "waiting" | "sending" | "terminal" = "waiting";
  private fallback: ReturnType<typeof setTimeout> | undefined;
  private source: NodeJS.ReadableStream | undefined;
  private report: ReportTransform | undefined;
  private sourceOwned = false;
  private sourceEnded = false;
  private response: IncomingMessage | undefined;
  private constructed = false;
  private requestCompleteResolved = false;

  constructor(config: NodeRequestAttemptConfig) {
    this.request = config.request;
    this.abortSignal = config.abortSignal;
    this.negotiate = config.negotiate;
    this.body = config.body;
    this.bodyLength = config.bodyLength;
    this.expectHeader = config.expectHeader;
    this.resolve = config.resolve;
    this.reject = config.reject;

    const { promise, resolve } = createDeferred();
    this.requestComplete = promise;
    this.resolveRequestComplete = resolve;

    this.req = (config.isInsecure ? http : https).request(config.options, this.receiveResponse);
    this.constructed = true;
  }

  public start(): void {
    this.req.once("finish", this.completeRequest);
    this.req.on("error", this.onRequestError);
    this.abortSignal.addEventListener("abort", this.onAbort);
    this.req.once("close", this.onRequestClose);

    if (this.negotiate && this.expectHeader !== undefined) {
      try {
        // Avoid constructor-time writes before an agent has finished rewriting the headers.
        this.req.setHeader("Expect", this.expectHeader);
      } catch (error) {
        this.fail(toError(error));
        return;
      }
    }
    if (this.abortSignal.aborted) {
      this.onAbort();
    } else if (this.negotiate) {
      if (this.bodyLength !== 0) this.req.on("continue", this.sendBody);
      if (this.req.socket) this.flushHeaders();
      else this.req.once("socket", this.flushHeaders);
    } else {
      this.sendBody();
    }
  }

  private readonly completeRequest = (): void => {
    if (this.requestCompleteResolved) return;
    this.requestCompleteResolved = true;
    this.resolveRequestComplete();
    if (this.response) this.state = "terminal";
  };

  private cleanupWait(): void {
    if (this.fallback !== undefined) clearTimeout(this.fallback);
    this.fallback = undefined;
    if (this.negotiate) {
      this.req.removeListener("continue", this.sendBody);
      this.req.removeListener("socket", this.flushHeaders);
    }
  }

  private stopUpload(): void {
    const uploadSource = this.source;
    const uploadReport = this.report;
    const uploadSourceOwned = this.sourceOwned;
    this.source = undefined;
    this.report = undefined;
    if (uploadSource) {
      uploadSource.unpipe(uploadReport ?? this.req);
      uploadSource.pause();
      uploadSource.removeListener("end", this.onSourceEnd);
      uploadSource.removeListener("error", this.fail);
      uploadSource.removeListener("close", this.onSourceClose);
      if (uploadSourceOwned) disposeBodyStream(uploadSource);
      else monitorBodyStreamErrors(uploadSource);
    }
    uploadReport?.unpipe(this.req);
    uploadReport?.destroy();
  }

  private readonly fail = (error: Error & { code?: string }): void => {
    if (this.state === "terminal") return;
    this.state = "terminal";
    this.cleanupWait();
    this.stopUpload();
    const restError = toRequestError(error, this.request);
    this.completeRequest();
    if (this.response) {
      queueMicrotask(() => {
        if (!this.response?.complete) this.response?.destroy(restError);
        else logger.warning("Request upload failed after response completed", restError);
        this.req.destroy();
      });
    } else {
      this.req.destroy(restError);
    }
    this.reject(restError);
  };

  private readonly onSourceEnd = (): void => {
    this.sourceEnded = true;
  };

  private readonly onSourceClose = (): void => {
    this.source?.removeListener("error", this.fail);
    if (this.negotiate && !this.sourceEnded && this.state === "sending") {
      this.fail(new Error("Request body stream closed before ending"));
    }
  };

  private readonly receiveResponse = (res: IncomingMessage): void => {
    if (!this.constructed) {
      queueMicrotask(() => this.receiveResponse(res));
      return;
    }
    this.response = res;
    const status = res.statusCode ?? 0;
    const continueUpload =
      !this.req.writableFinished && this.state === "sending" && status >= 200 && status < 300;
    this.state = continueUpload ? "sending" : "terminal";
    this.cleanupWait();
    if (!this.req.writableFinished && !continueUpload) {
      this.req.shouldKeepAlive = false;
      this.stopUpload();
      // Preserve the response, then force closure even if outgoing writes cannot drain.
      res.once("end", () => this.req.destroy());
    }
    this.resolve({
      response: res,
      requestComplete: this.requestComplete,
      isRequestComplete: () => this.requestCompleteResolved,
    });
  };

  private readonly onRequestError = (error: Error & { code?: string }): void => {
    if (this.response) {
      if (this.response.complete) {
        this.completeRequest();
        return;
      }
      const restError = toRequestError(error, this.request);
      this.completeRequest();
      this.response.destroy(restError);
    } else {
      this.fail(error);
    }
  };

  private readonly onAbort = (): void => {
    this.state = "terminal";
    this.cleanupWait();
    this.stopUpload();
    const abortError = new AbortError(
      "The operation was aborted. Rejecting from abort signal callback while making request.",
    );
    this.completeRequest();
    if (this.response) {
      queueMicrotask(() => {
        if (!this.response?.destroyed) this.response?.destroy(abortError);
        this.req.destroy();
      });
    } else {
      this.req.destroy(abortError);
    }
    this.reject(abortError);
  };

  private readonly onRequestClose = (): void => {
    this.cleanupWait();
    this.stopUpload();
    this.abortSignal.removeEventListener("abort", this.onAbort);
    if (!this.response) this.fail(new Error("Request closed before a response"));
    else this.completeRequest();
    this.state = "terminal";
  };

  private readonly sendBody = (): void => {
    if (this.state !== "waiting") return;
    this.state = "sending";
    this.cleanupWait();
    try {
      this.sourceOwned = typeof this.request.body === "function";
      if (typeof this.body === "function") this.body = this.body();
      if (this.state !== "sending") {
        if (this.sourceOwned && isReadableStream(this.body)) disposeBodyStream(this.body);
        return;
      }
      if (this.body && isArrayBuffer(this.body)) {
        this.body = arrayBufferToBuffer(this.body);
      }
      if (isReadableStream(this.body)) {
        this.source = this.body;
        this.source.on("error", this.fail);
        this.source.once("end", this.onSourceEnd);
        this.source.once("close", this.onSourceClose);
        startBodyStream(this.source);
      }
      if (this.body && this.request.onUploadProgress) {
        this.report = new ReportTransform(this.request.onUploadProgress);
        this.report.on("error", this.fail);
        if (this.source) this.source.pipe(this.report);
        else this.report.end(this.body);
      }
      if (this.state !== "sending") {
        this.stopUpload();
        return;
      }
      if (this.report) this.report.pipe(this.req);
      else if (this.source) this.source.pipe(this.req);
      else if (!this.body) this.req.end();
      else if (typeof this.body === "string" || Buffer.isBuffer(this.body)) this.req.end(this.body);
      else throw new RestError("Unrecognized body type", { request: this.request });
    } catch (error) {
      this.fail(toError(error));
    }
  };

  private readonly flushHeaders = (): void => {
    if (this.state !== "waiting") return;
    this.req.removeListener("socket", this.flushHeaders);
    if (this.bodyLength === 0) {
      this.sendBody();
      return;
    }
    try {
      this.req.flushHeaders();
      if (this.state !== "waiting") return;
      // An ordered empty write waits for DNS/TCP/TLS and preceding header writes.
      this.req.write("", (error) => {
        if (error) this.fail(error);
        else if (this.state === "waiting") {
          this.fallback = setTimeout(this.sendBody, EXPECT_CONTINUE_TIMEOUT_IN_MS);
        }
      });
    } catch (error) {
      this.fail(toError(error));
    }
  };
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
    const requestAbortSignal = request.abortSignal;
    if (requestAbortSignal) {
      if (requestAbortSignal.aborted) {
        throw new AbortError("The operation was aborted. Request has already been canceled.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      requestAbortSignal.addEventListener("abort", abortListener);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (request.timeout > 0) {
      timeoutId = setTimeout(() => {
        const sanitizer = new Sanitizer();
        logger.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
        abortController.abort();
      }, request.timeout);
    }

    const negotiate = hasExpectContinue(request);
    const acceptEncoding = negotiate
      ? headerValues(effectiveHeaders(request), "accept-encoding").join(",")
      : request.headers.get("Accept-Encoding");
    const shouldDecompress =
      acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");

    let responseStream: NodeJS.ReadableStream | undefined;
    let responseAbortListener: (() => void) | undefined;
    let requestTracked = false;
    let responseTracked = false;
    let requestDone = false;
    let responseDone = false;
    let cleanedUp = false;
    const cleanup = (): void => {
      if (cleanedUp) return;
      cleanedUp = true;
      if (abortListener) requestAbortSignal?.removeEventListener("abort", abortListener);
      if (responseAbortListener) {
        abortController.signal.removeEventListener("abort", responseAbortListener);
      }
    };
    const cleanupIfComplete = (): void => {
      if (requestDone && responseDone) cleanup();
    };
    try {
      const result = await this.makeRequest(request, abortController);
      const res = result.response;
      requestTracked = true;
      requestDone = result.isRequestComplete();
      void result.requestComplete.then(() => {
        requestDone = true;
        cleanupIfComplete();
        return undefined;
      });

      const headers = getResponseHeaders(res);

      const status = res.statusCode ?? 0;
      const response: PipelineResponse = {
        status,
        headers,
        request,
      };
      if (!result.isRequestComplete()) {
        setRequestCompletion(response, result.requestComplete);
      }

      // Responses to HEAD must not have a body.
      // If they do return a body, that body must be ignored.
      const method =
        negotiate && typeof request.requestOverrides?.method === "string"
          ? request.requestOverrides.method.toUpperCase()
          : request.method;
      if (method === "HEAD") {
        // call resume() and not destroy() to avoid closing the socket
        // and losing keep alive
        responseTracked = true;
        monitorStreamCompletion(res, () => {
          responseDone = true;
          cleanupIfComplete();
        });
        res.resume();
        return response;
      }

      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
      responseAbortListener = () => {
        if (responseStream && !responseDone) {
          destroyBodyStream(responseStream, new AbortError("The operation was aborted."));
        }
      };
      abortController.signal.addEventListener("abort", responseAbortListener);

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        pipeResponse(responseStream, downloadReportStream);
        responseStream = downloadReportStream;
      }
      responseTracked = true;
      monitorStreamCompletion(responseStream, () => {
        responseDone = true;
        cleanupIfComplete();
      });

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

      if (!requestTracked) requestDone = true;
      if (!responseTracked) responseDone = true;
      cleanupIfComplete();
    }
  }

  private makeRequest(
    request: PipelineRequest,
    abortController: AbortController,
  ): Promise<NodeRequestResult> {
    const url = new URL(request.url);

    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    const requestBody = request.body;
    const bodyFromFactory = typeof requestBody === "function";
    const negotiate = hasExpectContinue(request);
    const body = negotiate ? requestBody : bodyFromFactory ? requestBody() : requestBody;
    if (!negotiate && bodyFromFactory && abortController.signal.aborted) {
      if (isReadableStream(body)) disposeBodyStream(body);
      throw new AbortError(
        "The operation was aborted. Request body factory aborted before dispatch.",
      );
    }
    const bodyLength = typeof body === "function" ? null : getBodyLength(body ?? null);
    const headers = effectiveHeaders(request);
    if (
      bodyLength !== null &&
      (Boolean(body) || negotiate) &&
      headerValues(headers, "content-length").length === 0 &&
      headerValues(headers, "transfer-encoding").length === 0 &&
      !(request.requestOverrides && "headers" in request.requestOverrides)
    ) {
      request.headers.set("Content-Length", bodyLength);
    }
    const options: http.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides,
    };
    const expectHeader = negotiate ? prepareExpectContinueHeaders(options, bodyLength) : undefined;

    return new Promise<NodeRequestResult>((resolve, reject) => {
      new NodeRequestAttempt({
        request,
        abortSignal: abortController.signal,
        negotiate,
        body,
        bodyLength,
        expectHeader,
        isInsecure,
        options,
        resolve,
        reject,
      }).start();
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
    pipeResponse(stream, unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    pipeResponse(stream, inflate);
    return inflate;
  }

  return stream;
}

function pipeResponse(source: NodeJS.ReadableStream, destination: Transform): void {
  const onError = (error: Error): void => {
    destination.destroy(error);
  };
  const removeErrorListener = (): void => {
    source.removeListener("error", onError);
  };
  source.on("error", onError);
  source.once("close", removeErrorListener);
  destination.once("close", () => {
    source.unpipe(destination);
    if (source.readable) destroyBodyStream(source);
  });
  source.pipe(destination);
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
      if (e && (e?.name === "AbortError" || isRestError(e))) {
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
