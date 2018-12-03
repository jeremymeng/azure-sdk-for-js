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
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/aDCCatalogsMappers";
import * as Parameters from "../models/parameters";
import { DataCatalogRestClientContext } from "../dataCatalogRestClientContext";

/** Class representing a ADCCatalogs. */
export class ADCCatalogs {
  private readonly client: DataCatalogRestClientContext;

  /**
   * Create a ADCCatalogs.
   * @param {DataCatalogRestClientContext} client Reference to the service client.
   */
  constructor(client: DataCatalogRestClientContext) {
    this.client = client;
  }

  /**
   * The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under
   * the given resource group.
   * @summary List catalogs in Resource Group (GET Resources)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param [options] The optional parameters
   * @returns Promise<Models.ADCCatalogsListtByResourceGroupResponse>
   */
  listtByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ADCCatalogsListtByResourceGroupResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param callback The callback
   */
  listtByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ADCCatalogsListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param options The optional parameters
   * @param callback The callback
   */
  listtByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ADCCatalogsListResult>): void;
  listtByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ADCCatalogsListResult>, callback?: msRest.ServiceCallback<Models.ADCCatalogsListResult>): Promise<Models.ADCCatalogsListtByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listtByResourceGroupOperationSpec,
      callback) as Promise<Models.ADCCatalogsListtByResourceGroupResponse>;
  }

  /**
   * The Create Azure Data Catalog service operation creates a new data catalog service with the
   * specified parameters. If the specific service already exists, then any patchable properties will
   * be updated and any immutable properties will remain unchanged.
   * @summary Create or Update Azure Data Catalog service (PUT Resource)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Create or Update a data catalog.
   * @param [options] The optional parameters
   * @returns Promise<Models.ADCCatalogsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, properties: Models.ADCCatalog, options?: msRest.RequestOptionsBase): Promise<Models.ADCCatalogsCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Create or Update a data catalog.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, properties: Models.ADCCatalog, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Create or Update a data catalog.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, properties: Models.ADCCatalog, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  createOrUpdate(resourceGroupName: string, properties: Models.ADCCatalog, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ADCCatalog>, callback?: msRest.ServiceCallback<Models.ADCCatalog>): Promise<Models.ADCCatalogsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        properties,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.ADCCatalogsCreateOrUpdateResponse>;
  }

  /**
   * The Get Azure Data Catalog Service operation retrieves a json representation of the data
   * catalog.
   * @summary Get Azure Data Catalog service (GET Resources)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param [options] The optional parameters
   * @returns Promise<Models.ADCCatalogsGetResponse>
   */
  get(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ADCCatalogsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param callback The callback
   */
  get(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  get(resourceGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ADCCatalog>, callback?: msRest.ServiceCallback<Models.ADCCatalog>): Promise<Models.ADCCatalogsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ADCCatalogsGetResponse>;
  }

  /**
   * The Delete Azure Data Catalog Service operation deletes an existing data catalog.
   * @summary Delete Azure Data Catalog Service (DELETE Resource)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDeleteMethod(resourceGroupName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * The Update Azure Data Catalog Service operation can be used to update the existing deployment.
   * The update call only supports the properties listed in the PATCH body.
   * @summary Update Azure Data Catalog Service (PATCH Resource)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Update a data catalog.
   * @param [options] The optional parameters
   * @returns Promise<Models.ADCCatalogsUpdateResponse>
   */
  update(resourceGroupName: string, properties: Models.ADCCatalog, options?: msRest.RequestOptionsBase): Promise<Models.ADCCatalogsUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Update a data catalog.
   * @param callback The callback
   */
  update(resourceGroupName: string, properties: Models.ADCCatalog, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param properties Properties supplied to the Update a data catalog.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, properties: Models.ADCCatalog, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ADCCatalog>): void;
  update(resourceGroupName: string, properties: Models.ADCCatalog, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ADCCatalog>, callback?: msRest.ServiceCallback<Models.ADCCatalog>): Promise<Models.ADCCatalogsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        properties,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.ADCCatalogsUpdateResponse>;
  }

  /**
   * The Delete Azure Data Catalog Service operation deletes an existing data catalog.
   * @summary Delete Azure Data Catalog Service (DELETE Resource)
   * @param resourceGroupName The name of the resource group within the user's subscription. The name
   * is case insensitive.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDeleteMethod(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        options
      },
      beginDeleteMethodOperationSpec,
      options);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listtByResourceGroupOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalogsListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "properties",
    mapper: {
      ...Mappers.ADCCatalog,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    },
    201: {
      bodyMapper: Mappers.ADCCatalog
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const updateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "properties",
    mapper: {
      ...Mappers.ADCCatalog,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ADCCatalog
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginDeleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataCatalog/catalogs/{catalogName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
