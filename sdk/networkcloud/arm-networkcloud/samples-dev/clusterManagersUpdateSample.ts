/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type {
  ClusterManagerPatchParameters,
  ClusterManagersUpdateOptionalParams} from "@azure/arm-networkcloud";
import {
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 *
 * @summary Patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2024-07-01/examples/ClusterManagers_Patch.json
 */
async function patchClusterManager(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterManagerName = "clusterManagerName";
  const clusterManagerUpdateParameters: ClusterManagerPatchParameters = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/123e4567E89b12d3A456426655440000/resourceGroups/resourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/userIdentity1":
          {},
        "/subscriptions/123e4567E89b12d3A456426655440000/resourceGroups/resourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/userIdentity2":
          {},
      },
    },
    tags: { key1: "myvalue1", key2: "myvalue2" },
  };
  const options: ClusterManagersUpdateOptionalParams = {
    clusterManagerUpdateParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.update(
    resourceGroupName,
    clusterManagerName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchClusterManager();
}

main().catch(console.error);
