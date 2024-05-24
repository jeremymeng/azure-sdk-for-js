/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Software,
  SoftwareInventoriesListByExtendedResourceOptionalParams,
  SoftwareInventoriesListBySubscriptionOptionalParams,
  SoftwareInventoriesGetOptionalParams,
  SoftwareInventoriesGetResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SoftwareInventories. */
export interface SoftwareInventories {
  /**
   * Gets the software inventory of the virtual machine.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param resourceNamespace The namespace of the resource.
   * @param resourceType The type of the resource.
   * @param resourceName Name of the resource.
   * @param options The options parameters.
   */
  listByExtendedResource(
    resourceGroupName: string,
    resourceNamespace: string,
    resourceType: string,
    resourceName: string,
    options?: SoftwareInventoriesListByExtendedResourceOptionalParams,
  ): PagedAsyncIterableIterator<Software>;
  /**
   * Gets the software inventory of all virtual machines in the subscriptions.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: SoftwareInventoriesListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<Software>;
  /**
   * Gets a single software data of the virtual machine.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param resourceNamespace The namespace of the resource.
   * @param resourceType The type of the resource.
   * @param resourceName Name of the resource.
   * @param softwareName Name of the installed software.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceNamespace: string,
    resourceType: string,
    resourceName: string,
    softwareName: string,
    options?: SoftwareInventoriesGetOptionalParams,
  ): Promise<SoftwareInventoriesGetResponse>;
}
