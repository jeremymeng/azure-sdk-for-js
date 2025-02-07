/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { PrivateEndpointConnections } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { RedisManagementClient } from "../redisManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsListResponse,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsPutResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PrivateEndpointConnections operations. */
export class PrivateEndpointConnectionsImpl
  implements PrivateEndpointConnections
{
  private readonly client: RedisManagementClient;

  /**
   * Initialize a new instance of the class PrivateEndpointConnections class.
   * @param client Reference to the service client
   */
  constructor(client: RedisManagementClient) {
    this.client = client;
  }

  /**
   * List all the private endpoint connections associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ): PagedAsyncIterableIterator<PrivateEndpointConnection> {
    const iter = this.listPagingAll(resourceGroupName, cacheName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(
          resourceGroupName,
          cacheName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<PrivateEndpointConnection[]> {
    let result: PrivateEndpointConnectionsListResponse;
    result = await this._list(resourceGroupName, cacheName, options);
    yield result.value || [];
  }

  private async *listPagingAll(
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ): AsyncIterableIterator<PrivateEndpointConnection> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      cacheName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List all the private endpoint connections associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ): Promise<PrivateEndpointConnectionsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, options },
      listOperationSpec,
    );
  }

  /**
   * Gets the specified private endpoint connection associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Azure resource
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ): Promise<PrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, privateEndpointConnectionName, options },
      getOperationSpec,
    );
  }

  /**
   * Update the state of specified private endpoint connection associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Azure resource
   * @param properties The private endpoint connection properties.
   * @param options The options parameters.
   */
  async beginPut(
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionsPutResponse>,
      PrivateEndpointConnectionsPutResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PrivateEndpointConnectionsPutResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        cacheName,
        privateEndpointConnectionName,
        properties,
        options,
      },
      spec: putOperationSpec,
    });
    const poller = await createHttpPoller<
      PrivateEndpointConnectionsPutResponse,
      OperationState<PrivateEndpointConnectionsPutResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update the state of specified private endpoint connection associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Azure resource
   * @param properties The private endpoint connection properties.
   * @param options The options parameters.
   */
  async beginPutAndWait(
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ): Promise<PrivateEndpointConnectionsPutResponse> {
    const poller = await this.beginPut(
      resourceGroupName,
      cacheName,
      privateEndpointConnectionName,
      properties,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes the specified private endpoint connection associated with the redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
   *                                      Azure resource
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    cacheName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, privateEndpointConnectionName, options },
      deleteOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/privateEndpointConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const putOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    201: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    202: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    204: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.properties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
