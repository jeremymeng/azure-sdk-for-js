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
  RoutingIntent,
  RoutingIntentListOptionalParams,
  RoutingIntentCreateOrUpdateOptionalParams,
  RoutingIntentCreateOrUpdateResponse,
  RoutingIntentGetOptionalParams,
  RoutingIntentGetResponse,
  RoutingIntentDeleteOptionalParams,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a RoutingIntentOperations. */
export interface RoutingIntentOperations {
  /**
   * Retrieves the details of all RoutingIntent child resources of the VirtualHub.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualHubName: string,
    options?: RoutingIntentListOptionalParams,
  ): PagedAsyncIterableIterator<RoutingIntent>;
  /**
   * Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
   * @param resourceGroupName The resource group name of the RoutingIntent.
   * @param virtualHubName The name of the VirtualHub.
   * @param routingIntentName The name of the per VirtualHub singleton Routing Intent resource.
   * @param routingIntentParameters Parameters supplied to create or update RoutingIntent.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<RoutingIntentCreateOrUpdateResponse>,
      RoutingIntentCreateOrUpdateResponse
    >
  >;
  /**
   * Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
   * @param resourceGroupName The resource group name of the RoutingIntent.
   * @param virtualHubName The name of the VirtualHub.
   * @param routingIntentName The name of the per VirtualHub singleton Routing Intent resource.
   * @param routingIntentParameters Parameters supplied to create or update RoutingIntent.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentCreateOrUpdateOptionalParams,
  ): Promise<RoutingIntentCreateOrUpdateResponse>;
  /**
   * Retrieves the details of a RoutingIntent.
   * @param resourceGroupName The resource group name of the RoutingIntent.
   * @param virtualHubName The name of the VirtualHub.
   * @param routingIntentName The name of the RoutingIntent.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentGetOptionalParams,
  ): Promise<RoutingIntentGetResponse>;
  /**
   * Deletes a RoutingIntent.
   * @param resourceGroupName The resource group name of the RoutingIntent.
   * @param virtualHubName The name of the VirtualHub.
   * @param routingIntentName The name of the RoutingIntent.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a RoutingIntent.
   * @param resourceGroupName The resource group name of the RoutingIntent.
   * @param virtualHubName The name of the VirtualHub.
   * @param routingIntentName The name of the RoutingIntent.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentDeleteOptionalParams,
  ): Promise<void>;
}
