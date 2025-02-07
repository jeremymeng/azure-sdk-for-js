/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { PrivateEndpointConnections } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { EventGridManagementClient } from "../eventGridManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsParentType,
  PrivateEndpointConnectionsListByResourceNextOptionalParams,
  PrivateEndpointConnectionsListByResourceOptionalParams,
  PrivateEndpointConnectionsListByResourceResponse,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnectionsUpdateOptionalParams,
  PrivateEndpointConnectionsUpdateResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsDeleteResponse,
  PrivateEndpointConnectionsListByResourceNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PrivateEndpointConnections operations. */
export class PrivateEndpointConnectionsImpl
  implements PrivateEndpointConnections
{
  private readonly client: EventGridManagementClient;

  /**
   * Initialize a new instance of the class PrivateEndpointConnections class.
   * @param client Reference to the service client
   */
  constructor(client: EventGridManagementClient) {
    this.client = client;
  }

  /**
   * Get all private endpoint connections under a topic, domain, or partner namespace or namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param options The options parameters.
   */
  public listByResource(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): PagedAsyncIterableIterator<PrivateEndpointConnection> {
    const iter = this.listByResourcePagingAll(
      resourceGroupName,
      parentType,
      parentName,
      options,
    );
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
        return this.listByResourcePagingPage(
          resourceGroupName,
          parentType,
          parentName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourcePagingPage(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<PrivateEndpointConnection[]> {
    let result: PrivateEndpointConnectionsListByResourceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResource(
        resourceGroupName,
        parentType,
        parentName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceNext(
        resourceGroupName,
        parentType,
        parentName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourcePagingAll(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): AsyncIterableIterator<PrivateEndpointConnection> {
    for await (const page of this.listByResourcePagingPage(
      resourceGroupName,
      parentType,
      parentName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get a specific private endpoint connection under a topic, domain, or partner namespace or namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param privateEndpointConnectionName The name of the private endpoint connection connection.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ): Promise<PrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Update a specific private endpoint connection under a topic, domain or partner namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param privateEndpointConnectionName The name of the private endpoint connection connection.
   * @param privateEndpointConnection The private endpoint connection object to update.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionsUpdateResponse>,
      PrivateEndpointConnectionsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PrivateEndpointConnectionsUpdateResponse> => {
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
        parentType,
        parentName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      PrivateEndpointConnectionsUpdateResponse,
      OperationState<PrivateEndpointConnectionsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update a specific private endpoint connection under a topic, domain or partner namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param privateEndpointConnectionName The name of the private endpoint connection connection.
   * @param privateEndpointConnection The private endpoint connection object to update.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsUpdateOptionalParams,
  ): Promise<PrivateEndpointConnectionsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      parentType,
      parentName,
      privateEndpointConnectionName,
      privateEndpointConnection,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a specific private endpoint connection under a topic, domain, or partner namespace or
   * namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param privateEndpointConnectionName The name of the private endpoint connection connection.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionsDeleteResponse>,
      PrivateEndpointConnectionsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PrivateEndpointConnectionsDeleteResponse> => {
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
        parentType,
        parentName,
        privateEndpointConnectionName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      PrivateEndpointConnectionsDeleteResponse,
      OperationState<PrivateEndpointConnectionsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a specific private endpoint connection under a topic, domain, or partner namespace or
   * namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param privateEndpointConnectionName The name of the private endpoint connection connection.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<PrivateEndpointConnectionsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      parentType,
      parentName,
      privateEndpointConnectionName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Get all private endpoint connections under a topic, domain, or partner namespace or namespace.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param options The options parameters.
   */
  private _listByResource(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): Promise<PrivateEndpointConnectionsListByResourceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, parentType, parentName, options },
      listByResourceOperationSpec,
    );
  }

  /**
   * ListByResourceNext
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param parentType The type of the parent resource. This can be either \'topics\', \'domains\', or
   *                   \'partnerNamespaces\' or \'namespaces\'.
   * @param parentName The name of the parent resource (namely, either, the topic name, domain name, or
   *                   partner namespace name or namespace name).
   * @param nextLink The nextLink from the previous successful call to the ListByResource method.
   * @param options The options parameters.
   */
  private _listByResourceNext(
    resourceGroupName: string,
    parentType: PrivateEndpointConnectionsParentType,
    parentName: string,
    nextLink: string,
    options?: PrivateEndpointConnectionsListByResourceNextOptionalParams,
  ): Promise<PrivateEndpointConnectionsListByResourceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, parentType, parentName, nextLink, options },
      listByResourceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.parentType,
    Parameters.parentName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    default: {},
  },
  requestBody: Parameters.privateEndpointConnection,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.parentType,
    Parameters.parentName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.PrivateEndpointConnectionsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.PrivateEndpointConnectionsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.PrivateEndpointConnectionsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.PrivateEndpointConnectionsDeleteHeaders,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.parentType,
    Parameters.parentName,
    Parameters.privateEndpointConnectionName,
  ],
  serializer,
};
const listByResourceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.parentType,
    Parameters.parentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.parentType,
    Parameters.parentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
