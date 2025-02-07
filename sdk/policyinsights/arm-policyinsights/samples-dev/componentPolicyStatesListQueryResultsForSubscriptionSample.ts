/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries component policy states under subscription scope.
 *
 * @summary Queries component policy states under subscription scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/ComponentPolicyStates_QuerySubscriptionScopeGroupByComponentTypeWithAggregate.json
 */
async function queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtSubscriptionScopeFilteredByGivenAssignment() {
  const subscriptionId = "e78961ba-36fe-4739-9212-e3031b4c8db7";
  const componentPolicyStatesResource = "latest";
  const filter =
    "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'";
  const apply = "groupby((componentType,complianceState),aggregate($count as count))";
  const options: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams = {
    filter,
    apply,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForSubscription(
    subscriptionId,
    componentPolicyStatesResource,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries component policy states under subscription scope.
 *
 * @summary Queries component policy states under subscription scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/ComponentPolicyStates_QuerySubscriptionScope.json
 */
async function queryLatestComponentPolicyStatesAtSubscriptionScope() {
  const subscriptionId = "fff10b27-fff3-fff5-fff8-fffbe01e86a5";
  const componentPolicyStatesResource = "latest";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.componentPolicyStates.listQueryResultsForSubscription(
    subscriptionId,
    componentPolicyStatesResource,
  );
  console.log(result);
}

async function main() {
  await queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtSubscriptionScopeFilteredByGivenAssignment();
  await queryLatestComponentPolicyStatesAtSubscriptionScope();
}

main().catch(console.error);
