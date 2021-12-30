/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountSchemas } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { LogicManagementClient } from "../logicManagementClient";
import {
  IntegrationAccountSchema,
  IntegrationAccountSchemasListNextOptionalParams,
  IntegrationAccountSchemasListOptionalParams,
  IntegrationAccountSchemasListResponse,
  IntegrationAccountSchemasGetOptionalParams,
  IntegrationAccountSchemasGetResponse,
  IntegrationAccountSchemasCreateOrUpdateOptionalParams,
  IntegrationAccountSchemasCreateOrUpdateResponse,
  IntegrationAccountSchemasDeleteOptionalParams,
  GetCallbackUrlParameters,
  IntegrationAccountSchemasListContentCallbackUrlOptionalParams,
  IntegrationAccountSchemasListContentCallbackUrlResponse,
  IntegrationAccountSchemasListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing IntegrationAccountSchemas operations. */
export class IntegrationAccountSchemasImpl
  implements IntegrationAccountSchemas {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class IntegrationAccountSchemas class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of integration account schemas.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: IntegrationAccountSchemasListOptionalParams
  ): PagedAsyncIterableIterator<IntegrationAccountSchema> {
    const iter = this.listPagingAll(
      resourceGroupName,
      integrationAccountName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(
          resourceGroupName,
          integrationAccountName,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: IntegrationAccountSchemasListOptionalParams
  ): AsyncIterableIterator<IntegrationAccountSchema[]> {
    let result = await this._list(
      resourceGroupName,
      integrationAccountName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        integrationAccountName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: IntegrationAccountSchemasListOptionalParams
  ): AsyncIterableIterator<IntegrationAccountSchema> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      integrationAccountName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of integration account schemas.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: IntegrationAccountSchemasListOptionalParams
  ): Promise<IntegrationAccountSchemasListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, options },
      listOperationSpec
    );
  }

  /**
   * Gets an integration account schema.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param schemaName The integration account schema name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    integrationAccountName: string,
    schemaName: string,
    options?: IntegrationAccountSchemasGetOptionalParams
  ): Promise<IntegrationAccountSchemasGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, schemaName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates an integration account schema.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param schemaName The integration account schema name.
   * @param schema The integration account schema.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    integrationAccountName: string,
    schemaName: string,
    schema: IntegrationAccountSchema,
    options?: IntegrationAccountSchemasCreateOrUpdateOptionalParams
  ): Promise<IntegrationAccountSchemasCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        schemaName,
        schema,
        options
      },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Deletes an integration account schema.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param schemaName The integration account schema name.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    integrationAccountName: string,
    schemaName: string,
    options?: IntegrationAccountSchemasDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, schemaName, options },
      deleteOperationSpec
    );
  }

  /**
   * Get the content callback url.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param schemaName The integration account schema name.
   * @param listContentCallbackUrl The callback url parameters.
   * @param options The options parameters.
   */
  listContentCallbackUrl(
    resourceGroupName: string,
    integrationAccountName: string,
    schemaName: string,
    listContentCallbackUrl: GetCallbackUrlParameters,
    options?: IntegrationAccountSchemasListContentCallbackUrlOptionalParams
  ): Promise<IntegrationAccountSchemasListContentCallbackUrlResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        schemaName,
        listContentCallbackUrl,
        options
      },
      listContentCallbackUrlOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    integrationAccountName: string,
    nextLink: string,
    options?: IntegrationAccountSchemasListNextOptionalParams
  ): Promise<IntegrationAccountSchemasListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountSchemaListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountSchema
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.schemaName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountSchema
    },
    201: {
      bodyMapper: Mappers.IntegrationAccountSchema
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.schema,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.schemaName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.schemaName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listContentCallbackUrlOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}/listContentCallbackUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.WorkflowTriggerCallbackUrl
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.listContentCallbackUrl,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.schemaName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountSchemaListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.integrationAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
