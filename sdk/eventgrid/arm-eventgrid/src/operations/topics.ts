/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { Topics } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { EventGridManagementClient } from "../eventGridManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  Topic,
  TopicsListBySubscriptionNextOptionalParams,
  TopicsListBySubscriptionOptionalParams,
  TopicsListBySubscriptionResponse,
  TopicsListByResourceGroupNextOptionalParams,
  TopicsListByResourceGroupOptionalParams,
  TopicsListByResourceGroupResponse,
  EventType,
  TopicsListEventTypesOptionalParams,
  TopicsListEventTypesResponse,
  TopicsGetOptionalParams,
  TopicsGetResponse,
  TopicsCreateOrUpdateOptionalParams,
  TopicsCreateOrUpdateResponse,
  TopicsDeleteOptionalParams,
  TopicsDeleteResponse,
  TopicUpdateParameters,
  TopicsUpdateOptionalParams,
  TopicsListSharedAccessKeysOptionalParams,
  TopicsListSharedAccessKeysResponse,
  TopicRegenerateKeyRequest,
  TopicsRegenerateKeyOptionalParams,
  TopicsRegenerateKeyResponse,
  TopicsListBySubscriptionNextResponse,
  TopicsListByResourceGroupNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Topics operations. */
export class TopicsImpl implements Topics {
  private readonly client: EventGridManagementClient;

  /**
   * Initialize a new instance of the class Topics class.
   * @param client Reference to the service client
   */
  constructor(client: EventGridManagementClient) {
    this.client = client;
  }

  /**
   * List all the topics under an Azure subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: TopicsListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<Topic> {
    const iter = this.listBySubscriptionPagingAll(options);
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
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: TopicsListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Topic[]> {
    let result: TopicsListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: TopicsListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<Topic> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List all the topics under a resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: TopicsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<Topic> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
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
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: TopicsListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Topic[]> {
    let result: TopicsListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: TopicsListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<Topic> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List event types for a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param providerNamespace Namespace of the provider of the topic.
   * @param resourceTypeName Name of the topic type.
   * @param resourceName Name of the topic.
   * @param options The options parameters.
   */
  public listEventTypes(
    resourceGroupName: string,
    providerNamespace: string,
    resourceTypeName: string,
    resourceName: string,
    options?: TopicsListEventTypesOptionalParams,
  ): PagedAsyncIterableIterator<EventType> {
    const iter = this.listEventTypesPagingAll(
      resourceGroupName,
      providerNamespace,
      resourceTypeName,
      resourceName,
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
        return this.listEventTypesPagingPage(
          resourceGroupName,
          providerNamespace,
          resourceTypeName,
          resourceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listEventTypesPagingPage(
    resourceGroupName: string,
    providerNamespace: string,
    resourceTypeName: string,
    resourceName: string,
    options?: TopicsListEventTypesOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<EventType[]> {
    let result: TopicsListEventTypesResponse;
    result = await this._listEventTypes(
      resourceGroupName,
      providerNamespace,
      resourceTypeName,
      resourceName,
      options,
    );
    yield result.value || [];
  }

  private async *listEventTypesPagingAll(
    resourceGroupName: string,
    providerNamespace: string,
    resourceTypeName: string,
    resourceName: string,
    options?: TopicsListEventTypesOptionalParams,
  ): AsyncIterableIterator<EventType> {
    for await (const page of this.listEventTypesPagingPage(
      resourceGroupName,
      providerNamespace,
      resourceTypeName,
      resourceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get properties of a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    topicName: string,
    options?: TopicsGetOptionalParams,
  ): Promise<TopicsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, topicName, options },
      getOperationSpec,
    );
  }

  /**
   * Asynchronously creates a new topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param topicInfo Topic information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    topicName: string,
    topicInfo: Topic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<TopicsCreateOrUpdateResponse>,
      TopicsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<TopicsCreateOrUpdateResponse> => {
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
      args: { resourceGroupName, topicName, topicInfo, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      TopicsCreateOrUpdateResponse,
      OperationState<TopicsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Asynchronously creates a new topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param topicInfo Topic information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    topicName: string,
    topicInfo: Topic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ): Promise<TopicsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      topicName,
      topicInfo,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete existing topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<TopicsDeleteResponse>, TopicsDeleteResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<TopicsDeleteResponse> => {
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
      args: { resourceGroupName, topicName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      TopicsDeleteResponse,
      OperationState<TopicsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete existing topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ): Promise<TopicsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      topicName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Asynchronously updates a topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param topicUpdateParameters Topic update information.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    topicName: string,
    topicUpdateParameters: TopicUpdateParameters,
    options?: TopicsUpdateOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
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
      args: { resourceGroupName, topicName, topicUpdateParameters, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Asynchronously updates a topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param topicUpdateParameters Topic update information.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    topicName: string,
    topicUpdateParameters: TopicUpdateParameters,
    options?: TopicsUpdateOptionalParams,
  ): Promise<void> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      topicName,
      topicUpdateParameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * List all the topics under an Azure subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: TopicsListBySubscriptionOptionalParams,
  ): Promise<TopicsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * List all the topics under a resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: TopicsListByResourceGroupOptionalParams,
  ): Promise<TopicsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * List the two keys used to publish to a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param options The options parameters.
   */
  listSharedAccessKeys(
    resourceGroupName: string,
    topicName: string,
    options?: TopicsListSharedAccessKeysOptionalParams,
  ): Promise<TopicsListSharedAccessKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, topicName, options },
      listSharedAccessKeysOperationSpec,
    );
  }

