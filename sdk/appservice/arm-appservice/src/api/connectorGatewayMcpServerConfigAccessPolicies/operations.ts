// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorGatewayMcpServerConfigAccessPolicy,
  connectorGatewayMcpServerConfigAccessPolicySerializer,
  connectorGatewayMcpServerConfigAccessPolicyDeserializer,
  _ConnectorGatewayMcpServerConfigAccessPolicyListResult,
  _connectorGatewayMcpServerConfigAccessPolicyListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams,
  ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByMcpServerConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}/accessPolicies{?api%2Dversion}",
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

export async function _listByMcpServerConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorGatewayMcpServerConfigAccessPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectorGatewayMcpServerConfigAccessPolicyListResultDeserializer(result.body);
}

/** List ConnectorGatewayMcpServerConfigAccessPolicy resources by ConnectorGatewayMcpServerConfig */
export function listByMcpServerConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesListByMcpServerConfigOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConnectorGatewayMcpServerConfigAccessPolicy> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByMcpServerConfigSend(context, resourceGroupName, name, mcpServerConfigName, options),
    _listByMcpServerConfigDeserialize,
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
  accessPolicyName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
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

/** Delete a ConnectorGatewayMcpServerConfigAccessPolicy */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  accessPolicyName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    name,
    mcpServerConfigName,
    accessPolicyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  accessPolicyName: string,
  resource: ConnectorGatewayMcpServerConfigAccessPolicy,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
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
      body: connectorGatewayMcpServerConfigAccessPolicySerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectorGatewayMcpServerConfigAccessPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayMcpServerConfigAccessPolicyDeserializer(result.body);
}

/** Create a ConnectorGatewayMcpServerConfigAccessPolicy */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  accessPolicyName: string,
  resource: ConnectorGatewayMcpServerConfigAccessPolicy,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ConnectorGatewayMcpServerConfigAccessPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    mcpServerConfigName,
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
  mcpServerConfigName: string,
  accessPolicyName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/connectorGateways/{name}/mcpServerConfigs/{mcpServerConfigName}/accessPolicies/{accessPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      mcpServerConfigName: mcpServerConfigName,
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
): Promise<ConnectorGatewayMcpServerConfigAccessPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectorGatewayMcpServerConfigAccessPolicyDeserializer(result.body);
}

/** Get a ConnectorGatewayMcpServerConfigAccessPolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  mcpServerConfigName: string,
  accessPolicyName: string,
  options: ConnectorGatewayMcpServerConfigAccessPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ConnectorGatewayMcpServerConfigAccessPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    mcpServerConfigName,
    accessPolicyName,
    options,
  );
  return _getDeserialize(result);
}
