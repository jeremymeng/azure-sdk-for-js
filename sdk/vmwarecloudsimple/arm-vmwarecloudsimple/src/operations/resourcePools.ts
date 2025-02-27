/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ResourcePools } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import {
  ResourcePool,
  ResourcePoolsListNextOptionalParams,
  ResourcePoolsListOptionalParams,
  ResourcePoolsListOperationResponse,
  ResourcePoolsGetOptionalParams,
  ResourcePoolsGetResponse,
  ResourcePoolsListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ResourcePools operations. */
export class ResourcePoolsImpl implements ResourcePools {
  private readonly client: VMwareCloudSimple;

  /**
   * Initialize a new instance of the class ResourcePools class.
   * @param client Reference to the service client
   */
  constructor(client: VMwareCloudSimple) {
    this.client = client;
  }

  /**
   * Returns list of resource pools in region for private cloud
   * @param regionId The region Id (westus, eastus)
   * @param pcName The private cloud name
   * @param options The options parameters.
   */
  public list(
    regionId: string,
    pcName: string,
    options?: ResourcePoolsListOptionalParams
  ): PagedAsyncIterableIterator<ResourcePool> {
    const iter = this.listPagingAll(regionId, pcName, options);
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
        return this.listPagingPage(regionId, pcName, options, settings);
      }
    };
  }

  private async *listPagingPage(
    regionId: string,
    pcName: string,
    options?: ResourcePoolsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ResourcePool[]> {
    let result: ResourcePoolsListOperationResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(regionId, pcName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        regionId,
        pcName,
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
    regionId: string,
    pcName: string,
    options?: ResourcePoolsListOptionalParams
  ): AsyncIterableIterator<ResourcePool> {
    for await (const page of this.listPagingPage(regionId, pcName, options)) {
      yield* page;
    }
  }

  /**
   * Returns list of resource pools in region for private cloud
   * @param regionId The region Id (westus, eastus)
   * @param pcName The private cloud name
   * @param options The options parameters.
   */
  private _list(
    regionId: string,
    pcName: string,
    options?: ResourcePoolsListOptionalParams
  ): Promise<ResourcePoolsListOperationResponse> {
    return this.client.sendOperationRequest(
      { regionId, pcName, options },
      listOperationSpec
    );
  }

  /**
   * Returns resource pool templates by its name
   * @param regionId The region Id (westus, eastus)
   * @param pcName The private cloud name
   * @param resourcePoolName resource pool id (vsphereId)
   * @param options The options parameters.
   */
  get(
    regionId: string,
    pcName: string,
    resourcePoolName: string,
    options?: ResourcePoolsGetOptionalParams
  ): Promise<ResourcePoolsGetResponse> {
    return this.client.sendOperationRequest(
      { regionId, pcName, resourcePoolName, options },
      getOperationSpec
    );
  }

  /**
   * ListNext
   * @param regionId The region Id (westus, eastus)
   * @param pcName The private cloud name
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    regionId: string,
    pcName: string,
    nextLink: string,
    options?: ResourcePoolsListNextOptionalParams
  ): Promise<ResourcePoolsListNextResponse> {
    return this.client.sendOperationRequest(
      { regionId, pcName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/resourcePools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourcePoolsListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.pcName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/resourcePools/{resourcePoolName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourcePool
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.pcName,
    Parameters.resourcePoolName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourcePoolsListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.nextLink,
    Parameters.pcName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
