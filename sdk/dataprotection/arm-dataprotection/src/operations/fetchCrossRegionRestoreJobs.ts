/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { FetchCrossRegionRestoreJobs } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataProtectionClient } from "../dataProtectionClient.js";
import {
  AzureBackupJobResource,
  CrossRegionRestoreJobsRequest,
  FetchCrossRegionRestoreJobsListNextOptionalParams,
  FetchCrossRegionRestoreJobsListOptionalParams,
  FetchCrossRegionRestoreJobsListResponse,
  FetchCrossRegionRestoreJobsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing FetchCrossRegionRestoreJobs operations. */
export class FetchCrossRegionRestoreJobsImpl
  implements FetchCrossRegionRestoreJobs
{
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class FetchCrossRegionRestoreJobs class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * Fetches list of Cross Region Restore job belonging to the vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param location The name of the Azure region.
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    options?: FetchCrossRegionRestoreJobsListOptionalParams,
  ): PagedAsyncIterableIterator<AzureBackupJobResource> {
    const iter = this.listPagingAll(
      resourceGroupName,
      location,
      parameters,
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
          location,
          parameters,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    options?: FetchCrossRegionRestoreJobsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AzureBackupJobResource[]> {
    let result: FetchCrossRegionRestoreJobsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        location,
        parameters,
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
        location,
        parameters,
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
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    options?: FetchCrossRegionRestoreJobsListOptionalParams,
  ): AsyncIterableIterator<AzureBackupJobResource> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      location,
      parameters,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Fetches list of Cross Region Restore job belonging to the vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param location The name of the Azure region.
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    options?: FetchCrossRegionRestoreJobsListOptionalParams,
  ): Promise<FetchCrossRegionRestoreJobsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, location, parameters, options },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param location The name of the Azure region.
   * @param parameters Request body for operation
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobsRequest,
    nextLink: string,
    options?: FetchCrossRegionRestoreJobsListNextOptionalParams,
  ): Promise<FetchCrossRegionRestoreJobsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, location, parameters, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJobs",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBackupJobResourceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters18,
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBackupJobResourceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.location1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
