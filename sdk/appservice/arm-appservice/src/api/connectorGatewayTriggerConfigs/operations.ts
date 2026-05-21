// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayTriggerConfig,
  connectorGatewayTriggerConfigSerializer,
  connectorGatewayTriggerConfigDeserializer,
  _ConnectorGatewayTriggerConfigListResult,
  _connectorGatewayTriggerConfigListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams,
  ConnectorGatewayTriggerConfigsDeleteOptionalParams,
  ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams,
  ConnectorGatewayTriggerConfigsGetOptionalParams,
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
  options: ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs{?api%2Dversion}",
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
): Promise<_ConnectorGatewayTriggerConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayTriggerConfigListResultDeserializer(result.body);
}

/** List ConnectorGatewayTriggerConfig resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayTriggerConfigsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayTriggerConfig> {
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
  triggerConfigName: string,
  options: ConnectorGatewayTriggerConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}{?api%2Dversion}",
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

/** Delete a ConnectorGatewayTriggerConfig */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerConfigsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, triggerConfigName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  resource: ConnectorGatewayTriggerConfig,
  options: ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}{?api%2Dversion}",
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
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorGatewayTriggerConfigSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayTriggerConfig> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayTriggerConfigDeserializer(result.body);
}

/** Create a ConnectorGatewayTriggerConfig */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  resource: ConnectorGatewayTriggerConfig,
  options: ConnectorGatewayTriggerConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayTriggerConfig> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    triggerConfigName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/triggerConfigs/{triggerConfigName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayTriggerConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayTriggerConfigDeserializer(result.body);
}

/** Get a ConnectorGatewayTriggerConfig */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  triggerConfigName: string,
  options: ConnectorGatewayTriggerConfigsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayTriggerConfig> {
  const result = await _getSend(context, resourceGroupName, name, triggerConfigName, options);
  return _getDeserialize(result);
}
