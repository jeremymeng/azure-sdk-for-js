/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Cancels the asynchronous operation on the elastic pool.
 *
 * @summary Cancels the asynchronous operation on the elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CancelElasticPoolOperation.json
 */
async function cancelTheElasticPoolManagementOperation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-6661";
  const elasticPoolName = "testpool";
  const operationId = "f779414b-e748-4925-8cfe-c8598f7660ae";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPoolOperations.cancel(
    resourceGroupName,
    serverName,
    elasticPoolName,
    operationId,
  );
  console.log(result);
}

async function main() {
  cancelTheElasticPoolManagementOperation();
}

main().catch(console.error);
