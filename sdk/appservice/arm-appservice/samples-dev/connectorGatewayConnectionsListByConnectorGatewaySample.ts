// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ConnectorGatewayConnection resources by ConnectorGateway
 *
 * @summary list ConnectorGatewayConnection resources by ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_ListByConnectorGateway.json
 */
async function listConnectionsByConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorGatewayConnections.listByConnectorGateway(
    "testrg",
    "connectorgateway1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionsByConnectorGateway();
}

main().catch(console.error);
