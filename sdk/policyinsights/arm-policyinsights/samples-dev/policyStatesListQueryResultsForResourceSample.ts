/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PolicyStatesListQueryResultsForResourceOptionalParams } from "@azure/arm-policyinsights";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryNestedResourceScope.json
 */
async function queryAllPolicyStatesAtNestedResourceScope() {
  const policyStatesResource = "default";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ServiceFabric/clusters/myCluster/applications/myApplication";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceScope.json
 */
async function queryAllPolicyStatesAtResourceScope() {
  const policyStatesResource = "default";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceScopeExpandPolicyEvaluationDetails.json
 */
async function queryAllPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails() {
  const policyStatesResource = "latest";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName";
  const expand = "PolicyEvaluationDetails";
  const options: PolicyStatesListQueryResultsForResourceOptionalParams = {
    expand,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceScopeNextLink.json
 */
async function queryAllPolicyStatesAtResourceScopeWithNextLink() {
  const policyStatesResource = "default";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/resourceGroups/myResourceGroup/providers/Microsoft.ClassicCompute/domainNames/myDomainName";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyStatesListQueryResultsForResourceOptionalParams = {
    skipToken,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelNestedResourceScope.json
 */
async function queryAllPolicyStatesAtSubscriptionLevelNestedResourceScope() {
  const policyStatesResource = "default";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResource/someNestedResourceType/someNestedResource";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QuerySubscriptionLevelResourceScope.json
 */
async function queryAllPolicyStatesAtSubscriptionLevelResourceScope() {
  const policyStatesResource = "default";
  const resourceId =
    "subscriptions/fff10b27-fff3-fff5-fff8-fffbe01e86a5/providers/Microsoft.SomeNamespace/someResourceType/someResourceName";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceScopeExpandComponents.json
 */
async function queryComponentPolicyComplianceStateAtResourceScopeFilteredByGivenAssignment() {
  const policyStatesResource = "latest";
  const resourceId =
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName";
  const filter =
    "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'";
  const expand =
    "components($filter=ComplianceState eq 'NonCompliant' or ComplianceState eq 'Compliant')";
  const options: PolicyStatesListQueryResultsForResourceOptionalParams = {
    filter,
    expand,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resource.
 *
 * @summary Queries policy states for the resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryResourceScopeExpandComponentsGroupByWithAggregate.json
 */
async function queryComponentPolicyComplianceStateCountGroupedByStateTypeAtResourceScopeFilteredByGivenAssignment() {
  const policyStatesResource = "latest";
  const resourceId =
    "subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/Vaults/myKVName";
  const filter =
    "policyAssignmentId eq '/subscriptions/e78961ba-36fe-4739-9212-e3031b4c8db7/providers/microsoft.authorization/policyassignments/560050f83dbb4a24974323f8'";
  const expand =
    "components($filter=ComplianceState eq 'NonCompliant' or ComplianceState eq 'Compliant';$apply=groupby((complianceState),aggregate($count as count)))";
  const options: PolicyStatesListQueryResultsForResourceOptionalParams = {
    filter,
    expand,
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (const item of client.policyStates.listQueryResultsForResource(
    policyStatesResource,
    resourceId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await queryAllPolicyStatesAtNestedResourceScope();
  await queryAllPolicyStatesAtResourceScope();
  await queryAllPolicyStatesAtResourceScopeAndExpandPolicyEvaluationDetails();
  await queryAllPolicyStatesAtResourceScopeWithNextLink();
  await queryAllPolicyStatesAtSubscriptionLevelNestedResourceScope();
  await queryAllPolicyStatesAtSubscriptionLevelResourceScope();
  await queryComponentPolicyComplianceStateAtResourceScopeFilteredByGivenAssignment();
  await queryComponentPolicyComplianceStateCountGroupedByStateTypeAtResourceScopeFilteredByGivenAssignment();
}

main().catch(console.error);
