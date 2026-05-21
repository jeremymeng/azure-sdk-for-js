// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to confirms an OAuth consent code returned from the redirect URL.
 *
 * @summary confirms an OAuth consent code returned from the redirect URL.
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_ConfirmConsentCode.json
 */
async function confirmConsentCodeForConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnections.confirmConsentCode(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    {
      code: "AAB...redacted",
      objectId: "11111111-2222-3333-4444-555555555555",
      tenantId: "99999999-8888-7777-6666-555555555555",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await confirmConsentCodeForConnection();
}

main().catch(console.error);
