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
  PolicyState,
  PolicyStatesResource,
  PolicyStatesListQueryResultsForManagementGroupOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  PolicyStatesListQueryResultsForResourceOptionalParams,
  PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummaryResourceType,
  PolicyStatesSummarizeForManagementGroupOptionalParams,
  PolicyStatesSummarizeForManagementGroupResponse,
  PolicyStatesSummarizeForSubscriptionOptionalParams,
  PolicyStatesSummarizeForSubscriptionResponse,
  PolicyStatesSummarizeForResourceGroupOptionalParams,
  PolicyStatesSummarizeForResourceGroupResponse,
  PolicyStatesSummarizeForResourceOptionalParams,
  PolicyStatesSummarizeForResourceResponse,
  PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  PolicyStatesSummarizeForPolicySetDefinitionResponse,
  PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  PolicyStatesSummarizeForPolicyDefinitionResponse,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentResponse,
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PolicyStates. */
export interface PolicyStates {
  /**
   * Queries policy states for the resources under the management group.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param managementGroupName Management group name.
   * @param options The options parameters.
   */
  listQueryResultsForManagementGroup(
    policyStatesResource: PolicyStatesResource,
    managementGroupName: string,
    options?: PolicyStatesListQueryResultsForManagementGroupOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the resources under the subscription.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param options The options parameters.
   */
  listQueryResultsForSubscription(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    options?: PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the resources under the resource group.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  listQueryResultsForResourceGroup(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the resource.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param resourceId Resource ID.
   * @param options The options parameters.
   */
  listQueryResultsForResource(
    policyStatesResource: PolicyStatesResource,
    resourceId: string,
    options?: PolicyStatesListQueryResultsForResourceOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the subscription level policy set definition.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policySetDefinitionName Policy set definition name.
   * @param options The options parameters.
   */
  listQueryResultsForPolicySetDefinition(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policySetDefinitionName: string,
    options?: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the subscription level policy definition.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyDefinitionName Policy definition name.
   * @param options The options parameters.
   */
  listQueryResultsForPolicyDefinition(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policyDefinitionName: string,
    options?: PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the subscription level policy assignment.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyAssignmentName Policy assignment name.
   * @param options The options parameters.
   */
  listQueryResultsForSubscriptionLevelPolicyAssignment(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policyAssignmentName: string,
    options?: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Queries policy states for the resource group level policy assignment.
   * @param policyStatesResource The virtual resource under PolicyStates resource type. In a given time
   *                             range, 'latest' represents the latest policy state(s), whereas 'default' represents all policy
   *                             state(s).
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param policyAssignmentName Policy assignment name.
   * @param options The options parameters.
   */
  listQueryResultsForResourceGroupLevelPolicyAssignment(
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    options?: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ): PagedAsyncIterableIterator<PolicyState>;
  /**
   * Summarizes policy states for the resources under the management group.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param managementGroupName Management group name.
   * @param options The options parameters.
   */
  summarizeForManagementGroup(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    managementGroupName: string,
    options?: PolicyStatesSummarizeForManagementGroupOptionalParams,
  ): Promise<PolicyStatesSummarizeForManagementGroupResponse>;
  /**
   * Summarizes policy states for the resources under the subscription.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param options The options parameters.
   */
  summarizeForSubscription(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    options?: PolicyStatesSummarizeForSubscriptionOptionalParams,
  ): Promise<PolicyStatesSummarizeForSubscriptionResponse>;
  /**
   * Summarizes policy states for the resources under the resource group.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  summarizeForResourceGroup(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesSummarizeForResourceGroupOptionalParams,
  ): Promise<PolicyStatesSummarizeForResourceGroupResponse>;
  /**
   * Summarizes policy states for the resource.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param resourceId Resource ID.
   * @param options The options parameters.
   */
  summarizeForResource(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    resourceId: string,
    options?: PolicyStatesSummarizeForResourceOptionalParams,
  ): Promise<PolicyStatesSummarizeForResourceResponse>;
  /**
   * Triggers a policy evaluation scan for all the resources under the subscription
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param options The options parameters.
   */
  beginTriggerSubscriptionEvaluation(
    subscriptionId: string,
    options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Triggers a policy evaluation scan for all the resources under the subscription
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param options The options parameters.
   */
  beginTriggerSubscriptionEvaluationAndWait(
    subscriptionId: string,
    options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  ): Promise<void>;
  /**
   * Triggers a policy evaluation scan for all the resources under the resource group.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  beginTriggerResourceGroupEvaluation(
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Triggers a policy evaluation scan for all the resources under the resource group.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  beginTriggerResourceGroupEvaluationAndWait(
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  ): Promise<void>;
  /**
   * Summarizes policy states for the subscription level policy set definition.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policySetDefinitionName Policy set definition name.
   * @param options The options parameters.
   */
  summarizeForPolicySetDefinition(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policySetDefinitionName: string,
    options?: PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  ): Promise<PolicyStatesSummarizeForPolicySetDefinitionResponse>;
  /**
   * Summarizes policy states for the subscription level policy definition.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyDefinitionName Policy definition name.
   * @param options The options parameters.
   */
  summarizeForPolicyDefinition(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policyDefinitionName: string,
    options?: PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  ): Promise<PolicyStatesSummarizeForPolicyDefinitionResponse>;
  /**
   * Summarizes policy states for the subscription level policy assignment.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyAssignmentName Policy assignment name.
   * @param options The options parameters.
   */
  summarizeForSubscriptionLevelPolicyAssignment(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policyAssignmentName: string,
    options?: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  ): Promise<PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentResponse>;
  /**
   * Summarizes policy states for the resource group level policy assignment.
   * @param policyStatesSummaryResource The virtual resource under PolicyStates resource type for
   *                                    summarize action. In a given time range, 'latest' represents the latest policy state(s) and is the
   *                                    only allowed value.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param policyAssignmentName Policy assignment name.
   * @param options The options parameters.
   */
  summarizeForResourceGroupLevelPolicyAssignment(
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    options?: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  ): Promise<PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentResponse>;
}
