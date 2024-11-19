/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { AzureLargeInstanceOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LargeInstanceManagementClient } from "../largeInstanceManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  AzureLargeInstance,
  AzureLargeInstanceListBySubscriptionNextOptionalParams,
  AzureLargeInstanceListBySubscriptionOptionalParams,
  AzureLargeInstanceListBySubscriptionResponse,
  AzureLargeInstanceListByResourceGroupNextOptionalParams,
  AzureLargeInstanceListByResourceGroupOptionalParams,
  AzureLargeInstanceListByResourceGroupResponse,
  AzureLargeInstanceGetOptionalParams,
  AzureLargeInstanceGetResponse,
  AzureLargeInstanceTagsUpdate,
  AzureLargeInstanceUpdateOptionalParams,
  AzureLargeInstanceUpdateResponse,
  AzureLargeInstanceRestartOptionalParams,
  AzureLargeInstanceRestartResponse,
  AzureLargeInstanceShutdownOptionalParams,
  AzureLargeInstanceShutdownResponse,
  AzureLargeInstanceStartOptionalParams,
  AzureLargeInstanceStartResponse,
  AzureLargeInstanceListBySubscriptionNextResponse,
  AzureLargeInstanceListByResourceGroupNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing AzureLargeInstanceOperations operations. */
export class AzureLargeInstanceOperationsImpl
  implements AzureLargeInstanceOperations
{
  private readonly client: LargeInstanceManagementClient;

  /**
   * Initialize a new instance of the class AzureLargeInstanceOperations class.
   * @param client Reference to the service client
   */
  constructor(client: LargeInstanceManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of Azure Large Instances in the specified subscription. The
   * operations returns various properties of each Azure Large Instance.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: AzureLargeInstanceListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<AzureLargeInstance> {
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
    options?: AzureLargeInstanceListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AzureLargeInstance[]> {
    let result: AzureLargeInstanceListBySubscriptionResponse;
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
    options?: AzureLargeInstanceListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<AzureLargeInstance> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of Azure Large Instances in the specified subscription and resource
   * group. The operations returns various properties of each Azure Large Instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: AzureLargeInstanceListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<AzureLargeInstance> {
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
    options?: AzureLargeInstanceListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AzureLargeInstance[]> {
    let result: AzureLargeInstanceListByResourceGroupResponse;
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
    options?: AzureLargeInstanceListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<AzureLargeInstance> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of Azure Large Instances in the specified subscription. The
   * operations returns various properties of each Azure Large Instance.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: AzureLargeInstanceListBySubscriptionOptionalParams,
  ): Promise<AzureLargeInstanceListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * Gets a list of Azure Large Instances in the specified subscription and resource
   * group. The operations returns various properties of each Azure Large Instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: AzureLargeInstanceListByResourceGroupOptionalParams,
  ): Promise<AzureLargeInstanceListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Gets an Azure Large Instance for the specified subscription, resource group,
   * and instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceGetOptionalParams,
  ): Promise<AzureLargeInstanceGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, azureLargeInstanceName, options },
      getOperationSpec,
    );
  }

  /**
   * Patches the Tags field of an Azure Large Instance for the specified
   * subscription, resource group, and instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param tagsParameter The resource properties to be updated.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    tagsParameter: AzureLargeInstanceTagsUpdate,
    options?: AzureLargeInstanceUpdateOptionalParams,
  ): Promise<AzureLargeInstanceUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, azureLargeInstanceName, tagsParameter, options },
      updateOperationSpec,
    );
  }

  /**
   * The operation to restart an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginRestart(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceRestartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AzureLargeInstanceRestartResponse>,
      AzureLargeInstanceRestartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<AzureLargeInstanceRestartResponse> => {
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
      args: { resourceGroupName, azureLargeInstanceName, options },
      spec: restartOperationSpec,
    });
    const poller = await createHttpPoller<
      AzureLargeInstanceRestartResponse,
      OperationState<AzureLargeInstanceRestartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to restart an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginRestartAndWait(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceRestartOptionalParams,
  ): Promise<AzureLargeInstanceRestartResponse> {
    const poller = await this.beginRestart(
      resourceGroupName,
      azureLargeInstanceName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to shutdown an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginShutdown(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceShutdownOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AzureLargeInstanceShutdownResponse>,
      AzureLargeInstanceShutdownResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<AzureLargeInstanceShutdownResponse> => {
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
      args: { resourceGroupName, azureLargeInstanceName, options },
      spec: shutdownOperationSpec,
    });
    const poller = await createHttpPoller<
      AzureLargeInstanceShutdownResponse,
      OperationState<AzureLargeInstanceShutdownResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to shutdown an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginShutdownAndWait(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceShutdownOptionalParams,
  ): Promise<AzureLargeInstanceShutdownResponse> {
    const poller = await this.beginShutdown(
      resourceGroupName,
      azureLargeInstanceName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to start an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginStart(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceStartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AzureLargeInstanceStartResponse>,
      AzureLargeInstanceStartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<AzureLargeInstanceStartResponse> => {
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
      args: { resourceGroupName, azureLargeInstanceName, options },
      spec: startOperationSpec,
    });
    const poller = await createHttpPoller<
      AzureLargeInstanceStartResponse,
      OperationState<AzureLargeInstanceStartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to start an Azure Large Instance (only for compute instances)
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeInstanceName Name of the AzureLargeInstance.
   * @param options The options parameters.
   */
  async beginStartAndWait(
    resourceGroupName: string,
    azureLargeInstanceName: string,
    options?: AzureLargeInstanceStartOptionalParams,
  ): Promise<AzureLargeInstanceStartResponse> {
    const poller = await this.beginStart(
      resourceGroupName,
      azureLargeInstanceName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: AzureLargeInstanceListBySubscriptionNextOptionalParams,
  ): Promise<AzureLargeInstanceListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: AzureLargeInstanceListByResourceGroupNextOptionalParams,
  ): Promise<AzureLargeInstanceListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureLargeInstance/azureLargeInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstanceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstanceListResult,
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
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstance,
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
    Parameters.azureLargeInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstance,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.tagsParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureLargeInstanceName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const restartOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}/restart",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.forceParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureLargeInstanceName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const shutdownOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}/shutdown",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
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
    Parameters.azureLargeInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const startOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}/start",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    201: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    202: {
      bodyMapper: Mappers.OperationStatusResult,
    },
    204: {
      bodyMapper: Mappers.OperationStatusResult,
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
    Parameters.azureLargeInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstanceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureLargeInstanceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
