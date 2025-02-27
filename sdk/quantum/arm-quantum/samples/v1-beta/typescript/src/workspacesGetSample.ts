/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureQuantumManagementClient } from "@azure/arm-quantum";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the Workspace resource associated with the given name.
 *
 * @summary Returns the Workspace resource associated with the given name.
 * x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesGet.json
 */
async function quantumWorkspacesGet(): Promise<void> {
  const subscriptionId =
    process.env["QUANTUM_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["QUANTUM_RESOURCE_GROUP"] || "quantumResourcegroup";
  const workspaceName = "quantumworkspace1";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuantumManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get(resourceGroupName, workspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  quantumWorkspacesGet();
}

main().catch(console.error);
