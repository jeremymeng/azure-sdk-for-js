/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FileDetails, MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a new file under a workspace for the specified subscription.
 *
 * @summary Creates a new file under a workspace for the specified subscription.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/preview/2023-06-01-preview/examples/CreateFileForSubscription.json
 */
async function createASubscriptionScopedFile() {
  const subscriptionId = process.env["SUPPORT_SUBSCRIPTION_ID"] || "subid";
  const fileWorkspaceName = "testworkspace";
  const fileName = "test.txt";
  const createFileParameters: FileDetails = {
    chunkSize: 41423,
    fileSize: 41423,
    numberOfChunks: 1,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.files.create(
    fileWorkspaceName,
    fileName,
    createFileParameters,
  );
  console.log(result);
}

async function main() {
  createASubscriptionScopedFile();
}

main().catch(console.error);
