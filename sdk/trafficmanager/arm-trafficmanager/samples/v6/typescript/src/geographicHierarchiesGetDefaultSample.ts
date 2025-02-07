/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the default Geographic Hierarchy used by the Geographic traffic routing method.
 *
 * @summary Gets the default Geographic Hierarchy used by the Geographic traffic routing method.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/GeographicHierarchy-GET-default.json
 */
async function geographicHierarchyGetDefault(): Promise<void> {
  const subscriptionId =
    process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.geographicHierarchies.getDefault();
  console.log(result);
}

async function main(): Promise<void> {
  geographicHierarchyGetDefault();
}

main().catch(console.error);
