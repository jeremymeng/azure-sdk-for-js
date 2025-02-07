/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { DataProtection } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataProtectionClient } from "../dataProtectionClient.js";
import {
  FeatureValidationRequestBaseUnion,
  DataProtectionCheckFeatureSupportOptionalParams,
  DataProtectionCheckFeatureSupportResponse,
} from "../models/index.js";

/** Class containing DataProtection operations. */
export class DataProtectionImpl implements DataProtection {
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class DataProtection class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * Validates if a feature is supported
   * @param location
   * @param parameters Feature support request object
   * @param options The options parameters.
   */
  checkFeatureSupport(
    location: string,
    parameters: FeatureValidationRequestBaseUnion,
    options?: DataProtectionCheckFeatureSupportOptionalParams,
  ): Promise<DataProtectionCheckFeatureSupportResponse> {
    return this.client.sendOperationRequest(
      { location, parameters, options },
      checkFeatureSupportOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const checkFeatureSupportOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/checkFeatureSupport",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.FeatureValidationResponseBase,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters3,
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
