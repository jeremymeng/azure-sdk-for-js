/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OutboundNetworkDependenciesEndpointsListOptionalParams,
  OutboundNetworkDependenciesEndpointsListResponse
} from "../models/index.js";

/** Interface representing a OutboundNetworkDependenciesEndpoints. */
export interface OutboundNetworkDependenciesEndpoints {
  /**
   * Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You
   * must configure outbound access with these endpoints. For more information, see
   * https://docs.microsoft.com/azure/databricks/administration-guide/cloud-configurations/azure/udr
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    workspaceName: string,
    options?: OutboundNetworkDependenciesEndpointsListOptionalParams
  ): Promise<OutboundNetworkDependenciesEndpointsListResponse>;
}
