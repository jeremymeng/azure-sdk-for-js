/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Containers } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataBoxEdgeManagementClient } from "../dataBoxEdgeManagementClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  Container,
  ContainersListByStorageAccountNextOptionalParams,
  ContainersListByStorageAccountOptionalParams,
  ContainersListByStorageAccountResponse,
  ContainersGetOptionalParams,
  ContainersGetResponse,
  ContainersCreateOrUpdateOptionalParams,
  ContainersCreateOrUpdateResponse,
  ContainersDeleteOptionalParams,
  ContainersRefreshOptionalParams,
  ContainersListByStorageAccountNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Containers operations. */
export class ContainersImpl implements Containers {
  private readonly client: DataBoxEdgeManagementClient;

  /**
   * Initialize a new instance of the class Containers class.
   * @param client Reference to the service client
   */
  constructor(client: DataBoxEdgeManagementClient) {
    this.client = client;
  }

  /**
   * Lists all the containers of a storage Account in a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The storage Account name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  public listByStorageAccount(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: ContainersListByStorageAccountOptionalParams
  ): PagedAsyncIterableIterator<Container> {
    const iter = this.listByStorageAccountPagingAll(
      deviceName,
      storageAccountName,
      resourceGroupName,
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
        return this.listByStorageAccountPagingPage(
          deviceName,
          storageAccountName,
          resourceGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByStorageAccountPagingPage(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: ContainersListByStorageAccountOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Container[]> {
    let result: ContainersListByStorageAccountResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByStorageAccount(
        deviceName,
        storageAccountName,
        resourceGroupName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByStorageAccountNext(
        deviceName,
        storageAccountName,
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByStorageAccountPagingAll(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: ContainersListByStorageAccountOptionalParams
  ): AsyncIterableIterator<Container> {
    for await (const page of this.listByStorageAccountPagingPage(
      deviceName,
      storageAccountName,
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all the containers of a storage Account in a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The storage Account name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  private _listByStorageAccount(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: ContainersListByStorageAccountOptionalParams
  ): Promise<ContainersListByStorageAccountResponse> {
    return this.client.sendOperationRequest(
      { deviceName, storageAccountName, resourceGroupName, options },
      listByStorageAccountOperationSpec
    );
  }

  /**
   * Gets a container by name.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container Name
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersGetOptionalParams
  ): Promise<ContainersGetResponse> {
    return this.client.sendOperationRequest(
      {
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Creates a new container or updates an existing container on the device.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param container The container properties.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    container: Container,
    options?: ContainersCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ContainersCreateOrUpdateResponse>,
      ContainersCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<ContainersCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
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

    const lro = new LroImpl(
      sendOperation,
      {
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        container,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates a new container or updates an existing container on the device.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param container The container properties.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    container: Container,
    options?: ContainersCreateOrUpdateOptionalParams
  ): Promise<ContainersCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      deviceName,
      storageAccountName,
      containerName,
      resourceGroupName,
      container,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes the container on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDelete(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
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

    const lro = new LroImpl(
      sendOperation,
      {
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options
      },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the container on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      deviceName,
      storageAccountName,
      containerName,
      resourceGroupName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Refreshes the container metadata with the data from the cloud.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginRefresh(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersRefreshOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
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

    const lro = new LroImpl(
      sendOperation,
      {
        deviceName,
        storageAccountName,
        containerName,
        resourceGroupName,
        options
      },
      refreshOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Refreshes the container metadata with the data from the cloud.
   * @param deviceName The device name.
   * @param storageAccountName The Storage Account Name
   * @param containerName The container name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginRefreshAndWait(
    deviceName: string,
    storageAccountName: string,
    containerName: string,
    resourceGroupName: string,
    options?: ContainersRefreshOptionalParams
  ): Promise<void> {
    const poller = await this.beginRefresh(
      deviceName,
      storageAccountName,
      containerName,
      resourceGroupName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByStorageAccountNext
   * @param deviceName The device name.
   * @param storageAccountName The storage Account name.
   * @param resourceGroupName The resource group name.
   * @param nextLink The nextLink from the previous successful call to the ListByStorageAccount method.
   * @param options The options parameters.
   */
  private _listByStorageAccountNext(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    nextLink: string,
    options?: ContainersListByStorageAccountNextOptionalParams
  ): Promise<ContainersListByStorageAccountNextResponse> {
    return this.client.sendOperationRequest(
      { deviceName, storageAccountName, resourceGroupName, nextLink, options },
      listByStorageAccountNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByStorageAccountOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ContainerList
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
    Parameters.deviceName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Container
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
    Parameters.deviceName,
    Parameters.storageAccountName,
    Parameters.containerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Container
    },
    201: {
      bodyMapper: Mappers.Container
    },
    202: {
      bodyMapper: Mappers.Container
    },
    204: {
      bodyMapper: Mappers.Container
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.container,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName,
    Parameters.containerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName,
    Parameters.containerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const refreshOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}/containers/{containerName}/refresh",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName,
    Parameters.containerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByStorageAccountNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ContainerList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
