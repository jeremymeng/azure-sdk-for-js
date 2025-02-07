/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsListResponse,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnection,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
} from "../models/index.js";

/** Interface representing a PrivateEndpointConnections. */
export interface PrivateEndpointConnections {
  /**
   * Gets the private endpoint connections associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    accountName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ): Promise<PrivateEndpointConnectionsListResponse>;
  /**
   * Gets the specified private endpoint connection associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Cognitive Services Account
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ): Promise<PrivateEndpointConnectionsGetResponse>;
  /**
   * Update the state of specified private endpoint connection associated with the Cognitive Services
   * account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Cognitive Services Account
   * @param properties The private endpoint connection properties.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionsCreateOrUpdateResponse>,
      PrivateEndpointConnectionsCreateOrUpdateResponse
    >
  >;
  /**
   * Update the state of specified private endpoint connection associated with the Cognitive Services
   * account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Cognitive Services Account
   * @param properties The private endpoint connection properties.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ): Promise<PrivateEndpointConnectionsCreateOrUpdateResponse>;
  /**
   * Deletes the specified private endpoint connection associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Cognitive Services Account
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the specified private endpoint connection associated with the Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Cognitive Services Account
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<void>;
}
