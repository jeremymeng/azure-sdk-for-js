/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  LocationsGetCapabilitiesOptionalParams,
  LocationsGetCapabilitiesResponse,
  LocationsListUsagesOptionalParams,
  LocationsListUsagesResponse,
  LocationsListBillingSpecsOptionalParams,
  LocationsListBillingSpecsResponse,
  LocationsGetAzureAsyncOperationStatusOptionalParams,
  LocationsGetAzureAsyncOperationStatusResponse,
  NameAvailabilityCheckRequestParameters,
  LocationsCheckNameAvailabilityOptionalParams,
  LocationsCheckNameAvailabilityResponse,
  ClusterCreateRequestValidationParameters,
  LocationsValidateClusterCreateRequestOptionalParams,
  LocationsValidateClusterCreateRequestResponse
} from "../models";

/** Interface representing a Locations. */
export interface Locations {
  /**
   * Gets the capabilities for the specified location.
   * @param location The Azure location (region) for which to make the request.
   * @param options The options parameters.
   */
  getCapabilities(
    location: string,
    options?: LocationsGetCapabilitiesOptionalParams
  ): Promise<LocationsGetCapabilitiesResponse>;
  /**
   * Lists the usages for the specified location.
   * @param location The Azure location (region) for which to make the request.
   * @param options The options parameters.
   */
  listUsages(
    location: string,
    options?: LocationsListUsagesOptionalParams
  ): Promise<LocationsListUsagesResponse>;
  /**
   * Lists the billingSpecs for the specified subscription and location.
   * @param location The Azure location (region) for which to make the request.
   * @param options The options parameters.
   */
  listBillingSpecs(
    location: string,
    options?: LocationsListBillingSpecsOptionalParams
  ): Promise<LocationsListBillingSpecsResponse>;
  /**
   * Get the async operation status.
   * @param location The Azure location (region) for which to make the request.
   * @param operationId The long running operation id.
   * @param options The options parameters.
   */
  getAzureAsyncOperationStatus(
    location: string,
    operationId: string,
    options?: LocationsGetAzureAsyncOperationStatusOptionalParams
  ): Promise<LocationsGetAzureAsyncOperationStatusResponse>;
  /**
   * Check the cluster name is available or not.
   * @param location The Azure location (region) for which to make the request.
   * @param parameters The request spec of checking name availability.
   * @param options The options parameters.
   */
  checkNameAvailability(
    location: string,
    parameters: NameAvailabilityCheckRequestParameters,
    options?: LocationsCheckNameAvailabilityOptionalParams
  ): Promise<LocationsCheckNameAvailabilityResponse>;
  /**
   * Validate the cluster create request spec is valid or not.
   * @param location The Azure location (region) for which to make the request.
   * @param parameters The cluster create request specification.
   * @param options The options parameters.
   */
  validateClusterCreateRequest(
    location: string,
    parameters: ClusterCreateRequestValidationParameters,
    options?: LocationsValidateClusterCreateRequestOptionalParams
  ): Promise<LocationsValidateClusterCreateRequestResponse>;
}
