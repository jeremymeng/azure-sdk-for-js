/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ManagedDevOpsInfrastructure } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Delete a Pool
 *
 * @summary Delete a Pool
 * x-ms-original-file: specification/devopsinfrastructure/resource-manager/Microsoft.DevOpsInfrastructure/preview/2024-04-04-preview/examples/DeletePool.json
 */
async function poolsDelete() {
  const subscriptionId =
    process.env["DEVOPSINFRASTRUCTURE_SUBSCRIPTION_ID"] || "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const resourceGroupName = process.env["DEVOPSINFRASTRUCTURE_RESOURCE_GROUP"] || "rg";
  const poolName = "pool";
  const credential = new DefaultAzureCredential();
  const client = new ManagedDevOpsInfrastructure(credential, subscriptionId);
  const result = await client.pools.beginDeleteAndWait(resourceGroupName, poolName);
  console.log(result);
}

async function main() {
  poolsDelete();
}

main().catch(console.error);
