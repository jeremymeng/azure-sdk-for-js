/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { OrganizationOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ConfluentManagementClient } from "../confluentManagementClient";
import {
  OperationResult,
  OrganizationOperationsListNextOptionalParams,
  OrganizationOperationsListOptionalParams,
  OrganizationOperationsListResponse,
  OrganizationOperationsListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing OrganizationOperations operations. */
export class OrganizationOperationsImpl implements OrganizationOperations {
  private readonly client: ConfluentManagementClient;

  /**
   * Initialize a new instance of the class OrganizationOperations class.
   * @param client Reference to the service client
   */
  constructor(client: ConfluentManagementClient) {
    this.client = client;
  }

  /**
   * List all operations provided by Microsoft.Confluent.
   * @param options The options parameters.
   */
  public list(
    options?: OrganizationOperationsListOptionalParams
  ): PagedAsyncIterableIterator<OperationResult> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: OrganizationOperationsListOptionalParams
  ): AsyncIterableIterator<OperationResult[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: OrganizationOperationsListOptionalParams
  ): AsyncIterableIterator<OperationResult> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List all operations provided by Microsoft.Confluent.
   * @param options The options parameters.
   */
  private _list(
    options?: OrganizationOperationsListOptionalParams
  ): Promise<OrganizationOperationsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: OrganizationOperationsListNextOptionalParams
  ): Promise<OrganizationOperationsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Confluent/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
