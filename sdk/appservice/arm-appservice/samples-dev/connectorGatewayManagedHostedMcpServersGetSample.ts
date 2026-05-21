// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayManagedHostedMcpServer
 *
 * @summary get a ConnectorGatewayManagedHostedMcpServer
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayManagedHostedMcpServers_Get.json
 */
async function getManagedHostedMcpServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayManagedHostedMcpServers.get(
    "testrg",
    "connectorgateway1",
    "sample-hosted",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedHostedMcpServer();
}

main().catch(console.error);
