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
  ServiceFabric,
  ServiceFabricsListOptionalParams,
  ServiceFabricsGetOptionalParams,
  ServiceFabricsGetResponse,
  ServiceFabricsCreateOrUpdateOptionalParams,
  ServiceFabricsCreateOrUpdateResponse,
  ServiceFabricsDeleteOptionalParams,
  ServiceFabricFragment,
  ServiceFabricsUpdateOptionalParams,
  ServiceFabricsUpdateResponse,
  ServiceFabricsListApplicableSchedulesOptionalParams,
  ServiceFabricsListApplicableSchedulesResponse,
  ServiceFabricsStartOptionalParams,
  ServiceFabricsStopOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ServiceFabrics. */
export interface ServiceFabrics {
  /**
   * List service fabrics in a given user profile.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    labName: string,
    userName: string,
    options?: ServiceFabricsListOptionalParams
  ): PagedAsyncIterableIterator<ServiceFabric>;
  /**
   * Get service fabric.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsGetOptionalParams
  ): Promise<ServiceFabricsGetResponse>;
  /**
   * Create or replace an existing service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param serviceFabric A Service Fabric.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    serviceFabric: ServiceFabric,
    options?: ServiceFabricsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ServiceFabricsCreateOrUpdateResponse>,
      ServiceFabricsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or replace an existing service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param serviceFabric A Service Fabric.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    serviceFabric: ServiceFabric,
    options?: ServiceFabricsCreateOrUpdateOptionalParams
  ): Promise<ServiceFabricsCreateOrUpdateResponse>;
  /**
   * Delete service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Delete service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Allows modifying tags of service fabrics. All other properties will be ignored.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param serviceFabric A Service Fabric.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    serviceFabric: ServiceFabricFragment,
    options?: ServiceFabricsUpdateOptionalParams
  ): Promise<ServiceFabricsUpdateResponse>;
  /**
   * Lists the applicable start/stop schedules, if any.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  listApplicableSchedules(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsListApplicableSchedulesOptionalParams
  ): Promise<ServiceFabricsListApplicableSchedulesResponse>;
  /**
   * Start a service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginStart(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsStartOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Start a service fabric. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginStartAndWait(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsStartOptionalParams
  ): Promise<void>;
  /**
   * Stop a service fabric This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginStop(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsStopOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Stop a service fabric This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the service fabric.
   * @param options The options parameters.
   */
  beginStopAndWait(
    resourceGroupName: string,
    labName: string,
    userName: string,
    name: string,
    options?: ServiceFabricsStopOptionalParams
  ): Promise<void>;
}
