// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayMcpServerConfig
 *
 * @summary create a ConnectorGatewayMcpServerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayMcpServerConfigs_CreateOrUpdate.json
 */
async function createOrUpdateMcpServerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayMcpServerConfigs.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "mcp1",
    {
      kind: "ManagedMcpServer",
      properties: {
        state: "Enabled",
        description: "Office 365 MCP server config",
        authenticationMode: "DeveloperConnection",
        disableApiKeyAuth: false,
        connectors: [
          {
            name: "office365",
            connectionName: "office365-conn",
            displayName: "Office 365",
            description: "Office 365 connector",
            operations: [
              {
                name: "GetMyProfile",
                displayName: "Get My Profile",
                description: "Returns the calling user's profile.",
              },
            ],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMcpServerConfig();
}

main().catch(console.error);
