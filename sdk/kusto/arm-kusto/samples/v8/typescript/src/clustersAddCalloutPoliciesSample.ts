/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CalloutPoliciesList, KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Adds a list of callout policies for engine services.
 *
 * @summary Adds a list of callout policies for engine services.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoClusterAddCalloutPolicies.json
 */
async function kustoClusterAddCalloutPolicy(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-123456789098";
  const resourceGroupName =
    process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const calloutPolicies: CalloutPoliciesList = {
    value: [
      { calloutType: "kusto", calloutUriRegex: "*", outboundAccess: "Allow" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginAddCalloutPoliciesAndWait(
    resourceGroupName,
    clusterName,
    calloutPolicies,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterAddCalloutPolicy();
}

main().catch(console.error);
