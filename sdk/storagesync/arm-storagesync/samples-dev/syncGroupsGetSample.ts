/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get a given SyncGroup.
 *
 * @summary Get a given SyncGroup.
 * x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/SyncGroups_Get.json
 */
async function syncGroupsGet(): Promise<void> {
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const resourceGroupName = "SampleResourceGroup_1";
  const storageSyncServiceName = "SampleStorageSyncService_1";
  const syncGroupName = "SampleSyncGroup_1";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.syncGroups.get(
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
  );
  console.log(result);
}

syncGroupsGet().catch(console.error);