  /**
   * Regenerate a shared access key for a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param regenerateKeyRequest Request body to regenerate key.
   * @param options The options parameters.
   */
  async beginRegenerateKey(
    resourceGroupName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: TopicsRegenerateKeyOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<TopicsRegenerateKeyResponse>,
      TopicsRegenerateKeyResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<TopicsRegenerateKeyResponse> => {
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
      args: { resourceGroupName, topicName, regenerateKeyRequest, options },
      spec: regenerateKeyOperationSpec,
    });
    const poller = await createHttpPoller<
      TopicsRegenerateKeyResponse,
      OperationState<TopicsRegenerateKeyResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Regenerate a shared access key for a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param topicName Name of the topic.
   * @param regenerateKeyRequest Request body to regenerate key.
   * @param options The options parameters.
   */
  async beginRegenerateKeyAndWait(
    resourceGroupName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: TopicsRegenerateKeyOptionalParams,
  ): Promise<TopicsRegenerateKeyResponse> {
    const poller = await this.beginRegenerateKey(
      resourceGroupName,
      topicName,
      regenerateKeyRequest,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * List event types for a topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param providerNamespace Namespace of the provider of the topic.
   * @param resourceTypeName Name of the topic type.
   * @param resourceName Name of the topic.
   * @param options The options parameters.
   */
  private _listEventTypes(
    resourceGroupName: string,
    providerNamespace: string,
    resourceTypeName: string,
    resourceName: string,
    options?: TopicsListEventTypesOptionalParams,
  ): Promise<TopicsListEventTypesResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        providerNamespace,
        resourceTypeName,
        resourceName,
        options,
      },
      listEventTypesOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: TopicsListBySubscriptionNextOptionalParams,
  ): Promise<TopicsListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: TopicsListByResourceGroupNextOptionalParams,
  ): Promise<TopicsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Topic,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Topic,
    },
    201: {
      bodyMapper: Mappers.Topic,
    },
    202: {
      bodyMapper: Mappers.Topic,
    },
    204: {
      bodyMapper: Mappers.Topic,
    },
    default: {},
  },
  requestBody: Parameters.topicInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.TopicsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.TopicsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.TopicsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.TopicsDeleteHeaders,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  httpMethod: "PATCH",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  requestBody: Parameters.topicUpdateParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/topics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopicsListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopicsListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listSharedAccessKeysOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/listKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TopicSharedAccessKeys,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const regenerateKeyOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/regenerateKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TopicSharedAccessKeys,
    },
    201: {
      bodyMapper: Mappers.TopicSharedAccessKeys,
    },
    202: {
      bodyMapper: Mappers.TopicSharedAccessKeys,
    },
    204: {
      bodyMapper: Mappers.TopicSharedAccessKeys,
    },
    default: {},
  },
  requestBody: Parameters.regenerateKeyRequest2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.topicName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listEventTypesOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerNamespace}/{resourceTypeName}/{resourceName}/providers/Microsoft.EventGrid/eventTypes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EventTypesListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.providerNamespace,
    Parameters.resourceTypeName,
    Parameters.resourceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopicsListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopicsListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
