/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  RemediationDeployment,
  RemediationsListDeploymentsAtManagementGroupOptionalParams,
  Remediation,
  RemediationsListForManagementGroupOptionalParams,
  RemediationsListDeploymentsAtSubscriptionOptionalParams,
  RemediationsListForSubscriptionOptionalParams,
  RemediationsListDeploymentsAtResourceGroupOptionalParams,
  RemediationsListForResourceGroupOptionalParams,
  RemediationsListDeploymentsAtResourceOptionalParams,
  RemediationsListForResourceOptionalParams,
  RemediationsCancelAtManagementGroupOptionalParams,
  RemediationsCancelAtManagementGroupResponse,
  RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  RemediationsCreateOrUpdateAtManagementGroupResponse,
  RemediationsGetAtManagementGroupOptionalParams,
  RemediationsGetAtManagementGroupResponse,
  RemediationsDeleteAtManagementGroupOptionalParams,
  RemediationsDeleteAtManagementGroupResponse,
  RemediationsCancelAtSubscriptionOptionalParams,
  RemediationsCancelAtSubscriptionResponse,
  RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  RemediationsCreateOrUpdateAtSubscriptionResponse,
  RemediationsGetAtSubscriptionOptionalParams,
  RemediationsGetAtSubscriptionResponse,
  RemediationsDeleteAtSubscriptionOptionalParams,
  RemediationsDeleteAtSubscriptionResponse,
  RemediationsCancelAtResourceGroupOptionalParams,
  RemediationsCancelAtResourceGroupResponse,
  RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  RemediationsCreateOrUpdateAtResourceGroupResponse,
  RemediationsGetAtResourceGroupOptionalParams,
  RemediationsGetAtResourceGroupResponse,
  RemediationsDeleteAtResourceGroupOptionalParams,
  RemediationsDeleteAtResourceGroupResponse,
  RemediationsCancelAtResourceOptionalParams,
  RemediationsCancelAtResourceResponse,
  RemediationsCreateOrUpdateAtResourceOptionalParams,
  RemediationsCreateOrUpdateAtResourceResponse,
  RemediationsGetAtResourceOptionalParams,
  RemediationsGetAtResourceResponse,
  RemediationsDeleteAtResourceOptionalParams,
  RemediationsDeleteAtResourceResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Remediations. */
