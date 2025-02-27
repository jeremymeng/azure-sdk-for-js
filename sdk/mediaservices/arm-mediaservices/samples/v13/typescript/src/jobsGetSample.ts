/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureMediaServices } from "@azure/arm-mediaservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a Job.
 *
 * @summary Gets a Job.
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Encoding/stable/2022-07-01/examples/jobs-get-by-name.json
 */
async function getAJobByName(): Promise<void> {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MEDIASERVICES_RESOURCE_GROUP"] || "contosoresources";
  const accountName = "contosomedia";
  const transformName = "exampleTransform";
  const jobName = "job1";
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.jobs.get(
    resourceGroupName,
    accountName,
    transformName,
    jobName
  );
  console.log(result);
}

async function main(): Promise<void> {
  getAJobByName();
}

main().catch(console.error);
