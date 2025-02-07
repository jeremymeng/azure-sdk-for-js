/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List the resource types for a specified resource provider.
 *
 * @summary List the resource types for a specified resource provider.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-04-01/examples/GetProviderResourceTypes.json
 */
async function getProviderResourceTypes() {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceProviderNamespace = "Microsoft.TestRP";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providerResourceTypes.list(resourceProviderNamespace);
  console.log(result);
}

async function main() {
  await getProviderResourceTypes();
}

main().catch(console.error);
