/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  PolicyInsightsClient,
} from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries component policy states under resource group scope.
 *
 * @summary Queries component policy states under resource group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/ComponentPolicyStates_QueryResourceGroupScopeGroupByComponentTypeWithAggregate.json
 */
async function queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceGroupScopeFilteredByGivenAssignment() {
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName =
    process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const componentPolicyStatesResource = "latest";
  const filter =
    "policyAssignmentId eq '/subscriptions/fffedd8f-ffff-fffd-fffd-fffed2f84852/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'";
  const apply = "groupby((type,complianceState),aggregate($count as count))";
  const options: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams =
    { filter, apply };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result =
    await client.componentPolicyStates.listQueryResultsForResourceGroup(
      subscriptionId,
      resourceGroupName,
      componentPolicyStatesResource,
      options,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Queries component policy states under resource group scope.
 *
 * @summary Queries component policy states under resource group scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/ComponentPolicyStates_QueryResourceGroupScope.json
 */
async function queryLatestComponentPolicyStatesAtResourceGroupScope() {
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const resourceGroupName =
    process.env["POLICYINSIGHTS_RESOURCE_GROUP"] || "myResourceGroup";
  const componentPolicyStatesResource = "latest";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result =
    await client.componentPolicyStates.listQueryResultsForResourceGroup(
      subscriptionId,
      resourceGroupName,
      componentPolicyStatesResource,
    );
  console.log(result);
}

async function main() {
  queryLatestComponentPolicyComplianceStateCountGroupedByComponentTypeAtResourceGroupScopeFilteredByGivenAssignment();
  queryLatestComponentPolicyStatesAtResourceGroupScope();
}

main().catch(console.error);
