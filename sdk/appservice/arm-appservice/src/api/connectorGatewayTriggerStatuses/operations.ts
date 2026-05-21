// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayTriggerStatus,
  connectorGatewayTriggerStatusDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ConnectorGatewayTriggerStatusesGetLatestOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getLatestSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerStatusesGetLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}/triggerStatuses/latest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      triggerConfigName: triggerConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayTriggerStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayTriggerStatusDeserializer(result.body);
}

/** Get a ConnectorGatewayTriggerStatus */
export async function getLatest(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerStatusesGetLatestOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayTriggerStatus> {
  const result = await _getLatestSend(context, resourceGroupName, name, triggerConfigName, options);
  return _getLatestDeserialize(result);
}
