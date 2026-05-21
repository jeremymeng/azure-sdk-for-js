// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayTriggerConfig
 *
 * @summary create a ConnectorGatewayTriggerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayTriggerConfigs_CreateOrUpdate.json
 */
async function createOrUpdateTriggerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayTriggerConfigs.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "newMailTrigger",
    {
      properties: {
        state: "Enabled",
        description: "Trigger when a new mail arrives",
        connectionDetails: { connectorName: "office365", connectionName: "office365-conn" },
        operationName: "OnNewEmail",
        parameters: [{ name: "folder", value: "Inbox" }],
        notificationDetails: { callbackUrl: "https://example.com/webhook", httpMethod: "POST" },
        triggerType: "NotSpecified",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTriggerConfig();
}

main().catch(console.error);
