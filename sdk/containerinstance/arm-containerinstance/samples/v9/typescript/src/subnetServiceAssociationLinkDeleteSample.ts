/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete container group virtual network association links. The operation does not delete other resources provided by the user.
 *
 * @summary Delete container group virtual network association links. The operation does not delete other resources provided by the user.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2023-05-01/examples/SubnetServiceAssociationLinkDelete.json
 */
async function subnetServiceAssociationLinkDelete() {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const virtualNetworkName = "demo2";
  const subnetName = "demo3";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.subnetServiceAssociationLink.beginDeleteAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName
  );
  console.log(result);
}

async function main() {
  subnetServiceAssociationLinkDelete();
}

main().catch(console.error);
