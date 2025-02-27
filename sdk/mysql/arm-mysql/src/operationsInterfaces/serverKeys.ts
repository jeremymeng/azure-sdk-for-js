/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  ServerKey,
  ServerKeysListOptionalParams,
  ServerKeysGetOptionalParams,
  ServerKeysGetResponse,
  ServerKeysCreateOrUpdateOptionalParams,
  ServerKeysCreateOrUpdateResponse,
  ServerKeysDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ServerKeys. */
export interface ServerKeys {
  /**
   * Gets a list of  Server keys.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serverName: string,
    options?: ServerKeysListOptionalParams
  ): PagedAsyncIterableIterator<ServerKey>;
  /**
   * Gets a MySQL Server key.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param keyName The name of the MySQL Server key to be retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    keyName: string,
    options?: ServerKeysGetOptionalParams
  ): Promise<ServerKeysGetResponse>;
  /**
   * Creates or updates a MySQL Server key.
   * @param serverName The name of the server.
   * @param keyName The name of the MySQL Server key to be operated on (updated or created).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param parameters The requested MySQL Server key resource state.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    serverName: string,
    keyName: string,
    resourceGroupName: string,
    parameters: ServerKey,
    options?: ServerKeysCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ServerKeysCreateOrUpdateResponse>,
      ServerKeysCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a MySQL Server key.
   * @param serverName The name of the server.
   * @param keyName The name of the MySQL Server key to be operated on (updated or created).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param parameters The requested MySQL Server key resource state.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    serverName: string,
    keyName: string,
    resourceGroupName: string,
    parameters: ServerKey,
    options?: ServerKeysCreateOrUpdateOptionalParams
  ): Promise<ServerKeysCreateOrUpdateResponse>;
  /**
   * Deletes the MySQL Server key with the given name.
   * @param serverName The name of the server.
   * @param keyName The name of the MySQL Server key to be deleted.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  beginDelete(
    serverName: string,
    keyName: string,
    resourceGroupName: string,
    options?: ServerKeysDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes the MySQL Server key with the given name.
   * @param serverName The name of the server.
   * @param keyName The name of the MySQL Server key to be deleted.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    serverName: string,
    keyName: string,
    resourceGroupName: string,
    options?: ServerKeysDeleteOptionalParams
  ): Promise<void>;
}
