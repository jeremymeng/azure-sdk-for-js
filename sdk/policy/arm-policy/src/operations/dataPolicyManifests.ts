/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { DataPolicyManifests } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { PolicyClient } from "../policyClient";
import {
  DataPolicyManifest,
  DataPolicyManifestsListNextOptionalParams,
  DataPolicyManifestsListOptionalParams,
  DataPolicyManifestsListResponse,
  DataPolicyManifestsGetByPolicyModeOptionalParams,
  DataPolicyManifestsGetByPolicyModeResponse,
  DataPolicyManifestsListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DataPolicyManifests operations. */
export class DataPolicyManifestsImpl implements DataPolicyManifests {
  private readonly client: PolicyClient;

  /**
   * Initialize a new instance of the class DataPolicyManifests class.
   * @param client Reference to the service client
   */
  constructor(client: PolicyClient) {
    this.client = client;
  }

  /**
   * This operation retrieves a list of all the data policy manifests that match the optional given
   * $filter. Valid values for $filter are: "$filter=namespace eq '{0}'". If $filter is not provided, the
   * unfiltered list includes all data policy manifests for data resource types. If $filter=namespace is
   * provided, the returned list only includes all data policy manifests that have a namespace matching
   * the provided value.
   * @param options The options parameters.
   */
  public list(
    options?: DataPolicyManifestsListOptionalParams
  ): PagedAsyncIterableIterator<DataPolicyManifest> {
    const iter = this.listPagingAll(options);
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
        return this.listPagingPage(options, settings);
      }
    };
  }

  private async *listPagingPage(
    options?: DataPolicyManifestsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<DataPolicyManifest[]> {
    let result: DataPolicyManifestsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    options?: DataPolicyManifestsListOptionalParams
  ): AsyncIterableIterator<DataPolicyManifest> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * This operation retrieves the data policy manifest with the given policy mode.
   * @param policyMode The policy mode of the data policy manifest to get.
   * @param options The options parameters.
   */
  getByPolicyMode(
    policyMode: string,
    options?: DataPolicyManifestsGetByPolicyModeOptionalParams
  ): Promise<DataPolicyManifestsGetByPolicyModeResponse> {
    return this.client.sendOperationRequest(
      { policyMode, options },
      getByPolicyModeOperationSpec
    );
  }

  /**
   * This operation retrieves a list of all the data policy manifests that match the optional given
   * $filter. Valid values for $filter are: "$filter=namespace eq '{0}'". If $filter is not provided, the
   * unfiltered list includes all data policy manifests for data resource types. If $filter=namespace is
   * provided, the returned list only includes all data policy manifests that have a namespace matching
   * the provided value.
   * @param options The options parameters.
   */
  private _list(
    options?: DataPolicyManifestsListOptionalParams
  ): Promise<DataPolicyManifestsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: DataPolicyManifestsListNextOptionalParams
  ): Promise<DataPolicyManifestsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getByPolicyModeOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Authorization/dataPolicyManifests/{policyMode}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataPolicyManifest
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.policyMode],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Authorization/dataPolicyManifests",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataPolicyManifestListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataPolicyManifestListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
