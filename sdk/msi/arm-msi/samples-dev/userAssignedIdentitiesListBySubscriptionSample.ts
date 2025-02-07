/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists all the userAssignedIdentities available under the specified subscription.
 *
 * @summary Lists all the userAssignedIdentities available under the specified subscription.
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2023-01-31/examples/IdentityListBySubscription.json
 */
async function identityListBySubscription() {
  const subscriptionId = process.env["MSI_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userAssignedIdentities.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await identityListBySubscription();
}

main().catch(console.error);
