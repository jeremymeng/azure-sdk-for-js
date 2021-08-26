/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  FrontendIPConfiguration,
  LoadBalancerFrontendIPConfigurationsListOptionalParams,
  LoadBalancerFrontendIPConfigurationsGetOptionalParams,
  LoadBalancerFrontendIPConfigurationsGetResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a LoadBalancerFrontendIPConfigurations. */
export interface LoadBalancerFrontendIPConfigurations {
  /**
   * Gets all the load balancer frontend IP configurations.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerFrontendIPConfigurationsListOptionalParams
  ): PagedAsyncIterableIterator<FrontendIPConfiguration>;
  /**
   * Gets load balancer frontend IP configuration.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param frontendIPConfigurationName The name of the frontend IP configuration.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    loadBalancerName: string,
    frontendIPConfigurationName: string,
    options?: LoadBalancerFrontendIPConfigurationsGetOptionalParams
  ): Promise<LoadBalancerFrontendIPConfigurationsGetResponse>;
}
