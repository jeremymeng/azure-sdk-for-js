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
 * This sample demonstrates how to Retrieve the linked workspace for the account id.
 *
 * @summary Retrieve the linked workspace for the account id.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/getLinkedWorkspace.json
 */
async function getTheLinkedWorkspaceOfAnAutomationAccount(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "ContosoAutomationAccount";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.linkedWorkspaceOperations.get(
    resourceGroupName,
    automationAccountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLinkedWorkspaceOfAnAutomationAccount();
}

main().catch(console.error);
