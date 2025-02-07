/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AppAttachPackage,
  AppAttachPackageListByResourceGroupOptionalParams,
  AppAttachPackageListBySubscriptionOptionalParams,
  AppAttachPackageGetOptionalParams,
  AppAttachPackageGetResponse,
  AppAttachPackageCreateOrUpdateOptionalParams,
  AppAttachPackageCreateOrUpdateResponse,
  AppAttachPackageDeleteOptionalParams,
  AppAttachPackageUpdateOptionalParams,
  AppAttachPackageUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AppAttachPackageOperations. */
export interface AppAttachPackageOperations {
  /**
   * List App Attach packages in resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: AppAttachPackageListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<AppAttachPackage>;
  /**
   * List App Attach packages in subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: AppAttachPackageListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<AppAttachPackage>;
  /**
   * Get an app attach package.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param appAttachPackageName The name of the App Attach package
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    appAttachPackageName: string,
    options?: AppAttachPackageGetOptionalParams,
  ): Promise<AppAttachPackageGetResponse>;
  /**
   * Create or update an App Attach package.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param appAttachPackageName The name of the App Attach package
   * @param appAttachPackage Object containing App Attach Package definitions.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    appAttachPackageName: string,
    appAttachPackage: AppAttachPackage,
    options?: AppAttachPackageCreateOrUpdateOptionalParams,
  ): Promise<AppAttachPackageCreateOrUpdateResponse>;
  /**
   * Remove an App Attach Package.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param appAttachPackageName The name of the App Attach package
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    appAttachPackageName: string,
    options?: AppAttachPackageDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Update an App Attach Package
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param appAttachPackageName The name of the App Attach package
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    appAttachPackageName: string,
    options?: AppAttachPackageUpdateOptionalParams,
  ): Promise<AppAttachPackageUpdateResponse>;
}
