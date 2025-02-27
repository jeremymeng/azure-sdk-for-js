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
import { OpenEnergyPlatformManagementServiceAPIs } from "../openEnergyPlatformManagementServiceAPIs.js";
import {
  CheckNameAvailabilityRequest,
  LocationsCheckNameAvailabilityOptionalParams,
  LocationsCheckNameAvailabilityResponse
} from "../models/index.js";

/** Class containing Locations operations. */
export class LocationsImpl implements Locations {
  private readonly client: OpenEnergyPlatformManagementServiceAPIs;

  /**
   * Initialize a new instance of the class Locations class.
   * @param client Reference to the service client
   */
  constructor(client: OpenEnergyPlatformManagementServiceAPIs) {
    this.client = client;
  }

  /**
   * Checks the name availability of the resource with requested resource name.
   * @param body NameAvailabilityRequest object.
   * @param options The options parameters.
   */
  checkNameAvailability(
    body: CheckNameAvailabilityRequest,
    options?: LocationsCheckNameAvailabilityOptionalParams
  ): Promise<LocationsCheckNameAvailabilityResponse> {
    return this.client.sendOperationRequest(
      { body, options },
      checkNameAvailabilityOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const checkNameAvailabilityOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.OpenEnergyPlatform/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameAvailabilityResponse
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
