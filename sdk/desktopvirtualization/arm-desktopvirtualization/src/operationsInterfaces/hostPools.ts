/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  HostPool,
  HostPoolsListByResourceGroupOptionalParams,
  HostPoolsListOptionalParams,
  HostPoolsGetOptionalParams,
  HostPoolsGetResponse,
  HostPoolsCreateOrUpdateOptionalParams,
  HostPoolsCreateOrUpdateResponse,
  HostPoolsDeleteOptionalParams,
  HostPoolsUpdateOptionalParams,
  HostPoolsUpdateResponse,
  HostPoolsRetrieveRegistrationTokenOptionalParams,
  HostPoolsRetrieveRegistrationTokenResponse,
  HostPoolsListRegistrationTokensOptionalParams,
  HostPoolsListRegistrationTokensResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a HostPools. */
export interface HostPools {
  /**
   * List hostPools.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: HostPoolsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<HostPool>;
  /**
   * List hostPools in subscription.
   * @param options The options parameters.
   */
  list(
    options?: HostPoolsListOptionalParams,
  ): PagedAsyncIterableIterator<HostPool>;
  /**
   * Get a host pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    hostPoolName: string,
    options?: HostPoolsGetOptionalParams,
  ): Promise<HostPoolsGetResponse>;
  /**
   * Create or update a host pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param hostPool Object containing HostPool definitions.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    hostPoolName: string,
    hostPool: HostPool,
    options?: HostPoolsCreateOrUpdateOptionalParams,
  ): Promise<HostPoolsCreateOrUpdateResponse>;
  /**
   * Remove a host pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    hostPoolName: string,
    options?: HostPoolsDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Update a host pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    hostPoolName: string,
    options?: HostPoolsUpdateOptionalParams,
  ): Promise<HostPoolsUpdateResponse>;
  /**
   * Registration token of the host pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param options The options parameters.
   */
  retrieveRegistrationToken(
    resourceGroupName: string,
    hostPoolName: string,
    options?: HostPoolsRetrieveRegistrationTokenOptionalParams,
  ): Promise<HostPoolsRetrieveRegistrationTokenResponse>;
  /**
   * Operation to list the RegistrationTokens associated with the HostPool
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param options The options parameters.
   */
  listRegistrationTokens(
    resourceGroupName: string,
    hostPoolName: string,
    options?: HostPoolsListRegistrationTokensOptionalParams,
  ): Promise<HostPoolsListRegistrationTokensResponse>;
}
