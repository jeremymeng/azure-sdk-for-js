// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayTriggerConfig
 *
 * @summary get a ConnectorGatewayTriggerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayTriggerConfigs_Get.json
 */
async function getTriggerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayTriggerConfigs.get(
    "testrg",
    "connectorgateway1",
    "newMailTrigger",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTriggerConfig();
}

main().catch(console.error);
