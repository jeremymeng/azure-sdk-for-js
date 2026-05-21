// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  regenerateAccessKey,
  listApiKey,
  listByResourceGroup,
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connectorGateways/operations.js";
import {
  ConnectorGatewaysRegenerateAccessKeyOptionalParams,
  ConnectorGatewaysListApiKeyOptionalParams,
  ConnectorGatewaysListByResourceGroupOptionalParams,
  ConnectorGatewaysListBySubscriptionOptionalParams,
  ConnectorGatewaysDeleteOptionalParams,
  ConnectorGatewaysUpdateOptionalParams,
  ConnectorGatewaysCreateOrUpdateOptionalParams,
  ConnectorGatewaysGetOptionalParams,
} from "../../api/connectorGateways/options.js";
import {
  ConnectorGateway,
  ConnectorGatewayTagsUpdate,
  ListApiKeyRequest,
  ConnectorGatewayKeyDefinition,
  AccessKeyRegenerateActionDefinition,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGateways operations. */
export interface ConnectorGatewaysOperations {
  /** Regenerates the primary or secondary access key on the connector gateway. */
  regenerateAccessKey: (
    resourceGroupName: string,
    name: string,
    body: AccessKeyRegenerateActionDefinition,
    options?: ConnectorGatewaysRegenerateAccessKeyOptionalParams,
  ) => Promise<ConnectorGatewayKeyDefinition>;
  /** Issues an API key for the connector gateway. The key may be scoped to a specific MCP server config or to the entire gateway. */
  listApiKey: (
    resourceGroupName: string,
    name: string,
    body: ListApiKeyRequest,
    options?: ConnectorGatewaysListApiKeyOptionalParams,
  ) => Promise<ConnectorGatewayKeyDefinition>;
  /** List ConnectorGateway resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectorGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGateway>;
  /** List ConnectorGateway resources by subscription ID */
  listBySubscription: (
    options?: ConnectorGatewaysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGateway>;
  /** Delete a ConnectorGateway */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a ConnectorGateway */
  update: (
    resourceGroupName: string,
    name: string,
    properties: ConnectorGatewayTagsUpdate,
    options?: ConnectorGatewaysUpdateOptionalParams,
  ) => Promise<ConnectorGateway>;
  /** Create a ConnectorGateway */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    resource: ConnectorGateway,
    options?: ConnectorGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGateway>;
  /** Get a ConnectorGateway */
  get: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewaysGetOptionalParams,
  ) => Promise<ConnectorGateway>;
}

function _getConnectorGateways(context: WebSiteManagementContext) {
  return {
    regenerateAccessKey: (
      resourceGroupName: string,
      name: string,
      body: AccessKeyRegenerateActionDefinition,
      options?: ConnectorGatewaysRegenerateAccessKeyOptionalParams,
    ) => regenerateAccessKey(context, resourceGroupName, name, body, options),
    listApiKey: (
      resourceGroupName: string,
      name: string,
      body: ListApiKeyRequest,
      options?: ConnectorGatewaysListApiKeyOptionalParams,
    ) => listApiKey(context, resourceGroupName, name, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectorGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: ConnectorGatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    delete: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      properties: ConnectorGatewayTagsUpdate,
      options?: ConnectorGatewaysUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      resource: ConnectorGateway,
      options?: ConnectorGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, resource, options),
    get: (resourceGroupName: string, name: string, options?: ConnectorGatewaysGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getConnectorGatewaysOperations(
  context: WebSiteManagementContext,
): ConnectorGatewaysOperations {
  return {
    ..._getConnectorGateways(context),
  };
}
