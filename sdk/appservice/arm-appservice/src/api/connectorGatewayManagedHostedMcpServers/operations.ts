// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayManagedHostedMcpServer,
  connectorGatewayManagedHostedMcpServerDeserializer,
  _ConnectorGatewayManagedHostedMcpServerListResult,
  _connectorGatewayManagedHostedMcpServerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedHostedMcpServersGetOptionalParams,
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
  options: ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedHostedMcpServers{?api%2Dversion}",
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
): Promise<_ConnectorGatewayManagedHostedMcpServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayManagedHostedMcpServerListResultDeserializer(result.body);
}

/** List ConnectorGatewayManagedHostedMcpServer resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayManagedHostedMcpServersListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayManagedHostedMcpServer> {
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

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostedMcpServerName: string,
  options: ConnectorGatewayManagedHostedMcpServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedHostedMcpServers/{hostedMcpServerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hostedMcpServerName: hostedMcpServerName,
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
): Promise<ConnectorGatewayManagedHostedMcpServer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayManagedHostedMcpServerDeserializer(result.body);
}

/** Get a ConnectorGatewayManagedHostedMcpServer */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostedMcpServerName: string,
  options: ConnectorGatewayManagedHostedMcpServersGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayManagedHostedMcpServer> {
  const result = await _getSend(context, resourceGroupName, name, hostedMcpServerName, options);
  return _getDeserialize(result);
}
