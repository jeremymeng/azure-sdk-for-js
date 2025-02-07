/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the primary and secondary admin API keys for the specified Azure AI Search service.
 *
 * @summary Gets the primary and secondary admin API keys for the specified Azure AI Search service.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/preview/2024-06-01-preview/examples/SearchGetAdminKeys.json
 */
async function searchGetAdminKeys() {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.get(resourceGroupName, searchServiceName);
  console.log(result);
}

async function main() {
  await searchGetAdminKeys();
}

main().catch(console.error);
