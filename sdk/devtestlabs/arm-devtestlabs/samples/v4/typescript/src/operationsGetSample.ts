/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get operation.
 *
 * @summary Get operation.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Operations_Get.json
 */
async function operationsGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const locationName = "{locationName}";
  const name = "{operationName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.operations.get(locationName, name);
  console.log(result);
}

operationsGet().catch(console.error);
