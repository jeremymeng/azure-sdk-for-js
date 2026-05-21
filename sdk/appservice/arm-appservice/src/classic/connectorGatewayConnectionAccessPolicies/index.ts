// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnection,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayConnectionAccessPolicies/operations.js";
import {
  ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesGetOptionalParams,
} from "../../api/connectorGatewayConnectionAccessPolicies/options.js";
import { ConnectorGatewayConnectionAccessPolicy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayConnectionAccessPolicies operations. */
export interface ConnectorGatewayConnectionAccessPoliciesOperations {
  /** List ConnectorGatewayConnectionAccessPolicy resources by ConnectorGatewayConnection */
  listByConnection: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    options?: ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayConnectionAccessPolicy>;
  /** Delete a ConnectorGatewayConnectionAccessPolicy */
  delete: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    accessPolicyName: string,
    options?: ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayConnectionAccessPolicy */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    accessPolicyName: string,
    resource: ConnectorGatewayConnectionAccessPolicy,
    options?: ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayConnectionAccessPolicy>;
  /** Get a ConnectorGatewayConnectionAccessPolicy */
  get: (
    resourceGroupName: string,
    name: string,
    connectionName: string,
    accessPolicyName: string,
    options?: ConnectorGatewayConnectionAccessPoliciesGetOptionalParams,
  ) => Promise<ConnectorGatewayConnectionAccessPolicy>;
}

function _getConnectorGatewayConnectionAccessPolicies(context: WebSiteManagementContext) {
  return {
    listByConnection: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      options?: ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams,
    ) => listByConnection(context, resourceGroupName, name, connectionName, options),
    delete: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      accessPolicyName: string,
      options?: ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, connectionName, accessPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      accessPolicyName: string,
      resource: ConnectorGatewayConnectionAccessPolicy,
      options?: ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        name,
        connectionName,
        accessPolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      name: string,
      connectionName: string,
      accessPolicyName: string,
      options?: ConnectorGatewayConnectionAccessPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, name, connectionName, accessPolicyName, options),
  };
}

export function _getConnectorGatewayConnectionAccessPoliciesOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayConnectionAccessPoliciesOperations {
  return {
    ..._getConnectorGatewayConnectionAccessPolicies(context),
  };
}
