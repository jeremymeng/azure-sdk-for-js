/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Lists all of the available peering service locations for the specified kind of peering.
 *
 * @summary Lists all of the available peering service locations for the specified kind of peering.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/ListPeeringServiceProviders.json
 */
import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

async function listPeeringServiceProviders(): Promise<void> {
  const subscriptionId = "subId";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringServiceProviders.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listPeeringServiceProviders().catch(console.error);
