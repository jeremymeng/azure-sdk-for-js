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
  AccountResource,
  AccountsListByResourceGroupOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsGetOptionalParams,
  AccountsGetResponse,
  AccountsCreateAndUpdateOptionalParams,
  AccountsCreateAndUpdateResponse,
  AccountPatchResource,
  AccountsUpdateOptionalParams,
  AccountsUpdateResponse,
  AccountsDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Accounts. */
export interface Accounts {
  /**
   * Returns list of accounts apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<AccountResource>;
  /**
   * Returns list of accounts belonging to a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: AccountsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<AccountResource>;
  /**
   * Returns account resource for a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    options?: AccountsGetOptionalParams
  ): Promise<AccountsGetResponse>;
  /**
   * Create or update account resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the resource.
   * @param accountResource Account details.
   * @param options The options parameters.
   */
  beginCreateAndUpdate(
    resourceGroupName: string,
    resourceName: string,
    accountResource: AccountResource,
    options?: AccountsCreateAndUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<AccountsCreateAndUpdateResponse>,
      AccountsCreateAndUpdateResponse
    >
  >;
  /**
   * Create or update account resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the resource.
   * @param accountResource Account details.
   * @param options The options parameters.
   */
  beginCreateAndUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    accountResource: AccountResource,
    options?: AccountsCreateAndUpdateOptionalParams
  ): Promise<AccountsCreateAndUpdateResponse>;
  /**
   * Update account details.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the resource.
   * @param accountResource Account patch details.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    accountResource: AccountPatchResource,
    options?: AccountsUpdateOptionalParams
  ): Promise<AccountsUpdateResponse>;
  /**
   * Deletes a account resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the resource.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    resourceName: string,
    options?: AccountsDeleteOptionalParams
  ): Promise<void>;
}
