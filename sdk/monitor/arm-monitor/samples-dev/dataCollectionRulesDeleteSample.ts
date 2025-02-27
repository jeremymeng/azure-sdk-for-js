/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a data collection rule.
 *
 * @summary Deletes a data collection rule.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2022-06-01/examples/DataCollectionRulesDelete.json
 */
async function deleteDataCollectionRule(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "myResourceGroup";
  const dataCollectionRuleName = "myCollectionRule";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.delete(resourceGroupName, dataCollectionRuleName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDataCollectionRule();
}

main().catch(console.error);
