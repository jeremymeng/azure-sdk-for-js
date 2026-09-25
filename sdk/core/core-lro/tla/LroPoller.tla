----------------------------- MODULE LroPoller -----------------------------
(*
 * A safety model of src/poller/poller.ts and src/poller/operation.ts.
 * HTTP response parsing is intentionally outside this model.
 *)
EXTENDS Integers, FiniteSets, TLC

CONSTANTS Clients, Locations, MaxRequests, NoClient, NoLocation, NoStatus

TerminalStatuses == {"succeeded", "failed", "canceled"}
Statuses == {"notStarted", "running"} \union TerminalStatuses
Phases == {"initializing", "ready", "finalGet"}

VARIABLES
  status,
  phase,
  location,
  result,
  error,
  resolveOnUnsuccessful,
  activeClient,
  queuedClients,
  requestCount,
  finalGetCount,
  terminalSnapshot

vars ==
  << status, phase, location, result, error, resolveOnUnsuccessful,
     activeClient, queuedClients, requestCount, finalGetCount,
     terminalSnapshot >>

IsTerminal(s) == s \in TerminalStatuses

Init ==
  /\ status = "notStarted"
  /\ phase = "initializing"
  /\ location = NoLocation
  /\ result = FALSE
  /\ error = FALSE
  /\ resolveOnUnsuccessful \in BOOLEAN
  /\ activeClient = NoClient
  /\ queuedClients = {}
  /\ requestCount = 0
  /\ finalGetCount = 0
  /\ terminalSnapshot = NoStatus

InitializeRunning(loc) ==
  /\ phase = "initializing"
  /\ loc \in Locations
  /\ status' = "running"
  /\ phase' = "ready"
  /\ location' = loc
  /\ UNCHANGED << result, error, resolveOnUnsuccessful, activeClient,
                  queuedClients, requestCount, finalGetCount,
                  terminalSnapshot >>

(*
 * createHttpPoller treats an initially-running response without a polling
 * location as an immediately completed operation.
 *)
InitializeWithoutLocation ==
  /\ phase = "initializing"
  /\ status' = "succeeded"
  /\ phase' = "ready"
  /\ result' = TRUE
  /\ terminalSnapshot' = "succeeded"
  /\ UNCHANGED << location, error, resolveOnUnsuccessful, activeClient,
                  queuedClients, requestCount, finalGetCount >>

InitializeTerminal(s) ==
  /\ phase = "initializing"
  /\ s \in TerminalStatuses
  /\ status' = s
  /\ phase' = "ready"
  /\ result' =
       ((s = "succeeded") \/ (s = "canceled") \/
        (s = "failed" /\ resolveOnUnsuccessful))
  /\ error' = (s = "failed")
  /\ terminalSnapshot' = s
  /\ UNCHANGED << location, resolveOnUnsuccessful, activeClient,
                  queuedClients, requestCount, finalGetCount >>

EnqueuePoll(client) ==
  /\ phase = "ready"
  /\ client \in Clients
  /\ client # activeClient
  /\ client \notin queuedClients
  /\ queuedClients' = queuedClients \union {client}
  /\ UNCHANGED << status, phase, location, result, error,
                  resolveOnUnsuccessful, activeClient, requestCount,
                  finalGetCount, terminalSnapshot >>

CancelQueuedPoll(client) ==
  /\ client \in queuedClients
  /\ queuedClients' = queuedClients \ {client}
  /\ UNCHANGED << status, phase, location, result, error,
                  resolveOnUnsuccessful, activeClient, requestCount,
                  finalGetCount, terminalSnapshot >>

(*
 * Only one request may become active. This models the promise queue in
 * poller.ts and prevents out-of-order responses from regressing state.
 *)
StartPoll(client) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = NoClient
  /\ client \in queuedClients
  /\ location \in Locations
  /\ requestCount < MaxRequests
  /\ activeClient' = client
  /\ queuedClients' = queuedClients \ {client}
  /\ requestCount' = requestCount + 1
  /\ UNCHANGED << status, phase, location, result, error,
                  resolveOnUnsuccessful, finalGetCount, terminalSnapshot >>

CompleteRunning(client, newLocation) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = client
  /\ newLocation \in Locations
  /\ activeClient' = NoClient
  /\ location' = newLocation
  /\ UNCHANGED << status, phase, result, error, resolveOnUnsuccessful,
                  queuedClients, requestCount, finalGetCount,
                  terminalSnapshot >>

CompleteSucceeded(client) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = client
  /\ status' = "succeeded"
  /\ result' = TRUE
  /\ activeClient' = NoClient
  /\ terminalSnapshot' = "succeeded"
  /\ UNCHANGED << phase, location, error, resolveOnUnsuccessful,
                  queuedClients, requestCount, finalGetCount >>

