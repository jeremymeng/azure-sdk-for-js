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
  GatewayCustomDomainResource,
  GatewayCustomDomainsListOptionalParams,
  GatewayCustomDomainsGetOptionalParams,
  GatewayCustomDomainsGetResponse,
  GatewayCustomDomainsCreateOrUpdateOptionalParams,
  GatewayCustomDomainsCreateOrUpdateResponse,
  GatewayCustomDomainsDeleteOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GatewayCustomDomains. */
export interface GatewayCustomDomains {
  /**
   * Handle requests to list all Spring Cloud Gateway custom domains.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    options?: GatewayCustomDomainsListOptionalParams
  ): PagedAsyncIterableIterator<GatewayCustomDomainResource>;
  /**
   * Get the Spring Cloud Gateway custom domain.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param domainName The name of the Spring Cloud Gateway custom domain.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    domainName: string,
    options?: GatewayCustomDomainsGetOptionalParams
  ): Promise<GatewayCustomDomainsGetResponse>;
  /**
   * Create or update the Spring Cloud Gateway custom domain.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param domainName The name of the Spring Cloud Gateway custom domain.
   * @param gatewayCustomDomainResource The gateway custom domain resource for the create or update
   *                                    operation
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    domainName: string,
    gatewayCustomDomainResource: GatewayCustomDomainResource,
    options?: GatewayCustomDomainsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<GatewayCustomDomainsCreateOrUpdateResponse>,
      GatewayCustomDomainsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or update the Spring Cloud Gateway custom domain.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param domainName The name of the Spring Cloud Gateway custom domain.
   * @param gatewayCustomDomainResource The gateway custom domain resource for the create or update
   *                                    operation
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    domainName: string,
    gatewayCustomDomainResource: GatewayCustomDomainResource,
    options?: GatewayCustomDomainsCreateOrUpdateOptionalParams
  ): Promise<GatewayCustomDomainsCreateOrUpdateResponse>;
  /**
   * Delete the Spring Cloud Gateway custom domain.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param domainName The name of the Spring Cloud Gateway custom domain.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    domainName: string,
    options?: GatewayCustomDomainsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete the Spring Cloud Gateway custom domain.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param gatewayName The name of Spring Cloud Gateway.
   * @param domainName The name of the Spring Cloud Gateway custom domain.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    serviceName: string,
    gatewayName: string,
    domainName: string,
    options?: GatewayCustomDomainsDeleteOptionalParams
  ): Promise<void>;
}
