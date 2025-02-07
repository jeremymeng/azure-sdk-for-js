/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { JavaComponents } from "../operationsInterfaces/index.js";
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
  JavaComponent,
  JavaComponentsListNextOptionalParams,
  JavaComponentsListOptionalParams,
  JavaComponentsListResponse,
  JavaComponentsGetOptionalParams,
  JavaComponentsGetResponse,
  JavaComponentsCreateOrUpdateOptionalParams,
  JavaComponentsCreateOrUpdateResponse,
  JavaComponentsUpdateOptionalParams,
  JavaComponentsUpdateResponse,
  JavaComponentsDeleteOptionalParams,
  JavaComponentsDeleteResponse,
  JavaComponentsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing JavaComponents operations. */
export class JavaComponentsImpl implements JavaComponents {
  private readonly client: ContainerAppsAPIClient;

  /**
   * Initialize a new instance of the class JavaComponents class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerAppsAPIClient) {
    this.client = client;
  }

  /**
   * Get the Java Components for a managed environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    environmentName: string,
    options?: JavaComponentsListOptionalParams,
  ): PagedAsyncIterableIterator<JavaComponent> {
    const iter = this.listPagingAll(
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
        return this.listPagingPage(
          resourceGroupName,
          environmentName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    environmentName: string,
    options?: JavaComponentsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<JavaComponent[]> {
    let result: JavaComponentsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, environmentName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
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

  private async *listPagingAll(
    resourceGroupName: string,
    environmentName: string,
    options?: JavaComponentsListOptionalParams,
  ): AsyncIterableIterator<JavaComponent> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      environmentName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get the Java Components for a managed environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    environmentName: string,
    options?: JavaComponentsListOptionalParams,
  ): Promise<JavaComponentsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, options },
      listOperationSpec,
    );
  }

  /**
   * Get a Java Component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsGetOptionalParams,
  ): Promise<JavaComponentsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, name, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a Java Component in a Managed Environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param javaComponentEnvelope Configuration details of the Java Component.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<JavaComponentsCreateOrUpdateResponse>,
      JavaComponentsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<JavaComponentsCreateOrUpdateResponse> => {
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
        name,
        javaComponentEnvelope,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      JavaComponentsCreateOrUpdateResponse,
      OperationState<JavaComponentsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a Java Component in a Managed Environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param javaComponentEnvelope Configuration details of the Java Component.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsCreateOrUpdateOptionalParams,
  ): Promise<JavaComponentsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      environmentName,
      name,
      javaComponentEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Patches a Java Component using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param javaComponentEnvelope Configuration details of the Java Component.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<JavaComponentsUpdateResponse>,
      JavaComponentsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<JavaComponentsUpdateResponse> => {
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
        name,
        javaComponentEnvelope,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      JavaComponentsUpdateResponse,
      OperationState<JavaComponentsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Patches a Java Component using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param javaComponentEnvelope Configuration details of the Java Component.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    javaComponentEnvelope: JavaComponent,
    options?: JavaComponentsUpdateOptionalParams,
  ): Promise<JavaComponentsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      environmentName,
      name,
      javaComponentEnvelope,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a Java Component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<JavaComponentsDeleteResponse>,
      JavaComponentsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<JavaComponentsDeleteResponse> => {
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
      args: { resourceGroupName, environmentName, name, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      JavaComponentsDeleteResponse,
      OperationState<JavaComponentsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a Java Component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param name Name of the Java Component.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: JavaComponentsDeleteOptionalParams,
  ): Promise<JavaComponentsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      environmentName,
      name,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param environmentName Name of the Managed Environment.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    environmentName: string,
    nextLink: string,
    options?: JavaComponentsListNextOptionalParams,
  ): Promise<JavaComponentsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, environmentName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JavaComponentsCollection,
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
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JavaComponent,
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
    Parameters.name,
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.JavaComponent,
    },
    201: {
      bodyMapper: Mappers.JavaComponent,
    },
    202: {
      bodyMapper: Mappers.JavaComponent,
    },
    204: {
      bodyMapper: Mappers.JavaComponent,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.javaComponentEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.JavaComponent,
    },
    201: {
      bodyMapper: Mappers.JavaComponent,
    },
    202: {
      bodyMapper: Mappers.JavaComponent,
    },
    204: {
      bodyMapper: Mappers.JavaComponent,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.javaComponentEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.JavaComponentsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.JavaComponentsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.JavaComponentsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.JavaComponentsDeleteHeaders,
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
    Parameters.name,
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JavaComponentsCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.environmentName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
