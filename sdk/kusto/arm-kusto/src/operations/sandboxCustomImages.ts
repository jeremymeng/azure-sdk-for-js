/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { SandboxCustomImages } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { KustoManagementClient } from "../kustoManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  SandboxCustomImage,
  SandboxCustomImagesListByClusterOptionalParams,
  SandboxCustomImagesListByClusterResponse,
  SandboxCustomImagesGetOptionalParams,
  SandboxCustomImagesGetResponse,
  SandboxCustomImagesCreateOrUpdateOptionalParams,
  SandboxCustomImagesCreateOrUpdateResponse,
  SandboxCustomImagesUpdateOptionalParams,
  SandboxCustomImagesUpdateResponse,
  SandboxCustomImagesDeleteOptionalParams,
  SandboxCustomImagesCheckNameRequest,
  SandboxCustomImagesCheckNameAvailabilityOptionalParams,
  SandboxCustomImagesCheckNameAvailabilityResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing SandboxCustomImages operations. */
export class SandboxCustomImagesImpl implements SandboxCustomImages {
  private readonly client: KustoManagementClient;

  /**
   * Initialize a new instance of the class SandboxCustomImages class.
   * @param client Reference to the service client
   */
  constructor(client: KustoManagementClient) {
    this.client = client;
  }

  /**
   * Returns the list of the existing sandbox custom images of the given Kusto cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param options The options parameters.
   */
  public listByCluster(
    resourceGroupName: string,
    clusterName: string,
    options?: SandboxCustomImagesListByClusterOptionalParams,
  ): PagedAsyncIterableIterator<SandboxCustomImage> {
    const iter = this.listByClusterPagingAll(
      resourceGroupName,
      clusterName,
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
        return this.listByClusterPagingPage(
          resourceGroupName,
          clusterName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByClusterPagingPage(
    resourceGroupName: string,
    clusterName: string,
    options?: SandboxCustomImagesListByClusterOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<SandboxCustomImage[]> {
    let result: SandboxCustomImagesListByClusterResponse;
    result = await this._listByCluster(resourceGroupName, clusterName, options);
    yield result.value || [];
  }

  private async *listByClusterPagingAll(
    resourceGroupName: string,
    clusterName: string,
    options?: SandboxCustomImagesListByClusterOptionalParams,
  ): AsyncIterableIterator<SandboxCustomImage> {
    for await (const page of this.listByClusterPagingPage(
      resourceGroupName,
      clusterName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Returns the list of the existing sandbox custom images of the given Kusto cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param options The options parameters.
   */
  private _listByCluster(
    resourceGroupName: string,
    clusterName: string,
    options?: SandboxCustomImagesListByClusterOptionalParams,
  ): Promise<SandboxCustomImagesListByClusterResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, options },
      listByClusterOperationSpec,
    );
  }

  /**
   * Returns a sandbox custom image
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesGetOptionalParams,
  ): Promise<SandboxCustomImagesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, sandboxCustomImageName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param parameters The sandbox custom image parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SandboxCustomImagesCreateOrUpdateResponse>,
      SandboxCustomImagesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SandboxCustomImagesCreateOrUpdateResponse> => {
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
        sandboxCustomImageName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      SandboxCustomImagesCreateOrUpdateResponse,
      OperationState<SandboxCustomImagesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param parameters The sandbox custom image parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
  ): Promise<SandboxCustomImagesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      clusterName,
      sandboxCustomImageName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param parameters The sandbox custom image parameters.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SandboxCustomImagesUpdateResponse>,
      SandboxCustomImagesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SandboxCustomImagesUpdateResponse> => {
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
        sandboxCustomImageName,
        parameters,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      SandboxCustomImagesUpdateResponse,
      OperationState<SandboxCustomImagesUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param parameters The sandbox custom image parameters.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesUpdateOptionalParams,
  ): Promise<SandboxCustomImagesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      clusterName,
      sandboxCustomImageName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesDeleteOptionalParams,
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
      args: { resourceGroupName, clusterName, sandboxCustomImageName, options },
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
   * Deletes a sandbox custom image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param sandboxCustomImageName The name of the sandbox custom image.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      clusterName,
      sandboxCustomImageName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Checks that the sandbox custom image resource name is valid and is not already in use.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param resourceName The name of the resource.
   * @param options The options parameters.
   */
  checkNameAvailability(
    resourceGroupName: string,
    clusterName: string,
    resourceName: SandboxCustomImagesCheckNameRequest,
    options?: SandboxCustomImagesCheckNameAvailabilityOptionalParams,
  ): Promise<SandboxCustomImagesCheckNameAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, resourceName, options },
      checkNameAvailabilityOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByClusterOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SandboxCustomImagesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
    Parameters.sandboxCustomImageName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    201: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    202: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    204: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
    Parameters.sandboxCustomImageName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    201: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    202: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    204: {
      bodyMapper: Mappers.SandboxCustomImage,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
    Parameters.sandboxCustomImageName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
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
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
    Parameters.sandboxCustomImageName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const checkNameAvailabilityOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImagesCheckNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.resourceName3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
