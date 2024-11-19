/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { TenantSettings } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClient } from "../apiManagementClient";
import {
  TenantSettingsContract,
  TenantSettingsListByServiceNextOptionalParams,
  TenantSettingsListByServiceOptionalParams,
  TenantSettingsListByServiceResponse,
  SettingsTypeName,
  TenantSettingsGetOptionalParams,
  TenantSettingsGetResponse,
  TenantSettingsListByServiceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing TenantSettings operations. */
export class TenantSettingsImpl implements TenantSettings {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class TenantSettings class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Public settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  public listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: TenantSettingsListByServiceOptionalParams
  ): PagedAsyncIterableIterator<TenantSettingsContract> {
    const iter = this.listByServicePagingAll(
      resourceGroupName,
      serviceName,
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
        return this.listByServicePagingPage(
          resourceGroupName,
          serviceName,
          options,
          settings
        );
      }
    };
  }

  private async *listByServicePagingPage(
    resourceGroupName: string,
    serviceName: string,
    options?: TenantSettingsListByServiceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<TenantSettingsContract[]> {
    let result: TenantSettingsListByServiceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByService(
        resourceGroupName,
        serviceName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByServiceNext(
        resourceGroupName,
        serviceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByServicePagingAll(
    resourceGroupName: string,
    serviceName: string,
    options?: TenantSettingsListByServiceOptionalParams
  ): AsyncIterableIterator<TenantSettingsContract> {
    for await (const page of this.listByServicePagingPage(
      resourceGroupName,
      serviceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Public settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  private _listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: TenantSettingsListByServiceOptionalParams
  ): Promise<TenantSettingsListByServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      listByServiceOperationSpec
    );
  }

  /**
   * Get tenant settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param settingsType The identifier of the settings.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    settingsType: SettingsTypeName,
    options?: TenantSettingsGetOptionalParams
  ): Promise<TenantSettingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, settingsType, options },
      getOperationSpec
    );
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  private _listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: TenantSettingsListByServiceNextOptionalParams
  ): Promise<TenantSettingsListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options },
      listByServiceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/settings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TenantSettingsCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.filter, Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/settings/{settingsType}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TenantSettingsContract,
      headersMapper: Mappers.TenantSettingsGetHeaders
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
    Parameters.settingsType
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TenantSettingsCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
