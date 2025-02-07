/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  ServiceUnitResource,
  ServiceUnitsCreateOrUpdateOptionalParams,
  ServiceUnitsCreateOrUpdateResponse,
  ServiceUnitsGetOptionalParams,
  ServiceUnitsGetResponse,
  ServiceUnitsDeleteOptionalParams,
  ServiceUnitsListOptionalParams,
  ServiceUnitsListResponse
} from "../models/index.js";

/** Interface representing a ServiceUnits. */
export interface ServiceUnits {
  /**
   * This is an asynchronous operation and can be polled to completion using the operation resource
   * returned by this operation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceTopologyName The name of the service topology .
   * @param serviceName The name of the service resource.
   * @param serviceUnitName The name of the service unit resource.
   * @param serviceUnitInfo The service unit resource object.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    serviceTopologyName: string,
    serviceName: string,
    serviceUnitName: string,
    serviceUnitInfo: ServiceUnitResource,
    options?: ServiceUnitsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ServiceUnitsCreateOrUpdateResponse>,
      ServiceUnitsCreateOrUpdateResponse
    >
  >;
  /**
   * This is an asynchronous operation and can be polled to completion using the operation resource
   * returned by this operation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceTopologyName The name of the service topology .
   * @param serviceName The name of the service resource.
   * @param serviceUnitName The name of the service unit resource.
   * @param serviceUnitInfo The service unit resource object.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serviceTopologyName: string,
    serviceName: string,
    serviceUnitName: string,
    serviceUnitInfo: ServiceUnitResource,
    options?: ServiceUnitsCreateOrUpdateOptionalParams
  ): Promise<ServiceUnitsCreateOrUpdateResponse>;
  /**
   * Gets the service unit.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceTopologyName The name of the service topology .
   * @param serviceName The name of the service resource.
   * @param serviceUnitName The name of the service unit resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceTopologyName: string,
    serviceName: string,
    serviceUnitName: string,
    options?: ServiceUnitsGetOptionalParams
  ): Promise<ServiceUnitsGetResponse>;
  /**
   * Deletes the service unit.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceTopologyName The name of the service topology .
   * @param serviceName The name of the service resource.
   * @param serviceUnitName The name of the service unit resource.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceTopologyName: string,
    serviceName: string,
    serviceUnitName: string,
    options?: ServiceUnitsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Lists the service units under a service in the service topology.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceTopologyName The name of the service topology .
   * @param serviceName The name of the service resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serviceTopologyName: string,
    serviceName: string,
    options?: ServiceUnitsListOptionalParams
  ): Promise<ServiceUnitsListResponse>;
}
