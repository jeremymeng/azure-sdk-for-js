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

/**
 * This sample demonstrates how to Deletes a subscription from the specified topic.
 *
 * @summary Deletes a subscription from the specified topic.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/examples/Subscriptions/SBSubscriptionDelete.json
 */
async function subscriptionDelete() {
  const subscriptionId = "subscriptionId";
  const resourceGroupName = "ResourceGroup";
  const namespaceName = "sdk-Namespace-5882";
  const topicName = "sdk-Topics-1804";
  const subscriptionName = "sdk-Subscriptions-3670";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.subscriptions.delete(
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName
  );
  console.log(result);
}

subscriptionDelete().catch(console.error);
