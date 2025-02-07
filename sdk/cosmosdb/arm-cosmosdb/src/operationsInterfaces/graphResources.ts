/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  GraphResourceGetResults,
  GraphResourcesListGraphsOptionalParams,
  GraphResourcesGetGraphOptionalParams,
  GraphResourcesGetGraphResponse,
  GraphResourceCreateUpdateParameters,
  GraphResourcesCreateUpdateGraphOptionalParams,
  GraphResourcesCreateUpdateGraphResponse,
  GraphResourcesDeleteGraphResourceOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GraphResources. */
export interface GraphResources {
  /**
   * Lists the graphs under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param options The options parameters.
   */
  listGraphs(
    resourceGroupName: string,
    accountName: string,
    options?: GraphResourcesListGraphsOptionalParams,
  ): PagedAsyncIterableIterator<GraphResourceGetResults>;
  /**
   * Gets the Graph resource under an existing Azure Cosmos DB database account with the provided name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param graphName Cosmos DB graph resource name.
   * @param options The options parameters.
   */
  getGraph(
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesGetGraphOptionalParams,
  ): Promise<GraphResourcesGetGraphResponse>;
  /**
   * Create or update an Azure Cosmos DB Graph.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param graphName Cosmos DB graph resource name.
   * @param createUpdateGraphParameters The parameters to provide for the current graph.
   * @param options The options parameters.
   */
  beginCreateUpdateGraph(
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
    options?: GraphResourcesCreateUpdateGraphOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<GraphResourcesCreateUpdateGraphResponse>,
      GraphResourcesCreateUpdateGraphResponse
    >
  >;
  /**
   * Create or update an Azure Cosmos DB Graph.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param graphName Cosmos DB graph resource name.
   * @param createUpdateGraphParameters The parameters to provide for the current graph.
   * @param options The options parameters.
   */
  beginCreateUpdateGraphAndWait(
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
    options?: GraphResourcesCreateUpdateGraphOptionalParams,
  ): Promise<GraphResourcesCreateUpdateGraphResponse>;
  /**
   * Deletes an existing Azure Cosmos DB Graph Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param graphName Cosmos DB graph resource name.
   * @param options The options parameters.
   */
  beginDeleteGraphResource(
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesDeleteGraphResourceOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes an existing Azure Cosmos DB Graph Resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param graphName Cosmos DB graph resource name.
   * @param options The options parameters.
   */
  beginDeleteGraphResourceAndWait(
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesDeleteGraphResourceOptionalParams,
  ): Promise<void>;
}
