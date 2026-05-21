// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConnectorGatewayTriggerRun
 *
 * @summary get a ConnectorGatewayTriggerRun
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayTriggerRuns_Get.json
 */
async function getTriggerRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayTriggerRuns.get(
    "testrg",
    "connectorgateway1",
    "newMailTrigger",
    "08585112333222111000000000001",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTriggerRun();
}

main().catch(console.error);
