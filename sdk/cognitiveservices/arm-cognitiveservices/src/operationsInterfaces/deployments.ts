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
  Deployment,
  DeploymentsListOptionalParams,
  DeploymentsGetOptionalParams,
  DeploymentsGetResponse,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsCreateOrUpdateResponse,
  DeploymentsDeleteOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Deployments. */
export interface Deployments {
  /**
   * Gets the deployments associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    accountName: string,
    options?: DeploymentsListOptionalParams
  ): PagedAsyncIterableIterator<Deployment>;
  /**
   * Gets the specified deployments associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param deploymentName The name of the deployment associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams
  ): Promise<DeploymentsGetResponse>;
  /**
   * Update the state of specified deployments associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param deploymentName The name of the deployment associated with the Cognitive Services Account
   * @param deployment The deployment properties.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<DeploymentsCreateOrUpdateResponse>,
      DeploymentsCreateOrUpdateResponse
    >
  >;
  /**
   * Update the state of specified deployments associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param deploymentName The name of the deployment associated with the Cognitive Services Account
   * @param deployment The deployment properties.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams
  ): Promise<DeploymentsCreateOrUpdateResponse>;
  /**
   * Deletes the specified deployment associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param deploymentName The name of the deployment associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the specified deployment associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param deploymentName The name of the deployment associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams
  ): Promise<void>;
}
