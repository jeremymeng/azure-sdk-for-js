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
  PipelineRun,
  PipelineRunsListOptionalParams,
  PipelineRunsGetOptionalParams,
  PipelineRunsGetResponse,
  PipelineRunsCreateOptionalParams,
  PipelineRunsCreateResponse,
  PipelineRunsDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PipelineRuns. */
export interface PipelineRuns {
  /**
   * Lists all the pipeline runs for the specified container registry.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    registryName: string,
    options?: PipelineRunsListOptionalParams
  ): PagedAsyncIterableIterator<PipelineRun>;
  /**
   * Gets the detailed information for a given pipeline run.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param pipelineRunName The name of the pipeline run.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsGetOptionalParams
  ): Promise<PipelineRunsGetResponse>;
  /**
   * Creates a pipeline run for a container registry with the specified parameters
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param pipelineRunName The name of the pipeline run.
   * @param pipelineRunCreateParameters The parameters for creating a pipeline run.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    pipelineRunCreateParameters: PipelineRun,
    options?: PipelineRunsCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<PipelineRunsCreateResponse>,
      PipelineRunsCreateResponse
    >
  >;
  /**
   * Creates a pipeline run for a container registry with the specified parameters
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param pipelineRunName The name of the pipeline run.
   * @param pipelineRunCreateParameters The parameters for creating a pipeline run.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    pipelineRunCreateParameters: PipelineRun,
    options?: PipelineRunsCreateOptionalParams
  ): Promise<PipelineRunsCreateResponse>;
  /**
   * Deletes a pipeline run from a container registry.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param pipelineRunName The name of the pipeline run.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a pipeline run from a container registry.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName The name of the container registry.
   * @param pipelineRunName The name of the pipeline run.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsDeleteOptionalParams
  ): Promise<void>;
}
