/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  RequestHistory,
  WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a WorkflowRunActionRepetitionsRequestHistories. */
export interface WorkflowRunActionRepetitionsRequestHistories {
  /**
   * List a workflow run repetition request history.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  ): PagedAsyncIterableIterator<RequestHistory>;
  /**
   * Gets a workflow run repetition request history.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param requestHistoryName The request history name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    requestHistoryName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
  ): Promise<WorkflowRunActionRepetitionsRequestHistoriesGetResponse>;
}
