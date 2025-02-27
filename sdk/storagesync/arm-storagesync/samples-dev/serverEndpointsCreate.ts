/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Create a new ServerEndpoint.
 *
 * @summary Create a new ServerEndpoint.
 * x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Create.json
 */
import type { ServerEndpointCreateParameters } from "@azure/arm-storagesync";
import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

async function serverEndpointsCreate(): Promise<void> {
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const resourceGroupName = "SampleResourceGroup_1";
  const storageSyncServiceName = "SampleStorageSyncService_1";
  const syncGroupName = "SampleSyncGroup_1";
  const serverEndpointName = "SampleServerEndpoint_1";
  const parameters: ServerEndpointCreateParameters = {
    cloudTiering: "off",
    initialDownloadPolicy: "NamespaceThenModifiedFiles",
    initialUploadPolicy: "ServerAuthoritative",
    localCacheMode: "UpdateLocallyCachedFiles",
    offlineDataTransfer: "on",
    offlineDataTransferShareName: "myfileshare",
    serverLocalPath: "D:SampleServerEndpoint_1",
    serverResourceId:
      "/subscriptions/52b8da2f-61e0-4a1f-8dde-336911f367fb/resourceGroups/SampleResourceGroup_1/providers/Microsoft.StorageSync/storageSyncServices/SampleStorageSyncService_1/registeredServers/080d4133-bdb5-40a0-96a0-71a6057bfe9a",
    tierFilesOlderThanDays: 0,
    volumeFreeSpacePercent: 100,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.serverEndpoints.beginCreateAndWait(
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    serverEndpointName,
    parameters,
  );
  console.log(result);
}

serverEndpointsCreate().catch(console.error);
