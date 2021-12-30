/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApiTagDescription } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClient } from "../apiManagementClient";
import {
  TagDescriptionContract,
  ApiTagDescriptionListByServiceNextOptionalParams,
  ApiTagDescriptionListByServiceOptionalParams,
  ApiTagDescriptionListByServiceResponse,
  ApiTagDescriptionGetEntityTagOptionalParams,
  ApiTagDescriptionGetEntityTagResponse,
  ApiTagDescriptionGetOptionalParams,
  ApiTagDescriptionGetResponse,
  TagDescriptionCreateParameters,
  ApiTagDescriptionCreateOrUpdateOptionalParams,
  ApiTagDescriptionCreateOrUpdateResponse,
  ApiTagDescriptionDeleteOptionalParams,
  ApiTagDescriptionListByServiceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing ApiTagDescription operations. */
export class ApiTagDescriptionImpl implements ApiTagDescription {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class ApiTagDescription class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists all Tags descriptions in scope of API. Model similar to swagger - tagDescription is defined on
   * API level but tag may be assigned to the Operations
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param options The options parameters.
   */
  public listByService(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams
  ): PagedAsyncIterableIterator<TagDescriptionContract> {
    const iter = this.listByServicePagingAll(
      resourceGroupName,
      serviceName,
      apiId,
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
        return this.listByServicePagingPage(
          resourceGroupName,
          serviceName,
          apiId,
          options
        );
      }
    };
  }

  private async *listByServicePagingPage(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams
  ): AsyncIterableIterator<TagDescriptionContract[]> {
    let result = await this._listByService(
      resourceGroupName,
      serviceName,
      apiId,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByServiceNext(
        resourceGroupName,
        serviceName,
        apiId,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByServicePagingAll(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams
  ): AsyncIterableIterator<TagDescriptionContract> {
    for await (const page of this.listByServicePagingPage(
      resourceGroupName,
      serviceName,
      apiId,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all Tags descriptions in scope of API. Model similar to swagger - tagDescription is defined on
   * API level but tag may be assigned to the Operations
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param options The options parameters.
   */
  private _listByService(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams
  ): Promise<ApiTagDescriptionListByServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, apiId, options },
      listByServiceOperationSpec
    );
  }

  /**
   * Gets the entity state version of the tag specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: ApiTagDescriptionGetEntityTagOptionalParams
  ): Promise<ApiTagDescriptionGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, apiId, tagDescriptionId, options },
      getEntityTagOperationSpec
    );
  }

  /**
   * Get Tag description in scope of API
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: ApiTagDescriptionGetOptionalParams
  ): Promise<ApiTagDescriptionGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, apiId, tagDescriptionId, options },
      getOperationSpec
    );
  }

  /**
   * Create/Update tag description in scope of the Api.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    parameters: TagDescriptionCreateParameters,
    options?: ApiTagDescriptionCreateOrUpdateOptionalParams
  ): Promise<ApiTagDescriptionCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        parameters,
        options
      },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Delete tag description for the Api.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    ifMatch: string,
    options?: ApiTagDescriptionDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        ifMatch,
        options
      },
      deleteOperationSpec
    );
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  private _listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    nextLink: string,
    options?: ApiTagDescriptionListByServiceNextOptionalParams
  ): Promise<ApiTagDescriptionListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, apiId, nextLink, options },
      listByServiceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getEntityTagOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.ApiTagDescriptionGetEntityTagHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.tagDescriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionContract,
      headersMapper: Mappers.ApiTagDescriptionGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.tagDescriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionContract,
      headersMapper: Mappers.ApiTagDescriptionCreateOrUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.TagDescriptionContract,
      headersMapper: Mappers.ApiTagDescriptionCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters13,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.tagDescriptionId
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.tagDescriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch1],
  serializer
};
const listByServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
