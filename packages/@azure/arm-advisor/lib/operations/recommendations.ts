/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/recommendationsMappers";
import * as Parameters from "../models/parameters";
import { AdvisorManagementClientContext } from "../advisorManagementClientContext";

/** Class representing a Recommendations. */
export class Recommendations {
  private readonly client: AdvisorManagementClientContext;

  /**
   * Create a Recommendations.
   * @param {AdvisorManagementClientContext} client Reference to the service client.
   */
  constructor(client: AdvisorManagementClientContext) {
    this.client = client;
  }

  /**
   * Initiates the recommendation generation or computation process for a subscription. This
   * operation is asynchronous. The generated recommendations are stored in a cache in the Advisor
   * service.
   * @param [options] The optional parameters
   * @returns Promise<Models.RecommendationsGenerateResponse>
   */
  generate(options?: msRest.RequestOptionsBase): Promise<Models.RecommendationsGenerateResponse>;
  /**
   * @param callback The callback
   */
  generate(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  generate(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  generate(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<Models.RecommendationsGenerateResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      generateOperationSpec,
      callback) as Promise<Models.RecommendationsGenerateResponse>;
  }

  /**
   * Retrieves the status of the recommendation computation or generation process. Invoke this API
   * after calling the generation recommendation. The URI of this API is returned in the Location
   * field of the response header.
   * @param operationId The operation ID, which can be found from the Location field in the generate
   * recommendation response header.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getGenerateStatus(operationId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param operationId The operation ID, which can be found from the Location field in the generate
   * recommendation response header.
   * @param callback The callback
   */
  getGenerateStatus(operationId: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param operationId The operation ID, which can be found from the Location field in the generate
   * recommendation response header.
   * @param options The optional parameters
   * @param callback The callback
   */
  getGenerateStatus(operationId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getGenerateStatus(operationId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        operationId,
        options
      },
      getGenerateStatusOperationSpec,
      callback);
  }

  /**
   * Obtains cached recommendations for a subscription. The recommendations are generated or computed
   * by invoking generateRecommendations.
   * @param [options] The optional parameters
   * @returns Promise<Models.RecommendationsListResponse>
   */
  list(options?: Models.RecommendationsListOptionalParams): Promise<Models.RecommendationsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: Models.RecommendationsListOptionalParams, callback: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): void;
  list(options?: Models.RecommendationsListOptionalParams | msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>, callback?: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): Promise<Models.RecommendationsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.RecommendationsListResponse>;
  }

  /**
   * Obtains details of a cached recommendation.
   * @param resourceUri The fully qualified Azure Resource Manager identifier of the resource to
   * which the recommendation applies.
   * @param recommendationId The recommendation ID.
   * @param [options] The optional parameters
   * @returns Promise<Models.RecommendationsGetResponse>
   */
  get(resourceUri: string, recommendationId: string, options?: msRest.RequestOptionsBase): Promise<Models.RecommendationsGetResponse>;
  /**
   * @param resourceUri The fully qualified Azure Resource Manager identifier of the resource to
   * which the recommendation applies.
   * @param recommendationId The recommendation ID.
   * @param callback The callback
   */
  get(resourceUri: string, recommendationId: string, callback: msRest.ServiceCallback<Models.ResourceRecommendationBase>): void;
  /**
   * @param resourceUri The fully qualified Azure Resource Manager identifier of the resource to
   * which the recommendation applies.
   * @param recommendationId The recommendation ID.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceUri: string, recommendationId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ResourceRecommendationBase>): void;
  get(resourceUri: string, recommendationId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ResourceRecommendationBase>, callback?: msRest.ServiceCallback<Models.ResourceRecommendationBase>): Promise<Models.RecommendationsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceUri,
        recommendationId,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.RecommendationsGetResponse>;
  }

  /**
   * Obtains cached recommendations for a subscription. The recommendations are generated or computed
   * by invoking generateRecommendations.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.RecommendationsListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.RecommendationsListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>, callback?: msRest.ServiceCallback<Models.ResourceRecommendationBaseListResult>): Promise<Models.RecommendationsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.RecommendationsListNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const generateOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    202: {
      headersMapper: Mappers.RecommendationsGenerateHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getGenerateStatusOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations/{operationId}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.operationId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Advisor/recommendations",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceRecommendationBaseListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "{resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}",
  urlParameters: [
    Parameters.resourceUri,
    Parameters.recommendationId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceRecommendationBase
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceRecommendationBaseListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
