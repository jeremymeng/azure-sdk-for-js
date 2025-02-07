/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the details of the Api Version Set specified by its identifier.
 *
 * @summary Gets the details of the Api Version Set specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGetApiVersionSet.json
 */
async function apiManagementGetApiVersionSet(): Promise<void> {
  const subscriptionId = process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const versionSetId = "vs1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiVersionSet.get(resourceGroupName, serviceName, versionSetId);
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiVersionSet();
}

main().catch(console.error);
