/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all deployments for a remediation at subscription scope.
 *
 * @summary Gets all deployments for a remediation at subscription scope.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/Remediations_ListDeploymentsSubscriptionScope.json
 */
async function listDeploymentsForARemediationAtSubscriptionScope(): Promise<void> {
  const subscriptionId =
    process.env["POLICYINSIGHTS_SUBSCRIPTION_ID"] || "35ee058e-5fa0-414c-8145-3ebb8d09b6e2";
  const remediationName = "myRemediation";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.remediations.listDeploymentsAtSubscription(remediationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeploymentsForARemediationAtSubscriptionScope();
}

main().catch(console.error);
