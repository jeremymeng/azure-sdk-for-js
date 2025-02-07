/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Locations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureVMwareSolutionAPI } from "../azureVMwareSolutionAPI.js";
import {
  LocationsCheckQuotaAvailabilityOptionalParams,
  LocationsCheckQuotaAvailabilityResponse,
  LocationsCheckTrialAvailabilityOptionalParams,
  LocationsCheckTrialAvailabilityResponse,
} from "../models/index.js";

/** Class containing Locations operations. */
export class LocationsImpl implements Locations {
  private readonly client: AzureVMwareSolutionAPI;

  /**
   * Initialize a new instance of the class Locations class.
   * @param client Reference to the service client
   */
  constructor(client: AzureVMwareSolutionAPI) {
    this.client = client;
  }

  /**
   * Return quota for subscription by region
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  checkQuotaAvailability(
    location: string,
    options?: LocationsCheckQuotaAvailabilityOptionalParams,
  ): Promise<LocationsCheckQuotaAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      checkQuotaAvailabilityOperationSpec,
    );
  }

  /**
   * Return trial status for subscription by region
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  checkTrialAvailability(
    location: string,
    options?: LocationsCheckTrialAvailabilityOptionalParams,
  ): Promise<LocationsCheckTrialAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      checkTrialAvailabilityOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const checkQuotaAvailabilityOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/checkQuotaAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Quota,
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
const checkTrialAvailabilityOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/checkTrialAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Trial,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.sku,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
