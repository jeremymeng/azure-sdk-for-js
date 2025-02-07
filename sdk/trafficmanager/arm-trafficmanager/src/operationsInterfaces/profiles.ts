/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Profile,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityResponse,
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerNameAvailabilityV2Response,
  ProfilesGetOptionalParams,
  ProfilesGetResponse,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesCreateOrUpdateResponse,
  ProfilesDeleteOptionalParams,
  ProfilesDeleteResponse,
  ProfilesUpdateOptionalParams,
  ProfilesUpdateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Profiles. */
export interface Profiles {
  /**
   * Lists all Traffic Manager profiles within a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: ProfilesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Profile>;
  /**
   * Lists all Traffic Manager profiles within a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: ProfilesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Profile>;
  /**
   * Checks the availability of a Traffic Manager Relative DNS name.
   * @param parameters The Traffic Manager name parameters supplied to the
   *                   CheckTrafficManagerNameAvailability operation.
   * @param options The options parameters.
   */
  checkTrafficManagerRelativeDnsNameAvailability(
    parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
    options?: ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams
  ): Promise<ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityResponse>;
  /**
   * Checks the availability of a Traffic Manager Relative DNS name.
   * @param parameters The Traffic Manager name parameters supplied to the
   *                   CheckTrafficManagerNameAvailability operation.
   * @param options The options parameters.
   */
  checkTrafficManagerNameAvailabilityV2(
    parameters: CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
    options?: ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams
  ): Promise<ProfilesCheckTrafficManagerNameAvailabilityV2Response>;
  /**
   * Gets a Traffic Manager profile.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param profileName The name of the Traffic Manager profile.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesGetOptionalParams
  ): Promise<ProfilesGetResponse>;
  /**
   * Create or update a Traffic Manager profile.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param profileName The name of the Traffic Manager profile.
   * @param parameters The Traffic Manager profile parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    profileName: string,
    parameters: Profile,
    options?: ProfilesCreateOrUpdateOptionalParams
  ): Promise<ProfilesCreateOrUpdateResponse>;
  /**
   * Deletes a Traffic Manager profile.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param profileName The name of the Traffic Manager profile to be deleted.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams
  ): Promise<ProfilesDeleteResponse>;
  /**
   * Update a Traffic Manager profile.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param profileName The name of the Traffic Manager profile.
   * @param parameters The Traffic Manager profile parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    profileName: string,
    parameters: Profile,
    options?: ProfilesUpdateOptionalParams
  ): Promise<ProfilesUpdateResponse>;
}
