/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AppPlatformManagementClient } = require("@azure/arm-appplatform");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create or update build service agent pool.
 *
 * @summary Create or update build service agent pool.
 * x-ms-original-file: specification/appplatform/resource-manager/Microsoft.AppPlatform/preview/2022-11-01-preview/examples/BuildServiceAgentPool_UpdatePut.json
 */
async function buildServiceAgentPoolUpdatePut() {
  const subscriptionId =
    process.env["APPPLATFORM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPPLATFORM_RESOURCE_GROUP"] || "myResourceGroup";
  const serviceName = "myservice";
  const buildServiceName = "default";
  const agentPoolName = "default";
  const agentPoolResource = {
    properties: { poolSize: { name: "S3" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new AppPlatformManagementClient(credential, subscriptionId);
  const result = await client.buildServiceAgentPool.beginUpdatePutAndWait(
    resourceGroupName,
    serviceName,
    buildServiceName,
    agentPoolName,
    agentPoolResource
  );
  console.log(result);
}

async function main() {
  buildServiceAgentPoolUpdatePut();
}

main().catch(console.error);
