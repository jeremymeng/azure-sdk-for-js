// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listByConnectorGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorGatewayTriggerConfigs/operations.js";
import {
  ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams,
  ConnectorGatewayTriggerConfigsDeleteOptionalParams,
  ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams,
  ConnectorGatewayTriggerConfigsGetOptionalParams,
} from "../../api/connectorGatewayTriggerConfigs/options.js";
import { ConnectorGatewayTriggerConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayTriggerConfigs operations. */
export interface ConnectorGatewayTriggerConfigsOperations {
  /** List ConnectorGatewayTriggerConfig resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayTriggerConfig>;
  /** Delete a ConnectorGatewayTriggerConfig */
  delete: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    options?: ConnectorGatewayTriggerConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a ConnectorGatewayTriggerConfig */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    resource: ConnectorGatewayTriggerConfig,
    options?: ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorGatewayTriggerConfig>;
  /** Get a ConnectorGatewayTriggerConfig */
  get: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    options?: ConnectorGatewayTriggerConfigsGetOptionalParams,
  ) => Promise<ConnectorGatewayTriggerConfig>;
}

function _getConnectorGatewayTriggerConfigs(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      options?: ConnectorGatewayTriggerConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, triggerConfigName, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      resource: ConnectorGatewayTriggerConfig,
      options?: ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, triggerConfigName, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      options?: ConnectorGatewayTriggerConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, name, triggerConfigName, options),
  };
}

export function _getConnectorGatewayTriggerConfigsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayTriggerConfigsOperations {
  return {
    ..._getConnectorGatewayTriggerConfigs(context),
  };
}
