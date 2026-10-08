# Expect: 100-continue transport prototype

**Throwaway experiment for [#40251](https://github.com/Azure/azure-sdk-for-js/issues/40251),
not a release or production PR.** The executable uses the modified real Node
transport, an ephemeral loopback HTTP server, and assertions. No UI, Azure
resources, new dependency, public option, or automatic enablement policy.

From the repository root, with workspace dependencies installed:

```powershell
pnpm --dir sdk\core\ts-http-runtime exec tsx prototype\expect-continue.mjs
```

The command prints a table of factory calls, source reads, progress callbacks,
wire bytes, wait time after server receipt of headers, and connection identities.
It exits nonzero on failed assertions and closes its server, agents, and timers.
Timing assertions allow scheduling jitter; deterministic fake-timer cases live
in `test/public/node/nodeHttpClient.spec.ts`.

## Verdict

The existing Node transport can negotiate with a small **per-attempt**
`waiting -> sending -> terminal` gate. But gating just `body.pipe(req)` is
insufficient. The prototype also needs these lifecycle changes:

- Defer factories and upload-progress transforms until permission. Compute
  in-memory content lengths before flushing, including override headers;
  unknown-length factories/streams retain metadata or chunked framing.
- Start the one-second fallback only after socket assignment and connection
  readiness, immediately after `flushHeaders()`. Agent queue time is excluded.
  Only `continue`, not other informational responses, opens the gate.
- Cancel the gate, timer, and connection listeners on final response, abort,
  request error, or close. Handle exceptions from deferred factories and
  forward errors from active upload sources/progress transforms.
- Do not wait for an untouched upload stream to finish before removing the
  caller's abort listener. Do not destroy that caller-owned stream.
- For a final response before request framing finishes, stop active piping
  and set `ClientRequest.shouldKeepAlive = false`. Let Node drain the readable
  response and retire its socket; **do not** immediately destroy the request
  (which would destroy the response), or `end()` an incomplete content-length
  request. A subsequent request is verified to use a different connection.

## Demonstrated

Real HTTP acceptance after 102/103, duplicate 100, zero-read/zero-byte early
rejection (factory and caller stream), a readable rejection held beyond the
fallback, manual replay of an untouched stream, ignored expectation with
chunked fallback, 999/1000/1001/1100 ms continue races, abort/total-timeout/socket
failure while waiting, source/factory/progress errors, known-length string,
Buffer, ArrayBuffer and typed-array window bodies, override header replacement
(including raw pairs), and a request queued behind an occupied one-socket agent.
No-expectation requests remain eager.

The deterministic tests cover both race orderings, late events after terminal
states, timer/listener cancellation, and a simulated TLS connection delay.

## Local verification

Verified on Windows with Node **22.22.3**:

- Demonstration command above: passed all **24** real-server scenarios.
  Accepted/fallback factory uploads invoke the factory once and send 4096 bytes.
  Early rejection and waiting cancellation send zero bytes with zero factory
  reads or progress callbacks. Ignored expectations start uploading about
  1000 ms after headers; an agent-queued attempt still waits its full second.
- `pnpm turbo build --filter=@typespec/ts-http-runtime... --token 1` from
  repository root: passed. Remote-cache authorization warning did not prevent
  the local build.
- `pnpm check-format` and `pnpm lint` from the package: passed, with existing
  lint warnings and no new lint errors.
- `pnpm test` from the package: passed type-checking and **436 Node**,
  **411 browser**, and **352 React Native** tests.

## Remaining decisions and limitations

- Real TLS, delayed DNS, CONNECT/proxy/custom agents, and multiple supported
  Node versions need wire-level coverage before production. The demo is HTTP;
  TLS readiness is currently covered with a simulated socket. In particular,
  TCP-connected `TLSSocket` instances whose `alpnProtocol` is still null are
  also held until `secureConnect`; opaque/custom socket wrappers need separate
  readiness validation.
- `flushHeaders()` queues headers to a connected socket, not a wire-delivery
  acknowledgment. Backpressured sockets need further investigation.
- Socket retirement relies on Node's HTTP/1 `shouldKeepAlive` behavior, verified
  locally on Node 22. It is not a new public connection-lifecycle API.
- Progress still measures chunks entering the request's upload transform,
  not acknowledged network bytes. Already-flowing streams cannot be made
  lazy retroactively. Untouched stream errors remain the caller's responsibility.
  Active canceled streams are unpiped, not blindly destroyed.
- Raw override header pairs replace all headers; as with Node's raw-header
  path, the caller must supply `Host`. The demo supplies it explicitly.
- Multipart-policy preparation, authentication retries, redirects that remove
  bodies, bounded 417 recovery, and replay eligibility are not implemented.
  A manual untouched-stream replay is evidence of ownership preservation,
  not a generic retry policy. Each new `sendRequest()` gets fresh state.
- Browser Fetch/XHR and Undici are unchanged and do not acquire this handshake.
  Unsupported-transport diagnostics, configurable wait time, Storage enablement,
  and API/version/changelog rollout remain separate follow-ups.

All `src/` edits on this branch are prototype-only. Do not merge this branch
as a production implementation.
