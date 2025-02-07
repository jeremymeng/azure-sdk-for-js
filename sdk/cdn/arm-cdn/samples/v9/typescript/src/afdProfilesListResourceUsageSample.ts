/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @summary Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDProfiles_ListResourceUsage.json
 */
async function afdProfilesListResourceUsage() {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.afdProfiles.listResourceUsage(
    resourceGroupName,
    profileName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  afdProfilesListResourceUsage();
}

main().catch(console.error);
