/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all Maps Accounts in a Resource Group
 *
 * @summary Get all Maps Accounts in a Resource Group
 * x-ms-original-file: specification/maps/resource-manager/Microsoft.Maps/stable/2023-06-01/examples/ListAccountsByResourceGroup.json
 */
async function listAccountsByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["MAPS_SUBSCRIPTION_ID"] ||
    "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const resourceGroupName =
    process.env["MAPS_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.accounts.listByResourceGroup(
    resourceGroupName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  listAccountsByResourceGroup();
}

main().catch(console.error);
