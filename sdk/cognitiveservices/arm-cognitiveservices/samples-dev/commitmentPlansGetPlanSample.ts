/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a Cognitive Services commitment plan specified by the parameters.
 *
 * @summary Returns a Cognitive Services commitment plan specified by the parameters.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2024-10-01/examples/GetSharedCommitmentPlan.json
 */
async function getCommitmentPlan(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const commitmentPlanName = "commitmentPlanName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.commitmentPlans.getPlan(resourceGroupName, commitmentPlanName);
  console.log(result);
}

async function main(): Promise<void> {
  await getCommitmentPlan();
}

main().catch(console.error);
