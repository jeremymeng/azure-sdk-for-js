// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayConnectionAccessPolicy,
  connectorGatewayConnectionAccessPolicySerializer,
  connectorGatewayConnectionAccessPolicyDeserializer,
  _ConnectorGatewayConnectionAccessPolicyListResult,
  _connectorGatewayConnectionAccessPolicyListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams,
  ConnectorGatewayConnectionAccessPoliciesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/accessPolicies{?api%2Dversion}",
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

export async function _listByConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayConnectionAccessPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayConnectionAccessPolicyListResultDeserializer(result.body);
}

/** List ConnectorGatewayConnectionAccessPolicy resources by ConnectorGatewayConnection */
export function listByConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  options: ConnectorGatewayConnectionAccessPoliciesListByConnectionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayConnectionAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConnectionSend(context, resourceGroupName, name, connectionName, options),
    _listByConnectionDeserialize,
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
  accessPolicyName: string,
  options: ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
      accessPolicyName: accessPolicyName,
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

/** Delete a ConnectorGatewayConnectionAccessPolicy */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  accessPolicyName: string,
  options: ConnectorGatewayConnectionAccessPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    accessPolicyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  accessPolicyName: string,
  resource: ConnectorGatewayConnectionAccessPolicy,
  options: ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
      accessPolicyName: accessPolicyName,
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
      body: connectorGatewayConnectionAccessPolicySerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayConnectionAccessPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayConnectionAccessPolicyDeserializer(result.body);
}

/** Create a ConnectorGatewayConnectionAccessPolicy */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  accessPolicyName: string,
  resource: ConnectorGatewayConnectionAccessPolicy,
  options: ConnectorGatewayConnectionAccessPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ConnectorGatewayConnectionAccessPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    accessPolicyName,
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
  accessPolicyName: string,
  options: ConnectorGatewayConnectionAccessPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/connections/{connectionName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionName: connectionName,
      accessPolicyName: accessPolicyName,
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
): Promise<ConnectorGatewayConnectionAccessPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayConnectionAccessPolicyDeserializer(result.body);
}

/** Get a ConnectorGatewayConnectionAccessPolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionName: string,
  accessPolicyName: string,
  options: ConnectorGatewayConnectionAccessPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayConnectionAccessPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    connectionName,
    accessPolicyName,
    options,
  );
  return _getDeserialize(result);
}
