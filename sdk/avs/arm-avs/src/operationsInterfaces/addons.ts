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
  Addon,
  AddonsListOptionalParams,
  AddonsGetOptionalParams,
  AddonsGetResponse,
  AddonsCreateOrUpdateOptionalParams,
  AddonsCreateOrUpdateResponse,
  AddonsDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Addons. */
export interface Addons {
  /**
   * List Addon resources by PrivateCloud
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    privateCloudName: string,
    options?: AddonsListOptionalParams,
  ): PagedAsyncIterableIterator<Addon>;
  /**
   * Get a Addon
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param addonName Name of the addon.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    options?: AddonsGetOptionalParams,
  ): Promise<AddonsGetResponse>;
  /**
   * Create a Addon
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param addonName Name of the addon.
   * @param addon Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    addon: Addon,
    options?: AddonsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AddonsCreateOrUpdateResponse>,
      AddonsCreateOrUpdateResponse
    >
  >;
  /**
   * Create a Addon
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param addonName Name of the addon.
   * @param addon Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    addon: Addon,
    options?: AddonsCreateOrUpdateOptionalParams,
  ): Promise<AddonsCreateOrUpdateResponse>;
  /**
   * Delete a Addon
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param addonName Name of the addon.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    options?: AddonsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a Addon
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateCloudName Name of the private cloud
   * @param addonName Name of the addon.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    privateCloudName: string,
    addonName: string,
    options?: AddonsDeleteOptionalParams,
  ): Promise<void>;
}
