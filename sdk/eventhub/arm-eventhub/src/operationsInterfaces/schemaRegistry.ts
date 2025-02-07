/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SchemaGroup,
  SchemaRegistryListByNamespaceOptionalParams,
  SchemaRegistryCreateOrUpdateOptionalParams,
  SchemaRegistryCreateOrUpdateResponse,
  SchemaRegistryDeleteOptionalParams,
  SchemaRegistryGetOptionalParams,
  SchemaRegistryGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SchemaRegistry. */
export interface SchemaRegistry {
  /**
   * Gets all the Schema Groups in a Namespace.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param options The options parameters.
   */
  listByNamespace(
    resourceGroupName: string,
    namespaceName: string,
    options?: SchemaRegistryListByNamespaceOptionalParams,
  ): PagedAsyncIterableIterator<SchemaGroup>;
  /**
   * Creates or Updates an EventHub schema group.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param schemaGroupName The Schema Group name
   * @param parameters Parameters supplied to create an Event Hub resource.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    parameters: SchemaGroup,
    options?: SchemaRegistryCreateOrUpdateOptionalParams,
  ): Promise<SchemaRegistryCreateOrUpdateResponse>;
  /**
   * Deletes an EventHub schema group.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param schemaGroupName The Schema Group name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    options?: SchemaRegistryDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets the details of an EventHub schema group.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param schemaGroupName The Schema Group name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    namespaceName: string,
    schemaGroupName: string,
    options?: SchemaRegistryGetOptionalParams,
  ): Promise<SchemaRegistryGetResponse>;
}
