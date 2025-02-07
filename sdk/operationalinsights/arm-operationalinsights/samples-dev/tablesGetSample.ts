/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a Log Analytics workspace table.
 *
 * @summary Gets a Log Analytics workspace table.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/2022-10-01/examples/TablesGet.json
 */
async function tablesGet() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const tableName = "table1_SRCH";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.tables.get(resourceGroupName, workspaceName, tableName);
  console.log(result);
}

async function main() {
  await tablesGet();
}

main().catch(console.error);
