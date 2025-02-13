/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ObjectAnchorsAccount } from "@azure/arm-mixedreality";
import { MixedRealityClient } from "@azure/arm-mixedreality";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creating or Updating an object anchors Account.
 *
 * @summary Creating or Updating an object anchors Account.
 * x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/Put.json
 */
async function createObjectAnchorsAccount(): Promise<void> {
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const resourceGroupName = "MyResourceGroup";
  const accountName = "MyAccount";
  const objectAnchorsAccount: ObjectAnchorsAccount = {
    identity: { type: "SystemAssigned" },
    location: "eastus2euap",
  };
  const credential = new DefaultAzureCredential();
  const client = new MixedRealityClient(credential, subscriptionId);
  const result = await client.objectAnchorsAccounts.create(
    resourceGroupName,
    accountName,
    objectAnchorsAccount,
  );
  console.log(result);
}

createObjectAnchorsAccount().catch(console.error);
