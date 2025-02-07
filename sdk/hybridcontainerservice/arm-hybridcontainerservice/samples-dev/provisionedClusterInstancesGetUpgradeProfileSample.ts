/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the upgrade profile of a provisioned cluster
 *
 * @summary Gets the upgrade profile of a provisioned cluster
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ProvisionedClusterInstanceGetUpgradeProfile.json
 */
async function getUpgradeProfileForProvisionedClusterInstance(): Promise<void> {
  const connectedClusterResourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/test-hybridakscluster";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.provisionedClusterInstances.getUpgradeProfile(
    connectedClusterResourceUri,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getUpgradeProfileForProvisionedClusterInstance();
}

main().catch(console.error);
