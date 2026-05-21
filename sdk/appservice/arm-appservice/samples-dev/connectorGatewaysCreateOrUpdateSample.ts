// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGateway
 *
 * @summary create a ConnectorGateway
 * x-ms-original-file: 2026-05-01-preview/ConnectorGateways_CreateOrUpdate.json
 */
async function createOrUpdateConnectorGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGateways.createOrUpdate("testrg", "connectorgateway1", {
    properties: {
      apiHubEnvironmentId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.Web/locations/CentralUS/environments/default",
    },
    location: "CentralUS",
    tags: { key1: "Value1" },
    identity: { type: "SystemAssigned" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateConnectorGateway();
}

main().catch(console.error);
