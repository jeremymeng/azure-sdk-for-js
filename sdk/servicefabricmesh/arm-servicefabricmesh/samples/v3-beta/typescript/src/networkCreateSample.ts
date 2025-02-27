/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  NetworkResourceDescription,
  ServiceFabricMeshManagementClient
} from "@azure/arm-servicefabricmesh";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a network resource with the specified name, description and properties. If a network resource with the same name exists, then it is updated with the specified description and properties.
 *
 * @summary Creates a network resource with the specified name, description and properties. If a network resource with the same name exists, then it is updated with the specified description and properties.
 * x-ms-original-file: specification/servicefabricmesh/resource-manager/Microsoft.ServiceFabricMesh/preview/2018-09-01-preview/examples/networks/create_update.json
 */
async function createOrUpdateNetwork(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRICMESH_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["SERVICEFABRICMESH_RESOURCE_GROUP"] || "sbz_demo";
  const networkResourceName = "sampleNetwork";
  const networkResourceDescription: NetworkResourceDescription = {
    location: "EastUS",
    properties: {
      description: "Service Fabric Mesh sample network.",
      kind: "Local",
      networkAddressPrefix: "2.0.0.0/16"
    },
    tags: {}
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricMeshManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.network.create(
    resourceGroupName,
    networkResourceName,
    networkResourceDescription
  );
  console.log(result);
}

async function main(): Promise<void> {
  createOrUpdateNetwork();
}

main().catch(console.error);
