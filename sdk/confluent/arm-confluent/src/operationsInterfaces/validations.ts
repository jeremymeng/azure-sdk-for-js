/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OrganizationResource,
  ValidationsValidateOrganizationOptionalParams,
  ValidationsValidateOrganizationResponse,
  ValidationsValidateOrganizationV2OptionalParams,
  ValidationsValidateOrganizationV2Response,
} from "../models/index.js";

/** Interface representing a Validations. */
export interface Validations {
  /**
   * Organization Validate proxy resource
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body Organization resource model
   * @param options The options parameters.
   */
  validateOrganization(
    resourceGroupName: string,
    organizationName: string,
    body: OrganizationResource,
    options?: ValidationsValidateOrganizationOptionalParams,
  ): Promise<ValidationsValidateOrganizationResponse>;
  /**
   * Organization Validate proxy resource
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body Organization resource model
   * @param options The options parameters.
   */
  validateOrganizationV2(
    resourceGroupName: string,
    organizationName: string,
    body: OrganizationResource,
    options?: ValidationsValidateOrganizationV2OptionalParams,
  ): Promise<ValidationsValidateOrganizationV2Response>;
}
