// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGatewayTriggerConfig
 *
 * @summary delete a ConnectorGatewayTriggerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayTriggerConfigs_Delete.json
 */
async function deleteTriggerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGatewayTriggerConfigs.delete(
    "testrg",
    "connectorgateway1",
    "newMailTrigger",
  );
}

async function main(): Promise<void> {
  await deleteTriggerConfig();
}

main().catch(console.error);
