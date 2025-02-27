/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Capabilities } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SqlManagementClient } from "../sqlManagementClient.js";
import {
  CapabilitiesListByLocationOptionalParams,
  CapabilitiesListByLocationResponse,
} from "../models/index.js";

/** Class containing Capabilities operations. */
export class CapabilitiesImpl implements Capabilities {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class Capabilities class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets the subscription capabilities available for the specified location.
   * @param locationName The location name whose capabilities are retrieved.
   * @param options The options parameters.
   */
  listByLocation(
    locationName: string,
    options?: CapabilitiesListByLocationOptionalParams,
  ): Promise<CapabilitiesListByLocationResponse> {
    return this.client.sendOperationRequest(
      { locationName, options },
      listByLocationOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/capabilities",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LocationCapabilities,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion3, Parameters.include],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
