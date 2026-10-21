// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { RestError } from "../restError.js";
import { logger } from "../log.js";

const startedSources = new WeakSet<object>();
const disposedSources = new WeakSet<object>();
const monitoredSources = new WeakSet<object>();
const multipartStreams = new WeakMap<NodeJS.ReadableStream, () => void>();
interface PendingErrorSources {
  sources: NodeJS.ReadableStream[];
  observers: Set<(error: Error) => void>;
  listeners: Map<NodeJS.ReadableStream, { onError: (error: Error) => void; onClose: () => void }>;
  error?: Error;
  waitingForFirstObserver: boolean;
}
const pendingErrorSources = new WeakMap<object, PendingErrorSources>();

export function registerMultipartStream(
  stream: NodeJS.ReadableStream,
  prepareSources: () => void,
): void {
  multipartStreams.set(stream, prepareSources);
}

export function registerPendingBodyErrorSources(
  body: object,
  sources: NodeJS.ReadableStream[],
): void {
  const pending = {
    sources: [...new Set(sources)],
    observers: new Set<(error: Error) => void>(),
    listeners: new Map<
      NodeJS.ReadableStream,
      { onError: (error: Error) => void; onClose: () => void }
    >(),
    waitingForFirstObserver: true,
  };
  pendingErrorSources.set(body, pending);
  attachPendingErrorListeners(pending);
}

export function observePendingBodyErrors(
  body: unknown,
  onError: (error: Error) => void,
): (() => void) | undefined {
  let directSource: NodeJS.ReadableStream | undefined;
  if (body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") {
    directSource = body as NodeJS.ReadableStream;
    directSource.on("error", onError);
  }
  let pending: PendingErrorSources | undefined;
  if ((typeof body === "object" && body !== null) || typeof body === "function") {
    pending = pendingErrorSources.get(body);
  }
  if (pending) {
    pending.waitingForFirstObserver = false;
    pending.observers.add(onError);
    attachPendingErrorListeners(pending);
    if (pending.error) {
      const error = pending.error;
      queueMicrotask(() => {
        if (pending?.observers.has(onError)) onError(error);
      });
    }
  }
  if (!directSource && !pending) return undefined;
  return () => {
    directSource?.removeListener("error", onError);
    if (pending) {
      pending.observers.delete(onError);
      if (!pending.waitingForFirstObserver && pending.observers.size === 0) {
        detachPendingErrorListeners(pending);
      }
    }
  };
}

function attachPendingErrorListeners(pending: PendingErrorSources): void {
  for (const source of pending.sources) {
    if (pending.listeners.has(source) || ("closed" in source && source.closed === true)) {
      continue;
    }
    const onError = (error: Error): void => {
      pending.error ??= error;
      for (const observer of [...pending.observers]) observer(error);
    };
    const onClose = (): void => {
      source.removeListener("error", onError);
      pending.listeners.delete(source);
    };
    pending.listeners.set(source, { onError, onClose });
    source.on("error", onError);
    source.once("close", onClose);
  }
}

function detachPendingErrorListeners(pending: PendingErrorSources): void {
  for (const [source, { onError, onClose }] of pending.listeners) {
    source.removeListener("error", onError);
    source.removeListener("close", onClose);
  }
  pending.listeners.clear();
}

export function assertBodyStreamAvailable(stream: NodeJS.ReadableStream): void {
  if (
    startedSources.has(stream) ||
    Readable.isDisturbed(stream) ||
    !stream.readable ||
    ("destroyed" in stream && stream.destroyed === true) ||
    ("readableEnded" in stream && stream.readableEnded === true) ||
    ("closed" in stream && stream.closed === true)
  ) {
    throw new RestError(
      "Cannot resend an already-started request body stream. Use a factory returning a fresh stream.",
      { code: "REQUEST_BODY_NOT_REPLAYABLE" },
    );
  }
}

export function startBodyStream(stream: NodeJS.ReadableStream): void {
  assertBodyStreamAvailable(stream);
  startedSources.add(stream);
  multipartStreams.get(stream)?.();
}

export function destroyBodyStream(stream: NodeJS.ReadableStream, error?: Error): void {
  if ("destroy" in stream && typeof stream.destroy === "function") {
    stream.destroy(error);
  }
}

export function disposeBodyStream(stream: NodeJS.ReadableStream): void {
  if (disposedSources.has(stream) || ("closed" in stream && stream.closed === true)) return;
  disposedSources.add(stream);
  monitorBodyStreamErrors(stream);
  destroyBodyStream(stream);
}

export function monitorBodyStreamErrors(stream: NodeJS.ReadableStream): void {
  if (monitoredSources.has(stream) || ("closed" in stream && stream.closed === true)) return;
  monitoredSources.add(stream);
  const onError = (error: Error): void => {
    logger.warning("Error after stopping request body stream", error);
  };
  stream.on("error", onError);
  stream.once("close", () => stream.removeListener("error", onError));
}
