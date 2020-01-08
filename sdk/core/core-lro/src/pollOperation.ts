// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

export interface PollOperationState<TResult> {
  isStarted?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  error?: Error;
  result?: TResult;
}

export interface PollOperation<TState, TResult, TResponseType = unknown> {
  state: TState;
  lastResponse?: TResponseType;
  update(options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: TState) => void;
  }): Promise<PollOperation<TState, TResult, TResponseType>>;
  cancel(options?: { abortSignal?: AbortSignal }): Promise<PollOperation<TState, TResult, TResponseType>>;
  toString(): string;
}
