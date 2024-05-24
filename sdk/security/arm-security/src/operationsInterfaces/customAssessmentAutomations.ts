/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  CustomAssessmentAutomation,
  CustomAssessmentAutomationsListByResourceGroupOptionalParams,
  CustomAssessmentAutomationsListBySubscriptionOptionalParams,
  CustomAssessmentAutomationsGetOptionalParams,
  CustomAssessmentAutomationsGetResponse,
  CustomAssessmentAutomationRequest,
  CustomAssessmentAutomationsCreateOptionalParams,
  CustomAssessmentAutomationsCreateResponse,
  CustomAssessmentAutomationsDeleteOptionalParams,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a CustomAssessmentAutomations. */
export interface CustomAssessmentAutomations {
  /**
   * List custom assessment automations by provided subscription and resource group
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: CustomAssessmentAutomationsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<CustomAssessmentAutomation>;
  /**
   * List custom assessment automations by provided subscription
   * @param options The options parameters.
   */
  listBySubscription(
    options?: CustomAssessmentAutomationsListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<CustomAssessmentAutomation>;
  /**
   * Gets a single custom assessment automation by name for the provided subscription and resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param customAssessmentAutomationName Name of the Custom Assessment Automation.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    customAssessmentAutomationName: string,
    options?: CustomAssessmentAutomationsGetOptionalParams,
  ): Promise<CustomAssessmentAutomationsGetResponse>;
  /**
   * Creates or updates a custom assessment automation for the provided subscription. Please note that
   * providing an existing custom assessment automation will replace the existing record.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param customAssessmentAutomationName Name of the Custom Assessment Automation.
   * @param customAssessmentAutomationBody Custom Assessment Automation body
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    customAssessmentAutomationName: string,
    customAssessmentAutomationBody: CustomAssessmentAutomationRequest,
    options?: CustomAssessmentAutomationsCreateOptionalParams,
  ): Promise<CustomAssessmentAutomationsCreateResponse>;
  /**
   * Deletes a custom assessment automation by name for a provided subscription
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param customAssessmentAutomationName Name of the Custom Assessment Automation.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    customAssessmentAutomationName: string,
    options?: CustomAssessmentAutomationsDeleteOptionalParams,
  ): Promise<void>;
}
