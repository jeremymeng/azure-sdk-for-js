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
  GlobalReachConnection,
  GlobalReachConnectionsListOptionalParams,
  GlobalReachConnectionsGetOptionalParams,
  GlobalReachConnectionsGetResponse,
  GlobalReachConnectionsCreateOrUpdateOptionalParams,
  GlobalReachConnectionsCreateOrUpdateResponse,
  GlobalReachConnectionsDeleteOptionalParams,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GlobalReachConnections. */
export interface GlobalReachConnections {
  /**
   * List GlobalReachConnection resources by PrivateCloud
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    privateCloudName: string,
    options?: GlobalReachConnectionsListOptionalParams,
  ): PagedAsyncIterableIterator<GlobalReachConnection>;
  /**
   * Get a GlobalReachConnection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param globalReachConnectionName Name of the global reach connection
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateCloudName: string,
    globalReachConnectionName: string,
    options?: GlobalReachConnectionsGetOptionalParams,
  ): Promise<GlobalReachConnectionsGetResponse>;
  /**
   * Create a GlobalReachConnection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param globalReachConnectionName Name of the global reach connection
   * @param globalReachConnection Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    privateCloudName: string,
    globalReachConnectionName: string,
    globalReachConnection: GlobalReachConnection,
    options?: GlobalReachConnectionsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<GlobalReachConnectionsCreateOrUpdateResponse>,
      GlobalReachConnectionsCreateOrUpdateResponse
    >
  >;
  /**
   * Create a GlobalReachConnection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param globalReachConnectionName Name of the global reach connection
   * @param globalReachConnection Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    privateCloudName: string,
    globalReachConnectionName: string,
    globalReachConnection: GlobalReachConnection,
    options?: GlobalReachConnectionsCreateOrUpdateOptionalParams,
  ): Promise<GlobalReachConnectionsCreateOrUpdateResponse>;
  /**
   * Delete a GlobalReachConnection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param globalReachConnectionName Name of the global reach connection
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    privateCloudName: string,
    globalReachConnectionName: string,
    options?: GlobalReachConnectionsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a GlobalReachConnection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param globalReachConnectionName Name of the global reach connection
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    privateCloudName: string,
    globalReachConnectionName: string,
    options?: GlobalReachConnectionsDeleteOptionalParams,
  ): Promise<void>;
}
