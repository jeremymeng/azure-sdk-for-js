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
  ServerDevOpsAuditingSettings,
  ServerDevOpsAuditSettingsListByServerOptionalParams,
  ServerDevOpsAuditSettingsGetOptionalParams,
  ServerDevOpsAuditSettingsGetResponse,
  ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ServerDevOpsAuditSettingsCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ServerDevOpsAuditSettings. */
export interface ServerDevOpsAuditSettings {
  /**
   * Lists DevOps audit settings of a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams
  ): PagedAsyncIterableIterator<ServerDevOpsAuditingSettings>;
  /**
   * Gets a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    options?: ServerDevOpsAuditSettingsGetOptionalParams
  ): Promise<ServerDevOpsAuditSettingsGetResponse>;
  /**
   * Creates or updates a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param parameters Properties of DevOps audit settings
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ServerDevOpsAuditSettingsCreateOrUpdateResponse>,
      ServerDevOpsAuditSettingsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param parameters Properties of DevOps audit settings
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams
  ): Promise<ServerDevOpsAuditSettingsCreateOrUpdateResponse>;
}
