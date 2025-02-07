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
 * This sample demonstrates how to Gets the details of the Documentation specified by its identifier.
 *
 * @summary Gets the details of the Documentation specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGetDocumentation.json
 */
async function apiManagementGetDocumentation() {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const documentationId = "57d1f7558aa04f15146d9d8a";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.documentation.get(
    resourceGroupName,
    serviceName,
    documentationId
  );
  console.log(result);
}

async function main() {
  apiManagementGetDocumentation();
}

main().catch(console.error);
