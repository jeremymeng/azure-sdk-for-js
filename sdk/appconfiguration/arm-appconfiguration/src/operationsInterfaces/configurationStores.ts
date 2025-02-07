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
  ConfigurationStore,
  ConfigurationStoresListOptionalParams,
  ConfigurationStoresListByResourceGroupOptionalParams,
  ApiKey,
  ConfigurationStoresListKeysOptionalParams,
  DeletedConfigurationStore,
  ConfigurationStoresListDeletedOptionalParams,
  ConfigurationStoresGetOptionalParams,
  ConfigurationStoresGetResponse,
  ConfigurationStoresCreateOptionalParams,
  ConfigurationStoresCreateResponse,
  ConfigurationStoresDeleteOptionalParams,
  ConfigurationStoreUpdateParameters,
  ConfigurationStoresUpdateOptionalParams,
  ConfigurationStoresUpdateResponse,
  RegenerateKeyParameters,
  ConfigurationStoresRegenerateKeyOptionalParams,
  ConfigurationStoresRegenerateKeyResponse,
  ConfigurationStoresGetDeletedOptionalParams,
  ConfigurationStoresGetDeletedResponse,
  ConfigurationStoresPurgeDeletedOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ConfigurationStores. */
export interface ConfigurationStores {
  /**
   * Lists the configuration stores for a given subscription.
   * @param options The options parameters.
   */
  list(
    options?: ConfigurationStoresListOptionalParams,
  ): PagedAsyncIterableIterator<ConfigurationStore>;
  /**
   * Lists the configuration stores for a given resource group.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: ConfigurationStoresListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<ConfigurationStore>;
  /**
   * Lists the access key for the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresListKeysOptionalParams,
  ): PagedAsyncIterableIterator<ApiKey>;
  /**
   * Gets information about the deleted configuration stores in a subscription.
   * @param options The options parameters.
   */
  listDeleted(
    options?: ConfigurationStoresListDeletedOptionalParams,
  ): PagedAsyncIterableIterator<DeletedConfigurationStore>;
  /**
   * Gets the properties of the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresGetOptionalParams,
  ): Promise<ConfigurationStoresGetResponse>;
  /**
   * Creates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreCreationParameters The parameters for creating a configuration store.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    configStoreName: string,
    configStoreCreationParameters: ConfigurationStore,
    options?: ConfigurationStoresCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ConfigurationStoresCreateResponse>,
      ConfigurationStoresCreateResponse
    >
  >;
  /**
   * Creates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreCreationParameters The parameters for creating a configuration store.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    configStoreName: string,
    configStoreCreationParameters: ConfigurationStore,
    options?: ConfigurationStoresCreateOptionalParams,
  ): Promise<ConfigurationStoresCreateResponse>;
  /**
   * Deletes a configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Updates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreUpdateParameters The parameters for updating a configuration store.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    configStoreName: string,
    configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
    options?: ConfigurationStoresUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ConfigurationStoresUpdateResponse>,
      ConfigurationStoresUpdateResponse
    >
  >;
  /**
   * Updates a configuration store with the specified parameters.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param configStoreUpdateParameters The parameters for updating a configuration store.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    configStoreName: string,
    configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
    options?: ConfigurationStoresUpdateOptionalParams,
  ): Promise<ConfigurationStoresUpdateResponse>;
  /**
   * Regenerates an access key for the specified configuration store.
   * @param resourceGroupName The name of the resource group to which the container registry belongs.
   * @param configStoreName The name of the configuration store.
   * @param regenerateKeyParameters The parameters for regenerating an access key.
   * @param options The options parameters.
   */
  regenerateKey(
    resourceGroupName: string,
    configStoreName: string,
    regenerateKeyParameters: RegenerateKeyParameters,
    options?: ConfigurationStoresRegenerateKeyOptionalParams,
  ): Promise<ConfigurationStoresRegenerateKeyResponse>;
  /**
   * Gets a deleted Azure app configuration store.
   * @param location The location in which uniqueness will be verified.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  getDeleted(
    location: string,
    configStoreName: string,
    options?: ConfigurationStoresGetDeletedOptionalParams,
  ): Promise<ConfigurationStoresGetDeletedResponse>;
  /**
   * Permanently deletes the specified configuration store.
   * @param location The location in which uniqueness will be verified.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  beginPurgeDeleted(
    location: string,
    configStoreName: string,
    options?: ConfigurationStoresPurgeDeletedOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Permanently deletes the specified configuration store.
   * @param location The location in which uniqueness will be verified.
   * @param configStoreName The name of the configuration store.
   * @param options The options parameters.
   */
  beginPurgeDeletedAndWait(
    location: string,
    configStoreName: string,
    options?: ConfigurationStoresPurgeDeletedOptionalParams,
  ): Promise<void>;
}
