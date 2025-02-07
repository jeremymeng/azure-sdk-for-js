/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a SQL pool's Maintenance Windows.
 *
 * @summary Get a SQL pool's Maintenance Windows.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/GetMaintenanceWindows.json
 */
async function getsMaintenanceWindowSettingsForASelectedSqlAnalyticsPool() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "samplerg";
  const workspaceName = "testworkspace";
  const sqlPoolName = "testsp";
  const maintenanceWindowName = "current";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.sqlPoolMaintenanceWindows.get(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
    maintenanceWindowName,
  );
  console.log(result);
}

async function main() {
  await getsMaintenanceWindowSettingsForASelectedSqlAnalyticsPool();
}

main().catch(console.error);
