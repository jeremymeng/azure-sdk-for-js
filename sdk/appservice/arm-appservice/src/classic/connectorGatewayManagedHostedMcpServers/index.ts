// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnectorGateway,
  get,
} from "../../api/connectorGatewayManagedHostedMcpServers/operations.js";
import {
  ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedHostedMcpServersGetOptionalParams,
} from "../../api/connectorGatewayManagedHostedMcpServers/options.js";
import { ConnectorGatewayManagedHostedMcpServer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayManagedHostedMcpServers operations. */
export interface ConnectorGatewayManagedHostedMcpServersOperations {
  /** List ConnectorGatewayManagedHostedMcpServer resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayManagedHostedMcpServer>;
  /** Get a ConnectorGatewayManagedHostedMcpServer */
  get: (
    resourceGroupName: string,
    name: string,
    hostedMcpServerName: string,
    options?: ConnectorGatewayManagedHostedMcpServersGetOptionalParams,
  ) => Promise<ConnectorGatewayManagedHostedMcpServer>;
}

function _getConnectorGatewayManagedHostedMcpServers(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    get: (
      resourceGroupName: string,
      name: string,
      hostedMcpServerName: string,
      options?: ConnectorGatewayManagedHostedMcpServersGetOptionalParams,
    ) => get(context, resourceGroupName, name, hostedMcpServerName, options),
  };
}

export function _getConnectorGatewayManagedHostedMcpServersOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayManagedHostedMcpServersOperations {
  return {
    ..._getConnectorGatewayManagedHostedMcpServers(context),
  };
}
