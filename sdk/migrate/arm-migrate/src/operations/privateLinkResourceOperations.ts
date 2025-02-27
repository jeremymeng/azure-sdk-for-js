/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PrivateLinkResourceOperations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureMigrateV2 } from "../azureMigrateV2.js";
import {
  PrivateLinkResourceGetOptionalParams,
  PrivateLinkResourceGetResponse,
  PrivateLinkResourceListByProjectOptionalParams,
  PrivateLinkResourceListByProjectResponse
} from "../models/index.js";

/** Class containing PrivateLinkResourceOperations operations. */
export class PrivateLinkResourceOperationsImpl
  implements PrivateLinkResourceOperations {
  private readonly client: AzureMigrateV2;

  /**
   * Initialize a new instance of the class PrivateLinkResourceOperations class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrateV2) {
    this.client = client;
  }

  /**
   * Get information related to a specific private Link Resource in the project. Returns a json object of
   * type 'privateLinkResources' as specified in the models section.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param privateLinkResourceName Unique name of a private link resource within a project.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourceGetOptionalParams
  ): Promise<PrivateLinkResourceGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, privateLinkResourceName, options },
      getOperationSpec
    );
  }

  /**
   * Get all private link resources created in the project. Returns a json array of objects of type
   * 'privateLinkResources' as specified in the Models section.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  listByProject(
    resourceGroupName: string,
    projectName: string,
    options?: PrivateLinkResourceListByProjectOptionalParams
  ): Promise<PrivateLinkResourceListByProjectResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      listByProjectOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentprojects/{projectName}/privateLinkResources/{privateLinkResourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateLinkResource,
      headersMapper: Mappers.PrivateLinkResourceGetHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.privateLinkResourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByProjectOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentprojects/{projectName}/privateLinkResources",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateLinkResourceCollection,
      headersMapper: Mappers.PrivateLinkResourceListByProjectHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
