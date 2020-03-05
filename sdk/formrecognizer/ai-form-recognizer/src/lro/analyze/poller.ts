// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, HttpRequestBody, AbortSignalLike } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { ExtractReceiptOptions } from "../../receiptRecognizerClient";
import { ExtractLayoutOptions } from "../../layoutRecognizerClient";
import { ExtractCustomFormOptions } from "../../customRecognizerClient";
import { OperationStatus } from "../../generated/models";
import { SupportedContentType } from '../../common';

export type StartAnalyzeOptions = ExtractReceiptOptions | ExtractLayoutOptions | ExtractCustomFormOptions;

//export type T = AnalyzeReceiptResultResponse | AnalyzeLayoutResultResponse | GetAnalyzeFormResultResponse;

interface ICanHazStatus { status: OperationStatus }

/**
 * Defines the operations from a analyze client that are needed for the poller
 * to work
 */
export type AnalyzePollerClient<T extends ICanHazStatus> = {
  // returns a result id to retrieve results
  startAnalyze: (body: HttpRequestBody, contentType: SupportedContentType, analyzeOptions: StartAnalyzeOptions, modelId?: string) => Promise<{ operationLocation: string }>;
  // retrieves analyze result
  getAnalyzeResult: (
    resultId: string,
    options: { abortSignal?: AbortSignalLike }
  ) => Promise<T>;
};

export interface StartAnalyzePollState<T extends ICanHazStatus> extends PollOperationState<T> {
  readonly client: AnalyzePollerClient<T>;
  body?: HttpRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  resultId?: string;
  status: OperationStatus;
  readonly analyzeOptions?: StartAnalyzeOptions;
}

export interface StartAnalyzePollerOperation<T extends ICanHazStatus>
extends PollOperation<StartAnalyzePollState<T>, T> {}

export type StartAnalyzePollerOptions<T extends ICanHazStatus> = {
  client: AnalyzePollerClient<T>;
  body: HttpRequestBody;
  contentType: SupportedContentType;
  modelId?: string;
  intervalInMs?: number;
  resultId?: string;
  onProgress?: (state: StartAnalyzePollState<T>) => void;
  resumeFrom?: string;
} & StartAnalyzeOptions;

/**
 * Class that represents a poller that waits until a model has been trained.
 */
export class StartAnalyzePoller<T extends ICanHazStatus> extends Poller<StartAnalyzePollState<T>, T> {
  public intervalInMs: number;

  constructor(options: StartAnalyzePollerOptions<T>) {
    const {
      client,
      body,
      contentType,
      intervalInMs = 1000,
      resultId,
      onProgress,
      resumeFrom
    } = options;

    let state: StartAnalyzePollState<T> | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeStartAnalyzePollOperation({
      ...state,
      client,
      body,
      contentType,
      resultId,
      status: "notStarted",
      analyzeOptions: options
    }, );

    super(operation);

    if (typeof onProgress === "function") {
      this.onProgress(onProgress);
    }

    this.intervalInMs = intervalInMs;
  }

  public delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
/**
 * Creates a poll operation given the provided state.
 * @ignore
 */
function makeStartAnalyzePollOperation<T extends ICanHazStatus> (
  state: StartAnalyzePollState<T>,
): StartAnalyzePollerOperation<T> {
  return {
    state: { ...state },

    async cancel(_options = {}): Promise<StartAnalyzePollerOperation<T>> {
      throw new Error("Cancel operation is not supported.");
    },

    async update(options = {}): Promise<StartAnalyzePollerOperation<T>> {
      const state = this.state;
      const { client, body, contentType, analyzeOptions, modelId } = state;

      if (!state.isStarted) {
        if (!body) {
          throw new Error("Expect a valid 'body'");
        }

        state.isStarted = true;
        const result = await client.startAnalyze(body, contentType, analyzeOptions || {}, modelId);
        const lastSlashIndex = result.operationLocation.lastIndexOf("/");
        state.resultId = result.operationLocation.substring(lastSlashIndex + 1);
        // body is no longer needed
        state.body = undefined;
      }

      const response = await client.getAnalyzeResult(state.resultId!, {
        abortSignal: analyzeOptions?.abortSignal
      });

      state.status = response.status;
      if (!state.isCompleted) {
        if (response.status === "running" && typeof options.fireProgress === "function") {
          options.fireProgress(state);
        } else if (response.status === "succeeded") {
          state.result = response;
          state.isCompleted = true;
        } else if (response.status === "failed") {
          state.error = new Error(`Model training failed with invalid model status.`);
          state.isCompleted = true;
        }
      }

      return makeStartAnalyzePollOperation(state);
    },

    toString() {
      return JSON.stringify({ state: this.state }, (key, value) => {
        if (key === "client" || key === "body") {
          return undefined;
        }
        return value;
      });
    }
  };
}
