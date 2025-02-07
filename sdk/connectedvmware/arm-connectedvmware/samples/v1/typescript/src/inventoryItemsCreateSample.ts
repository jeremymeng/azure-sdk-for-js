/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  InventoryItem,
  InventoryItemsCreateOptionalParams,
  AzureArcVMwareManagementServiceAPI
} from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create Or Update InventoryItem.
 *
 * @summary Create Or Update InventoryItem.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/CreateInventoryItem.json
 */
async function createInventoryItem() {
  const subscriptionId =
    process.env["CONNECTEDVMWARE_SUBSCRIPTION_ID"] ||
    "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName =
    process.env["CONNECTEDVMWARE_RESOURCE_GROUP"] || "testrg";
  const vcenterName = "ContosoVCenter";
  const inventoryItemName = "testItem";
  const body: InventoryItem = { inventoryType: "ResourcePool" };
  const options: InventoryItemsCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(
    credential,
    subscriptionId
  );
  const result = await client.inventoryItems.create(
    resourceGroupName,
    vcenterName,
    inventoryItemName,
    options
  );
  console.log(result);
}

async function main() {
  createInventoryItem();
}

main().catch(console.error);
