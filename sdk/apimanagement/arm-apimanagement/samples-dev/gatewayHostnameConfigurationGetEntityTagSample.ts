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
 * This sample demonstrates how to Checks that hostname configuration entity specified by identifier exists for specified Gateway entity.
 *
 * @summary Checks that hostname configuration entity specified by identifier exists for specified Gateway entity.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementHeadGatewayHostnameConfiguration.json
 */
async function apiManagementHeadGatewayHostnameConfiguration(): Promise<void> {
  const subscriptionId = process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const hcId = "default";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayHostnameConfiguration.getEntityTag(
    resourceGroupName,
    serviceName,
    gatewayId,
    hcId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadGatewayHostnameConfiguration();
}

main().catch(console.error);
