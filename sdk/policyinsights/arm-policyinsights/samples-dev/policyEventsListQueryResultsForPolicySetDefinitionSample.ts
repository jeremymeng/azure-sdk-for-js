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
  PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyInsightsClient,
} from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries policy events for the subscription level policy set definition.
 *
 * @summary Queries policy events for the subscription level policy set definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QuerySubscriptionLevelPolicySetDefinitionScope.json
 */
async function queryAtSubscriptionLevelPolicySetDefinitionScope() {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policySetDefinitionName = "3e3807c1-65c9-49e0-a406-82d8ae3e338c";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (let item of client.policyEvents.listQueryResultsForPolicySetDefinition(
    policyEventsResource,
    subscriptionId,
    policySetDefinitionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy events for the subscription level policy set definition.
 *
 * @summary Queries policy events for the subscription level policy set definition.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyEvents_QuerySubscriptionLevelPolicySetDefinitionScopeNextLink.json
 */
async function queryAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink() {
  const policyEventsResource = "default";
  const subscriptionId = "fffedd8f-ffff-fffd-fffd-fffed2f84852";
  const policySetDefinitionName = "3e3807c1-65c9-49e0-a406-82d8ae3e338c";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams =
    { skipToken };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (let item of client.policyEvents.listQueryResultsForPolicySetDefinition(
    policyEventsResource,
    subscriptionId,
    policySetDefinitionName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  queryAtSubscriptionLevelPolicySetDefinitionScope();
  queryAtSubscriptionLevelPolicySetDefinitionScopeWithNextLink();
}

main().catch(console.error);
