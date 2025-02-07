/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { SAPInstanceTagsUpdate } from "@azure/arm-migrationdiscoverysap";
import { WorkloadsClient } from "@azure/arm-migrationdiscoverysap";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates the SAP Instance resource.
 *
 * @summary Updates the SAP Instance resource.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Update.json
 */
async function updatesTheSapInstanceResource() {
  const subscriptionId =
    process.env["MIGRATIONDISCOVERY_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["MIGRATIONDISCOVERY_RESOURCE_GROUP"] || "test-rg";
  const sapDiscoverySiteName = "SampleSite";
  const sapInstanceName = "MPP_MPP";
  const properties: SAPInstanceTagsUpdate = { tags: { tag1: "value1" } };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapInstances.update(
    resourceGroupName,
    sapDiscoverySiteName,
    sapInstanceName,
    properties,
  );
  console.log(result);
}

async function main() {
  await updatesTheSapInstanceResource();
}

main().catch(console.error);
