/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Implements L2 Isolation Domain GET method.
 *
 * @summary Implements L2 Isolation Domain GET method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/L2IsolationDomains_Get_MaximumSet_Gen.json
 */
async function l2IsolationDomainsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] ||
    "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName =
    process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const l2IsolationDomainName = "example-l2Domain";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(
    credential,
    subscriptionId
  );
  const result = await client.l2IsolationDomains.get(
    resourceGroupName,
    l2IsolationDomainName
  );
  console.log(result);
}

async function main(): Promise<void> {
  l2IsolationDomainsGetMaximumSetGen();
}

main().catch(console.error);
