/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the endpoint to the resource.
 *
 * @summary Gets the endpoint to the resource.
 * x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsGetCustom.json
 */
async function hybridConnectivityEndpointsGetCustom(): Promise<void> {
  const resourceUri =
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine";
  const endpointName = "custom";
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(resourceUri, endpointName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the endpoint to the resource.
 *
 * @summary Gets the endpoint to the resource.
 * x-ms-original-file: specification/hybridconnectivity/resource-manager/Microsoft.HybridConnectivity/stable/2023-03-15/examples/EndpointsGetDefault.json
 */
async function hybridConnectivityEndpointsGetDefault(): Promise<void> {
  const resourceUri =
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine";
  const endpointName = "default";
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(resourceUri, endpointName);
  console.log(result);
}

async function main(): Promise<void> {
  hybridConnectivityEndpointsGetCustom();
  hybridConnectivityEndpointsGetDefault();
}

main().catch(console.error);
