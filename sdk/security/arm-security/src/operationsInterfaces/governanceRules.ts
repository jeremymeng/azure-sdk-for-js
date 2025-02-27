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
  GovernanceRule,
  GovernanceRulesListOptionalParams,
  GovernanceRulesGetOptionalParams,
  GovernanceRulesGetResponse,
  GovernanceRulesCreateOrUpdateOptionalParams,
  GovernanceRulesCreateOrUpdateResponse,
  GovernanceRulesDeleteOptionalParams,
  GovernanceRulesExecuteOptionalParams,
  GovernanceRulesExecuteResponse,
  GovernanceRulesOperationResultsOptionalParams,
  GovernanceRulesOperationResultsResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GovernanceRules. */
export interface GovernanceRules {
  /**
   * Get a list of all relevant governance rules over a scope
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param options The options parameters.
   */
  list(
    scope: string,
    options?: GovernanceRulesListOptionalParams,
  ): PagedAsyncIterableIterator<GovernanceRule>;
  /**
   * Get a specific governance rule for the requested scope by ruleId
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param options The options parameters.
   */
  get(
    scope: string,
    ruleId: string,
    options?: GovernanceRulesGetOptionalParams,
  ): Promise<GovernanceRulesGetResponse>;
  /**
   * Creates or updates a governance rule over a given scope
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param governanceRule Governance rule over a given scope
   * @param options The options parameters.
   */
  createOrUpdate(
    scope: string,
    ruleId: string,
    governanceRule: GovernanceRule,
    options?: GovernanceRulesCreateOrUpdateOptionalParams,
  ): Promise<GovernanceRulesCreateOrUpdateResponse>;
  /**
   * Delete a Governance rule over a given scope
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param options The options parameters.
   */
  beginDelete(
    scope: string,
    ruleId: string,
    options?: GovernanceRulesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a Governance rule over a given scope
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    scope: string,
    ruleId: string,
    options?: GovernanceRulesDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Execute a governance rule
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param options The options parameters.
   */
  beginExecute(
    scope: string,
    ruleId: string,
    options?: GovernanceRulesExecuteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<GovernanceRulesExecuteResponse>,
      GovernanceRulesExecuteResponse
    >
  >;
  /**
   * Execute a governance rule
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param options The options parameters.
   */
  beginExecuteAndWait(
    scope: string,
    ruleId: string,
    options?: GovernanceRulesExecuteOptionalParams,
  ): Promise<GovernanceRulesExecuteResponse>;
  /**
   * Get governance rules long run operation result for the requested scope by ruleId and operationId
   * @param scope The scope of the Governance rules. Valid scopes are: management group (format:
   *              'providers/Microsoft.Management/managementGroups/{managementGroup}'), subscription (format:
   *              'subscriptions/{subscriptionId}'), or security connector (format:
   *              'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})'
   * @param ruleId The governance rule key - unique key for the standard governance rule (GUID)
   * @param operationId The governance rule long running operation unique key
   * @param options The options parameters.
   */
  operationResults(
    scope: string,
    ruleId: string,
    operationId: string,
    options?: GovernanceRulesOperationResultsOptionalParams,
  ): Promise<GovernanceRulesOperationResultsResponse>;
}
