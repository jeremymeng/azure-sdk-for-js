/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a AutonomousDatabase
 *
 * @summary Get a AutonomousDatabase
 * x-ms-original-file: specification/oracle/resource-manager/Oracle.Database/stable/2023-09-01/examples/autonomousDatabase_get.json
 */
async function autonomousDatabasesGet(): Promise<void> {
  const subscriptionId =
    process.env["ORACLEDATABASE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ORACLEDATABASE_RESOURCE_GROUP"] || "rg000";
  const autonomousdatabasename = "databasedb1";
  const credential = new DefaultAzureCredential();
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.get(
    resourceGroupName,
    autonomousdatabasename,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a AutonomousDatabase
 *
 * @summary Get a AutonomousDatabase
 * x-ms-original-file: specification/oracle/resource-manager/Oracle.Database/stable/2023-09-01/examples/autonomousDatabase_get.json
 */
async function getAutonomousDatabase(): Promise<void> {
  const subscriptionId =
    process.env["ORACLEDATABASE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ORACLEDATABASE_RESOURCE_GROUP"] || "rg000";
  const autonomousdatabasename = "databasedb1";
  const credential = new DefaultAzureCredential();
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.get(
    resourceGroupName,
    autonomousdatabasename,
  );
  console.log(result);
}

async function main(): Promise<void> {
  autonomousDatabasesGet();
  getAutonomousDatabase();
}

main().catch(console.error);
