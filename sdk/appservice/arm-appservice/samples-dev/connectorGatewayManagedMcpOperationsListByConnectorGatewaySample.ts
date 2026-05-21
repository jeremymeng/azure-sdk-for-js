// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ConnectorGatewayManagedMcpOperation resources by ConnectorGateway
 *
 * @summary list ConnectorGatewayManagedMcpOperation resources by ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayManagedMcpOperations_ListByConnectorGateway.json
 */
async function listManagedMcpOperationsByConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorGatewayManagedMcpOperations.listByConnectorGateway(
    "testrg",
    "connectorgateway1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedMcpOperationsByConnectorGateway();
}

main().catch(console.error);
