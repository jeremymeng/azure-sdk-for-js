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
 * This sample demonstrates how to Get list of server usages metric for workspace managed sql server.
 *
 * @summary Get list of server usages metric for workspace managed sql server.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/ListWorkspaceManagedSqlServerUsages.json
 */
async function listUsagesMetricForTheWorkspaceManagedSqlServer() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "wsg-7398";
  const workspaceName = "testWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceManagedSqlServerUsages.list(
    resourceGroupName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listUsagesMetricForTheWorkspaceManagedSqlServer();
}

main().catch(console.error);
