// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { listByConnectorGateway, get } from "../../api/connectorGatewayManagedApis/operations.js";
import {
  ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedApisGetOptionalParams,
} from "../../api/connectorGatewayManagedApis/options.js";
import { ConnectorGatewayManagedApi } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayManagedApis operations. */
export interface ConnectorGatewayManagedApisOperations {
  /** List ConnectorGatewayManagedApi resources by ConnectorGateway */
  listByConnectorGateway: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayManagedApi>;
  /** Get a ConnectorGatewayManagedApi */
  get: (
    resourceGroupName: string,
    name: string,
    apiName: string,
    options?: ConnectorGatewayManagedApisGetOptionalParams,
  ) => Promise<ConnectorGatewayManagedApi>;
}

function _getConnectorGatewayManagedApis(context: WebSiteManagementContext) {
  return {
    listByConnectorGateway: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams,
    ) => listByConnectorGateway(context, resourceGroupName, name, options),
    get: (
      resourceGroupName: string,
      name: string,
      apiName: string,
      options?: ConnectorGatewayManagedApisGetOptionalParams,
    ) => get(context, resourceGroupName, name, apiName, options),
  };
}

export function _getConnectorGatewayManagedApisOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayManagedApisOperations {
  return {
    ..._getConnectorGatewayManagedApis(context),
  };
}
