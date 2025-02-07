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
  DatadogApiKey,
  MonitorsListApiKeysOptionalParams,
  DatadogHost,
  MonitorsListHostsOptionalParams,
  LinkedResource,
  MonitorsListLinkedResourcesOptionalParams,
  MonitoredResource,
  MonitorsListMonitoredResourcesOptionalParams,
  DatadogMonitorResource,
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsGetDefaultKeyOptionalParams,
  MonitorsGetDefaultKeyResponse,
  MonitorsSetDefaultKeyOptionalParams,
  MonitorsGetOptionalParams,
  MonitorsGetResponse,
  MonitorsCreateOptionalParams,
  MonitorsCreateResponse,
  MonitorsUpdateOptionalParams,
  MonitorsUpdateResponse,
  MonitorsDeleteOptionalParams,
  MonitorsRefreshSetPasswordLinkOptionalParams,
  MonitorsRefreshSetPasswordLinkResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Monitors. */
export interface Monitors {
  /**
   * List the api keys for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  listApiKeys(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListApiKeysOptionalParams
  ): PagedAsyncIterableIterator<DatadogApiKey>;
  /**
   * List the hosts for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  listHosts(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListHostsOptionalParams
  ): PagedAsyncIterableIterator<DatadogHost>;
  /**
   * List all Azure resources associated to the same Datadog organization as the target resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  listLinkedResources(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListLinkedResourcesOptionalParams
  ): PagedAsyncIterableIterator<LinkedResource>;
  /**
   * List the resources currently being monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  listMonitoredResources(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListMonitoredResourcesOptionalParams
  ): PagedAsyncIterableIterator<MonitoredResource>;
  /**
   * List all monitors under the specified subscription.
   * @param options The options parameters.
   */
  list(
    options?: MonitorsListOptionalParams
  ): PagedAsyncIterableIterator<DatadogMonitorResource>;
  /**
   * List all monitors under the specified resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: MonitorsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<DatadogMonitorResource>;
  /**
   * Get the default api key.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  getDefaultKey(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetDefaultKeyOptionalParams
  ): Promise<MonitorsGetDefaultKeyResponse>;
  /**
   * Set the default api key.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  setDefaultKey(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsSetDefaultKeyOptionalParams
  ): Promise<void>;
  /**
   * Get the properties of a specific monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetOptionalParams
  ): Promise<MonitorsGetResponse>;
  /**
   * Create a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitorsCreateResponse>,
      MonitorsCreateResponse
    >
  >;
  /**
   * Create a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams
  ): Promise<MonitorsCreateResponse>;
  /**
   * Update a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitorsUpdateResponse>,
      MonitorsUpdateResponse
    >
  >;
  /**
   * Update a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams
  ): Promise<MonitorsUpdateResponse>;
  /**
   * Delete a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Refresh the set password link and return a latest one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  refreshSetPasswordLink(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsRefreshSetPasswordLinkOptionalParams
  ): Promise<MonitorsRefreshSetPasswordLinkResponse>;
}
