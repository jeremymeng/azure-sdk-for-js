// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ConnectorGatewayTriggerRun resources by ConnectorGatewayTriggerConfig
 *
 * @summary list ConnectorGatewayTriggerRun resources by ConnectorGatewayTriggerConfig
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayTriggerRuns_ListByTriggerConfig.json
 */
async function listTriggerRunsByTriggerConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectorGatewayTriggerRuns.listByTriggerConfig(
    "testrg",
    "connectorgateway1",
    "newMailTrigger",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTriggerRunsByTriggerConfig();
}

main().catch(console.error);
