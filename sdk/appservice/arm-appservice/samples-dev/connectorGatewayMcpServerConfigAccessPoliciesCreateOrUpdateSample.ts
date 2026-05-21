// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayMcpServerConfigAccessPolicy
 *
 * @summary create a ConnectorGatewayMcpServerConfigAccessPolicy
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayMcpServerConfigAccessPolicies_CreateOrUpdate.json
 */
async function createOrUpdateMcpServerConfigAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayMcpServerConfigAccessPolicies.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "mcp1",
    "policy1",
    {
      properties: {
        principalType: "User",
        principal: {
          objectId: "11111111-2222-3333-4444-555555555555",
          tenantId: "99999999-8888-7777-6666-555555555555",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMcpServerConfigAccessPolicy();
}

main().catch(console.error);
