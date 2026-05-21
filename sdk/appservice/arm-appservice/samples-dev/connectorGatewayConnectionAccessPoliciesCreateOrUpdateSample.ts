// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ConnectorGatewayConnectionAccessPolicy
 *
 * @summary create a ConnectorGatewayConnectionAccessPolicy
 * x-ms-original-file: 2026-05-01-preview/ConnectorGatewayConnectionAccessPolicies_CreateOrUpdate.json
 */
async function createOrUpdateConnectionAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.connectorGatewayConnectionAccessPolicies.createOrUpdate(
    "testrg",
    "connectorgateway1",
    "office365-conn",
    "policy1",
    {
      properties: {
        principal: {
          type: "ActiveDirectory",
          identity: {
            objectId: "11111111-2222-3333-4444-555555555555",
            tenantId: "99999999-8888-7777-6666-555555555555",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateConnectionAccessPolicy();
}

main().catch(console.error);
