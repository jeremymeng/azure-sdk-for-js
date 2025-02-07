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
 * This sample demonstrates how to Deletes the specified private endpoint connection associated with the storage sync service.
 *
 * @summary Deletes the specified private endpoint connection associated with the storage sync service.
 * x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res6977";
  const storageSyncServiceName = "sss2527";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginDeleteAndWait(
    resourceGroupName,
    storageSyncServiceName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

privateEndpointConnectionsDelete().catch(console.error);
