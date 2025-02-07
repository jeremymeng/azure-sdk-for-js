/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ComponentCurrentBillingFeatures } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApplicationInsightsManagementClient } from "../applicationInsightsManagementClient.js";
import {
  ComponentCurrentBillingFeaturesGetOptionalParams,
  ComponentCurrentBillingFeaturesGetResponse,
  ApplicationInsightsComponentBillingFeatures,
  ComponentCurrentBillingFeaturesUpdateOptionalParams,
  ComponentCurrentBillingFeaturesUpdateResponse
} from "../models/index.js";

/** Class containing ComponentCurrentBillingFeatures operations. */
export class ComponentCurrentBillingFeaturesImpl
  implements ComponentCurrentBillingFeatures {
  private readonly client: ApplicationInsightsManagementClient;

  /**
   * Initialize a new instance of the class ComponentCurrentBillingFeatures class.
   * @param client Reference to the service client
   */
  constructor(client: ApplicationInsightsManagementClient) {
    this.client = client;
  }

  /**
   * Returns current billing features for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    options?: ComponentCurrentBillingFeaturesGetOptionalParams
  ): Promise<ComponentCurrentBillingFeaturesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, options },
      getOperationSpec
    );
  }

  /**
   * Update current billing features for an Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param billingFeaturesProperties Properties that need to be specified to update billing features for
   *                                  an Application Insights component.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures,
    options?: ComponentCurrentBillingFeaturesUpdateOptionalParams
  ): Promise<ComponentCurrentBillingFeaturesUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, billingFeaturesProperties, options },
      updateOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/currentbillingfeatures",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationInsightsComponentBillingFeatures
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/currentbillingfeatures",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationInsightsComponentBillingFeatures
    }
  },
  requestBody: Parameters.billingFeaturesProperties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
