// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnectorGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayCustomConnectors/operations.js";
import {
  ConnectorGatewayCustomConnectorsListByConnectorGatewayOptionalParams,
  ConnectorGatewayCustomConnectorsDeleteOptionalParams,
  ConnectorGatewayCustomConnectorsCreateOrUpdateOptionalParams,
  ConnectorGatewayCustomConnectorsGetOptionalParams,
} from "../../api/connectorGatewayCustomConnectors/options.js";
import { ConnectorGatewayCustomConnector } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayCustomConnectors operations. */
export interface ConnectorGatewayCustomConnectorsOperations {
  /** List ConnectorGatewayCustomConnector resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayCustomConnectorsListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayCustomConnector>;
  /** Delete a ConnectorGatewayCustomConnector */
  delete: (
    resourceGroupName: string,
    name: string,
    customConnectorName: string,
    options?: ConnectorGatewayCustomConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayCustomConnector */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    customConnectorName: string,
    resource: ConnectorGatewayCustomConnector,
    options?: ConnectorGatewayCustomConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayCustomConnector>;
  /** Get a ConnectorGatewayCustomConnector */
  get: (
    resourceGroupName: string,
    name: string,
    customConnectorName: string,
    options?: ConnectorGatewayCustomConnectorsGetOptionalParams,
  ) => Promise<ConnectorGatewayCustomConnector>;
}

function _getConnectorGatewayCustomConnectors(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayCustomConnectorsListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      customConnectorName: string,
      options?: ConnectorGatewayCustomConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, customConnectorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      customConnectorName: string,
      resource: ConnectorGatewayCustomConnector,
      options?: ConnectorGatewayCustomConnectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, customConnectorName, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      customConnectorName: string,
      options?: ConnectorGatewayCustomConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, name, customConnectorName, options),
  };
}

export function _getConnectorGatewayCustomConnectorsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayCustomConnectorsOperations {
  return {
    ..._getConnectorGatewayCustomConnectors(context),
  };
}
