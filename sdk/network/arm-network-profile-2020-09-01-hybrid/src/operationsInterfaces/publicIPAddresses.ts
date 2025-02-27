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
  PublicIPAddress,
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesGetOptionalParams,
  PublicIPAddressesGetResponse,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesCreateOrUpdateResponse,
  TagsObject,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesUpdateTagsResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PublicIPAddresses. */
export interface PublicIPAddresses {
  /**
   * Gets all the public IP addresses in a subscription.
   * @param options The options parameters.
   */
  listAll(
    options?: PublicIPAddressesListAllOptionalParams
  ): PagedAsyncIterableIterator<PublicIPAddress>;
  /**
   * Gets all public IP addresses in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: PublicIPAddressesListOptionalParams
  ): PagedAsyncIterableIterator<PublicIPAddress>;
  /**
   * Deletes the specified public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the subnet.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes the specified public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the subnet.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams
  ): Promise<void>;
  /**
   * Gets the specified public IP address in a specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the subnet.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetOptionalParams
  ): Promise<PublicIPAddressesGetResponse>;
  /**
   * Creates or updates a static or dynamic public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to the create or update public IP address operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<PublicIPAddressesCreateOrUpdateResponse>,
      PublicIPAddressesCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a static or dynamic public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to the create or update public IP address operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams
  ): Promise<PublicIPAddressesCreateOrUpdateResponse>;
  /**
   * Updates public IP address tags.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to update public IP address tags.
   * @param options The options parameters.
   */
  beginUpdateTags(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: TagsObject,
    options?: PublicIPAddressesUpdateTagsOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<PublicIPAddressesUpdateTagsResponse>,
      PublicIPAddressesUpdateTagsResponse
    >
  >;
  /**
   * Updates public IP address tags.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to update public IP address tags.
   * @param options The options parameters.
   */
  beginUpdateTagsAndWait(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: TagsObject,
    options?: PublicIPAddressesUpdateTagsOptionalParams
  ): Promise<PublicIPAddressesUpdateTagsResponse>;
}
