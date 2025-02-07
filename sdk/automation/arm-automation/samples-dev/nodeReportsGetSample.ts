/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve the Dsc node report data by node id and report id.
 *
 * @summary Retrieve the Dsc node report data by node id and report id.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/getDscNodeReport.json
 */
async function getDscNodeReportDataByNodeIdAndReportId(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount33";
  const nodeId = "nodeId";
  const reportId = "903a5ead-140c-11e7-a943-000d3a6140c9";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.nodeReports.get(
    resourceGroupName,
    automationAccountName,
    nodeId,
    reportId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDscNodeReportDataByNodeIdAndReportId();
}

main().catch(console.error);
