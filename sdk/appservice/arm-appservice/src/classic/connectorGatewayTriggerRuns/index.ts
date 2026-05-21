// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { listByTriggerConfig, get } from "../../api/connectorGatewayTriggerRuns/operations.js";
import {
  ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams,
  ConnectorGatewayTriggerRunsGetOptionalParams,
} from "../../api/connectorGatewayTriggerRuns/options.js";
import { ConnectorGatewayTriggerRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorGatewayTriggerRuns operations. */
export interface ConnectorGatewayTriggerRunsOperations {
  /** List ConnectorGatewayTriggerRun resources by ConnectorGatewayTriggerConfig */
  listByTriggerConfig: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    options?: ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorGatewayTriggerRun>;
  /** Get a ConnectorGatewayTriggerRun */
  get: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    runId: string,
    options?: ConnectorGatewayTriggerRunsGetOptionalParams,
  ) => Promise<ConnectorGatewayTriggerRun>;
}

function _getConnectorGatewayTriggerRuns(context: WebSiteManagementContext) {
  return {
    listByTriggerConfig: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      options?: ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams,
    ) => listByTriggerConfig(context, resourceGroupName, name, triggerConfigName, options),
    get: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      runId: string,
      options?: ConnectorGatewayTriggerRunsGetOptionalParams,
    ) => get(context, resourceGroupName, name, triggerConfigName, runId, options),
  };
}

export function _getConnectorGatewayTriggerRunsOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayTriggerRunsOperations {
  return {
    ..._getConnectorGatewayTriggerRuns(context),
  };
}
