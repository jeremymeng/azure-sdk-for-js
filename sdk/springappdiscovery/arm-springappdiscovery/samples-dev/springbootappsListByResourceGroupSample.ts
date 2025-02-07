/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SpringAppDiscoveryManagementClient } from "@azure/arm-springappdiscovery";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List springbootapps resource by resourceGroup
 *
 * @summary List springbootapps resource by resourceGroup
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootapps_ListByResourceGroup_MaximumSet_Gen.json
 */
async function springbootappsListByResourceGroupMaximumSetGen() {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "jnetwlorzmxpxmcucorv";
  const resourceGroupName = process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootapps";
  const siteName = "pdfosfhtemfsaglvwjdyqlyeipucrd";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.springbootapps.listByResourceGroup(resourceGroupName, siteName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List springbootapps resource by resourceGroup
 *
 * @summary List springbootapps resource by resourceGroup
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootapps_ListByResourceGroup_MinimumSet_Gen.json
 */
async function springbootappsListByResourceGroupMinimumSetGen() {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "jnetwlorzmxpxmcucorv";
  const resourceGroupName = process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootapps";
  const siteName = "pdfosfhtemfsaglvwjdyqlyeipucrd";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.springbootapps.listByResourceGroup(resourceGroupName, siteName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await springbootappsListByResourceGroupMaximumSetGen();
  await springbootappsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
