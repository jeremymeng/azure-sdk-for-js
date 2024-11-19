/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureSphereManagementClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name'
 *
 * @summary Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name'
 * x-ms-original-file: specification/sphere/resource-manager/Microsoft.AzureSphere/stable/2024-04-01/examples/DeleteProduct.json
 */
async function productsDelete() {
  const subscriptionId =
    process.env["SPHERE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SPHERE_RESOURCE_GROUP"] || "MyResourceGroup1";
  const catalogName = "MyCatalog1";
  const productName = "MyProductName1";
  const credential = new DefaultAzureCredential();
  const client = new AzureSphereManagementClient(credential, subscriptionId);
  const result = await client.products.beginDeleteAndWait(
    resourceGroupName,
    catalogName,
    productName,
  );
  console.log(result);
}

async function main() {
  productsDelete();
}

main().catch(console.error);
