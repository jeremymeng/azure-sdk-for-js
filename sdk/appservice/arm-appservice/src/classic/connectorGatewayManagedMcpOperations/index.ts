// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnectorGateway,
  get,
} from "../../api/connectorGatewayManagedMcpOperations/operations.js";
import {
  ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedMcpOperationsGetOptionalParams,
} from "../../api/connectorGatewayManagedMcpOperations/options.js";
import { ConnectorGatewayManagedMcpOperation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayManagedMcpOperations operations. */
export interface ConnectorGatewayManagedMcpOperationsOperations {
  /** List ConnectorGatewayManagedMcpOperation resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayManagedMcpOperation>;
  /** Get a ConnectorGatewayManagedMcpOperation */
  get: (
    resourceGroupName: string,
    name: string,
    operationName: string,
    options?: ConnectorGatewayManagedMcpOperationsGetOptionalParams,
  ) => Promise<ConnectorGatewayManagedMcpOperation>;
}

function _getConnectorGatewayManagedMcpOperations(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    get: (
      resourceGroupName: string,
      name: string,
      operationName: string,
      options?: ConnectorGatewayManagedMcpOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, name, operationName, options),
  };
}

export function _getConnectorGatewayManagedMcpOperationsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayManagedMcpOperationsOperations {
  return {
    ..._getConnectorGatewayManagedMcpOperations(context),
  };
}
