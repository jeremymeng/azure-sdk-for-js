/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List EdgeDevice resources by parent
 *
 * @summary List EdgeDevice resources by parent
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ListEdgeDevices.json
 */
async function listEdgeDevices() {
  const resourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const resArray = new Array();
  for await (let item of client.edgeDevices.list(resourceUri)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listEdgeDevices();
}

main().catch(console.error);
