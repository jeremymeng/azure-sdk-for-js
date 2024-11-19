/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Cluster, AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create an HCI cluster.
 *
 * @summary Create an HCI cluster.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/CreateCluster.json
 */
async function createCluster() {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] ||
    "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName =
    process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const cluster: Cluster = {
    typeIdentityType: "SystemAssigned",
    aadClientId: "24a6e53d-04e5-44d2-b7cc-1b732a847dfc",
    aadTenantId: "7e589cc1-a8b6-4dff-91bd-5ec0fa18db94",
    cloudManagementEndpoint:
      "https://98294836-31be-4668-aeae-698667faf99b.waconazure.com",
    location: "East US",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.create(
    resourceGroupName,
    clusterName,
    cluster,
  );
  console.log(result);
}

async function main() {
  createCluster();
}

main().catch(console.error);
