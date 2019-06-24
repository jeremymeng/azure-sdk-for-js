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
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/configurationStoresMappers";
import * as Parameters from "../models/parameters";
import { AppConfigurationManagementClientContext } from "../appConfigurationManagementClientContext";

/** Class representing a ConfigurationStores. */
export class ConfigurationStores {
  private readonly client: AppConfigurationManagementClientContext;

  /**
   * Create a ConfigurationStores.
   * @param {AppConfigurationManagementClientContext} client Reference to the service client.
   */
  constructor(client: AppConfigurationManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists the configuration stores for a given subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListResponse>
   */
  list(options?: Models.ConfigurationStoresListOptionalParams): Promise<Models.ConfigurationStoresListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: Models.ConfigurationStoresListOptionalParams, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  list(options?: Models.ConfigurationStoresListOptionalParams | msRest.ServiceCallback<Models.ConfigurationStoreListResult>, callback?: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): Promise<Models.ConfigurationStoresListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListResponse>;
  }

  /**
   * Lists the configuration stores for a given resource group.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListByResourceGroupResponse>
   */
  listByResourceGroup(resourceGroupName: string, options?: Models.ConfigurationStoresListByResourceGroupOptionalParams): Promise<Models.ConfigurationStoresListByResourceGroupResponse>;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, options: Models.ConfigurationStoresListByResourceGroupOptionalParams, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  listByResourceGroup(resourceGroupName: string, options?: Models.ConfigurationStoresListByResourceGroupOptionalParams | msRest.ServiceCallback<Models.ConfigurationStoreListResult>, callback?: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): Promise<Models.ConfigurationStoresListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listByResourceGroupOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListByResourceGroupResponse>;
  }

  /**
   * Gets the properties of the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresGetResponse>
   */
  get(resourceGroupName: string, configStoreName: string, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param callback The callback
   */
  get(resourceGroupName: string, configStoreName: string, callback: msRest.ServiceCallback<Models.ConfigurationStore>): void;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, configStoreName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConfigurationStore>): void;
  get(resourceGroupName: string, configStoreName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConfigurationStore>, callback?: msRest.ServiceCallback<Models.ConfigurationStore>): Promise<Models.ConfigurationStoresGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        configStoreName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ConfigurationStoresGetResponse>;
  }

  /**
   * Creates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreCreationParameters The parameters for creating a configuration store.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresCreateResponse>
   */
  create(resourceGroupName: string, configStoreName: string, configStoreCreationParameters: Models.ConfigurationStore, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresCreateResponse> {
    return this.beginCreate(resourceGroupName,configStoreName,configStoreCreationParameters,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.ConfigurationStoresCreateResponse>;
  }

  /**
   * Deletes a configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, configStoreName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDeleteMethod(resourceGroupName,configStoreName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Updates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreUpdateParameters The parameters for updating a configuration store.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresUpdateResponse>
   */
  update(resourceGroupName: string, configStoreName: string, configStoreUpdateParameters: Models.ConfigurationStoreUpdateParameters, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresUpdateResponse> {
    return this.beginUpdate(resourceGroupName,configStoreName,configStoreUpdateParameters,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.ConfigurationStoresUpdateResponse>;
  }

  /**
   * Lists the access key for the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListKeysResponse>
   */
  listKeys(resourceGroupName: string, configStoreName: string, options?: Models.ConfigurationStoresListKeysOptionalParams): Promise<Models.ConfigurationStoresListKeysResponse>;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param callback The callback
   */
  listKeys(resourceGroupName: string, configStoreName: string, callback: msRest.ServiceCallback<Models.ApiKeyListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The optional parameters
   * @param callback The callback
   */
  listKeys(resourceGroupName: string, configStoreName: string, options: Models.ConfigurationStoresListKeysOptionalParams, callback: msRest.ServiceCallback<Models.ApiKeyListResult>): void;
  listKeys(resourceGroupName: string, configStoreName: string, options?: Models.ConfigurationStoresListKeysOptionalParams | msRest.ServiceCallback<Models.ApiKeyListResult>, callback?: msRest.ServiceCallback<Models.ApiKeyListResult>): Promise<Models.ConfigurationStoresListKeysResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        configStoreName,
        options
      },
      listKeysOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListKeysResponse>;
  }

  /**
   * Regenerates an access key for the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param regenerateKeyParameters The parameters for regenerating an access key.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresRegenerateKeyResponse>
   */
  regenerateKey(resourceGroupName: string, configStoreName: string, regenerateKeyParameters: Models.RegenerateKeyParameters, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresRegenerateKeyResponse>;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param regenerateKeyParameters The parameters for regenerating an access key.
   * @param callback The callback
   */
  regenerateKey(resourceGroupName: string, configStoreName: string, regenerateKeyParameters: Models.RegenerateKeyParameters, callback: msRest.ServiceCallback<Models.ApiKey>): void;
  /**
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param regenerateKeyParameters The parameters for regenerating an access key.
   * @param options The optional parameters
   * @param callback The callback
   */
  regenerateKey(resourceGroupName: string, configStoreName: string, regenerateKeyParameters: Models.RegenerateKeyParameters, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApiKey>): void;
  regenerateKey(resourceGroupName: string, configStoreName: string, regenerateKeyParameters: Models.RegenerateKeyParameters, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ApiKey>, callback?: msRest.ServiceCallback<Models.ApiKey>): Promise<Models.ConfigurationStoresRegenerateKeyResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        configStoreName,
        regenerateKeyParameters,
        options
      },
      regenerateKeyOperationSpec,
      callback) as Promise<Models.ConfigurationStoresRegenerateKeyResponse>;
  }

  /**
   * Creates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreCreationParameters The parameters for creating a configuration store.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginCreate(resourceGroupName: string, configStoreName: string, configStoreCreationParameters: Models.ConfigurationStore, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        configStoreName,
        configStoreCreationParameters,
        options
      },
      beginCreateOperationSpec,
      options);
  }

  /**
   * Deletes a configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDeleteMethod(resourceGroupName: string, configStoreName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        configStoreName,
        options
      },
      beginDeleteMethodOperationSpec,
      options);
  }

  /**
   * Updates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreUpdateParameters The parameters for updating a configuration store.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginUpdate(resourceGroupName: string, configStoreName: string, configStoreUpdateParameters: Models.ConfigurationStoreUpdateParameters, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        configStoreName,
        configStoreUpdateParameters,
        options
      },
      beginUpdateOperationSpec,
      options);
  }

  /**
   * Lists the configuration stores for a given subscription.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConfigurationStoreListResult>, callback?: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): Promise<Models.ConfigurationStoresListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListNextResponse>;
  }

  /**
   * Lists the configuration stores for a given resource group.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListByResourceGroupNextResponse>
   */
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresListByResourceGroupNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): void;
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ConfigurationStoreListResult>, callback?: msRest.ServiceCallback<Models.ConfigurationStoreListResult>): Promise<Models.ConfigurationStoresListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByResourceGroupNextOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListByResourceGroupNextResponse>;
  }

  /**
   * Lists the access key for the specified configuration store.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ConfigurationStoresListKeysNextResponse>
   */
  listKeysNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ConfigurationStoresListKeysNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listKeysNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ApiKeyListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listKeysNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ApiKeyListResult>): void;
  listKeysNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ApiKeyListResult>, callback?: msRest.ServiceCallback<Models.ApiKeyListResult>): Promise<Models.ConfigurationStoresListKeysNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listKeysNextOperationSpec,
      callback) as Promise<Models.ConfigurationStoresListKeysNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/configurationStores",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConfigurationStoreListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const listByResourceGroupOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConfigurationStoreListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ConfigurationStore
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const listKeysOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/ListKeys",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ApiKeyListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const regenerateKeyOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/RegenerateKey",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "regenerateKeyParameters",
    mapper: {
      ...Mappers.RegenerateKeyParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ApiKey
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const beginCreateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "configStoreCreationParameters",
    mapper: {
      ...Mappers.ConfigurationStore,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ConfigurationStore
    },
    201: {
      bodyMapper: Mappers.ConfigurationStore
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const beginDeleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
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
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const beginUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.configStoreName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "configStoreUpdateParameters",
    mapper: {
      ...Mappers.ConfigurationStoreUpdateParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ConfigurationStore
    },
    201: {
      bodyMapper: Mappers.ConfigurationStore
    },
    default: {
      bodyMapper: Mappers.ErrorModel
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
      bodyMapper: Mappers.ConfigurationStoreListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const listByResourceGroupNextOperationSpec: msRest.OperationSpec = {
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
      bodyMapper: Mappers.ConfigurationStoreListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const listKeysNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
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
      bodyMapper: Mappers.ApiKeyListResult
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
