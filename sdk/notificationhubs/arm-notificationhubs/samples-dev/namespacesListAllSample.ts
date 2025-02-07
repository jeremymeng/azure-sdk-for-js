/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the available namespaces within the subscription.
 *
 * @summary Lists all the available namespaces within the subscription.
 * x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/preview/2023-10-01-preview/examples/Namespaces/ListBySubscription.json
 */
async function namespacesListAll(): Promise<void> {
  const subscriptionId =
    process.env["NOTIFICATIONHUBS_SUBSCRIPTION_ID"] || "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const credential = new DefaultAzureCredential();
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listAll()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await namespacesListAll();
}

main().catch(console.error);
