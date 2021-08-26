/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DeletedServer,
  DeletedServersListOptionalParams,
  DeletedServersListByLocationOptionalParams,
  DeletedServersGetOptionalParams,
  DeletedServersGetResponse,
  DeletedServersRecoverOptionalParams,
  DeletedServersRecoverResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DeletedServers. */
export interface DeletedServers {
  /**
   * Gets a list of all deleted servers in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: DeletedServersListOptionalParams
  ): PagedAsyncIterableIterator<DeletedServer>;
  /**
   * Gets a list of deleted servers for a location.
   * @param locationName The name of the region where the resource is located.
   * @param options The options parameters.
   */
  listByLocation(
    locationName: string,
    options?: DeletedServersListByLocationOptionalParams
  ): PagedAsyncIterableIterator<DeletedServer>;
  /**
   * Gets a deleted server.
   * @param locationName The name of the region where the resource is located.
   * @param deletedServerName The name of the deleted server.
   * @param options The options parameters.
   */
  get(
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersGetOptionalParams
  ): Promise<DeletedServersGetResponse>;
  /**
   * Recovers a deleted server.
   * @param locationName The name of the region where the resource is located.
   * @param deletedServerName The name of the deleted server.
   * @param options The options parameters.
   */
  beginRecover(
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersRecoverOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DeletedServersRecoverResponse>,
      DeletedServersRecoverResponse
    >
  >;
  /**
   * Recovers a deleted server.
   * @param locationName The name of the region where the resource is located.
   * @param deletedServerName The name of the deleted server.
   * @param options The options parameters.
   */
  beginRecoverAndWait(
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersRecoverOptionalParams
  ): Promise<DeletedServersRecoverResponse>;
}
