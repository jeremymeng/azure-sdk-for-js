// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ConnectorGatewayConnectionAccessPolicy
 *
 * @summary delete a ConnectorGatewayConnectionAccessPolicy
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnectionAccessPolicies_Delete.json
 */
async function deleteConnectionAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.connectorGatewayConnectionAccessPolicies.delete(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    "policy1",
  );
}

async function main(): Promise<void> {
  await deleteConnectionAccessPolicy();
}

main().catch(console.error);
