/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RegenerateAccessKeyParameters } from "@azure/arm-servicebus";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Regenerates the primary or secondary connection strings to the queue.
 *
 * @summary Regenerates the primary or secondary connection strings to the queue.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Queues/SBQueueAuthorizationRuleRegenerateKey.json
 */
async function queueAuthorizationRuleRegenerateKey() {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-namespace-7982";
  const queueName = "sdk-Queues-2317";
  const authorizationRuleName = "sdk-AuthRules-5800";
  const parameters: RegenerateAccessKeyParameters = { keyType: "PrimaryKey" };
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.regenerateKeys(
    resourceGroupName,
    namespaceName,
    queueName,
    authorizationRuleName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await queueAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
