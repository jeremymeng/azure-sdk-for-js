/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { NatGateways } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  NatGateway,
  NatGatewaysListAllNextOptionalParams,
  NatGatewaysListAllOptionalParams,
  NatGatewaysListAllResponse,
  NatGatewaysListNextOptionalParams,
  NatGatewaysListOptionalParams,
  NatGatewaysListResponse,
  NatGatewaysDeleteOptionalParams,
  NatGatewaysGetOptionalParams,
  NatGatewaysGetResponse,
  NatGatewaysCreateOrUpdateOptionalParams,
  NatGatewaysCreateOrUpdateResponse,
  TagsObject,
  NatGatewaysUpdateTagsOptionalParams,
  NatGatewaysUpdateTagsResponse,
  NatGatewaysListAllNextResponse,
  NatGatewaysListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing NatGateways operations. */
export class NatGatewaysImpl implements NatGateways {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class NatGateways class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the Nat Gateways in a subscription.
   * @param options The options parameters.
   */
  public listAll(
    options?: NatGatewaysListAllOptionalParams,
  ): PagedAsyncIterableIterator<NatGateway> {
    const iter = this.listAllPagingAll(options);
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
        return this.listAllPagingPage(options, settings);
      },
    };
  }

  private async *listAllPagingPage(
    options?: NatGatewaysListAllOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<NatGateway[]> {
    let result: NatGatewaysListAllResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listAll(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listAllNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listAllPagingAll(
    options?: NatGatewaysListAllOptionalParams,
  ): AsyncIterableIterator<NatGateway> {
    for await (const page of this.listAllPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets all nat gateways in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: NatGatewaysListOptionalParams,
  ): PagedAsyncIterableIterator<NatGateway> {
    const iter = this.listPagingAll(resourceGroupName, options);
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
        return this.listPagingPage(resourceGroupName, options, settings);
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: NatGatewaysListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<NatGateway[]> {
    let result: NatGatewaysListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
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

  private async *listPagingAll(
    resourceGroupName: string,
    options?: NatGatewaysListOptionalParams,
  ): AsyncIterableIterator<NatGateway> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Deletes the specified nat gateway.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
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
      args: { resourceGroupName, natGatewayName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified nat gateway.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      natGatewayName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets the specified nat gateway in a specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysGetOptionalParams,
  ): Promise<NatGatewaysGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, natGatewayName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a nat gateway.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param parameters Parameters supplied to the create or update nat gateway operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    natGatewayName: string,
    parameters: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<NatGatewaysCreateOrUpdateResponse>,
      NatGatewaysCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<NatGatewaysCreateOrUpdateResponse> => {
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
      args: { resourceGroupName, natGatewayName, parameters, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      NatGatewaysCreateOrUpdateResponse,
      OperationState<NatGatewaysCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a nat gateway.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param parameters Parameters supplied to the create or update nat gateway operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    natGatewayName: string,
    parameters: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ): Promise<NatGatewaysCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      natGatewayName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates nat gateway tags.
   * @param resourceGroupName The name of the resource group.
   * @param natGatewayName The name of the nat gateway.
   * @param parameters Parameters supplied to update nat gateway tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    natGatewayName: string,
    parameters: TagsObject,
    options?: NatGatewaysUpdateTagsOptionalParams,
  ): Promise<NatGatewaysUpdateTagsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, natGatewayName, parameters, options },
      updateTagsOperationSpec,
    );
  }

  /**
   * Gets all the Nat Gateways in a subscription.
   * @param options The options parameters.
   */
  private _listAll(
    options?: NatGatewaysListAllOptionalParams,
  ): Promise<NatGatewaysListAllResponse> {
    return this.client.sendOperationRequest({ options }, listAllOperationSpec);
  }

  /**
   * Gets all nat gateways in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: NatGatewaysListOptionalParams,
  ): Promise<NatGatewaysListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listOperationSpec,
    );
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  private _listAllNext(
    nextLink: string,
    options?: NatGatewaysListAllNextOptionalParams,
  ): Promise<NatGatewaysListAllNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listAllNextOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: NatGatewaysListNextOptionalParams,
  ): Promise<NatGatewaysListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.natGatewayName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NatGateway,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.natGatewayName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NatGateway,
    },
    201: {
      bodyMapper: Mappers.NatGateway,
    },
    202: {
      bodyMapper: Mappers.NatGateway,
    },
    204: {
      bodyMapper: Mappers.NatGateway,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters33,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.natGatewayName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateTagsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NatGateway,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.natGatewayName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listAllOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/natGateways",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NatGatewayListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NatGatewayListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listAllNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NatGatewayListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
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
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NatGatewayListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
