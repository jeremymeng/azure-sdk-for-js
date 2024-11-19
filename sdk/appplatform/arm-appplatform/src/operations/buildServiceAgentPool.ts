/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { BuildServiceAgentPool } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AppPlatformManagementClient } from "../appPlatformManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  BuildServiceAgentPoolResource,
  BuildServiceAgentPoolListNextOptionalParams,
  BuildServiceAgentPoolListOptionalParams,
  BuildServiceAgentPoolListResponse,
  BuildServiceAgentPoolGetOptionalParams,
  BuildServiceAgentPoolGetResponse,
  BuildServiceAgentPoolUpdatePutOptionalParams,
  BuildServiceAgentPoolUpdatePutResponse,
  BuildServiceAgentPoolListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing BuildServiceAgentPool operations. */
export class BuildServiceAgentPoolImpl implements BuildServiceAgentPool {
  private readonly client: AppPlatformManagementClient;

  /**
   * Initialize a new instance of the class BuildServiceAgentPool class.
   * @param client Reference to the service client
   */
  constructor(client: AppPlatformManagementClient) {
    this.client = client;
  }

  /**
   * List build service agent pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    options?: BuildServiceAgentPoolListOptionalParams
  ): PagedAsyncIterableIterator<BuildServiceAgentPoolResource> {
    const iter = this.listPagingAll(
      resourceGroupName,
      serviceName,
      buildServiceName,
      options
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
          serviceName,
          buildServiceName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    options?: BuildServiceAgentPoolListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<BuildServiceAgentPoolResource[]> {
    let result: BuildServiceAgentPoolListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        serviceName,
        buildServiceName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        serviceName,
        buildServiceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    options?: BuildServiceAgentPoolListOptionalParams
  ): AsyncIterableIterator<BuildServiceAgentPoolResource> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      serviceName,
      buildServiceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List build service agent pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    options?: BuildServiceAgentPoolListOptionalParams
  ): Promise<BuildServiceAgentPoolListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, buildServiceName, options },
      listOperationSpec
    );
  }

  /**
   * Get build service agent pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param agentPoolName The name of the build service agent pool resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    agentPoolName: string,
    options?: BuildServiceAgentPoolGetOptionalParams
  ): Promise<BuildServiceAgentPoolGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        buildServiceName,
        agentPoolName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Create or update build service agent pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param agentPoolName The name of the build service agent pool resource.
   * @param agentPoolResource Parameters for the update operation
   * @param options The options parameters.
   */
  async beginUpdatePut(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    agentPoolName: string,
    agentPoolResource: BuildServiceAgentPoolResource,
    options?: BuildServiceAgentPoolUpdatePutOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<BuildServiceAgentPoolUpdatePutResponse>,
      BuildServiceAgentPoolUpdatePutResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<BuildServiceAgentPoolUpdatePutResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        serviceName,
        buildServiceName,
        agentPoolName,
        agentPoolResource,
        options
      },
      spec: updatePutOperationSpec
    });
    const poller = await createHttpPoller<
      BuildServiceAgentPoolUpdatePutResponse,
      OperationState<BuildServiceAgentPoolUpdatePutResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update build service agent pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param agentPoolName The name of the build service agent pool resource.
   * @param agentPoolResource Parameters for the update operation
   * @param options The options parameters.
   */
  async beginUpdatePutAndWait(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    agentPoolName: string,
    agentPoolResource: BuildServiceAgentPoolResource,
    options?: BuildServiceAgentPoolUpdatePutOptionalParams
  ): Promise<BuildServiceAgentPoolUpdatePutResponse> {
    const poller = await this.beginUpdatePut(
      resourceGroupName,
      serviceName,
      buildServiceName,
      agentPoolName,
      agentPoolResource,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param buildServiceName The name of the build service resource.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
    nextLink: string,
    options?: BuildServiceAgentPoolListNextOptionalParams
  ): Promise<BuildServiceAgentPoolListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, buildServiceName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppPlatform/Spring/{serviceName}/buildServices/{buildServiceName}/agentPools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuildServiceAgentPoolResourceCollection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.buildServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppPlatform/Spring/{serviceName}/buildServices/{buildServiceName}/agentPools/{agentPoolName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuildServiceAgentPoolResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.buildServiceName,
    Parameters.agentPoolName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updatePutOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppPlatform/Spring/{serviceName}/buildServices/{buildServiceName}/agentPools/{agentPoolName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BuildServiceAgentPoolResource
    },
    201: {
      bodyMapper: Mappers.BuildServiceAgentPoolResource
    },
    202: {
      bodyMapper: Mappers.BuildServiceAgentPoolResource
    },
    204: {
      bodyMapper: Mappers.BuildServiceAgentPoolResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.agentPoolResource,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.buildServiceName,
    Parameters.agentPoolName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BuildServiceAgentPoolResourceCollection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.nextLink,
    Parameters.buildServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
