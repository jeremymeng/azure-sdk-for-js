// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByMcpServerConfig,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayMcpServerConfigAccessPolicies/operations.js";
import {
  ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams,
} from "../../api/connectorGatewayMcpServerConfigAccessPolicies/options.js";
import { ConnectorGatewayMcpServerConfigAccessPolicy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayMcpServerConfigAccessPolicies operations. */
export interface ConnectorGatewayMcpServerConfigAccessPoliciesOperations {
  /** List ConnectorGatewayMcpServerConfigAccessPolicy resources by ConnectorGatewayMcpServerConfig */
  listByMcpServerConfig: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    options?: ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayMcpServerConfigAccessPolicy>;
  /** Delete a ConnectorGatewayMcpServerConfigAccessPolicy */
  delete: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    accessPolicyName: string,
    options?: ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayMcpServerConfigAccessPolicy */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    accessPolicyName: string,
    resource: ConnectorGatewayMcpServerConfigAccessPolicy,
    options?: ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayMcpServerConfigAccessPolicy>;
  /** Get a ConnectorGatewayMcpServerConfigAccessPolicy */
  get: (
    resourceGroupName: string,
    name: string,
    mcpServerConfigName: string,
    accessPolicyName: string,
    options?: ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams,
  ) => Promise<ConnectorGatewayMcpServerConfigAccessPolicy>;
}

function _getConnectorGatewayMcpServerConfigAccessPolicies(context: WebSiteManagementContext) {
  return {
    listByMcpServerConfig: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      options?: ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams,
    ) => listByMcpServerConfig(context, resourceGroupName, name, mcpServerConfigName, options),
    delete: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      accessPolicyName: string,
      options?: ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, mcpServerConfigName, accessPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      accessPolicyName: string,
      resource: ConnectorGatewayMcpServerConfigAccessPolicy,
      options?: ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        name,
        mcpServerConfigName,
        accessPolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      name: string,
      mcpServerConfigName: string,
      accessPolicyName: string,
      options?: ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, name, mcpServerConfigName, accessPolicyName, options),
  };
}

export function _getConnectorGatewayMcpServerConfigAccessPoliciesOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayMcpServerConfigAccessPoliciesOperations {
  return {
    ..._getConnectorGatewayMcpServerConfigAccessPolicies(context),
  };
}
