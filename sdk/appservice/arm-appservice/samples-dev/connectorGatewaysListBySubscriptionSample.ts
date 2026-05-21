// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ConnectorGateway resources by subscription ID
 *
 * @summary list ConnectorGateway resources by subscription ID
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_ListBySubscription.json
 */
async function listConnectorGatewaysBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorGateways.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectorGatewaysBySubscription();
}

main().catch(console.error);
