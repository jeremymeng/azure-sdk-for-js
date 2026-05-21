// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnectorGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayMcpServerConfigs/operations.js";
import {
  ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams,
  ConnectorGatewayMcpServerConfigsDeleteOptionalParams,
  ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams,
  ConnectorGatewayMcpServerConfigsGetOptionalParams,
} from "../../api/connectorGatewayMcpServerConfigs/options.js";
import { ConnectorGatewayMcpServerConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayMcpServerConfigs operations. */
export interface ConnectorGatewayMcpServerConfigsOperations {
  /** List ConnectorGatewayMcpServerConfig resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayMcpServerConfig>;
  /** Delete a ConnectorGatewayMcpServerConfig */
  delete: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    options?: ConnectorGatewayMcpServerConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayMcpServerConfig */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    resource: ConnectorGatewayMcpServerConfig,
    options?: ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayMcpServerConfig>;
  /** Get a ConnectorGatewayMcpServerConfig */
  get: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    options?: ConnectorGatewayMcpServerConfigsGetOptionalParams,
  ) => Promise<ConnectorGatewayMcpServerConfig>;
}

function _getConnectorGatewayMcpServerConfigs(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      options?: ConnectorGatewayMcpServerConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, mcpServerConfigName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      resource: ConnectorGatewayMcpServerConfig,
      options?: ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, mcpServerConfigName, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      options?: ConnectorGatewayMcpServerConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, name, mcpServerConfigName, options),
  };
}

export function _getConnectorGatewayMcpServerConfigsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayMcpServerConfigsOperations {
  return {
    ..._getConnectorGatewayMcpServerConfigs(context),
  };
}
