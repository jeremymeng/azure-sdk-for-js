// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// PROTOTYPE ONLY. Run with the package's existing tsx dependency; no Azure service required.
import assert from "node:assert/strict";
import http from "node:http";
import { Readable } from "node:stream";
import { getEventListeners } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { createNodeHttpClient } from "../src/nodeHttpClient.ts";
import { createPipelineRequest } from "../src/pipelineRequest.ts";
import { createHttpHeaders } from "../src/httpHeaders.ts";

const payload = Buffer.alloc(4096, 120);
const observations = new Map();
const timers = new Set();
const agents = [];
const rows = [];
const client = createNodeHttpClient();
const server = http.createServer();
const schedule = (callback, ms) => {
  const timer = setTimeout(() => {
    timers.delete(timer);
    callback();
  }, ms);
  timers.add(timer);
};

function serve(req, res) {
  const stats = observations.get(req.url);
  assert.ok(stats, `Unexpected request ${req.url}`);
  stats.headersAt = performance.now();
  stats.connection = req.socket.remotePort;
  stats.contentLength = req.headers["content-length"];
  stats.outgoingExpect = req.headers.expect;
  req.on("data", (chunk) => {
    stats.firstByteAt ??= performance.now();
    stats.bytes += chunk.length;
    stats.chunks.push(chunk);
  });
  req.on("end", () => {
    const finish = () => {
      if (!res.destroyed) {
        res.end("uploaded");
      }
    };
    if (stats.mode === "late" || stats.mode === "race") {
      schedule(finish, 150);
    } else if (stats.mode !== "reject" && stats.mode !== "hold") {
      finish();
    }
  });
  stats.onHeaders?.();

  if (stats.mode === "reject") {
    res.writeHead(403, { "Content-Length": "17", Connection: "keep-alive" });
    res.write("rejected ");
    schedule(() => res.end("response"), 60);
  } else if (stats.mode === "close") {
    schedule(() => req.socket.destroy(), 60);
  } else if (stats.mode === "accept" || stats.mode === "source-error") {
    res.writeProcessing();
    res.writeEarlyHints({ link: "</prototype>; rel=preload" });
    schedule(() => {
      stats.beforePermission = [stats.factories, stats.reads, stats.progress, stats.bytes];
      res.writeContinue();
      res.writeContinue();
    }, 80);
  } else if (stats.mode === "late" || stats.mode === "race") {
    schedule(() => {
      if (!res.destroyed) {
        res.writeContinue();
        res.writeContinue();
      }
    }, stats.continueAt);
  } else if (stats.mode === "hold") {
    schedule(() => res.end("agent released"), 1450);
  }
}

server.on("request", serve);
server.on("checkContinue", serve);
server.on("checkExpectation", serve);

function metrics(mode, extra = {}) {
  return {
    mode,
    bytes: 0,
    factories: 0,
    reads: 0,
    progress: 0,
    chunks: [],
    ...extra,
  };
}

function source(stats, fail = false) {
  return new Readable({
    read() {
      stats.reads++;
      if (fail) {
        this.destroy(new Error("prototype source failure"));
      } else {
        this.push(payload);
        this.push(null);
      }
    },
  });
}

