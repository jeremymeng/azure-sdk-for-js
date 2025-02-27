/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Dashboard,
  DashboardsListByResourceGroupOptionalParams,
  DashboardsListBySubscriptionOptionalParams,
  DashboardsCreateOrUpdateOptionalParams,
  DashboardsCreateOrUpdateResponse,
  DashboardsDeleteOptionalParams,
  DashboardsGetOptionalParams,
  DashboardsGetResponse,
  PatchableDashboard,
  DashboardsUpdateOptionalParams,
  DashboardsUpdateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Dashboards. */
export interface Dashboards {
  /**
   * Gets all the Dashboards within a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: DashboardsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Dashboard>;
  /**
   * Gets all the dashboards within a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: DashboardsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Dashboard>;
  /**
   * Creates or updates a Dashboard.
   * @param resourceGroupName The name of the resource group.
   * @param dashboardName The name of the dashboard.
   * @param dashboard The parameters required to create or update a dashboard.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    dashboardName: string,
    dashboard: Dashboard,
    options?: DashboardsCreateOrUpdateOptionalParams
  ): Promise<DashboardsCreateOrUpdateResponse>;
  /**
   * Deletes the Dashboard.
   * @param resourceGroupName The name of the resource group.
   * @param dashboardName The name of the dashboard.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    dashboardName: string,
    options?: DashboardsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Gets the Dashboard.
   * @param resourceGroupName The name of the resource group.
   * @param dashboardName The name of the dashboard.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dashboardName: string,
    options?: DashboardsGetOptionalParams
  ): Promise<DashboardsGetResponse>;
  /**
   * Updates an existing Dashboard.
   * @param resourceGroupName The name of the resource group.
   * @param dashboardName The name of the dashboard.
   * @param dashboard The updatable fields of a Dashboard.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    dashboardName: string,
    dashboard: PatchableDashboard,
    options?: DashboardsUpdateOptionalParams
  ): Promise<DashboardsUpdateResponse>;
}