BeginFinalGet(client) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = client
  /\ phase' = "finalGet"
  /\ finalGetCount' = finalGetCount + 1
  /\ UNCHANGED << status, location, result, error,
                  resolveOnUnsuccessful, activeClient, queuedClients,
                  requestCount, terminalSnapshot >>

CompleteFinalGet ==
  /\ phase = "finalGet"
  /\ status' = "succeeded"
  /\ phase' = "ready"
  /\ result' = TRUE
  /\ activeClient' = NoClient
  /\ terminalSnapshot' = "succeeded"
  /\ UNCHANGED << location, error, resolveOnUnsuccessful, queuedClients,
                  requestCount, finalGetCount >>

CompleteFailed(client) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = client
  /\ status' = "failed"
  /\ result' = resolveOnUnsuccessful
  /\ error' = TRUE
  /\ activeClient' = NoClient
  /\ terminalSnapshot' = "failed"
  /\ UNCHANGED << phase, location, resolveOnUnsuccessful, queuedClients,
                  requestCount, finalGetCount >>

CompleteCanceled(client) ==
  /\ phase = "ready"
  /\ status = "running"
  /\ activeClient = client
  /\ status' = "canceled"
  /\ result' = TRUE
  /\ activeClient' = NoClient
  /\ terminalSnapshot' = "canceled"
  /\ UNCHANGED << phase, location, error, resolveOnUnsuccessful,
                  queuedClients, requestCount, finalGetCount >>

CompleteOperationError ==
  /\ phase \in {"ready", "finalGet"}
  /\ status = "running"
  /\ activeClient \in Clients
  /\ status' = "failed"
  /\ phase' = "ready"
  /\ error' = TRUE
  /\ activeClient' = NoClient
  /\ terminalSnapshot' = "failed"
  /\ UNCHANGED << location, result, resolveOnUnsuccessful, queuedClients,
                  requestCount, finalGetCount >>

CompleteTransientError ==
  /\ phase \in {"ready", "finalGet"}
  /\ status = "running"
  /\ activeClient \in Clients
  /\ phase' = "ready"
  /\ activeClient' = NoClient
  /\ UNCHANGED << status, location, result, error,
                  resolveOnUnsuccessful, queuedClients, requestCount,
                  finalGetCount, terminalSnapshot >>

(*
 * A call queued before another call reaches a terminal state observes the
 * terminal state without issuing another request.
 *)
DrainTerminal(client) ==
  /\ phase = "ready"
  /\ IsTerminal(status)
  /\ client \in queuedClients
  /\ queuedClients' = queuedClients \ {client}
  /\ UNCHANGED << status, phase, location, result, error,
                  resolveOnUnsuccessful, activeClient, requestCount,
                  finalGetCount, terminalSnapshot >>

Next ==
  \/ \E loc \in Locations : InitializeRunning(loc)
  \/ InitializeWithoutLocation
  \/ \E s \in TerminalStatuses : InitializeTerminal(s)
  \/ \E client \in Clients : EnqueuePoll(client)
  \/ \E client \in Clients : CancelQueuedPoll(client)
  \/ \E client \in Clients : StartPoll(client)
  \/ \E client \in Clients, loc \in Locations :
       CompleteRunning(client, loc)
  \/ \E client \in Clients : CompleteSucceeded(client)
  \/ \E client \in Clients : BeginFinalGet(client)
  \/ CompleteFinalGet
  \/ \E client \in Clients : CompleteFailed(client)
  \/ \E client \in Clients : CompleteCanceled(client)
  \/ CompleteOperationError
  \/ CompleteTransientError
  \/ \E client \in Clients : DrainTerminal(client)

Spec == Init /\ [][Next]_vars

TypeOK ==
  /\ status \in Statuses
  /\ phase \in Phases
  /\ location \in Locations \union {NoLocation}
  /\ result \in BOOLEAN
  /\ error \in BOOLEAN
  /\ resolveOnUnsuccessful \in BOOLEAN
  /\ activeClient \in Clients \union {NoClient}
  /\ queuedClients \subseteq Clients
  /\ requestCount \in Nat
  /\ requestCount <= MaxRequests
  /\ finalGetCount \in Nat
  /\ terminalSnapshot \in TerminalStatuses \union {NoStatus}

ResultImpliesTerminal == result => IsTerminal(status)
ErrorImpliesFailed == error => status = "failed"
FailedHasError == (status = "failed") => error
NoRequestWithoutLocation == (requestCount > 0) => location \in Locations
FinalGetAtMostOncePerRequest == finalGetCount <= requestCount
SingleActiveRequest == activeClient = NoClient \/ activeClient \in Clients
TerminalIsAbsorbing ==
  terminalSnapshot # NoStatus => status = terminalSnapshot

=============================================================================
