// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGateway
 *
 * @summary get a ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_Get.json
 */
async function getConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGateways.get("testrg", "connectorgateway1");
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectorGateway();
}

main().catch(console.error);
