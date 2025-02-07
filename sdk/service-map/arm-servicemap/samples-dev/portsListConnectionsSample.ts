/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PortsListConnectionsOptionalParams } from "@azure/arm-servicemap";
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Returns a collection of connections established via the specified port.
 *
 * @summary Returns a collection of connections established via the specified port.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Machines/Ports/SMMachinesPortsListConnectionsGet.json
 */
async function smMachinesPortsListConnectionsGet() {
  const subscriptionId =
    process.env["SERVICE-MAP_SUBSCRIPTION_ID"] || "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = process.env["SERVICE-MAP_RESOURCE_GROUP"] || "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineName = "m-A4AB1C69-03E9-42D2-B822-B42555569FB4";
  const portName = "b-c0a8010a_10000";
  const startTime = new Date("2018-01-08T23:05:16.7985488Z");
  const endTime = new Date("2018-01-08T23:07:16.7985488Z");
  const options: PortsListConnectionsOptionalParams = { startTime, endTime };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ports.listConnections(
    resourceGroupName,
    workspaceName,
    machineName,
    portName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await smMachinesPortsListConnectionsGet();
}

main().catch(console.error);
