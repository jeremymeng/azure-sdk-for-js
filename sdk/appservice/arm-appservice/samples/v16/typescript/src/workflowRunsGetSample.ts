/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a workflow run.
 *
 * @summary Gets a workflow run.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-04-01/examples/WorkflowRuns_Get.json
 */
async function getARunForAWorkflow(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "test-resource-group";
  const name = "test-name";
  const workflowName = "test-workflow";
  const runName = "08586676746934337772206998657CU22";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowRuns.get(resourceGroupName, name, workflowName, runName);
  console.log(result);
}

async function main(): Promise<void> {
  await getARunForAWorkflow();
}

main().catch(console.error);