export interface Remediations {
  /**
   * Gets all deployments for a remediation at management group scope.
   * @param managementGroupId Management group ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  listDeploymentsAtManagementGroup(
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtManagementGroupOptionalParams,
  ): PagedAsyncIterableIterator<RemediationDeployment>;
  /**
   * Gets all remediations for the management group.
   * @param managementGroupId Management group ID.
   * @param options The options parameters.
   */
  listForManagementGroup(
    managementGroupId: string,
    options?: RemediationsListForManagementGroupOptionalParams,
  ): PagedAsyncIterableIterator<Remediation>;
  /**
   * Gets all deployments for a remediation at subscription scope.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  listDeploymentsAtSubscription(
    remediationName: string,
    options?: RemediationsListDeploymentsAtSubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<RemediationDeployment>;
  /**
   * Gets all remediations for the subscription.
   * @param options The options parameters.
   */
  listForSubscription(
    options?: RemediationsListForSubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<Remediation>;
  /**
   * Gets all deployments for a remediation at resource group scope.
   * @param resourceGroupName Resource group name.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  listDeploymentsAtResourceGroup(
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<RemediationDeployment>;
  /**
   * Gets all remediations for the subscription.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  listForResourceGroup(
    resourceGroupName: string,
    options?: RemediationsListForResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<Remediation>;
  /**
   * Gets all deployments for a remediation at resource scope.
   * @param resourceId Resource ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  listDeploymentsAtResource(
    resourceId: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtResourceOptionalParams,
  ): PagedAsyncIterableIterator<RemediationDeployment>;
  /**
   * Gets all remediations for a resource.
   * @param resourceId Resource ID.
   * @param options The options parameters.
   */
  listForResource(
    resourceId: string,
    options?: RemediationsListForResourceOptionalParams,
  ): PagedAsyncIterableIterator<Remediation>;
  /**
   * Cancels a remediation at management group scope.
   * @param managementGroupId Management group ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  cancelAtManagementGroup(
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsCancelAtManagementGroupOptionalParams,
  ): Promise<RemediationsCancelAtManagementGroupResponse>;
  /**
   * Creates or updates a remediation at management group scope.
   * @param managementGroupId Management group ID.
   * @param remediationName The name of the remediation.
   * @param parameters The remediation parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtManagementGroup(
    managementGroupId: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  ): Promise<RemediationsCreateOrUpdateAtManagementGroupResponse>;
  /**
   * Gets an existing remediation at management group scope.
   * @param managementGroupId Management group ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  getAtManagementGroup(
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsGetAtManagementGroupOptionalParams,
  ): Promise<RemediationsGetAtManagementGroupResponse>;
  /**
   * Deletes an existing remediation at management group scope.
   * @param managementGroupId Management group ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  deleteAtManagementGroup(
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsDeleteAtManagementGroupOptionalParams,
  ): Promise<RemediationsDeleteAtManagementGroupResponse>;
  /**
   * Cancels a remediation at subscription scope.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  cancelAtSubscription(
    remediationName: string,
    options?: RemediationsCancelAtSubscriptionOptionalParams,
  ): Promise<RemediationsCancelAtSubscriptionResponse>;
  /**
   * Creates or updates a remediation at subscription scope.
   * @param remediationName The name of the remediation.
   * @param parameters The remediation parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtSubscription(
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  ): Promise<RemediationsCreateOrUpdateAtSubscriptionResponse>;
  /**
   * Gets an existing remediation at subscription scope.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  getAtSubscription(
    remediationName: string,
    options?: RemediationsGetAtSubscriptionOptionalParams,
  ): Promise<RemediationsGetAtSubscriptionResponse>;
  /**
   * Deletes an existing remediation at subscription scope.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  deleteAtSubscription(
    remediationName: string,
    options?: RemediationsDeleteAtSubscriptionOptionalParams,
  ): Promise<RemediationsDeleteAtSubscriptionResponse>;
  /**
   * Cancels a remediation at resource group scope.
   * @param resourceGroupName Resource group name.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  cancelAtResourceGroup(
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsCancelAtResourceGroupOptionalParams,
  ): Promise<RemediationsCancelAtResourceGroupResponse>;
  /**
   * Creates or updates a remediation at resource group scope.
   * @param resourceGroupName Resource group name.
   * @param remediationName The name of the remediation.
   * @param parameters The remediation parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtResourceGroup(
    resourceGroupName: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  ): Promise<RemediationsCreateOrUpdateAtResourceGroupResponse>;
  /**
   * Gets an existing remediation at resource group scope.
   * @param resourceGroupName Resource group name.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  getAtResourceGroup(
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsGetAtResourceGroupOptionalParams,
  ): Promise<RemediationsGetAtResourceGroupResponse>;
  /**
   * Deletes an existing remediation at resource group scope.
   * @param resourceGroupName Resource group name.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  deleteAtResourceGroup(
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsDeleteAtResourceGroupOptionalParams,
  ): Promise<RemediationsDeleteAtResourceGroupResponse>;
  /**
   * Cancel a remediation at resource scope.
   * @param resourceId Resource ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  cancelAtResource(
    resourceId: string,
    remediationName: string,
    options?: RemediationsCancelAtResourceOptionalParams,
  ): Promise<RemediationsCancelAtResourceResponse>;
  /**
   * Creates or updates a remediation at resource scope.
   * @param resourceId Resource ID.
   * @param remediationName The name of the remediation.
   * @param parameters The remediation parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtResource(
    resourceId: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtResourceOptionalParams,
  ): Promise<RemediationsCreateOrUpdateAtResourceResponse>;
  /**
   * Gets an existing remediation at resource scope.
   * @param resourceId Resource ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  getAtResource(
    resourceId: string,
    remediationName: string,
    options?: RemediationsGetAtResourceOptionalParams,
  ): Promise<RemediationsGetAtResourceResponse>;
  /**
   * Deletes an existing remediation at individual resource scope.
   * @param resourceId Resource ID.
   * @param remediationName The name of the remediation.
   * @param options The options parameters.
   */
  deleteAtResource(
    resourceId: string,
    remediationName: string,
    options?: RemediationsDeleteAtResourceOptionalParams,
  ): Promise<RemediationsDeleteAtResourceResponse>;
}
