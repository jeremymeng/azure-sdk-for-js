// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to forwards a dynamic HTTP invocation through the connection.
 *
 * @summary forwards a dynamic HTTP invocation through the connection.
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_DynamicInvoke.json
 */
async function dynamicInvokeOnConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnections.dynamicInvoke(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    {
      request: {
        method: "GET",
        path: "/me",
        queries: { $select: "id,displayName,mail" },
        headers: { Accept: "application/json" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dynamicInvokeOnConnection();
}

main().catch(console.error);
