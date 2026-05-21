// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayTriggerRun,
  connectorGatewayTriggerRunDeserializer,
  _ConnectorGatewayTriggerRunListResult,
  _connectorGatewayTriggerRunListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams,
  ConnectorGatewayTriggerRunsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByTriggerConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}/runs{?api%2Dversion}",
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

export async function _listByTriggerConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayTriggerRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayTriggerRunListResultDeserializer(result.body);
}

/** List ConnectorGatewayTriggerRun resources by ConnectorGatewayTriggerConfig */
export function listByTriggerConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerRunsListByTriggerConfigOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorGatewayTriggerRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTriggerConfigSend(context, resourceGroupName, name, triggerConfigName, options),
    _listByTriggerConfigDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  runId: string,
  options: ConnectorGatewayTriggerRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}/runs/{runId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      triggerConfigName: triggerConfigName,
      runId: runId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayTriggerRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayTriggerRunDeserializer(result.body);
}

/** Get a ConnectorGatewayTriggerRun */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  runId: string,
  options: ConnectorGatewayTriggerRunsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayTriggerRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    triggerConfigName,
    runId,
    options,
  );
  return _getDeserialize(result);
}
