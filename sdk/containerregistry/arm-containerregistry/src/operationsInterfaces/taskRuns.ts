/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  TaskRun,
  TaskRunsListOptionalParams,
  TaskRunsGetOptionalParams,
  TaskRunsGetResponse,
  TaskRunsCreateOptionalParams,
  TaskRunsCreateResponse,
  TaskRunsDeleteOptionalParams,
  TaskRunUpdateParameters,
  TaskRunsUpdateOptionalParams,
  TaskRunsUpdateResponse,
  TaskRunsGetDetailsOptionalParams,
  TaskRunsGetDetailsResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a TaskRuns. */
export interface TaskRuns {
  /**
   * Lists all the task runs for a specified container registry.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    registryName: string,
    options?: TaskRunsListOptionalParams
  ): PagedAsyncIterableIterator<TaskRun>;
  /**
   * Gets the detailed information for a given task run.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsGetOptionalParams
  ): Promise<TaskRunsGetResponse>;
  /**
   * Creates a task run for a container registry with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param taskRun The parameters of a run that needs to scheduled.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    taskRun: TaskRun,
    options?: TaskRunsCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<TaskRunsCreateResponse>,
      TaskRunsCreateResponse
    >
  >;
  /**
   * Creates a task run for a container registry with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param taskRun The parameters of a run that needs to scheduled.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    taskRun: TaskRun,
    options?: TaskRunsCreateOptionalParams
  ): Promise<TaskRunsCreateResponse>;
  /**
   * Deletes a specified task run resource.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a specified task run resource.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Updates a task run with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param updateParameters The parameters for updating a task run.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    updateParameters: TaskRunUpdateParameters,
    options?: TaskRunsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<TaskRunsUpdateResponse>,
      TaskRunsUpdateResponse
    >
  >;
  /**
   * Updates a task run with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param updateParameters The parameters for updating a task run.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    updateParameters: TaskRunUpdateParameters,
    options?: TaskRunsUpdateOptionalParams
  ): Promise<TaskRunsUpdateResponse>;
  /**
   * Gets the detailed information for a given task run that includes all secrets.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param registryName The name of the container registry.
   * @param taskRunName The name of the task run.
   * @param options The options parameters.
   */
  getDetails(
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsGetDetailsOptionalParams
  ): Promise<TaskRunsGetDetailsResponse>;
}
