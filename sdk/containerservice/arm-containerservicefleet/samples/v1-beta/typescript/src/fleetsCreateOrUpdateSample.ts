/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  Fleet,
  ContainerServiceFleetClient,
} from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Fleet.
 *
 * @summary Creates or updates a Fleet.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2024-05-02-preview/examples/Fleets_CreateOrUpdate.json
 */
async function createsAFleetResourceWithALongRunningOperation(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "subid1";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const resource: Fleet = {
    hubProfile: {
      agentProfile: { vmSize: "Standard_DS1" },
      dnsPrefix: "dnsprefix1",
    },
    location: "East US",
    tags: { archv2: "", tier: "production" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    fleetName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  createsAFleetResourceWithALongRunningOperation();
}

main().catch(console.error);
