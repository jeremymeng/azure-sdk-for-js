/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Return an async operation
 *
 * @summary Return an async operation
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetFailedOperationResult.json
 */
async function getFailedOperationResult() {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "westus2";
  const referer = "https://management.azure.com/";
  const operationId = "d030bb3f-7d53-11e9-8e09-9a86872085ff";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.operations.get(regionId, referer, operationId);
  console.log(result);
}

/**
 * This sample demonstrates how to Return an async operation
 *
 * @summary Return an async operation
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetOperationResult.json
 */
async function getOperationResult() {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "westus2";
  const referer = "https://management.azure.com/";
  const operationId = "f8e1c8f1-7d52-11e9-8e07-9a86872085ff";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.operations.get(regionId, referer, operationId);
  console.log(result);
}

async function main() {
  await getFailedOperationResult();
  await getOperationResult();
}

main().catch(console.error);
