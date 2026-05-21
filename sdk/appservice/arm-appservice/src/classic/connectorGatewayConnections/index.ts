// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  dynamicInvoke,
  listConnectionKeys,
  confirmConsentCode,
  listConsentLinks,
  listByConnectorGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayConnections/operations.js";
import {
  ConnectorGatewayConnectionsDynamicInvokeOptionalParams,
  ConnectorGatewayConnectionsListConnectionKeysOptionalParams,
  ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams,
  ConnectorGatewayConnectionsListConsentLinksOptionalParams,
  ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams,
  ConnectorGatewayConnectionsDeleteOptionalParams,
  ConnectorGatewayConnectionsCreateOrUpdateOptionalParams,
  ConnectorGatewayConnectionsGetOptionalParams,
} from "../../api/connectorGatewayConnections/options.js";
import {
  ConnectorGatewayConnection,
  ListConsentLinksRequest,
  ConsentLinkListResult,
  ConfirmConsentCodeRequest,
  ConfirmConsentCodeResponse,
  ConnectionKeysResponse,
  DynamicInvokeRequest,
  DynamicInvokeResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayConnections operations. */
export interface ConnectorGatewayConnectionsOperations {
  /** Forwards a dynamic HTTP invocation through the connection. */
  dynamicInvoke: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    body: DynamicInvokeRequest,
    options?: ConnectorGatewayConnectionsDynamicInvokeOptionalParams,
  ) => Promise<DynamicInvokeResponse>;
  /** Lists the access keys for the connection. */
  listConnectionKeys: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    options?: ConnectorGatewayConnectionsListConnectionKeysOptionalParams,
  ) => Promise<ConnectionKeysResponse>;
  /** Confirms an OAuth consent code returned from the redirect URL. */
  confirmConsentCode: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    body: ConfirmConsentCodeRequest,
    options?: ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams,
  ) => Promise<ConfirmConsentCodeResponse>;
  /** Lists OAuth consent links for the connection. */
  listConsentLinks: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    body: ListConsentLinksRequest,
    options?: ConnectorGatewayConnectionsListConsentLinksOptionalParams,
  ) => Promise<ConsentLinkListResult>;
  /** List ConnectorGatewayConnection resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayConnection>;
  /** Delete a ConnectorGatewayConnection */
  delete: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    options?: ConnectorGatewayConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayConnection */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    resource: ConnectorGatewayConnection,
    options?: ConnectorGatewayConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayConnection>;
  /** Get a ConnectorGatewayConnection */
  get: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    options?: ConnectorGatewayConnectionsGetOptionalParams,
  ) => Promise<ConnectorGatewayConnection>;
}

function _getConnectorGatewayConnections(context: WebSiteManagementContext) {
  return {
    dynamicInvoke: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      body: DynamicInvokeRequest,
      options?: ConnectorGatewayConnectionsDynamicInvokeOptionalParams,
    ) => dynamicInvoke(context, resourceGroupName, name, connectionName, body, options),
    listConnectionKeys: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      options?: ConnectorGatewayConnectionsListConnectionKeysOptionalParams,
    ) => listConnectionKeys(context, resourceGroupName, name, connectionName, options),
    confirmConsentCode: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      body: ConfirmConsentCodeRequest,
      options?: ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams,
    ) => confirmConsentCode(context, resourceGroupName, name, connectionName, body, options),
    listConsentLinks: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      body: ListConsentLinksRequest,
      options?: ConnectorGatewayConnectionsListConsentLinksOptionalParams,
    ) => listConsentLinks(context, resourceGroupName, name, connectionName, body, options),
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      options?: ConnectorGatewayConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, connectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      resource: ConnectorGatewayConnection,
      options?: ConnectorGatewayConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, connectionName, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      options?: ConnectorGatewayConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, name, connectionName, options),
  };
}

export function _getConnectorGatewayConnectionsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayConnectionsOperations {
  return {
    ..._getConnectorGatewayConnections(context),
  };
}
