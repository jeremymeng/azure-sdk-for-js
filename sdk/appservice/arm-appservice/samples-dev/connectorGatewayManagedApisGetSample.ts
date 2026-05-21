// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayManagedApi
 *
 * @summary get a ConnectorGatewayManagedApi
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayManagedApis_Get.json
 */
async function getManagedApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayManagedApis.get(
    "testrg",
    "connectorgateway1",
    "office365",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedApi();
}

main().catch(console.error);
