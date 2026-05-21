// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayMcpServerConfig,
  connectorGatewayMcpServerConfigSerializer,
  connectorGatewayMcpServerConfigDeserializer,
  _ConnectorGatewayMcpServerConfigListResult,
  _connectorGatewayMcpServerConfigListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams,
  ConnectorGatewayMcpServerConfigsDeleteOptionalParams,
  ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams,
  ConnectorGatewayMcpServerConfigsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByConnectorGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _listByConnectorGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayMcpServerConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayMcpServerConfigListResultDeserializer(result.body);
}

/** List ConnectorGatewayMcpServerConfig resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayMcpServerConfigsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayMcpServerConfig> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConnectorGatewaySend(context, resourceGroupName, name, options),
    _listByConnectorGatewayDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a ConnectorGatewayMcpServerConfig */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, mcpServerConfigName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  resource: ConnectorGatewayMcpServerConfig,
  options: ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorGatewayMcpServerConfigSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayMcpServerConfig> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayMcpServerConfigDeserializer(result.body);
}

/** Create a ConnectorGatewayMcpServerConfig */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  resource: ConnectorGatewayMcpServerConfig,
  options: ConnectorGatewayMcpServerConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayMcpServerConfig> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    mcpServerConfigName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
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
): Promise<ConnectorGatewayMcpServerConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayMcpServerConfigDeserializer(result.body);
}

/** Get a ConnectorGatewayMcpServerConfig */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayMcpServerConfig> {
  const result = await _getSend(context, resourceGroupName, name, mcpServerConfigName, options);
  return _getDeserialize(result);
}
