/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete an alert rule definition.
 *
 * @summary Delete an alert rule definition.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2018-03-01/examples/deleteMetricAlert.json
 */
async function deleteAnAlertRule() {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "gigtest";
  const ruleName = "chiricutin";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.delete(resourceGroupName, ruleName);
  console.log(result);
}

async function main() {
  await deleteAnAlertRule();
}

main().catch(console.error);
