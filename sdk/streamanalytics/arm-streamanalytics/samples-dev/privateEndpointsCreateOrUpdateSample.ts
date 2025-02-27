/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PrivateEndpoint } from "@azure/arm-streamanalytics";
import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a Stream Analytics Private Endpoint or replaces an already existing Private Endpoint.
 *
 * @summary Creates a Stream Analytics Private Endpoint or replaces an already existing Private Endpoint.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2020-03-01-preview/examples/PrivateEndpoint_Create.json
 */
async function createAPrivateEndpoint(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg";
  const clusterName = "testcluster";
  const privateEndpointName = "testpe";
  const privateEndpoint: PrivateEndpoint = {
    properties: {
      manualPrivateLinkServiceConnections: [
        {
          groupIds: ["groupIdFromResource"],
          privateLinkServiceId:
            "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.createOrUpdate(
    resourceGroupName,
    clusterName,
    privateEndpointName,
    privateEndpoint,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAPrivateEndpoint();
}

main().catch(console.error);
