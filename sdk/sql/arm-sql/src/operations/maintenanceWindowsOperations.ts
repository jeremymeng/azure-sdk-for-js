/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { MaintenanceWindowsOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClient } from "../sqlManagementClient";
import {
  MaintenanceWindowsGetOptionalParams,
  MaintenanceWindowsGetResponse,
  MaintenanceWindows,
  MaintenanceWindowsCreateOrUpdateOptionalParams,
} from "../models";

/** Class containing MaintenanceWindowsOperations operations. */
export class MaintenanceWindowsOperationsImpl
  implements MaintenanceWindowsOperations
{
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class MaintenanceWindowsOperations class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets maintenance windows settings for a database.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database to get maintenance windows for.
   * @param maintenanceWindowName Maintenance window name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsGetOptionalParams,
  ): Promise<MaintenanceWindowsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        maintenanceWindowName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Sets maintenance windows settings for a database.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database to set maintenance windows for.
   * @param maintenanceWindowName Maintenance window name.
   * @param parameters Maintenance windows.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    parameters: MaintenanceWindows,
    options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        maintenanceWindowName,
        parameters,
        options,
      },
      createOrUpdateOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindows/current",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceWindows,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion3, Parameters.maintenanceWindowName],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindows/current",
  httpMethod: "PUT",
  responses: { 200: {}, default: {} },
  requestBody: Parameters.parameters27,
  queryParameters: [Parameters.apiVersion3, Parameters.maintenanceWindowName],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer,
};
