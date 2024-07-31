/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { DbSystemShapes } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { OracleDatabaseManagementClient } from "../oracleDatabaseManagementClient";
import {
  DbSystemShape,
  DbSystemShapesListByLocationNextOptionalParams,
  DbSystemShapesListByLocationOptionalParams,
  DbSystemShapesListByLocationResponse,
  DbSystemShapesGetOptionalParams,
  DbSystemShapesGetResponse,
  DbSystemShapesListByLocationNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DbSystemShapes operations. */
export class DbSystemShapesImpl implements DbSystemShapes {
  private readonly client: OracleDatabaseManagementClient;

  /**
   * Initialize a new instance of the class DbSystemShapes class.
   * @param client Reference to the service client
   */
  constructor(client: OracleDatabaseManagementClient) {
    this.client = client;
  }

  /**
   * List DbSystemShape resources by Location
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: DbSystemShapesListByLocationOptionalParams,
  ): PagedAsyncIterableIterator<DbSystemShape> {
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
    options?: DbSystemShapesListByLocationOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DbSystemShape[]> {
    let result: DbSystemShapesListByLocationResponse;
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
    options?: DbSystemShapesListByLocationOptionalParams,
  ): AsyncIterableIterator<DbSystemShape> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * List DbSystemShape resources by Location
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: DbSystemShapesListByLocationOptionalParams,
  ): Promise<DbSystemShapesListByLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      listByLocationOperationSpec,
    );
  }

  /**
   * Get a DbSystemShape
   * @param location The name of the Azure region.
   * @param dbsystemshapename DbSystemShape name
   * @param options The options parameters.
   */
  get(
    location: string,
    dbsystemshapename: string,
    options?: DbSystemShapesGetOptionalParams,
  ): Promise<DbSystemShapesGetResponse> {
    return this.client.sendOperationRequest(
      { location, dbsystemshapename, options },
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
    options?: DbSystemShapesListByLocationNextOptionalParams,
  ): Promise<DbSystemShapesListByLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      listByLocationNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemShapes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbSystemShapeListResult,
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
  path: "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemShapes/{dbsystemshapename}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbSystemShape,
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
    Parameters.dbsystemshapename,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbSystemShapeListResult,
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
