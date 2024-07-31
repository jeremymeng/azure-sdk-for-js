/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { FetchSecondaryRecoveryPoints } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DataProtectionClient } from "../dataProtectionClient";
import {
  AzureBackupRecoveryPointResource,
  FetchSecondaryRPsRequestParameters,
  FetchSecondaryRecoveryPointsListNextOptionalParams,
  FetchSecondaryRecoveryPointsListOptionalParams,
  FetchSecondaryRecoveryPointsListResponse,
  FetchSecondaryRecoveryPointsListNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing FetchSecondaryRecoveryPoints operations. */
export class FetchSecondaryRecoveryPointsImpl
  implements FetchSecondaryRecoveryPoints
{
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class FetchSecondaryRecoveryPoints class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * Returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross
   * Region Restore.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param location The name of the Azure region.
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    location: string,
    parameters: FetchSecondaryRPsRequestParameters,
    options?: FetchSecondaryRecoveryPointsListOptionalParams,
  ): PagedAsyncIterableIterator<AzureBackupRecoveryPointResource> {
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
    parameters: FetchSecondaryRPsRequestParameters,
    options?: FetchSecondaryRecoveryPointsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AzureBackupRecoveryPointResource[]> {
    let result: FetchSecondaryRecoveryPointsListResponse;
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
    parameters: FetchSecondaryRPsRequestParameters,
    options?: FetchSecondaryRecoveryPointsListOptionalParams,
  ): AsyncIterableIterator<AzureBackupRecoveryPointResource> {
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
   * Returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross
   * Region Restore.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param location The name of the Azure region.
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    location: string,
    parameters: FetchSecondaryRPsRequestParameters,
    options?: FetchSecondaryRecoveryPointsListOptionalParams,
  ): Promise<FetchSecondaryRecoveryPointsListResponse> {
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
    parameters: FetchSecondaryRPsRequestParameters,
    nextLink: string,
    options?: FetchSecondaryRecoveryPointsListNextOptionalParams,
  ): Promise<FetchSecondaryRecoveryPointsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, location, parameters, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchSecondaryRecoveryPoints",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBackupRecoveryPointResourceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters16,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.skipToken,
  ],
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
      bodyMapper: Mappers.AzureBackupRecoveryPointResourceList,
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
