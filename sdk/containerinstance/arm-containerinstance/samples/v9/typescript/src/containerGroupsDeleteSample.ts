/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes.
 *
 * @summary Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2023-05-01/examples/ContainerGroupsDelete.json
 */
async function containerGroupsDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.containerGroups.beginDeleteAndWait(
    resourceGroupName,
    containerGroupName
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupsDelete();
}

main().catch(console.error);
