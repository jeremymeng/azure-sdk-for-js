// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayConnectionAccessPolicy
 *
 * @summary get a ConnectorGatewayConnectionAccessPolicy
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnectionAccessPolicies_Get.json
 */
async function getConnectionAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnectionAccessPolicies.get(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    "policy1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectionAccessPolicy();
}

main().catch(console.error);
