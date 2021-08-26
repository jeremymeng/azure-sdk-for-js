/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/accountMappers";
import * as Parameters from "../models/parameters";
import { BatchServiceClientContext } from "../batchServiceClientContext";

/** Class representing a Account. */
export class Account {
  private readonly client: BatchServiceClientContext;

  /**
   * Create a Account.
   * @param {BatchServiceClientContext} client Reference to the service client.
   */
  constructor(client: BatchServiceClientContext) {
    this.client = client;
  }

  /**
   * @summary Lists all Virtual Machine Images supported by the Azure Batch service.
   * @param [options] The optional parameters
   * @returns Promise<Models.AccountListSupportedImagesResponse>
   */
  listSupportedImages(
    options?: Models.AccountListSupportedImagesOptionalParams
  ): Promise<Models.AccountListSupportedImagesResponse>;
  /**
   * @param callback The callback
   */
  listSupportedImages(
    callback: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listSupportedImages(
    options: Models.AccountListSupportedImagesOptionalParams,
    callback: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): void;
  listSupportedImages(
    options?:
      | Models.AccountListSupportedImagesOptionalParams
      | msRest.ServiceCallback<Models.AccountListSupportedImagesResult>,
    callback?: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): Promise<Models.AccountListSupportedImagesResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listSupportedImagesOperationSpec,
      callback
    ) as Promise<Models.AccountListSupportedImagesResponse>;
  }

  /**
   * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the numbers returned
   * may not always be up to date. If you need exact node counts, use a list query.
   * @param [options] The optional parameters
   * @returns Promise<Models.AccountListPoolNodeCountsResponse>
   */
  listPoolNodeCounts(
    options?: Models.AccountListPoolNodeCountsOptionalParams
  ): Promise<Models.AccountListPoolNodeCountsResponse>;
  /**
   * @param callback The callback
   */
  listPoolNodeCounts(callback: msRest.ServiceCallback<Models.PoolNodeCountsListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listPoolNodeCounts(
    options: Models.AccountListPoolNodeCountsOptionalParams,
    callback: msRest.ServiceCallback<Models.PoolNodeCountsListResult>
  ): void;
  listPoolNodeCounts(
    options?:
      | Models.AccountListPoolNodeCountsOptionalParams
      | msRest.ServiceCallback<Models.PoolNodeCountsListResult>,
    callback?: msRest.ServiceCallback<Models.PoolNodeCountsListResult>
  ): Promise<Models.AccountListPoolNodeCountsResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listPoolNodeCountsOperationSpec,
      callback
    ) as Promise<Models.AccountListPoolNodeCountsResponse>;
  }

  /**
   * @summary Lists all Virtual Machine Images supported by the Azure Batch service.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.AccountListSupportedImagesResponse>
   */
  listSupportedImagesNext(
    nextPageLink: string,
    options?: Models.AccountListSupportedImagesNextOptionalParams
  ): Promise<Models.AccountListSupportedImagesResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listSupportedImagesNext(
    nextPageLink: string,
    callback: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listSupportedImagesNext(
    nextPageLink: string,
    options: Models.AccountListSupportedImagesNextOptionalParams,
    callback: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): void;
  listSupportedImagesNext(
    nextPageLink: string,
    options?:
      | Models.AccountListSupportedImagesNextOptionalParams
      | msRest.ServiceCallback<Models.AccountListSupportedImagesResult>,
    callback?: msRest.ServiceCallback<Models.AccountListSupportedImagesResult>
  ): Promise<Models.AccountListSupportedImagesResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listSupportedImagesNextOperationSpec,
      callback
    ) as Promise<Models.AccountListSupportedImagesResponse>;
  }

  /**
   * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the numbers returned
   * may not always be up to date. If you need exact node counts, use a list query.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.AccountListPoolNodeCountsResponse>
   */
  listPoolNodeCountsNext(
    nextPageLink: string,
    options?: Models.AccountListPoolNodeCountsNextOptionalParams
  ): Promise<Models.AccountListPoolNodeCountsResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listPoolNodeCountsNext(
    nextPageLink: string,
    callback: msRest.ServiceCallback<Models.PoolNodeCountsListResult>
  ): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listPoolNodeCountsNext(
    nextPageLink: string,
    options: Models.AccountListPoolNodeCountsNextOptionalParams,
    callback: msRest.ServiceCallback<Models.PoolNodeCountsListResult>
  ): void;
  listPoolNodeCountsNext(
    nextPageLink: string,
    options?:
      | Models.AccountListPoolNodeCountsNextOptionalParams
      | msRest.ServiceCallback<Models.PoolNodeCountsListResult>,
    callback?: msRest.ServiceCallback<Models.PoolNodeCountsListResult>
  ): Promise<Models.AccountListPoolNodeCountsResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listPoolNodeCountsNextOperationSpec,
      callback
    ) as Promise<Models.AccountListPoolNodeCountsResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listSupportedImagesOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "supportedimages",
  urlParameters: [Parameters.batchUrl],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter2,
    Parameters.maxResults3,
    Parameters.timeout17
  ],
  headerParameters: [
    Parameters.acceptLanguage,
    Parameters.clientRequestId20,
    Parameters.returnClientRequestId20,
    Parameters.ocpDate20
  ],
  responses: {
    200: {
      bodyMapper: Mappers.AccountListSupportedImagesResult,
      headersMapper: Mappers.AccountListSupportedImagesHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError,
      headersMapper: Mappers.AccountListSupportedImagesHeaders
    }
  },
  serializer
};

const listPoolNodeCountsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "nodecounts",
  urlParameters: [Parameters.batchUrl],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter3,
    Parameters.maxResults4,
    Parameters.timeout18
  ],
  headerParameters: [
    Parameters.acceptLanguage,
    Parameters.clientRequestId21,
    Parameters.returnClientRequestId21,
    Parameters.ocpDate21
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PoolNodeCountsListResult,
      headersMapper: Mappers.AccountListPoolNodeCountsHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError,
      headersMapper: Mappers.AccountListPoolNodeCountsHeaders
    }
  },
  serializer
};

const listSupportedImagesNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "{batchUrl}",
  path: "{nextLink}",
  urlParameters: [Parameters.nextPageLink],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [
    Parameters.acceptLanguage,
    Parameters.clientRequestId22,
    Parameters.returnClientRequestId22,
    Parameters.ocpDate22
  ],
  responses: {
    200: {
      bodyMapper: Mappers.AccountListSupportedImagesResult,
      headersMapper: Mappers.AccountListSupportedImagesHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError,
      headersMapper: Mappers.AccountListSupportedImagesHeaders
    }
  },
  serializer
};

const listPoolNodeCountsNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "{batchUrl}",
  path: "{nextLink}",
  urlParameters: [Parameters.nextPageLink],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [
    Parameters.acceptLanguage,
    Parameters.clientRequestId23,
    Parameters.returnClientRequestId23,
    Parameters.ocpDate23
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PoolNodeCountsListResult,
      headersMapper: Mappers.AccountListPoolNodeCountsHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError,
      headersMapper: Mappers.AccountListPoolNodeCountsHeaders
    }
  },
  serializer
};
