// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayCustomConnector
 *
 * @summary create a ConnectorGatewayCustomConnector
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayCustomConnectors_CreateOrUpdate.json
 */
async function createOrUpdateCustomConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayCustomConnectors.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "my-mcp-connector",
    {
      kind: "McpServer",
      properties: {
        displayName: "My MCP Connector",
        description: "Custom MCP server connector.",
        mcpServerUrl: "https://example.com/mcp",
        apiType: "Rest",
        supportedConnectionKinds: "V2",
        capabilities: ["tools"],
        isDynamicConnectionAllowed: false,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCustomConnector();
}

main().catch(console.error);
