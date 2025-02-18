/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AutonomousDatabaseCharacterSets } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { OracleDatabaseManagementClient } from "../oracleDatabaseManagementClient.js";
import {
  AutonomousDatabaseCharacterSet,
  AutonomousDatabaseCharacterSetsListByLocationNextOptionalParams,
  AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  AutonomousDatabaseCharacterSetsListByLocationResponse,
  AutonomousDatabaseCharacterSetsGetOptionalParams,
  AutonomousDatabaseCharacterSetsGetResponse,
  AutonomousDatabaseCharacterSetsListByLocationNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AutonomousDatabaseCharacterSets operations. */
export class AutonomousDatabaseCharacterSetsImpl
  implements AutonomousDatabaseCharacterSets
{
  private readonly client: OracleDatabaseManagementClient;

  /**
   * Initialize a new instance of the class AutonomousDatabaseCharacterSets class.
   * @param client Reference to the service client
   */
  constructor(client: OracleDatabaseManagementClient) {
    this.client = client;
  }

  /**
   * List AutonomousDatabaseCharacterSet resources by Location
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  ): PagedAsyncIterableIterator<AutonomousDatabaseCharacterSet> {
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
    options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AutonomousDatabaseCharacterSet[]> {
    let result: AutonomousDatabaseCharacterSetsListByLocationResponse;
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
    options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  ): AsyncIterableIterator<AutonomousDatabaseCharacterSet> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * List AutonomousDatabaseCharacterSet resources by Location
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  ): Promise<AutonomousDatabaseCharacterSetsListByLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      listByLocationOperationSpec,
    );
  }

  /**
   * Get a AutonomousDatabaseCharacterSet
   * @param location The name of the Azure region.
   * @param adbscharsetname AutonomousDatabaseCharacterSet name
   * @param options The options parameters.
   */
  get(
    location: string,
    adbscharsetname: string,
    options?: AutonomousDatabaseCharacterSetsGetOptionalParams,
  ): Promise<AutonomousDatabaseCharacterSetsGetResponse> {
    return this.client.sendOperationRequest(
      { location, adbscharsetname, options },
      getOperationSpec,
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
    options?: AutonomousDatabaseCharacterSetsListByLocationNextOptionalParams,
  ): Promise<AutonomousDatabaseCharacterSetsListByLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      listByLocationNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseCharacterSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutonomousDatabaseCharacterSetListResult,
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
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseCharacterSets/{adbscharsetname}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutonomousDatabaseCharacterSet,
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
    Parameters.adbscharsetname,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutonomousDatabaseCharacterSetListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.location,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
