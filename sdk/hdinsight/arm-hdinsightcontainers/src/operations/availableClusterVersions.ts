/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AvailableClusterVersions } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { HDInsightContainersManagementClient } from "../hDInsightContainersManagementClient.js";
import {
  ClusterVersion,
  AvailableClusterVersionsListByLocationNextOptionalParams,
  AvailableClusterVersionsListByLocationOptionalParams,
  AvailableClusterVersionsListByLocationResponse,
  AvailableClusterVersionsListByLocationNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AvailableClusterVersions operations. */
export class AvailableClusterVersionsImpl implements AvailableClusterVersions {
  private readonly client: HDInsightContainersManagementClient;

  /**
   * Initialize a new instance of the class AvailableClusterVersions class.
   * @param client Reference to the service client
   */
  constructor(client: HDInsightContainersManagementClient) {
    this.client = client;
  }

  /**
   * Returns a list of available cluster versions.
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: AvailableClusterVersionsListByLocationOptionalParams,
  ): PagedAsyncIterableIterator<ClusterVersion> {
    const iter = this.listByLocationPagingAll(location, options);
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
        return this.listByLocationPagingPage(location, options, settings);
      },
    };
  }

  private async *listByLocationPagingPage(
    location: string,
    options?: AvailableClusterVersionsListByLocationOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ClusterVersion[]> {
    let result: AvailableClusterVersionsListByLocationResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByLocation(location, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByLocationNext(
        location,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByLocationPagingAll(
    location: string,
    options?: AvailableClusterVersionsListByLocationOptionalParams,
  ): AsyncIterableIterator<ClusterVersion> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Returns a list of available cluster versions.
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: AvailableClusterVersionsListByLocationOptionalParams,
  ): Promise<AvailableClusterVersionsListByLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      listByLocationOperationSpec,
    );
  }

  /**
   * ListByLocationNext
   * @param location The name of the Azure region.
   * @param nextLink The nextLink from the previous successful call to the ListByLocation method.
   * @param options The options parameters.
   */
  private _listByLocationNext(
    location: string,
    nextLink: string,
    options?: AvailableClusterVersionsListByLocationNextOptionalParams,
  ): Promise<AvailableClusterVersionsListByLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      listByLocationNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/availableClusterVersions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ClusterVersionsListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ClusterVersionsListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
