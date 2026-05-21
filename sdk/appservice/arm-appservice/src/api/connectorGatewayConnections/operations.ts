// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayConnection,
  connectorGatewayConnectionSerializer,
  connectorGatewayConnectionDeserializer,
  _ConnectorGatewayConnectionListResult,
  _connectorGatewayConnectionListResultDeserializer,
  ListConsentLinksRequest,
  listConsentLinksRequestSerializer,
  ConsentLinkListResult,
  consentLinkListResultDeserializer,
  ConfirmConsentCodeRequest,
  confirmConsentCodeRequestSerializer,
  ConfirmConsentCodeResponse,
  confirmConsentCodeResponseDeserializer,
  ConnectionKeysResponse,
  connectionKeysResponseDeserializer,
  DynamicInvokeRequest,
  dynamicInvokeRequestSerializer,
  DynamicInvokeResponse,
  dynamicInvokeResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayConnectionsDynamicInvokeOptionalParams,
  ConnectorGatewayConnectionsListConnectionKeysOptionalParams,
  ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams,
  ConnectorGatewayConnectionsListConsentLinksOptionalParams,
  ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams,
  ConnectorGatewayConnectionsDeleteOptionalParams,
  ConnectorGatewayConnectionsCreateOrUpdateOptionalParams,
  ConnectorGatewayConnectionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _dynamicInvokeSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: DynamicInvokeRequest,
  options: ConnectorGatewayConnectionsDynamicInvokeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/dynamicInvoke{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
      body: dynamicInvokeRequestSerializer(body),
    });
}

export async function _dynamicInvokeDeserialize(
  result: PathUncheckedResponse,
): Promise<DynamicInvokeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dynamicInvokeResponseDeserializer(result.body);
}

/** Forwards a dynamic HTTP invocation through the connection. */
export async function dynamicInvoke(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: DynamicInvokeRequest,
  options: ConnectorGatewayConnectionsDynamicInvokeOptionalParams = { requestOptions: {} },
): Promise<DynamicInvokeResponse> {
  const result = await _dynamicInvokeSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    body,
    options,
  );
  return _dynamicInvokeDeserialize(result);
}

export function _listConnectionKeysSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionsListConnectionKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/listConnectionKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listConnectionKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionKeysResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionKeysResponseDeserializer(result.body);
}

/** Lists the access keys for the connection. */
export async function listConnectionKeys(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionsListConnectionKeysOptionalParams = { requestOptions: {} },
): Promise<ConnectionKeysResponse> {
  const result = await _listConnectionKeysSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    options,
  );
  return _listConnectionKeysDeserialize(result);
}

export function _confirmConsentCodeSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: ConfirmConsentCodeRequest,
  options: ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/confirmConsentCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
      body: confirmConsentCodeRequestSerializer(body),
    });
}

export async function _confirmConsentCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfirmConsentCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return confirmConsentCodeResponseDeserializer(result.body);
}

/** Confirms an OAuth consent code returned from the redirect URL. */
export async function confirmConsentCode(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: ConfirmConsentCodeRequest,
  options: ConnectorGatewayConnectionsConfirmConsentCodeOptionalParams = { requestOptions: {} },
): Promise<ConfirmConsentCodeResponse> {
  const result = await _confirmConsentCodeSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    body,
    options,
  );
  return _confirmConsentCodeDeserialize(result);
}

export function _listConsentLinksSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: ListConsentLinksRequest,
  options: ConnectorGatewayConnectionsListConsentLinksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/listConsentLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
      body: listConsentLinksRequestSerializer(body),
    });
}

export async function _listConsentLinksDeserialize(
  result: PathUncheckedResponse,
): Promise<ConsentLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return consentLinkListResultDeserializer(result.body);
}

/** Lists OAuth consent links for the connection. */
export async function listConsentLinks(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  body: ListConsentLinksRequest,
  options: ConnectorGatewayConnectionsListConsentLinksOptionalParams = { requestOptions: {} },
): Promise<ConsentLinkListResult> {
  const result = await _listConsentLinksSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    body,
    options,
  );
  return _listConsentLinksDeserialize(result);
}

export function _listByConnectorGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections{?api%2Dversion}",
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
): Promise<_ConnectorGatewayConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayConnectionListResultDeserializer(result.body);
}

/** List ConnectorGatewayConnection resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayConnectionsListByConnectorGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorGatewayConnection> {
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
  connectionName: string,
  options: ConnectorGatewayConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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

/** Delete a ConnectorGatewayConnection */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, connectionName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  resource: ConnectorGatewayConnection,
  options: ConnectorGatewayConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
      body: connectorGatewayConnectionSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayConnectionDeserializer(result.body);
}

/** Create a ConnectorGatewayConnection */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  resource: ConnectorGatewayConnection,
  options: ConnectorGatewayConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayConnection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
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
): Promise<ConnectorGatewayConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayConnectionDeserializer(result.body);
}

/** Get a ConnectorGatewayConnection */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayConnection> {
  const result = await _getSend(context, resourceGroupName, name, connectionName, options);
  return _getDeserialize(result);
}
