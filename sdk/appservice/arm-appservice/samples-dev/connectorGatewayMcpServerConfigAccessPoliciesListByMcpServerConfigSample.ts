// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ConnectorGatewayMcpServerConfigAccessPolicy resources by ConnectorGatewayMcpServerConfig
 *
 * @summary list ConnectorGatewayMcpServerConfigAccessPolicy resources by ConnectorGatewayMcpServerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayMcpServerConfigAccessPolicies_ListByMcpServerConfig.json
 */
async function listMcpServerConfigAccessPoliciesByMcpServerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorGatewayMcpServerConfigAccessPolicies.listByMcpServerConfig(
    "testrg",
    "connectorgateway1",
    "mcp1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMcpServerConfigAccessPoliciesByMcpServerConfig();
}

main().catch(console.error);
