/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { DatabaseRecommendedActions } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClientContext } from "../sqlManagementClientContext";
import {
  DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams,
  DatabaseRecommendedActionsListByDatabaseAdvisorResponse,
  DatabaseRecommendedActionsGetOptionalParams,
  DatabaseRecommendedActionsGetResponse,
  RecommendedAction,
  DatabaseRecommendedActionsUpdateOptionalParams,
  DatabaseRecommendedActionsUpdateResponse
} from "../models";

/** Class representing a DatabaseRecommendedActions. */
export class DatabaseRecommendedActionsImpl
  implements DatabaseRecommendedActions {
  private readonly client: SqlManagementClientContext;

  /**
   * Initialize a new instance of the class DatabaseRecommendedActions class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets list of Database Recommended Actions.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param advisorName The name of the Database Advisor.
   * @param options The options parameters.
   */
  listByDatabaseAdvisor(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    options?: DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams
  ): Promise<DatabaseRecommendedActionsListByDatabaseAdvisorResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serverName, databaseName, advisorName, options },
      listByDatabaseAdvisorOperationSpec
    );
  }

  /**
   * Gets a database recommended action.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param advisorName The name of the Database Advisor.
   * @param recommendedActionName The name of Database Recommended Action.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    recommendedActionName: string,
    options?: DatabaseRecommendedActionsGetOptionalParams
  ): Promise<DatabaseRecommendedActionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        recommendedActionName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Updates a database recommended action.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param advisorName The name of the Database Advisor.
   * @param recommendedActionName The name of Database Recommended Action.
   * @param parameters The requested recommended action resource state.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    recommendedActionName: string,
    parameters: RecommendedAction,
    options?: DatabaseRecommendedActionsUpdateOptionalParams
  ): Promise<DatabaseRecommendedActionsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        recommendedActionName,
        parameters,
        options
      },
      updateOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByDatabaseAdvisorOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "RecommendedAction" }
          }
        }
      }
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.advisorName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecommendedAction
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.advisorName,
    Parameters.recommendedActionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.RecommendedAction
    },
    default: {}
  },
  requestBody: Parameters.parameters20,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.advisorName,
    Parameters.recommendedActionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
