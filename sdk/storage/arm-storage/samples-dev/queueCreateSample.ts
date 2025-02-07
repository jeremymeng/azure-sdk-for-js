/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { StorageQueue } from "@azure/arm-storage";
import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a new queue with the specified queue name, under the specified account.
 *
 * @summary Creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2023-05-01/examples/QueueOperationPut.json
 */
async function queueOperationPut() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const queueName = "queue6185";
  const queue: StorageQueue = {};
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.create(resourceGroupName, accountName, queueName, queue);
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new queue with the specified queue name, under the specified account.
 *
 * @summary Creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2023-05-01/examples/QueueOperationPutWithMetadata.json
 */
async function queueOperationPutWithMetadata() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const queueName = "queue6185";
  const queue: StorageQueue = {
    metadata: { sample1: "meta1", sample2: "meta2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.create(resourceGroupName, accountName, queueName, queue);
  console.log(result);
}

async function main() {
  await queueOperationPut();
  await queueOperationPutWithMetadata();
}

main().catch(console.error);
