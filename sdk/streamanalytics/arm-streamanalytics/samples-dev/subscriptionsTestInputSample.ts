/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { TestInput } from "@azure/arm-streamanalytics";
import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Test the Stream Analytics input.
 *
 * @summary Test the Stream Analytics input.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/Subscription_TestInput.json
 */
async function testTheStreamAnalyticsInput() {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const location = "West US";
  const testInput: TestInput = {
    input: {
      properties: {
        type: "Stream",
        datasource: {
          type: "Microsoft.Storage/Blob",
          container: "state",
          dateFormat: "yyyy/MM/dd",
          pathPattern: "{date}/{time}",
          sourcePartitionCount: 16,
          storageAccounts: [{ accountKey: "someAccountKey==", accountName: "someAccountName" }],
          timeFormat: "HH",
        },
        serialization: { type: "Csv", encoding: "UTF8", fieldDelimiter: "," },
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.subscriptions.beginTestInputAndWait(location, testInput);
  console.log(result);
}

async function main() {
  await testTheStreamAnalyticsInput();
}

main().catch(console.error);
