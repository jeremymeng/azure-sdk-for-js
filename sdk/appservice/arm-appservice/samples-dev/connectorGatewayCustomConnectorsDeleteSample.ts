// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGatewayCustomConnector
 *
 * @summary delete a ConnectorGatewayCustomConnector
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayCustomConnectors_Delete.json
 */
async function deleteCustomConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGatewayCustomConnectors.delete(
    "testrg",
    "connectorgateway1",
    "my-mcp-connector",
  );
}

async function main(): Promise<void> {
  await deleteCustomConnector();
}

main().catch(console.error);
