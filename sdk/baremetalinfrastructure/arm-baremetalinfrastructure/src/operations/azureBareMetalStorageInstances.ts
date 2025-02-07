/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AzureBareMetalStorageInstances } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { BareMetalInfrastructureClient } from "../bareMetalInfrastructureClient.js";
import {
  AzureBareMetalStorageInstance,
  AzureBareMetalStorageInstancesListBySubscriptionNextOptionalParams,
  AzureBareMetalStorageInstancesListBySubscriptionOptionalParams,
  AzureBareMetalStorageInstancesListBySubscriptionResponse,
  AzureBareMetalStorageInstancesListByResourceGroupNextOptionalParams,
  AzureBareMetalStorageInstancesListByResourceGroupOptionalParams,
  AzureBareMetalStorageInstancesListByResourceGroupResponse,
  AzureBareMetalStorageInstancesGetOptionalParams,
  AzureBareMetalStorageInstancesGetResponse,
  AzureBareMetalStorageInstancesCreateOptionalParams,
  AzureBareMetalStorageInstancesCreateResponse,
  Tags,
  AzureBareMetalStorageInstancesUpdateOptionalParams,
  AzureBareMetalStorageInstancesUpdateResponse,
  AzureBareMetalStorageInstancesDeleteOptionalParams,
  AzureBareMetalStorageInstancesListBySubscriptionNextResponse,
  AzureBareMetalStorageInstancesListByResourceGroupNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AzureBareMetalStorageInstances operations. */
export class AzureBareMetalStorageInstancesImpl
  implements AzureBareMetalStorageInstances {
  private readonly client: BareMetalInfrastructureClient;

  /**
   * Initialize a new instance of the class AzureBareMetalStorageInstances class.
   * @param client Reference to the service client
   */
  constructor(client: BareMetalInfrastructureClient) {
    this.client = client;
  }

  /**
   * Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns
   * various properties of each Azure Bare Metal Instance.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: AzureBareMetalStorageInstancesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<AzureBareMetalStorageInstance> {
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
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: AzureBareMetalStorageInstancesListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<AzureBareMetalStorageInstance[]> {
    let result: AzureBareMetalStorageInstancesListBySubscriptionResponse;
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
    options?: AzureBareMetalStorageInstancesListBySubscriptionOptionalParams
  ): AsyncIterableIterator<AzureBareMetalStorageInstance> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of AzureBareMetalStorage instances in the specified subscription and resource group. The
   * operations returns various properties of each Azure Bare Metal Instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: AzureBareMetalStorageInstancesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<AzureBareMetalStorageInstance> {
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
          settings
        );
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: AzureBareMetalStorageInstancesListByResourceGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<AzureBareMetalStorageInstance[]> {
    let result: AzureBareMetalStorageInstancesListByResourceGroupResponse;
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
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: AzureBareMetalStorageInstancesListByResourceGroupOptionalParams
  ): AsyncIterableIterator<AzureBareMetalStorageInstance> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns
   * various properties of each Azure Bare Metal Instance.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: AzureBareMetalStorageInstancesListBySubscriptionOptionalParams
  ): Promise<AzureBareMetalStorageInstancesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * Gets a list of AzureBareMetalStorage instances in the specified subscription and resource group. The
   * operations returns various properties of each Azure Bare Metal Instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: AzureBareMetalStorageInstancesListByResourceGroupOptionalParams
  ): Promise<AzureBareMetalStorageInstancesListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Gets an Azure Bare Metal Storage instance for the specified subscription, resource group, and
   * instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureBareMetalStorageInstanceName Name of the Azure Bare Metal Storage Instance, also known
   *                                          as the ResourceName.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    azureBareMetalStorageInstanceName: string,
    options?: AzureBareMetalStorageInstancesGetOptionalParams
  ): Promise<AzureBareMetalStorageInstancesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, azureBareMetalStorageInstanceName, options },
      getOperationSpec
    );
  }

  /**
   * Create an azure bare metal storage resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureBareMetalStorageInstanceName Name of the Azure Bare Metal Storage Instance, also known
   *                                          as the ResourceName.
   * @param requestBodyParameters request body for put call
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    azureBareMetalStorageInstanceName: string,
    requestBodyParameters: AzureBareMetalStorageInstance,
    options?: AzureBareMetalStorageInstancesCreateOptionalParams
  ): Promise<AzureBareMetalStorageInstancesCreateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        azureBareMetalStorageInstanceName,
        requestBodyParameters,
        options
      },
      createOperationSpec
    );
  }

  /**
   * Patches the Tags field of a Azure Bare Metal Storage instance for the specified subscription,
   * resource group, and instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureBareMetalStorageInstanceName Name of the Azure Bare Metal Storage Instance, also known
   *                                          as the ResourceName.
   * @param tagsParameter Request body that only contains the new Tags field
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    azureBareMetalStorageInstanceName: string,
    tagsParameter: Tags,
    options?: AzureBareMetalStorageInstancesUpdateOptionalParams
  ): Promise<AzureBareMetalStorageInstancesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        azureBareMetalStorageInstanceName,
        tagsParameter,
        options
      },
      updateOperationSpec
    );
  }

  /**
   * Delete an AzureBareMetalStorageInstance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureBareMetalStorageInstanceName Name of the Azure Bare Metal Storage Instance, also known
   *                                          as the ResourceName.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    azureBareMetalStorageInstanceName: string,
    options?: AzureBareMetalStorageInstancesDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, azureBareMetalStorageInstanceName, options },
      deleteOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: AzureBareMetalStorageInstancesListBySubscriptionNextOptionalParams
  ): Promise<AzureBareMetalStorageInstancesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
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
    options?: AzureBareMetalStorageInstancesListByResourceGroupNextOptionalParams
  ): Promise<AzureBareMetalStorageInstancesListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstancesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstancesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstance
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureBareMetalStorageInstanceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstance
    },
    201: {
      bodyMapper: Mappers.AzureBareMetalStorageInstance
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.requestBodyParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureBareMetalStorageInstanceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstance
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.tagsParameter,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureBareMetalStorageInstanceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.azureBareMetalStorageInstanceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstancesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBareMetalStorageInstancesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
