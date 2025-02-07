/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stops an UpdateRun.
 *
 * @summary Stops an UpdateRun.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/fleet/preview/2024-05-02-preview/examples/UpdateRuns_Stop.json
 */
async function stopsAnUpdateRun(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const updateRunName = "run1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.beginStopAndWait(
    resourceGroupName,
    fleetName,
    updateRunName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopsAnUpdateRun();
}

main().catch(console.error);
