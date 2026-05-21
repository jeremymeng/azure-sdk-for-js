// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayManagedApi,
  connectorGatewayManagedApiDeserializer,
  _ConnectorGatewayManagedApiListResult,
  _connectorGatewayManagedApiListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams,
  ConnectorGatewayManagedApisGetOptionalParams,
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
  options: ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedApis{?api%2Dversion}",
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
): Promise<_ConnectorGatewayManagedApiListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayManagedApiListResultDeserializer(result.body);
}

/** List ConnectorGatewayManagedApi resources by ConnectorGateway */
export function listByConnectorGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ConnectorGatewayManagedApisListByConnectorGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectorGatewayManagedApi> {
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
  apiName: string,
  options: ConnectorGatewayManagedApisGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/managedApis/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      apiName: apiName,
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
): Promise<ConnectorGatewayManagedApi> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayManagedApiDeserializer(result.body);
}

/** Get a ConnectorGatewayManagedApi */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  apiName: string,
  options: ConnectorGatewayManagedApisGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayManagedApi> {
  const result = await _getSend(context, resourceGroupName, name, apiName, options);
  return _getDeserialize(result);
}
