// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayConnection
 *
 * @summary create a ConnectorGatewayConnection
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_CreateOrUpdate.json
 */
async function createOrUpdateConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnections.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    { properties: { displayName: "Office 365 connection", connectorName: "office365" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateConnection();
}

main().catch(console.error);
