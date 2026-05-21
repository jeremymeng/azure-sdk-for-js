// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGateway,
  connectorGatewaySerializer,
  connectorGatewayDeserializer,
  ConnectorGatewayTagsUpdate,
  connectorGatewayTagsUpdateSerializer,
  _ConnectorGatewayListResult,
  _connectorGatewayListResultDeserializer,
  ListApiKeyRequest,
  listApiKeyRequestSerializer,
  ConnectorGatewayKeyDefinition,
  connectorGatewayKeyDefinitionDeserializer,
  AccessKeyRegenerateActionDefinition,
  accessKeyRegenerateActionDefinitionSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewaysRegenerateAccessKeyOptionalParams,
  ConnectorGatewaysListApiKeyOptionalParams,
  ConnectorGatewaysListByResourceGroupOptionalParams,
  ConnectorGatewaysListBySubscriptionOptionalParams,
  ConnectorGatewaysDeleteOptionalParams,
  ConnectorGatewaysUpdateOptionalParams,
  ConnectorGatewaysCreateOrUpdateOptionalParams,
  ConnectorGatewaysGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _regenerateAccessKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  body: AccessKeyRegenerateActionDefinition,
  options: ConnectorGatewaysRegenerateAccessKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/regenerateAccessKey{?api%2Dversion}",
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
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: accessKeyRegenerateActionDefinitionSerializer(body),
    });
}

export async function _regenerateAccessKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayKeyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayKeyDefinitionDeserializer(result.body);
}

/** Regenerates the primary or secondary access key on the connector gateway. */
export async function regenerateAccessKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  body: AccessKeyRegenerateActionDefinition,
  options: ConnectorGatewaysRegenerateAccessKeyOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayKeyDefinition> {
  const result = await _regenerateAccessKeySend(context, resourceGroupName, name, body, options);
  return _regenerateAccessKeyDeserialize(result);
}

export function _listApiKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  body: ListApiKeyRequest,
  options: ConnectorGatewaysListApiKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/listApiKey{?api%2Dversion}",
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
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: listApiKeyRequestSerializer(body),
    });
}

export async function _listApiKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayKeyDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayKeyDefinitionDeserializer(result.body);
}

/** Issues an API key for the connector gateway. The key may be scoped to a specific MCP server config or to the entire gateway. */
export async function listApiKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  body: ListApiKeyRequest,
  options: ConnectorGatewaysListApiKeyOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayKeyDefinition> {
  const result = await _listApiKeySend(context, resourceGroupName, name, body, options);
  return _listApiKeyDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ConnectorGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways{?api%2Dversion,top,skip,maxpagesize,filter,select*,expand*,orderby*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      filter: options?.filter,
      select: !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      expand: !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
      orderby: !options?.orderby
        ? options?.orderby
        : options?.orderby.map((p: any) => {
            return p;
          }),
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayListResultDeserializer(result.body);
}

/** List ConnectorGateway resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConnectorGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConnectorGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/connectorGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayListResultDeserializer(result.body);
}

/** List ConnectorGateway resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ConnectorGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
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
  options: ConnectorGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}{?api%2Dversion}",
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

/** Delete a ConnectorGateway */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewaysDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: ConnectorGatewayTagsUpdate,
  options: ConnectorGatewaysUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}{?api%2Dversion}",
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
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorGatewayTagsUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ConnectorGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayDeserializer(result.body);
}

/** Update a ConnectorGateway */
export async function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: ConnectorGatewayTagsUpdate,
  options: ConnectorGatewaysUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorGateway> {
  const result = await _updateSend(context, resourceGroupName, name, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: ConnectorGateway,
  options: ConnectorGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}{?api%2Dversion}",
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
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorGatewaySerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGateway> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayDeserializer(result.body);
}

/** Create a ConnectorGateway */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: ConnectorGateway,
  options: ConnectorGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorGateway> {
  const result = await _createOrUpdateSend(context, resourceGroupName, name, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConnectorGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayDeserializer(result.body);
}

/** Get a ConnectorGateway */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGateway> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}
