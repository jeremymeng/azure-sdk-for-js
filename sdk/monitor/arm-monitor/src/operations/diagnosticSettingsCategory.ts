/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { DiagnosticSettingsCategory } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MonitorClient } from "../monitorClient";
import {
  DiagnosticSettingsCategoryResource,
  DiagnosticSettingsCategoryListOptionalParams,
  DiagnosticSettingsCategoryListResponse,
  DiagnosticSettingsCategoryGetOptionalParams,
  DiagnosticSettingsCategoryGetResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DiagnosticSettingsCategory operations. */
export class DiagnosticSettingsCategoryImpl
  implements DiagnosticSettingsCategory {
  private readonly client: MonitorClient;

  /**
   * Initialize a new instance of the class DiagnosticSettingsCategory class.
   * @param client Reference to the service client
   */
  constructor(client: MonitorClient) {
    this.client = client;
  }

  /**
   * Lists the diagnostic settings categories for the specified resource.
   * @param resourceUri The identifier of the resource.
   * @param options The options parameters.
   */
  public list(
    resourceUri: string,
    options?: DiagnosticSettingsCategoryListOptionalParams
  ): PagedAsyncIterableIterator<DiagnosticSettingsCategoryResource> {
    const iter = this.listPagingAll(resourceUri, options);
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
        return this.listPagingPage(resourceUri, options, settings);
      }
    };
  }

  private async *listPagingPage(
    resourceUri: string,
    options?: DiagnosticSettingsCategoryListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<DiagnosticSettingsCategoryResource[]> {
    let result: DiagnosticSettingsCategoryListResponse;
    result = await this._list(resourceUri, options);
    yield result.value || [];
  }

  private async *listPagingAll(
    resourceUri: string,
    options?: DiagnosticSettingsCategoryListOptionalParams
  ): AsyncIterableIterator<DiagnosticSettingsCategoryResource> {
    for await (const page of this.listPagingPage(resourceUri, options)) {
      yield* page;
    }
  }

  /**
   * Gets the diagnostic settings category for the specified resource.
   * @param resourceUri The identifier of the resource.
   * @param name The name of the diagnostic setting.
   * @param options The options parameters.
   */
  get(
    resourceUri: string,
    name: string,
    options?: DiagnosticSettingsCategoryGetOptionalParams
  ): Promise<DiagnosticSettingsCategoryGetResponse> {
    return this.client.sendOperationRequest(
      { resourceUri, name, options },
      getOperationSpec
    );
  }

  /**
   * Lists the diagnostic settings categories for the specified resource.
   * @param resourceUri The identifier of the resource.
   * @param options The options parameters.
   */
  private _list(
    resourceUri: string,
    options?: DiagnosticSettingsCategoryListOptionalParams
  ): Promise<DiagnosticSettingsCategoryListResponse> {
    return this.client.sendOperationRequest(
      { resourceUri, options },
      listOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/{resourceUri}/providers/Microsoft.Insights/diagnosticSettingsCategories/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiagnosticSettingsCategoryResource
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [Parameters.$host, Parameters.resourceUri, Parameters.name],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/{resourceUri}/providers/Microsoft.Insights/diagnosticSettingsCategories",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiagnosticSettingsCategoryResourceCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [Parameters.$host, Parameters.resourceUri],
  headerParameters: [Parameters.accept],
  serializer
};
