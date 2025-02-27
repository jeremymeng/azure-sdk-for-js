/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @summary Deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/DeleteRegisteredAsn.json
 */
async function deletesARegisteredAsnAssociatedWithThePeering(): Promise<void> {
  const subscriptionId = "subId";
  const resourceGroupName = "rgName";
  const peeringName = "peeringName";
  const registeredAsnName = "registeredAsnName";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredAsns.delete(
    resourceGroupName,
    peeringName,
    registeredAsnName
  );
  console.log(result);
}

deletesARegisteredAsnAssociatedWithThePeering().catch(console.error);
