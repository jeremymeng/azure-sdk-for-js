/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ManagedEnvironments } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ContainerAppsAPIClient } from "../containerAppsAPIClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  ManagedEnvironment,
  ManagedEnvironmentsListBySubscriptionNextOptionalParams,
  ManagedEnvironmentsListBySubscriptionOptionalParams,
  ManagedEnvironmentsListBySubscriptionResponse,
  ManagedEnvironmentsListByResourceGroupNextOptionalParams,
  ManagedEnvironmentsListByResourceGroupOptionalParams,
  ManagedEnvironmentsListByResourceGroupResponse,
  WorkloadProfileStates,
  ManagedEnvironmentsListWorkloadProfileStatesNextOptionalParams,
  ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ManagedEnvironmentsListWorkloadProfileStatesResponse,
  ManagedEnvironmentsGetOptionalParams,
  ManagedEnvironmentsGetResponse,
  ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ManagedEnvironmentsCreateOrUpdateResponse,
  ManagedEnvironmentsDeleteOptionalParams,
  ManagedEnvironmentsUpdateOptionalParams,
  ManagedEnvironmentsUpdateResponse,
  ManagedEnvironmentsGetAuthTokenOptionalParams,
  ManagedEnvironmentsGetAuthTokenResponse,
  ManagedEnvironmentsListBySubscriptionNextResponse,
  ManagedEnvironmentsListByResourceGroupNextResponse,
  ManagedEnvironmentsListWorkloadProfileStatesNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ManagedEnvironments operations. */
export class ManagedEnvironmentsImpl implements ManagedEnvironments {
  private readonly client: ContainerAppsAPIClient;

  /**
   * Initialize a new instance of the class ManagedEnvironments class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerAppsAPIClient) {
    this.client = client;
  }

  /**
   * Get all Managed Environments for a subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: ManagedEnvironmentsListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<ManagedEnvironment> {
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
    options?: ManagedEnvironmentsListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ManagedEnvironment[]> {
    let result: ManagedEnvironmentsListBySubscriptionResponse;
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
    options?: ManagedEnvironmentsListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<ManagedEnvironment> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get all the Managed Environments in a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<ManagedEnvironment> {
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
    options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ManagedEnvironment[]> {
    let result: ManagedEnvironmentsListByResourceGroupResponse;
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
    options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<ManagedEnvironment> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get all workload Profile States for a Managed Environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param options The options parameters.
   */
  public listWorkloadProfileStates(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ): PagedAsyncIterableIterator<WorkloadProfileStates> {
    const iter = this.listWorkloadProfileStatesPagingAll(
      resourceGroupName,
      environmentName,
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
        return this.listWorkloadProfileStatesPagingPage(
          resourceGroupName,
          environmentName,
          options,
          settings,
        );
      },
    };
  }

  private async *listWorkloadProfileStatesPagingPage(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<WorkloadProfileStates[]> {
    let result: ManagedEnvironmentsListWorkloadProfileStatesResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listWorkloadProfileStates(
        resourceGroupName,
        environmentName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listWorkloadProfileStatesNext(
        resourceGroupName,
        environmentName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listWorkloadProfileStatesPagingAll(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ): AsyncIterableIterator<WorkloadProfileStates> {
    for await (const page of this.listWorkloadProfileStatesPagingPage(
      resourceGroupName,
      environmentName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get all Managed Environments for a subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: ManagedEnvironmentsListBySubscriptionOptionalParams,
  ): Promise<ManagedEnvironmentsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * Get all the Managed Environments in a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: ManagedEnvironmentsListByResourceGroupOptionalParams,
  ): Promise<ManagedEnvironmentsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Get the properties of a Managed Environment used to host container apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsGetOptionalParams,
  ): Promise<ManagedEnvironmentsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a Managed Environment used to host container apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param environmentEnvelope Configuration details of the Environment.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ManagedEnvironmentsCreateOrUpdateResponse>,
      ManagedEnvironmentsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<ManagedEnvironmentsCreateOrUpdateResponse> => {
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
        environmentName,
        environmentEnvelope,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      ManagedEnvironmentsCreateOrUpdateResponse,
      OperationState<ManagedEnvironmentsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a Managed Environment used to host container apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param environmentEnvelope Configuration details of the Environment.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ): Promise<ManagedEnvironmentsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      environmentName,
      environmentEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a Managed Environment if it does not have any container apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDeleteOptionalParams,
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
      args: { resourceGroupName, environmentName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a Managed Environment if it does not have any container apps.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      environmentName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Patches a Managed Environment using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param environmentEnvelope Configuration details of the Environment.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ManagedEnvironmentsUpdateResponse>,
      ManagedEnvironmentsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<ManagedEnvironmentsUpdateResponse> => {
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
        environmentName,
        environmentEnvelope,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      ManagedEnvironmentsUpdateResponse,
      OperationState<ManagedEnvironmentsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Patches a Managed Environment using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Environment.
   * @param environmentEnvelope Configuration details of the Environment.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    environmentName: string,
    environmentEnvelope: ManagedEnvironment,
    options?: ManagedEnvironmentsUpdateOptionalParams,
  ): Promise<ManagedEnvironmentsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      environmentName,
      environmentEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Checks if resource name is available.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param options The options parameters.
   */
  getAuthToken(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsGetAuthTokenOptionalParams,
  ): Promise<ManagedEnvironmentsGetAuthTokenResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, options },
      getAuthTokenOperationSpec,
    );
  }

  /**
   * Get all workload Profile States for a Managed Environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param options The options parameters.
   */
  private _listWorkloadProfileStates(
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ): Promise<ManagedEnvironmentsListWorkloadProfileStatesResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, options },
      listWorkloadProfileStatesOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: ManagedEnvironmentsListBySubscriptionNextOptionalParams,
  ): Promise<ManagedEnvironmentsListBySubscriptionNextResponse> {
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
    options?: ManagedEnvironmentsListByResourceGroupNextOptionalParams,
  ): Promise<ManagedEnvironmentsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }

  /**
   * ListWorkloadProfileStatesNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param nextLink The nextLink from the previous successful call to the ListWorkloadProfileStates
   *                 method.
   * @param options The options parameters.
   */
  private _listWorkloadProfileStatesNext(
    resourceGroupName: string,
    environmentName: string,
    nextLink: string,
    options?: ManagedEnvironmentsListWorkloadProfileStatesNextOptionalParams,
  ): Promise<ManagedEnvironmentsListWorkloadProfileStatesNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, nextLink, options },
      listWorkloadProfileStatesNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/managedEnvironments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironmentsCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironmentsCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
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
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    201: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    202: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    204: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  requestBody: Parameters.environmentEnvelope1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    201: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    202: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    204: {
      bodyMapper: Mappers.ManagedEnvironment,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  requestBody: Parameters.environmentEnvelope1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getAuthTokenOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/getAuthtoken",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EnvironmentAuthToken,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listWorkloadProfileStatesOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/workloadProfileStates",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadProfileStatesCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedEnvironmentsCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
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
      bodyMapper: Mappers.ManagedEnvironmentsCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
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
const listWorkloadProfileStatesNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadProfileStatesCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.environmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
