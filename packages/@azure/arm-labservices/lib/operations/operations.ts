/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/operationsMappers";
import * as Parameters from "../models/parameters";
import { ManagedLabsClientContext } from "../managedLabsClientContext";

/** Class representing a Operations. */
export class Operations {
  private readonly client: ManagedLabsClientContext;

  /**
   * Create a Operations.
   * @param {ManagedLabsClientContext} client Reference to the service client.
   */
  constructor(client: ManagedLabsClientContext) {
    this.client = client;
  }

  /**
   * Get operation
   * @param locationName The name of the location.
   * @param operationName The name of the operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.OperationsGetResponse>
   */
  get(locationName: string, operationName: string, options?: msRest.RequestOptionsBase): Promise<Models.OperationsGetResponse>;
  /**
   * @param locationName The name of the location.
   * @param operationName The name of the operation.
   * @param callback The callback
   */
  get(locationName: string, operationName: string, callback: msRest.ServiceCallback<Models.OperationResult>): void;
  /**
   * @param locationName The name of the location.
   * @param operationName The name of the operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(locationName: string, operationName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationResult>): void;
  get(locationName: string, operationName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.OperationResult>, callback?: msRest.ServiceCallback<Models.OperationResult>): Promise<Models.OperationsGetResponse> {
    return this.client.sendOperationRequest(
      {
        locationName,
        operationName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.OperationsGetResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.LabServices/locations/{locationName}/operations/{operationName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.locationName,
    Parameters.operationName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.OperationResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
