/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SqlPoolTable,
  SqlPoolTablesListBySchemaOptionalParams,
  SqlPoolTablesGetOptionalParams,
  SqlPoolTablesGetResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SqlPoolTables. */
export interface SqlPoolTables {
  /**
   * Gets tables of a given schema in a SQL pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param sqlPoolName SQL pool name
   * @param schemaName The name of the schema.
   * @param options The options parameters.
   */
  listBySchema(
    resourceGroupName: string,
    workspaceName: string,
    sqlPoolName: string,
    schemaName: string,
    options?: SqlPoolTablesListBySchemaOptionalParams
  ): PagedAsyncIterableIterator<SqlPoolTable>;
  /**
   * Get Sql pool table
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param sqlPoolName SQL pool name
   * @param schemaName The name of the schema.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    sqlPoolName: string,
    schemaName: string,
    tableName: string,
    options?: SqlPoolTablesGetOptionalParams
  ): Promise<SqlPoolTablesGetResponse>;
}