async function execute(name, stats, options = {}) {
  observations.set(`/${name}`, stats);
  const controller = options.controller ?? new AbortController();
  const headers = createHttpHeaders({ Expect: "100-continue", "Content-Length": payload.length });
  if (options.noLength) headers.delete("Content-Length");
  if (options.noExpect) headers.delete("Expect");
  const body =
    options.body ??
    (() => {
      stats.factories++;
      return source(stats, stats.mode === "source-error");
    });
  const request = createPipelineRequest({
    url: `${origin}/${name}`,
    method: "POST",
    allowInsecureConnection: true,
    headers,
    body,
    abortSignal: controller.signal,
    timeout: options.timeout ?? 6000,
    requestOverrides: options.overrides,
    streamResponseStatusCodes: options.stream ? new Set([403]) : undefined,
    onUploadProgress: () => {
      stats.progress++;
      options.onProgress?.();
    },
  });
  request.agent = options.agent;
  stats.startedAt = performance.now();
  let response;
  if (options.error) {
    await assert.rejects(client.sendRequest(request), options.error);
    stats.result = "error";
  } else {
    response = await client.sendRequest(request);
    stats.result = response.status;
    assert.equal(
      response.status,
      stats.mode === "reject" ? 403 : 200,
      `${name}: unexpected status with ${stats.bytes} body bytes received`,
    );
    if (options.stream) {
      assert.ok(response.readableStreamBody);
      // Hold the readable response longer than fallback: it must not trigger a pending upload.
      await delay(1150);
      let text = "";
      for await (const chunk of response.readableStreamBody) text += chunk.toString();
      assert.equal(text, "rejected response");
    } else {
      assert.equal(response.bodyAsText, stats.mode === "reject" ? "rejected response" : "uploaded");
    }
  }
  await delay(20);
  assert.equal(getEventListeners(controller.signal, "abort").length, 0, "abort listener leaked");
  rows.push({
    case: name,
    result: stats.result,
    factories: stats.factories,
    reads: stats.reads,
    progress: stats.progress,
    bytes: stats.bytes,
    waitMs: stats.firstByteAt ? Math.round(stats.firstByteAt - stats.headersAt) : "-",
    connection: stats.connection,
  });
  return response;
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

try {
  const accepted = metrics("accept");
  await execute("accept-102-103-duplicate-100", accepted);
  assert.deepEqual(accepted.beforePermission, [0, 0, 0, 0]);
  assert.equal(accepted.factories, 1);
  assert.equal(accepted.bytes, payload.length);

  const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
  agents.push(agent);
  const rejected = metrics("reject");
  await execute("early-reject-factory-streamed-response", rejected, { agent, stream: true });
  assert.deepEqual(
    [rejected.factories, rejected.reads, rejected.progress, rejected.bytes],
    [0, 0, 0, 0],
  );
  const next = metrics("normal");
  await execute("after-reject-new-connection", next, { agent, noExpect: true });
  assert.notEqual(next.connection, rejected.connection, "incomplete request socket was reused");
  assert.equal(next.bytes, payload.length);

  const untouched = metrics("reject");
  const callerStream = source(untouched);
  await execute("early-reject-caller-stream", untouched, { body: callerStream });
  assert.deepEqual([untouched.reads, untouched.progress, untouched.bytes], [0, 0, 0]);
  assert.equal(callerStream.destroyed, false);
  const replay = untouched;
  replay.mode = "normal";
  await execute("manual-replay-untouched-stream", replay, { body: callerStream, noExpect: true });
  assert.equal(replay.bytes, payload.length);

  const ignored = metrics("ignore");
  await execute("ignored-expectation-fallback-chunked", ignored, { noLength: true });
  assert.equal(ignored.contentLength, undefined);
  assert.ok(ignored.firstByteAt - ignored.headersAt >= 950);
  assert.equal(ignored.factories, 1);
  assert.equal(ignored.bytes, payload.length);

  for (const continueAt of [999, 1000, 1001, 1100]) {
    const race = metrics(continueAt === 1100 ? "late" : "race", { continueAt });
    await execute(`continue-at-${continueAt}ms`, race);
    assert.equal(race.factories, 1);
    assert.equal(race.reads, 1);
    assert.equal(race.bytes, payload.length);
  }

  for (const kind of ["abort", "timeout", "close"]) {
    const controller = new AbortController();
    const canceled = metrics(kind === "close" ? "close" : "ignore", {
      onHeaders: kind === "abort" ? () => schedule(() => controller.abort(), 60) : undefined,
    });
    await execute(`waiting-${kind}`, canceled, {
      controller,
      timeout: kind === "timeout" ? 120 : 6000,
      error: kind === "close" ? /socket hang up|closed before a response/ : { name: "AbortError" },
    });
    await delay(1100);
    assert.deepEqual(
      [canceled.factories, canceled.reads, canceled.progress, canceled.bytes],
      [0, 0, 0, 0],
    );
  }

  const failedSource = metrics("source-error");
  await execute("source-error-after-continue", failedSource, { error: /prototype source failure/ });
  assert.equal(failedSource.factories, 1);
  assert.equal(failedSource.bytes, 0);

  const failedFactory = metrics("accept");
  await execute("factory-error-after-continue", failedFactory, {
    body: () => {
      failedFactory.factories++;
      throw new Error("prototype factory failure");
    },
    error: /prototype factory failure/,
  });
  assert.equal(failedFactory.factories, 1);
  assert.equal(failedFactory.bytes, 0);

  const failedProgress = metrics("accept");
  await execute("progress-error-after-continue", failedProgress, {
    onProgress: () => {
      throw new Error("prototype progress failure");
    },
    error: /prototype progress failure/,
  });
  assert.equal(failedProgress.factories, 1);

  for (const [name, body] of [
    ["string", payload.toString()],
    ["buffer", payload],
    ["array-buffer", Uint8Array.from(payload).buffer],
    ["typed-array-window", Uint8Array.from([0, 1, 2, 3, 4]).subarray(1, 4)],
  ]) {
    const memory = metrics("accept");
    await execute(`known-length-${name}`, memory, {
      body,
      noLength: true,
      overrides: { headers: { eXpEcT: "something-else, 100-ConTinue" } },
    });
    assert.equal(Number(memory.contentLength), memory.bytes);
    assert.equal(memory.bytes, name === "typed-array-window" ? 3 : payload.length);
    assert.deepEqual(
      Buffer.concat(memory.chunks),
      name === "typed-array-window" ? Buffer.from([1, 2, 3]) : payload,
    );
    assert.deepEqual(memory.beforePermission, [0, 0, 0, 0]);
  }

  const rawHeaders = metrics("accept");
  await execute("raw-override-header-pairs", rawHeaders, {
    body: payload,
    overrides: { headers: ["Host", new URL(origin).host, "eXpEcT", "100-CoNtInUe"] },
  });
  assert.equal(Number(rawHeaders.contentLength), payload.length);
  assert.equal(rawHeaders.bytes, payload.length);
  assert.deepEqual(rawHeaders.beforePermission, [0, 0, 0, 0]);

  const added = metrics("reject");
  await execute("overrides-add-expect", added, {
    noExpect: true,
    overrides: { headers: { EXPECT: "other, 100-CONTINUE", "Content-Length": payload.length } },
  });
  assert.deepEqual([added.factories, added.reads, added.progress, added.bytes], [0, 0, 0, 0]);
  const removed = metrics("normal");
  await execute("overrides-remove-expect", removed, { overrides: { headers: {} } });
  assert.equal(removed.outgoingExpect, undefined);
  assert.equal(removed.bytes, payload.length);

  const queuedAgent = new http.Agent({ keepAlive: true, maxSockets: 1 });
  agents.push(queuedAgent);
  const held = metrics("hold");
  observations.set("/hold", held);
  const holdRequest = createPipelineRequest({
    url: `${origin}/hold`,
    allowInsecureConnection: true,
  });
  holdRequest.agent = queuedAgent;
  const holding = client.sendRequest(holdRequest);
  while (!held.headersAt) await delay(5);
  const queued = metrics("ignore");
  await execute("agent-queue-does-not-start-fallback", queued, { agent: queuedAgent });
  await holding;
  assert.ok(queued.headersAt - queued.startedAt >= 1300);
  assert.ok(queued.firstByteAt - queued.headersAt >= 950);
  assert.equal(queued.bytes, payload.length);

  console.table(rows);
  console.log(
    "PASS: real HTTP handshake, lazy upload, zero-byte rejection, response preservation,",
  );
  console.log(
    "socket retirement, fallback, cancellation, source errors, overrides, and single-send races.",
  );
} finally {
  for (const timer of timers) clearTimeout(timer);
  for (const agent of agents) agent.destroy();
  server.closeAllConnections();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}
