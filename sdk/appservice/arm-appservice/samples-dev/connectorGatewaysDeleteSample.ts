// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGateway
 *
 * @summary delete a ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_Delete.json
 */
async function deleteConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGateways.delete("testrg", "connectorgateway1");
}

async function main(): Promise<void> {
  await deleteConnectorGateway();
}

main().catch(console.error);
