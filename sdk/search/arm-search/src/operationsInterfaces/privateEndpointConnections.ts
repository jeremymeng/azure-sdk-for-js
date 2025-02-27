/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsListByServiceOptionalParams,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsUpdateResponse,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsDeleteResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PrivateEndpointConnections. */
export interface PrivateEndpointConnections {
  /**
   * Gets a list of all private endpoint connections in the given service.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateEndpointConnectionsListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /**
   * Updates a private endpoint connection to the search service in the given resource group.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param privateEndpointConnectionName The name of the private endpoint connection to the Azure AI
   *                                      Search service with the specified resource group.
   * @param privateEndpointConnection The definition of the private endpoint connection to update.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ): Promise<PrivateEndpointConnectionsUpdateResponse>;
  /**
   * Gets the details of the private endpoint connection to the search service in the given resource
   * group.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param privateEndpointConnectionName The name of the private endpoint connection to the Azure AI
   *                                      Search service with the specified resource group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ): Promise<PrivateEndpointConnectionsGetResponse>;
  /**
   * Disconnects the private endpoint connection and deletes it from the search service.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param privateEndpointConnectionName The name of the private endpoint connection to the Azure AI
   *                                      Search service with the specified resource group.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    searchServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<PrivateEndpointConnectionsDeleteResponse>;
}
