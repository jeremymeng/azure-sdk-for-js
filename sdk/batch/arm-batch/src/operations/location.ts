/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Location } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BatchManagementClient } from "../batchManagementClient";
import {
  SupportedSku,
  LocationListSupportedVirtualMachineSkusNextOptionalParams,
  LocationListSupportedVirtualMachineSkusOptionalParams,
  LocationListSupportedCloudServiceSkusNextOptionalParams,
  LocationListSupportedCloudServiceSkusOptionalParams,
  LocationGetQuotasOptionalParams,
  LocationGetQuotasResponse,
  LocationListSupportedVirtualMachineSkusResponse,
  LocationListSupportedCloudServiceSkusResponse,
  CheckNameAvailabilityParameters,
  LocationCheckNameAvailabilityOptionalParams,
  LocationCheckNameAvailabilityResponse,
  LocationListSupportedVirtualMachineSkusNextResponse,
  LocationListSupportedCloudServiceSkusNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Location operations. */
export class LocationImpl implements Location {
  private readonly client: BatchManagementClient;

  /**
   * Initialize a new instance of the class Location class.
   * @param client Reference to the service client
   */
  constructor(client: BatchManagementClient) {
    this.client = client;
  }

  /**
   * Gets the list of Batch supported Virtual Machine VM sizes available at the given location.
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param options The options parameters.
   */
  public listSupportedVirtualMachineSkus(
    locationName: string,
    options?: LocationListSupportedVirtualMachineSkusOptionalParams
  ): PagedAsyncIterableIterator<SupportedSku> {
    const iter = this.listSupportedVirtualMachineSkusPagingAll(
      locationName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listSupportedVirtualMachineSkusPagingPage(
          locationName,
          options
        );
      }
    };
  }

  private async *listSupportedVirtualMachineSkusPagingPage(
    locationName: string,
    options?: LocationListSupportedVirtualMachineSkusOptionalParams
  ): AsyncIterableIterator<SupportedSku[]> {
    let result = await this._listSupportedVirtualMachineSkus(
      locationName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listSupportedVirtualMachineSkusNext(
        locationName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listSupportedVirtualMachineSkusPagingAll(
    locationName: string,
    options?: LocationListSupportedVirtualMachineSkusOptionalParams
  ): AsyncIterableIterator<SupportedSku> {
    for await (const page of this.listSupportedVirtualMachineSkusPagingPage(
      locationName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets the list of Batch supported Cloud Service VM sizes available at the given location.
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param options The options parameters.
   */
  public listSupportedCloudServiceSkus(
    locationName: string,
    options?: LocationListSupportedCloudServiceSkusOptionalParams
  ): PagedAsyncIterableIterator<SupportedSku> {
    const iter = this.listSupportedCloudServiceSkusPagingAll(
      locationName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listSupportedCloudServiceSkusPagingPage(
          locationName,
          options
        );
      }
    };
  }

  private async *listSupportedCloudServiceSkusPagingPage(
    locationName: string,
    options?: LocationListSupportedCloudServiceSkusOptionalParams
  ): AsyncIterableIterator<SupportedSku[]> {
    let result = await this._listSupportedCloudServiceSkus(
      locationName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listSupportedCloudServiceSkusNext(
        locationName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listSupportedCloudServiceSkusPagingAll(
    locationName: string,
    options?: LocationListSupportedCloudServiceSkusOptionalParams
  ): AsyncIterableIterator<SupportedSku> {
    for await (const page of this.listSupportedCloudServiceSkusPagingPage(
      locationName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets the Batch service quotas for the specified subscription at the given location.
   * @param locationName The region for which to retrieve Batch service quotas.
   * @param options The options parameters.
   */
  getQuotas(
    locationName: string,
    options?: LocationGetQuotasOptionalParams
  ): Promise<LocationGetQuotasResponse> {
    return this.client.sendOperationRequest(
      { locationName, options },
      getQuotasOperationSpec
    );
  }

  /**
   * Gets the list of Batch supported Virtual Machine VM sizes available at the given location.
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param options The options parameters.
   */
  private _listSupportedVirtualMachineSkus(
    locationName: string,
    options?: LocationListSupportedVirtualMachineSkusOptionalParams
  ): Promise<LocationListSupportedVirtualMachineSkusResponse> {
    return this.client.sendOperationRequest(
      { locationName, options },
      listSupportedVirtualMachineSkusOperationSpec
    );
  }

  /**
   * Gets the list of Batch supported Cloud Service VM sizes available at the given location.
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param options The options parameters.
   */
  private _listSupportedCloudServiceSkus(
    locationName: string,
    options?: LocationListSupportedCloudServiceSkusOptionalParams
  ): Promise<LocationListSupportedCloudServiceSkusResponse> {
    return this.client.sendOperationRequest(
      { locationName, options },
      listSupportedCloudServiceSkusOperationSpec
    );
  }

  /**
   * Checks whether the Batch account name is available in the specified region.
   * @param locationName The desired region for the name check.
   * @param parameters Properties needed to check the availability of a name.
   * @param options The options parameters.
   */
  checkNameAvailability(
    locationName: string,
    parameters: CheckNameAvailabilityParameters,
    options?: LocationCheckNameAvailabilityOptionalParams
  ): Promise<LocationCheckNameAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { locationName, parameters, options },
      checkNameAvailabilityOperationSpec
    );
  }

  /**
   * ListSupportedVirtualMachineSkusNext
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListSupportedVirtualMachineSkus method.
   * @param options The options parameters.
   */
  private _listSupportedVirtualMachineSkusNext(
    locationName: string,
    nextLink: string,
    options?: LocationListSupportedVirtualMachineSkusNextOptionalParams
  ): Promise<LocationListSupportedVirtualMachineSkusNextResponse> {
    return this.client.sendOperationRequest(
      { locationName, nextLink, options },
      listSupportedVirtualMachineSkusNextOperationSpec
    );
  }

  /**
   * ListSupportedCloudServiceSkusNext
   * @param locationName The region for which to retrieve Batch service supported SKUs.
   * @param nextLink The nextLink from the previous successful call to the ListSupportedCloudServiceSkus
   *                 method.
   * @param options The options parameters.
   */
  private _listSupportedCloudServiceSkusNext(
    locationName: string,
    nextLink: string,
    options?: LocationListSupportedCloudServiceSkusNextOptionalParams
  ): Promise<LocationListSupportedCloudServiceSkusNextResponse> {
    return this.client.sendOperationRequest(
      { locationName, nextLink, options },
      listSupportedCloudServiceSkusNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getQuotasOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/quotas",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BatchLocationQuota
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSupportedVirtualMachineSkusOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/virtualMachineSkus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SupportedSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.maxresults,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSupportedCloudServiceSkusOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/cloudServiceSkus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SupportedSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.maxresults,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const checkNameAvailabilityOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameAvailabilityResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const listSupportedVirtualMachineSkusNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SupportedSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.maxresults,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSupportedCloudServiceSkusNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SupportedSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.maxresults,
    Parameters.filter
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
