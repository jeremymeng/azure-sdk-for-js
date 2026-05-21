// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the access keys for the connection.
 *
 * @summary lists the access keys for the connection.
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_ListConnectionKeys.json
 */
async function listConnectionKeysForConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnections.listConnectionKeys(
    "testrg",
    "connectorgateway1",
    "office365-conn",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listConnectionKeysForConnection();
}

main().catch(console.error);
