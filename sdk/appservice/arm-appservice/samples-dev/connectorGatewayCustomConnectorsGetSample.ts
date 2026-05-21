// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayCustomConnector
 *
 * @summary get a ConnectorGatewayCustomConnector
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayCustomConnectors_Get.json
 */
async function getCustomConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayCustomConnectors.get(
    "testrg",
    "connectorgateway1",
    "my-mcp-connector",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCustomConnector();
}

main().catch(console.error);
