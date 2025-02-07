/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Views } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CustomerInsightsManagementClient } from "../customerInsightsManagementClient.js";
import {
  ViewResourceFormat,
  ViewsListByHubNextOptionalParams,
  ViewsListByHubOptionalParams,
  ViewsListByHubResponse,
  ViewsCreateOrUpdateOptionalParams,
  ViewsCreateOrUpdateResponse,
  ViewsGetOptionalParams,
  ViewsGetResponse,
  ViewsDeleteOptionalParams,
  ViewsListByHubNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Views operations. */
export class ViewsImpl implements Views {
  private readonly client: CustomerInsightsManagementClient;

  /**
   * Initialize a new instance of the class Views class.
   * @param client Reference to the service client
   */
  constructor(client: CustomerInsightsManagementClient) {
    this.client = client;
  }

  /**
   * Gets all available views for given user in the specified hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param userId The user ID. Use * to retrieve hub level views.
   * @param options The options parameters.
   */
  public listByHub(
    resourceGroupName: string,
    hubName: string,
    userId: string,
    options?: ViewsListByHubOptionalParams
  ): PagedAsyncIterableIterator<ViewResourceFormat> {
    const iter = this.listByHubPagingAll(
      resourceGroupName,
      hubName,
      userId,
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
        return this.listByHubPagingPage(
          resourceGroupName,
          hubName,
          userId,
          options,
          settings
        );
      }
    };
  }

  private async *listByHubPagingPage(
    resourceGroupName: string,
    hubName: string,
    userId: string,
    options?: ViewsListByHubOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ViewResourceFormat[]> {
    let result: ViewsListByHubResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByHub(
        resourceGroupName,
        hubName,
        userId,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByHubNext(
        resourceGroupName,
        hubName,
        userId,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByHubPagingAll(
    resourceGroupName: string,
    hubName: string,
    userId: string,
    options?: ViewsListByHubOptionalParams
  ): AsyncIterableIterator<ViewResourceFormat> {
    for await (const page of this.listByHubPagingPage(
      resourceGroupName,
      hubName,
      userId,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all available views for given user in the specified hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param userId The user ID. Use * to retrieve hub level views.
   * @param options The options parameters.
   */
  private _listByHub(
    resourceGroupName: string,
    hubName: string,
    userId: string,
    options?: ViewsListByHubOptionalParams
  ): Promise<ViewsListByHubResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, userId, options },
      listByHubOperationSpec
    );
  }

  /**
   * Creates a view or updates an existing view in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param viewName The name of the view.
   * @param parameters Parameters supplied to the CreateOrUpdate View operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    hubName: string,
    viewName: string,
    parameters: ViewResourceFormat,
    options?: ViewsCreateOrUpdateOptionalParams
  ): Promise<ViewsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, viewName, parameters, options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Gets a view in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param viewName The name of the view.
   * @param userId The user ID. Use * to retrieve hub level view.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    hubName: string,
    viewName: string,
    userId: string,
    options?: ViewsGetOptionalParams
  ): Promise<ViewsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, viewName, userId, options },
      getOperationSpec
    );
  }

  /**
   * Deletes a view in the specified hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param viewName The name of the view.
   * @param userId The user ID. Use * to retrieve hub level view.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    hubName: string,
    viewName: string,
    userId: string,
    options?: ViewsDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, viewName, userId, options },
      deleteOperationSpec
    );
  }

  /**
   * ListByHubNext
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param userId The user ID. Use * to retrieve hub level views.
   * @param nextLink The nextLink from the previous successful call to the ListByHub method.
   * @param options The options parameters.
   */
  private _listByHubNext(
    resourceGroupName: string,
    hubName: string,
    userId: string,
    nextLink: string,
    options?: ViewsListByHubNextOptionalParams
  ): Promise<ViewsListByHubNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, userId, nextLink, options },
      listByHubNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByHubOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ViewListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.userId],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ViewResourceFormat
    }
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.viewName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ViewResourceFormat
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.userId],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.viewName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion, Parameters.userId],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.viewName1
  ],
  serializer
};
const listByHubNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ViewListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.userId],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
