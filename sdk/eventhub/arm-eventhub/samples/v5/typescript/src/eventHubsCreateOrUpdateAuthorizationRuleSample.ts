/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  AuthorizationRule,
  EventHubManagementClient,
} from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect.
 *
 * @summary Creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2024-01-01/examples/EventHubs/EHEventHubAuthorizationRuleCreate.json
 */
async function eventHubAuthorizationRuleCreate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] ||
    "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-960";
  const eventHubName = "sdk-EventHub-532";
  const authorizationRuleName = "sdk-Authrules-2513";
  const parameters: AuthorizationRule = { rights: ["Listen", "Send"] };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespaceName,
    eventHubName,
    authorizationRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  eventHubAuthorizationRuleCreate();
}

main().catch(console.error);
