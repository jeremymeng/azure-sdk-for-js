/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { StreamingEndpoint } from "@azure/arm-mediaservices";
import { AzureMediaServices } from "@azure/arm-mediaservices";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a streaming endpoint.
 *
 * @summary Creates a streaming endpoint.
 * x-ms-original-file: specification/mediaservices/resource-manager/Microsoft.Media/Streaming/stable/2022-08-01/examples/streamingendpoint-create.json
 */
async function createAStreamingEndpoint() {
  const subscriptionId =
    process.env["MEDIASERVICES_SUBSCRIPTION_ID"] || "0a6ec948-5a62-437d-b9df-934dc7c1b722";
  const resourceGroupName = process.env["MEDIASERVICES_RESOURCE_GROUP"] || "mediaresources";
  const accountName = "slitestmedia10";
  const streamingEndpointName = "myStreamingEndpoint1";
  const parameters: StreamingEndpoint = {
    description: "test event 1",
    accessControl: {
      akamai: {
        akamaiSignatureHeaderAuthenticationKeyList: [
          {
            base64Key: "dGVzdGlkMQ==",
            expiration: new Date("2029-12-31T16:00:00-08:00"),
            identifier: "id1",
          },
          {
            base64Key: "dGVzdGlkMQ==",
            expiration: new Date("2030-12-31T16:00:00-08:00"),
            identifier: "id2",
          },
        ],
      },
      ip: { allow: [{ name: "AllowedIp", address: "192.168.1.1" }] },
    },
    availabilitySetName: "availableset",
    cdnEnabled: false,
    location: "West US",
    scaleUnits: 1,
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMediaServices(credential, subscriptionId);
  const result = await client.streamingEndpoints.beginCreateAndWait(
    resourceGroupName,
    accountName,
    streamingEndpointName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAStreamingEndpoint();
}

main().catch(console.error);
