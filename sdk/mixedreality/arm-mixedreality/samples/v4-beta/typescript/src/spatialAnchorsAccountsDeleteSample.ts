/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MixedRealityClient } from "@azure/arm-mixedreality";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Delete a Spatial Anchors Account.
 *
 * @summary Delete a Spatial Anchors Account.
 * x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/Delete.json
 */
async function deleteSpatialAnchorsAccount(): Promise<void> {
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const resourceGroupName = "MyResourceGroup";
  const accountName = "MyAccount";
  const credential = new DefaultAzureCredential();
  const client = new MixedRealityClient(credential, subscriptionId);
  const result = await client.spatialAnchorsAccounts.delete(
    resourceGroupName,
    accountName
  );
  console.log(result);
}

deleteSpatialAnchorsAccount().catch(console.error);
