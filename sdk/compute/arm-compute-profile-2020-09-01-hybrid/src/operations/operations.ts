/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { Operations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ComputeManagementClient } from "../computeManagementClient.js";
import {
  ComputeOperationValue,
  OperationsListOptionalParams,
  OperationsListResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Operations operations. */
export class OperationsImpl implements Operations {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class Operations class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of compute operations.
   * @param options The options parameters.
   */
  public list(
    options?: OperationsListOptionalParams
  ): PagedAsyncIterableIterator<ComputeOperationValue> {
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
    options?: OperationsListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<ComputeOperationValue[]> {
    let result: OperationsListResponse;
    result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: OperationsListOptionalParams
  ): AsyncIterableIterator<ComputeOperationValue> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of compute operations.
   * @param options The options parameters.
   */
  private _list(
    options?: OperationsListOptionalParams
  ): Promise<OperationsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Compute/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComputeOperationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
