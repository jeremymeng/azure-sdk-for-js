/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PrivateEndpointConnectionResource,
  PrivateEndPointConnectionsListByFactoryOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PrivateEndPointConnections. */
export interface PrivateEndPointConnections {
  /**
   * Lists Private endpoint connections
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param options The options parameters.
   */
  listByFactory(
    resourceGroupName: string,
    factoryName: string,
    options?: PrivateEndPointConnectionsListByFactoryOptionalParams,
  ): PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
}
