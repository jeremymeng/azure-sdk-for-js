/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { ManagedDatabaseSensitivityLabels } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClient } from "../sqlManagementClient";
import {
  SensitivityLabel,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseNextOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseResponse,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseNextOptionalParams,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseResponse,
  SensitivityLabelSource,
  ManagedDatabaseSensitivityLabelsGetOptionalParams,
  ManagedDatabaseSensitivityLabelsGetResponse,
  ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsCreateOrUpdateResponse,
  ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  SensitivityLabelUpdateList,
  ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ManagedDatabaseSensitivityLabelsListCurrentByDatabaseNextResponse,
  ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing ManagedDatabaseSensitivityLabels operations. */
export class ManagedDatabaseSensitivityLabelsImpl
  implements ManagedDatabaseSensitivityLabels
{
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class ManagedDatabaseSensitivityLabels class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets the sensitivity labels of a given database
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  public listCurrentByDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ): PagedAsyncIterableIterator<SensitivityLabel> {
    const iter = this.listCurrentByDatabasePagingAll(
      resourceGroupName,
      managedInstanceName,
      databaseName,
      options,
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
        return this.listCurrentByDatabasePagingPage(
          resourceGroupName,
          managedInstanceName,
          databaseName,
          options,
          settings,
        );
      },
    };
  }

  private async *listCurrentByDatabasePagingPage(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SensitivityLabel[]> {
    let result: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listCurrentByDatabase(
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listCurrentByDatabaseNext(
        resourceGroupName,
        managedInstanceName,
        databaseName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listCurrentByDatabasePagingAll(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ): AsyncIterableIterator<SensitivityLabel> {
    for await (const page of this.listCurrentByDatabasePagingPage(
      resourceGroupName,
      managedInstanceName,
      databaseName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets the sensitivity labels of a given database
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  public listRecommendedByDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ): PagedAsyncIterableIterator<SensitivityLabel> {
    const iter = this.listRecommendedByDatabasePagingAll(
      resourceGroupName,
      managedInstanceName,
      databaseName,
      options,
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
        return this.listRecommendedByDatabasePagingPage(
          resourceGroupName,
          managedInstanceName,
          databaseName,
          options,
          settings,
        );
      },
    };
  }

  private async *listRecommendedByDatabasePagingPage(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SensitivityLabel[]> {
    let result: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listRecommendedByDatabase(
        resourceGroupName,
        managedInstanceName,
        databaseName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listRecommendedByDatabaseNext(
        resourceGroupName,
        managedInstanceName,
        databaseName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listRecommendedByDatabasePagingAll(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ): AsyncIterableIterator<SensitivityLabel> {
    for await (const page of this.listRecommendedByDatabasePagingPage(
      resourceGroupName,
      managedInstanceName,
      databaseName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets the sensitivity label of a given column
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param columnName The name of the column.
   * @param sensitivityLabelSource The source of the sensitivity label.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    sensitivityLabelSource: SensitivityLabelSource,
    options?: ManagedDatabaseSensitivityLabelsGetOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        sensitivityLabelSource,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates the sensitivity label of a given column
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param columnName The name of the column.
   * @param parameters The column sensitivity label resource.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    parameters: SensitivityLabel,
    options?: ManagedDatabaseSensitivityLabelsCreateOrUpdateOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        parameters,
        options,
      },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Deletes the sensitivity label of a given column
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param columnName The name of the column.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    options?: ManagedDatabaseSensitivityLabelsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        options,
      },
      deleteOperationSpec,
    );
  }

  /**
   * Disables sensitivity recommendations on a given column
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param columnName The name of the column.
   * @param options The options parameters.
   */
  disableRecommendation(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    options?: ManagedDatabaseSensitivityLabelsDisableRecommendationOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        options,
      },
      disableRecommendationOperationSpec,
    );
  }

  /**
   * Enables sensitivity recommendations on a given column (recommendations are enabled by default on all
   * columns)
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param columnName The name of the column.
   * @param options The options parameters.
   */
  enableRecommendation(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string,
    columnName: string,
    options?: ManagedDatabaseSensitivityLabelsEnableRecommendationOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        schemaName,
        tableName,
        columnName,
        options,
      },
      enableRecommendationOperationSpec,
    );
  }

  /**
   * Gets the sensitivity labels of a given database
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  private _listCurrentByDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsListCurrentByDatabaseResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managedInstanceName, databaseName, options },
      listCurrentByDatabaseOperationSpec,
    );
  }

  /**
   * Update sensitivity labels of a given database using an operations batch.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param parameters A list of sensitivity label update operations.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    parameters: SensitivityLabelUpdateList,
    options?: ManagedDatabaseSensitivityLabelsUpdateOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        parameters,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * Gets the sensitivity labels of a given database
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  private _listRecommendedByDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managedInstanceName, databaseName, options },
      listRecommendedByDatabaseOperationSpec,
    );
  }

  /**
   * ListCurrentByDatabaseNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param nextLink The nextLink from the previous successful call to the ListCurrentByDatabase method.
   * @param options The options parameters.
   */
  private _listCurrentByDatabaseNext(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    nextLink: string,
    options?: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseNextOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsListCurrentByDatabaseNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        nextLink,
        options,
      },
      listCurrentByDatabaseNextOperationSpec,
    );
  }

  /**
   * ListRecommendedByDatabaseNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param nextLink The nextLink from the previous successful call to the ListRecommendedByDatabase
   *                 method.
   * @param options The options parameters.
   */
  private _listRecommendedByDatabaseNext(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    nextLink: string,
    options?: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseNextOptionalParams,
  ): Promise<ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        databaseName,
        nextLink,
        options,
      },
      listRecommendedByDatabaseNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabel,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.schemaName,
    Parameters.tableName,
    Parameters.columnName,
    Parameters.managedInstanceName,
    Parameters.sensitivityLabelSource,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabel,
    },
    201: {
      bodyMapper: Mappers.SensitivityLabel,
    },
    default: {},
  },
  requestBody: Parameters.parameters67,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.schemaName,
    Parameters.tableName,
    Parameters.columnName,
    Parameters.managedInstanceName,
    Parameters.sensitivityLabelSource1,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
  httpMethod: "DELETE",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.schemaName,
    Parameters.tableName,
    Parameters.columnName,
    Parameters.managedInstanceName,
    Parameters.sensitivityLabelSource1,
  ],
  serializer,
};
const disableRecommendationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/disable",
  httpMethod: "POST",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.schemaName,
    Parameters.tableName,
    Parameters.columnName,
    Parameters.managedInstanceName,
    Parameters.sensitivityLabelSource2,
  ],
  serializer,
};
const enableRecommendationOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/enable",
  httpMethod: "POST",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.schemaName,
    Parameters.tableName,
    Parameters.columnName,
    Parameters.managedInstanceName,
    Parameters.sensitivityLabelSource2,
  ],
  serializer,
};
const listCurrentByDatabaseOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabelListResult,
    },
    default: {},
  },
  queryParameters: [
    Parameters.skipToken,
    Parameters.filter1,
    Parameters.apiVersion3,
    Parameters.count,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.managedInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels",
  httpMethod: "PATCH",
  responses: { 200: {}, default: {} },
  requestBody: Parameters.parameters68,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.managedInstanceName,
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listRecommendedByDatabaseOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/recommendedSensitivityLabels",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabelListResult,
    },
    default: {},
  },
  queryParameters: [
    Parameters.skipToken,
    Parameters.filter1,
    Parameters.apiVersion3,
    Parameters.includeDisabledRecommendations,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.managedInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listCurrentByDatabaseNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabelListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.nextLink,
    Parameters.managedInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listRecommendedByDatabaseNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SensitivityLabelListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.databaseName,
    Parameters.nextLink,
    Parameters.managedInstanceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
