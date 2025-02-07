/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MonitorClient } from "@azure/arm-monitor-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists the diagnostic settings categories for the specified resource.
 *
 * @summary Lists the diagnostic settings categories for the specified resource.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/examples/listDiagnosticSettingsCategories.json
 */
async function getsTheDiagnosticSetting() {
  const resourceUri =
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettingsCategory.list(resourceUri);
  console.log(result);
}

async function main() {
  await getsTheDiagnosticSetting();
}

main().catch(console.error);
