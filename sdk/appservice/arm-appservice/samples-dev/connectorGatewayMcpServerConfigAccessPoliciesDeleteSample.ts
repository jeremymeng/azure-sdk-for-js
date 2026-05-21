// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGatewayMcpServerConfigAccessPolicy
 *
 * @summary delete a ConnectorGatewayMcpServerConfigAccessPolicy
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayMcpServerConfigAccessPolicies_Delete.json
 */
async function deleteMcpServerConfigAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGatewayMcpServerConfigAccessPolicies.delete(
    "testrg",
    "connectorgateway1",
    "mcp1",
    "policy1",
  );
}

async function main(): Promise<void> {
  await deleteMcpServerConfigAccessPolicy();
}

main().catch(console.error);
