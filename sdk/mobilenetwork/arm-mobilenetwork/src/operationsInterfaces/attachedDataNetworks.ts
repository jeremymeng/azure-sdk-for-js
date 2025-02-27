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
  AttachedDataNetwork,
  AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams,
  AttachedDataNetworksDeleteOptionalParams,
  AttachedDataNetworksGetOptionalParams,
  AttachedDataNetworksGetResponse,
  AttachedDataNetworksCreateOrUpdateOptionalParams,
  AttachedDataNetworksCreateOrUpdateResponse,
  TagsObject,
  AttachedDataNetworksUpdateTagsOptionalParams,
  AttachedDataNetworksUpdateTagsResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AttachedDataNetworks. */
export interface AttachedDataNetworks {
  /**
   * Gets all the attached data networks associated with a packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param options The options parameters.
   */
  listByPacketCoreDataPlane(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams,
  ): PagedAsyncIterableIterator<AttachedDataNetwork>;
  /**
   * Deletes the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets information about the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksGetOptionalParams,
  ): Promise<AttachedDataNetworksGetResponse>;
  /**
   * Creates or updates an attached data network. Must be created in the same location as its parent
   * packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to the create or update attached data network operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: AttachedDataNetwork,
    options?: AttachedDataNetworksCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AttachedDataNetworksCreateOrUpdateResponse>,
      AttachedDataNetworksCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates an attached data network. Must be created in the same location as its parent
   * packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to the create or update attached data network operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: AttachedDataNetwork,
    options?: AttachedDataNetworksCreateOrUpdateOptionalParams,
  ): Promise<AttachedDataNetworksCreateOrUpdateResponse>;
  /**
   * Updates an attached data network tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to update attached data network tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: TagsObject,
    options?: AttachedDataNetworksUpdateTagsOptionalParams,
  ): Promise<AttachedDataNetworksUpdateTagsResponse>;
}
