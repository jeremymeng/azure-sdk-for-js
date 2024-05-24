/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { MaintenanceConfigurations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MaintenanceManagementClient } from "../maintenanceManagementClient";
import {
  MaintenanceConfiguration,
  MaintenanceConfigurationsListOptionalParams,
  MaintenanceConfigurationsListResponse,
  MaintenanceConfigurationsGetOptionalParams,
  MaintenanceConfigurationsGetResponse,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateResponse,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsDeleteResponse,
  MaintenanceConfigurationsUpdateOptionalParams,
  MaintenanceConfigurationsUpdateResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing MaintenanceConfigurations operations. */
export class MaintenanceConfigurationsImpl
  implements MaintenanceConfigurations
{
  private readonly client: MaintenanceManagementClient;

  /**
   * Initialize a new instance of the class MaintenanceConfigurations class.
   * @param client Reference to the service client
   */
  constructor(client: MaintenanceManagementClient) {
    this.client = client;
  }

  /**
   * Get Configuration records within a subscription
   * @param options The options parameters.
   */
  public list(
    options?: MaintenanceConfigurationsListOptionalParams,
  ): PagedAsyncIterableIterator<MaintenanceConfiguration> {
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
      },
    };
  }

  private async *listPagingPage(
    options?: MaintenanceConfigurationsListOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<MaintenanceConfiguration[]> {
    let result: MaintenanceConfigurationsListResponse;
    result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: MaintenanceConfigurationsListOptionalParams,
  ): AsyncIterableIterator<MaintenanceConfiguration> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get Configuration record
   * @param resourceGroupName Resource Group Name
   * @param resourceName Maintenance Configuration Name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    options?: MaintenanceConfigurationsGetOptionalParams,
  ): Promise<MaintenanceConfigurationsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or Update configuration record
   * @param resourceGroupName Resource Group Name
   * @param resourceName Maintenance Configuration Name
   * @param configuration The configuration
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    resourceName: string,
    configuration: MaintenanceConfiguration,
    options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  ): Promise<MaintenanceConfigurationsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, configuration, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Delete Configuration record
   * @param resourceGroupName Resource Group Name
   * @param resourceName Maintenance Configuration Name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    resourceName: string,
    options?: MaintenanceConfigurationsDeleteOptionalParams,
  ): Promise<MaintenanceConfigurationsDeleteResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, options },
      deleteOperationSpec,
    );
  }

  /**
   * Patch configuration record
   * @param resourceGroupName Resource Group Name
   * @param resourceName Maintenance Configuration Name
   * @param configuration The configuration
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    configuration: MaintenanceConfiguration,
    options?: MaintenanceConfigurationsUpdateOptionalParams,
  ): Promise<MaintenanceConfigurationsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, configuration, options },
      updateOperationSpec,
    );
  }

  /**
   * Get Configuration records within a subscription
   * @param options The options parameters.
   */
  private _list(
    options?: MaintenanceConfigurationsListOptionalParams,
  ): Promise<MaintenanceConfigurationsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceConfiguration,
    },
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceConfiguration,
    },
    201: {
      bodyMapper: Mappers.MaintenanceConfiguration,
    },
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  requestBody: Parameters.configuration,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceConfiguration,
    },
    204: {},
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceConfiguration,
    },
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  requestBody: Parameters.configuration,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/maintenanceConfigurations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListMaintenanceConfigurationsResult,
    },
    default: {
      bodyMapper: Mappers.MaintenanceError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
