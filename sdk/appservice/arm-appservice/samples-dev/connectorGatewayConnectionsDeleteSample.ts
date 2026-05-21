// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGatewayConnection
 *
 * @summary delete a ConnectorGatewayConnection
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_Delete.json
 */
async function deleteConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGatewayConnections.delete("testrg", "connectorgateway1", "office365-conn");
}

async function main(): Promise<void> {
  await deleteConnection();
}

main().catch(console.error);
