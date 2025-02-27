/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { Managers } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient.js";
import {
  Manager,
  ManagersListOptionalParams,
  ManagersListResponse,
  ManagersListByResourceGroupOptionalParams,
  ManagersListByResourceGroupResponse,
  Feature,
  ManagersListFeatureSupportStatusOptionalParams,
  ManagersListFeatureSupportStatusResponse,
  Metrics,
  ManagersListMetricsOptionalParams,
  ManagersListMetricsResponse,
  MetricDefinition,
  ManagersListMetricDefinitionOptionalParams,
  ManagersListMetricDefinitionResponse,
  ManagersGetOptionalParams,
  ManagersGetResponse,
  ManagersCreateOrUpdateOptionalParams,
  ManagersCreateOrUpdateResponse,
  ManagersDeleteOptionalParams,
  ManagerPatch,
  ManagersUpdateOptionalParams,
  ManagersUpdateResponse,
  ManagersGetDevicePublicEncryptionKeyOptionalParams,
  ManagersGetDevicePublicEncryptionKeyResponse,
  ManagersGetEncryptionSettingsOptionalParams,
  ManagersGetEncryptionSettingsResponse,
  ManagersGetExtendedInfoOptionalParams,
  ManagersGetExtendedInfoResponse,
  ManagerExtendedInfo,
  ManagersCreateExtendedInfoOptionalParams,
  ManagersCreateExtendedInfoResponse,
  ManagersDeleteExtendedInfoOptionalParams,
  ManagersUpdateExtendedInfoOptionalParams,
  ManagersUpdateExtendedInfoResponse,
  ManagersGetActivationKeyOptionalParams,
  ManagersGetActivationKeyResponse,
  ManagersGetPublicEncryptionKeyOptionalParams,
  ManagersGetPublicEncryptionKeyResponse,
  ManagersRegenerateActivationKeyOptionalParams,
  ManagersRegenerateActivationKeyResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Managers operations. */
export class ManagersImpl implements Managers {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class Managers class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves all the managers in a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: ManagersListOptionalParams
  ): PagedAsyncIterableIterator<Manager> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(options, settings);
      }
    };
  }

  private async *listPagingPage(
    options?: ManagersListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<Manager[]> {
    let result: ManagersListResponse;
    result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: ManagersListOptionalParams
  ): AsyncIterableIterator<Manager> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Retrieves all the managers in a resource group.
   * @param resourceGroupName The resource group name
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: ManagersListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Manager> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: ManagersListByResourceGroupOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<Manager[]> {
    let result: ManagersListByResourceGroupResponse;
    result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: ManagersListByResourceGroupOptionalParams
  ): AsyncIterableIterator<Manager> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists the features and their support status
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  public listFeatureSupportStatus(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListFeatureSupportStatusOptionalParams
  ): PagedAsyncIterableIterator<Feature> {
    const iter = this.listFeatureSupportStatusPagingAll(
      resourceGroupName,
      managerName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listFeatureSupportStatusPagingPage(
          resourceGroupName,
          managerName,
          options,
          settings
        );
      }
    };
  }

  private async *listFeatureSupportStatusPagingPage(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListFeatureSupportStatusOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<Feature[]> {
    let result: ManagersListFeatureSupportStatusResponse;
    result = await this._listFeatureSupportStatus(
      resourceGroupName,
      managerName,
      options
    );
    yield result.value || [];
  }

  private async *listFeatureSupportStatusPagingAll(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListFeatureSupportStatusOptionalParams
  ): AsyncIterableIterator<Feature> {
    for await (const page of this.listFeatureSupportStatusPagingPage(
      resourceGroupName,
      managerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets the metrics for the specified manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param filter OData Filter options
   * @param options The options parameters.
   */
  public listMetrics(
    resourceGroupName: string,
    managerName: string,
    filter: string,
    options?: ManagersListMetricsOptionalParams
  ): PagedAsyncIterableIterator<Metrics> {
    const iter = this.listMetricsPagingAll(
      resourceGroupName,
      managerName,
      filter,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listMetricsPagingPage(
          resourceGroupName,
          managerName,
          filter,
          options,
          settings
        );
      }
    };
  }

  private async *listMetricsPagingPage(
    resourceGroupName: string,
    managerName: string,
    filter: string,
    options?: ManagersListMetricsOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<Metrics[]> {
    let result: ManagersListMetricsResponse;
    result = await this._listMetrics(
      resourceGroupName,
      managerName,
      filter,
      options
    );
    yield result.value || [];
  }

  private async *listMetricsPagingAll(
    resourceGroupName: string,
    managerName: string,
    filter: string,
    options?: ManagersListMetricsOptionalParams
  ): AsyncIterableIterator<Metrics> {
    for await (const page of this.listMetricsPagingPage(
      resourceGroupName,
      managerName,
      filter,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets the metric definitions for the specified manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  public listMetricDefinition(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListMetricDefinitionOptionalParams
  ): PagedAsyncIterableIterator<MetricDefinition> {
    const iter = this.listMetricDefinitionPagingAll(
      resourceGroupName,
      managerName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listMetricDefinitionPagingPage(
          resourceGroupName,
          managerName,
          options,
          settings
        );
      }
    };
  }

  private async *listMetricDefinitionPagingPage(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListMetricDefinitionOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<MetricDefinition[]> {
    let result: ManagersListMetricDefinitionResponse;
    result = await this._listMetricDefinition(
      resourceGroupName,
      managerName,
      options
    );
    yield result.value || [];
  }

  private async *listMetricDefinitionPagingAll(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListMetricDefinitionOptionalParams
  ): AsyncIterableIterator<MetricDefinition> {
    for await (const page of this.listMetricDefinitionPagingPage(
      resourceGroupName,
      managerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Retrieves all the managers in a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: ManagersListOptionalParams
  ): Promise<ManagersListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Retrieves all the managers in a resource group.
   * @param resourceGroupName The resource group name
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: ManagersListByResourceGroupOptionalParams
  ): Promise<ManagersListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Returns the properties of the specified manager name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetOptionalParams
  ): Promise<ManagersGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The manager.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    managerName: string,
    parameters: Manager,
    options?: ManagersCreateOrUpdateOptionalParams
  ): Promise<ManagersCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, parameters, options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Deletes the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      deleteOperationSpec
    );
  }

  /**
   * Updates the StorSimple Manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The manager update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    managerName: string,
    parameters: ManagerPatch,
    options?: ManagersUpdateOptionalParams
  ): Promise<ManagersUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, parameters, options },
      updateOperationSpec
    );
  }

  /**
   * Returns the public encryption key of the device.
   * @param deviceName The device name
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getDevicePublicEncryptionKey(
    deviceName: string,
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetDevicePublicEncryptionKeyOptionalParams
  ): Promise<ManagersGetDevicePublicEncryptionKeyResponse> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, managerName, options },
      getDevicePublicEncryptionKeyOperationSpec
    );
  }

  /**
   * Returns the encryption settings of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getEncryptionSettings(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetEncryptionSettingsOptionalParams
  ): Promise<ManagersGetEncryptionSettingsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      getEncryptionSettingsOperationSpec
    );
  }

  /**
   * Returns the extended information of the specified manager name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetExtendedInfoOptionalParams
  ): Promise<ManagersGetExtendedInfoResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      getExtendedInfoOperationSpec
    );
  }

  /**
   * Creates the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The manager extended information.
   * @param options The options parameters.
   */
  createExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    parameters: ManagerExtendedInfo,
    options?: ManagersCreateExtendedInfoOptionalParams
  ): Promise<ManagersCreateExtendedInfoResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, parameters, options },
      createExtendedInfoOperationSpec
    );
  }

  /**
   * Deletes the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  deleteExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersDeleteExtendedInfoOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      deleteExtendedInfoOperationSpec
    );
  }

  /**
   * Updates the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param ifMatch Pass the ETag of ExtendedInfo fetched from GET call
   * @param parameters The manager extended information.
   * @param options The options parameters.
   */
  updateExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    ifMatch: string,
    parameters: ManagerExtendedInfo,
    options?: ManagersUpdateExtendedInfoOptionalParams
  ): Promise<ManagersUpdateExtendedInfoResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, ifMatch, parameters, options },
      updateExtendedInfoOperationSpec
    );
  }

  /**
   * Lists the features and their support status
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  private _listFeatureSupportStatus(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListFeatureSupportStatusOptionalParams
  ): Promise<ManagersListFeatureSupportStatusResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      listFeatureSupportStatusOperationSpec
    );
  }

  /**
   * Returns the activation key of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getActivationKey(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetActivationKeyOptionalParams
  ): Promise<ManagersGetActivationKeyResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      getActivationKeyOperationSpec
    );
  }

  /**
   * Returns the symmetric encrypted public encryption key of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getPublicEncryptionKey(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersGetPublicEncryptionKeyOptionalParams
  ): Promise<ManagersGetPublicEncryptionKeyResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      getPublicEncryptionKeyOperationSpec
    );
  }

  /**
   * Gets the metrics for the specified manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param filter OData Filter options
   * @param options The options parameters.
   */
  private _listMetrics(
    resourceGroupName: string,
    managerName: string,
    filter: string,
    options?: ManagersListMetricsOptionalParams
  ): Promise<ManagersListMetricsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, filter, options },
      listMetricsOperationSpec
    );
  }

  /**
   * Gets the metric definitions for the specified manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  private _listMetricDefinition(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListMetricDefinitionOptionalParams
  ): Promise<ManagersListMetricDefinitionResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      listMetricDefinitionOperationSpec
    );
  }

  /**
   * Re-generates and returns the activation key of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  regenerateActivationKey(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersRegenerateActivationKeyOptionalParams
  ): Promise<ManagersRegenerateActivationKeyResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      regenerateActivationKeyOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorSimple/managers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
    },
    201: {
      bodyMapper: Mappers.Manager
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getDevicePublicEncryptionKeyOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/publicEncryptionKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PublicKey
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getEncryptionSettingsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/encryptionSettings/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionSettings
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getExtendedInfoOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createExtendedInfoOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteExtendedInfoOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "DELETE",
  responses: { 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  serializer
};
const updateExtendedInfoOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const listFeatureSupportStatusOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/features",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FeatureList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getActivationKeyOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/listActivationKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Key
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getPublicEncryptionKeyOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/listPublicEncryptionKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SymmetricEncryptedSecret
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listMetricsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/metrics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listMetricDefinitionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/metricsDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricDefinitionList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const regenerateActivationKeyOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/regenerateActivationKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Key
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
