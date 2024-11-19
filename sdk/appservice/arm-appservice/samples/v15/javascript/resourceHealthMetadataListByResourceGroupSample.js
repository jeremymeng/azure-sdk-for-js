/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Description for List all ResourceHealthMetadata for all sites in the resource group in the subscription.
 *
 * @summary Description for List all ResourceHealthMetadata for all sites in the resource group in the subscription.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-12-01/examples/ListResourceHealthMetadataByResourceGroup.json
 */
async function listResourceHealthMetadataForAResourceGroup() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Default-Web-NorthCentralUS";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.resourceHealthMetadataOperations.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listResourceHealthMetadataForAResourceGroup();
}

main().catch(console.error);
