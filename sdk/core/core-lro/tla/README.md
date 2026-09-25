# TLA+ model for the LRO poller

`LroPoller.tla` is a bounded safety model of the control flow in
`src/poller/poller.ts` and `src/poller/operation.ts`. It covers:

- initialization with running and terminal responses;
- immediate completion when no polling location is available;
- operation-location updates while running;
- successful, failed, and canceled terminal responses;
- optional final resource GETs;
- operation and transient request errors;
- `resolveOnUnsuccessful`; and
- concurrent callers waiting on the poller's serialized request queue.

HTTP header and response-body parsing are covered by unit tests rather than this
model. The model also makes no unconditional liveness claim because an Azure
service may legitimately report `running` indefinitely.

## Run TLC

Install Java 11 or later and download `tla2tools.jar` from an official
[TLA+ release](https://github.com/tlaplus/tlaplus/releases). Then run:

```bash
TLA2TOOLS_JAR=/absolute/path/to/tla2tools.jar pnpm test:tla
```

The model uses two callers and two polling locations. TLC explores both values
of `resolveOnUnsuccessful` and verifies the invariants listed in
`LroPoller.cfg`.

## Implementation correspondence

| Model action                                             | TypeScript implementation                          |
| -------------------------------------------------------- | -------------------------------------------------- |
| `Initialize*`                                            | `initOperation` and `getStatusFromInitialResponse` |
| `EnqueuePoll`, `StartPoll`                               | the promise queue in `PollerLike.poll`             |
| `CompleteRunning`                                        | `pollOperation` handling a nonterminal response    |
| `CompleteSucceeded`, `BeginFinalGet`, `CompleteFinalGet` | `pollOperationHelper` and `processOperationStatus` |
| `CompleteFailed`, `CompleteCanceled`                     | `processOperationStatus`                           |
| `CompleteOperationError`, `CompleteTransientError`       | `setStateError`                                    |
| `DrainTerminal`                                          | the terminal-state guard in `PollerLike.poll`      |

The serialized queue is required for `TerminalIsAbsorbing`: without it, two
concurrent requests can complete out of order and a stale running response can
overwrite a terminal status.
