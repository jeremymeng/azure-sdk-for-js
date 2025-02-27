/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AutoScaleVCoreUpdateParameters } from "@azure/arm-powerbidedicated";
import { PowerBIDedicated } from "@azure/arm-powerbidedicated";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the current state of the specified auto scale v-core.
 *
 * @summary Updates the current state of the specified auto scale v-core.
 * x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateAutoScaleVCore.json
 */
async function updateAutoScaleVCoreParameters(): Promise<void> {
  const subscriptionId =
    process.env["POWERBIDEDICATED_SUBSCRIPTION_ID"] || "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const resourceGroupName = process.env["POWERBIDEDICATED_RESOURCE_GROUP"] || "TestRG";
  const vcoreName = "testvcore";
  const vCoreUpdateParameters: AutoScaleVCoreUpdateParameters = {
    capacityLimit: 20,
    sku: { name: "AutoScale", capacity: 0, tier: "AutoScale" },
    tags: { testKey: "testValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PowerBIDedicated(credential, subscriptionId);
  const result = await client.autoScaleVCores.update(
    resourceGroupName,
    vcoreName,
    vCoreUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAutoScaleVCoreParameters();
}

main().catch(console.error);
