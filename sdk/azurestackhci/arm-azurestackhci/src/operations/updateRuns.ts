/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { UpdateRuns } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureStackHCIClient } from "../azureStackHCIClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  UpdateRun,
  UpdateRunsListNextOptionalParams,
  UpdateRunsListOptionalParams,
  UpdateRunsListResponse,
  UpdateRunsDeleteOptionalParams,
  UpdateRunsPutOptionalParams,
  UpdateRunsPutResponse,
  UpdateRunsGetOptionalParams,
  UpdateRunsGetResponse,
  UpdateRunsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing UpdateRuns operations. */
export class UpdateRunsImpl implements UpdateRuns {
  private readonly client: AzureStackHCIClient;

  /**
   * Initialize a new instance of the class UpdateRuns class.
   * @param client Reference to the service client
   */
  constructor(client: AzureStackHCIClient) {
    this.client = client;
  }

  /**
   * List all Update runs for a specified update
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdateRunsListOptionalParams,
  ): PagedAsyncIterableIterator<UpdateRun> {
    const iter = this.listPagingAll(
      resourceGroupName,
      clusterName,
      updateName,
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
        return this.listPagingPage(
          resourceGroupName,
          clusterName,
          updateName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdateRunsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<UpdateRun[]> {
    let result: UpdateRunsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        clusterName,
        updateName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        clusterName,
        updateName,
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
    clusterName: string,
    updateName: string,
    options?: UpdateRunsListOptionalParams,
  ): AsyncIterableIterator<UpdateRun> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      clusterName,
      updateName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List all Update runs for a specified update
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdateRunsListOptionalParams,
  ): Promise<UpdateRunsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, updateName, options },
      listOperationSpec,
    );
  }

  /**
   * Delete specified Update Run
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param updateRunName The name of the Update Run
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams,
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
      args: {
        resourceGroupName,
        clusterName,
        updateName,
        updateRunName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete specified Update Run
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param updateRunName The name of the Update Run
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      clusterName,
      updateName,
      updateRunName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Put Update runs for a specified update
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param updateRunName The name of the Update Run
   * @param updateRunsProperties Properties of the updateRuns object
   * @param options The options parameters.
   */
  put(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    updateRunsProperties: UpdateRun,
    options?: UpdateRunsPutOptionalParams,
  ): Promise<UpdateRunsPutResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        clusterName,
        updateName,
        updateRunName,
        updateRunsProperties,
        options,
      },
      putOperationSpec,
    );
  }

  /**
   * Get the Update run for a specified update
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param updateRunName The name of the Update Run
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    options?: UpdateRunsGetOptionalParams,
  ): Promise<UpdateRunsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, updateName, updateRunName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param updateName The name of the Update
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    nextLink: string,
    options?: UpdateRunsListNextOptionalParams,
  ): Promise<UpdateRunsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, updateName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRunList,
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
    Parameters.clusterName,
    Parameters.updateName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
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
    Parameters.clusterName,
    Parameters.updateName,
    Parameters.updateRunName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const putOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.updateRunsProperties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.updateName,
    Parameters.updateRunName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun,
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
    Parameters.clusterName,
    Parameters.updateName,
    Parameters.updateRunName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRunList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.nextLink,
    Parameters.updateName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
