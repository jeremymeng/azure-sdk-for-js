// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { getLatest } from "../../api/connectorGatewayTriggerStatuses/operations.js";
import { ConnectorGatewayTriggerStatusesGetLatestOptionalParams } from "../../api/connectorGatewayTriggerStatuses/options.js";
import { ConnectorGatewayTriggerStatus } from "../../models/models.js";

/** Interface representing a ConnectorGatewayTriggerStatuses operations. */
export interface ConnectorGatewayTriggerStatusesOperations {
  /** Get a ConnectorGatewayTriggerStatus */
  getLatest: (
    resourceGroupName: string,
    name: string,
    triggerConfigName: string,
    options?: ConnectorGatewayTriggerStatusesGetLatestOptionalParams,
  ) => Promise<ConnectorGatewayTriggerStatus>;
}

function _getConnectorGatewayTriggerStatuses(context: WebSiteManagementContext) {
  return {
    getLatest: (
      resourceGroupName: string,
      name: string,
      triggerConfigName: string,
      options?: ConnectorGatewayTriggerStatusesGetLatestOptionalParams,
    ) => getLatest(context, resourceGroupName, name, triggerConfigName, options),
  };
}

export function _getConnectorGatewayTriggerStatusesOperations(
  context: WebSiteManagementContext,
): ConnectorGatewayTriggerStatusesOperations {
  return {
    ..._getConnectorGatewayTriggerStatuses(context),
  };
}
