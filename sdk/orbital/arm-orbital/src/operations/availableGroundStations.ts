/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AvailableGroundStations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureOrbital } from "../azureOrbital.js";
import {
  AvailableGroundStation,
  AvailableGroundStationsListByCapabilityNextOptionalParams,
  CapabilityParameter,
  AvailableGroundStationsListByCapabilityOptionalParams,
  AvailableGroundStationsListByCapabilityResponse,
  AvailableGroundStationsListByCapabilityNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AvailableGroundStations operations. */
export class AvailableGroundStationsImpl implements AvailableGroundStations {
  private readonly client: AzureOrbital;

  /**
   * Initialize a new instance of the class AvailableGroundStations class.
   * @param client Reference to the service client
   */
  constructor(client: AzureOrbital) {
    this.client = client;
  }

  /**
   * Returns list of available ground stations.
   * @param capability Ground Station Capability.
   * @param options The options parameters.
   */
  public listByCapability(
    capability: CapabilityParameter,
    options?: AvailableGroundStationsListByCapabilityOptionalParams
  ): PagedAsyncIterableIterator<AvailableGroundStation> {
    const iter = this.listByCapabilityPagingAll(capability, options);
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
        return this.listByCapabilityPagingPage(capability, options, settings);
      }
    };
  }

  private async *listByCapabilityPagingPage(
    capability: CapabilityParameter,
    options?: AvailableGroundStationsListByCapabilityOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<AvailableGroundStation[]> {
    let result: AvailableGroundStationsListByCapabilityResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByCapability(capability, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByCapabilityNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByCapabilityPagingAll(
    capability: CapabilityParameter,
    options?: AvailableGroundStationsListByCapabilityOptionalParams
  ): AsyncIterableIterator<AvailableGroundStation> {
    for await (const page of this.listByCapabilityPagingPage(
      capability,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Returns list of available ground stations.
   * @param capability Ground Station Capability.
   * @param options The options parameters.
   */
  private _listByCapability(
    capability: CapabilityParameter,
    options?: AvailableGroundStationsListByCapabilityOptionalParams
  ): Promise<AvailableGroundStationsListByCapabilityResponse> {
    return this.client.sendOperationRequest(
      { capability, options },
      listByCapabilityOperationSpec
    );
  }

  /**
   * ListByCapabilityNext
   * @param nextLink The nextLink from the previous successful call to the ListByCapability method.
   * @param options The options parameters.
   */
  private _listByCapabilityNext(
    nextLink: string,
    options?: AvailableGroundStationsListByCapabilityNextOptionalParams
  ): Promise<AvailableGroundStationsListByCapabilityNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listByCapabilityNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByCapabilityOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/availableGroundStations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailableGroundStationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.capability],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByCapabilityNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailableGroundStationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
