/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get long running operation result.
 *
 * @summary Get long running operation result.
 * x-ms-original-file: specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/preview/2024-06-01-preview/examples/Long_running_operation_result.json
 */
async function getOperationResult() {
  const subscriptionId =
    process.env["SERVICEFABRICMANAGEDCLUSTERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const operationId = "00000000-0000-0000-0000-000000001234";
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.operationResults.get(location, operationId);
  console.log(result);
}

async function main() {
  getOperationResult();
}

main().catch(console.error);
