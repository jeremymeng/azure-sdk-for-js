/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  CheckAvailabilityParameters,
  NotificationHubsManagementClient,
} from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Checks the availability of the given service namespace across all Azure subscriptions. This is useful because the domain name is created based on the service namespace name.
 *
 * @summary Checks the availability of the given service namespace across all Azure subscriptions. This is useful because the domain name is created based on the service namespace name.
 * x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/preview/2023-10-01-preview/examples/Namespaces/CheckAvailability.json
 */
async function namespacesCheckAvailability() {
  const subscriptionId =
    process.env["NOTIFICATIONHUBS_SUBSCRIPTION_ID"] ||
    "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const parameters: CheckAvailabilityParameters = {
    name: "sdk-Namespace-2924",
  };
  const credential = new DefaultAzureCredential();
  const client = new NotificationHubsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.namespaces.checkAvailability(parameters);
  console.log(result);
}

async function main() {
  namespacesCheckAvailability();
}

main().catch(console.error);
