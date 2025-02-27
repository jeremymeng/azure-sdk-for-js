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
  PolicyStatesListQueryResultsForManagementGroupOptionalParams,
  PolicyInsightsClient,
} from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries policy states for the resources under the management group.
 *
 * @summary Queries policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryManagementGroupScope.json
 */
async function queryLatestAtManagementGroupScope(): Promise<void> {
  const policyStatesResource = "latest";
  const managementGroupName = "myManagementGroup";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (let item of client.policyStates.listQueryResultsForManagementGroup(
    policyStatesResource,
    managementGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Queries policy states for the resources under the management group.
 *
 * @summary Queries policy states for the resources under the management group.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyStates_QueryManagementGroupScopeNextLink.json
 */
async function queryLatestAtManagementGroupScopeWithNextLink(): Promise<void> {
  const policyStatesResource = "latest";
  const managementGroupName = "myManagementGroup";
  const skipToken = "WpmWfBSvPhkAK6QD";
  const options: PolicyStatesListQueryResultsForManagementGroupOptionalParams =
    { skipToken };
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const resArray = new Array();
  for await (let item of client.policyStates.listQueryResultsForManagementGroup(
    policyStatesResource,
    managementGroupName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  queryLatestAtManagementGroupScope();
  queryLatestAtManagementGroupScopeWithNextLink();
}

main().catch(console.error);
