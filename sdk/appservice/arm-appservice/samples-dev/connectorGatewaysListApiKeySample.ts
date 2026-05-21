// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to issues an API key for the connector gateway. The key may be scoped to a specific MCP server config or to the entire gateway.
 *
 * @summary issues an API key for the connector gateway. The key may be scoped to a specific MCP server config or to the entire gateway.
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_ListApiKey.json
 */
async function listApiKeyForConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGateways.listApiKey("testrg", "connectorgateway1", {
    keyType: "Primary",
    neverExpire: false,
    notAfter: new Date("2026-06-01T00:00:00Z"),
    scope: "mcp1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listApiKeyForConnectorGateway();
}

main().catch(console.error);
