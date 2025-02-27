/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about access policy assignment for database.
 *
 * @summary Gets information about access policy assignment for database.
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2024-09-01-preview/examples/RedisEnterpriseAccessPolicyAssignmentGet.json
 */
async function redisEnterpriseAccessPolicyAssignmentGet(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const databaseName = "default";
  const accessPolicyAssignmentName = "accessPolicyAssignmentName1";
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.accessPolicyAssignmentOperations.get(
    resourceGroupName,
    clusterName,
    databaseName,
    accessPolicyAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  redisEnterpriseAccessPolicyAssignmentGet();
}

main().catch(console.error);
