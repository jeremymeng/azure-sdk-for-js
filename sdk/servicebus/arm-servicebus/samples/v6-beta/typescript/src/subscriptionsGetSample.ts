/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a subscription description for the specified topic.
 *
 * @summary Returns a subscription description for the specified topic.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Subscriptions/SBSubscriptionGet.json
 */
async function subscriptionGet(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "Subscriptionid";
  const resourceGroupName =
    process.env["SERVICEBUS_RESOURCE_GROUP"] || "ResourceGroup";
  const namespaceName = "sdk-Namespace-1349";
  const topicName = "sdk-Topics-8740";
  const subscriptionName = "sdk-Subscriptions-2178";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.subscriptions.get(
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName
  );
  console.log(result);
}

async function main(): Promise<void> {
  subscriptionGet();
}

main().catch(console.error);
