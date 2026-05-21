// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayManagedMcpOperation,
  connectorGatewayManagedMcpOperationDeserializer,
  _ConnectorGatewayManagedMcpOperationListResult,
  _connectorGatewayManagedMcpOperationListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedMcpOperationsGetOptionalParams,
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
  options: ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedMcpOperations{?api%2Dversion}",
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
): Promise<_ConnectorGatewayManagedMcpOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayManagedMcpOperationListResultDeserializer(result.body);
}

/** List ConnectorGatewayManagedMcpOperation resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayManagedMcpOperationsListByConnectorGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayManagedMcpOperation> {
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
  operationName: string,
  options: ConnectorGatewayManagedMcpOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedMcpOperations/{operationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      operationName: operationName,
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
): Promise<ConnectorGatewayManagedMcpOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayManagedMcpOperationDeserializer(result.body);
}

/** Get a ConnectorGatewayManagedMcpOperation */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationName: string,
  options: ConnectorGatewayManagedMcpOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayManagedMcpOperation> {
  const result = await _getSend(context, resourceGroupName, name, operationName, options);
  return _getDeserialize(result);
}
