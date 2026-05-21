// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists OAuth consent links for the connection.
 *
 * @summary lists OAuth consent links for the connection.
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnections_ListConsentLinks.json
 */
async function listConsentLinksForConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnections.listConsentLinks(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    {
      parameters: [
        {
          objectId: "11111111-2222-3333-4444-555555555555",
          parameterName: "token",
          redirectUrl: "https://example.com/oauth-callback",
          tenantId: "99999999-8888-7777-6666-555555555555",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listConsentLinksForConnection();
}

main().catch(console.error);
