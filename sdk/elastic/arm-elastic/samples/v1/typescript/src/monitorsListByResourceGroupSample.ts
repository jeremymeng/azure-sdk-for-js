/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List all monitors under the specified resource group.
 *
 * @summary List all monitors under the specified resource group.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_ListByResourceGroup.json
 */
async function monitorsListByResourceGroup() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.monitors.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  monitorsListByResourceGroup();
}

main().catch(console.error);
