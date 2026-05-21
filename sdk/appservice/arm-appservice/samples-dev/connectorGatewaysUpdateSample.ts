// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ConnectorGateway
 *
 * @summary update a ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_Update.json
 */
async function updateConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGateways.update("testrg", "connectorgateway1", {
    tags: { key1: "Value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnectorGateway();
}

main().catch(console.error);
