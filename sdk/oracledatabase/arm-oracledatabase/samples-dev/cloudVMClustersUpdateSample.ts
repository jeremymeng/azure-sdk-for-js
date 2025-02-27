/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CloudVmClusterUpdate } from "@azure/arm-oracledatabase";
import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a CloudVmCluster
 *
 * @summary Update a CloudVmCluster
 * x-ms-original-file: specification/oracle/resource-manager/Oracle.Database/stable/2023-09-01/examples/vmClusters_patch.json
 */
async function patchVMCluster(): Promise<void> {
  const subscriptionId =
    process.env["ORACLEDATABASE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ORACLEDATABASE_RESOURCE_GROUP"] || "rg000";
  const cloudvmclustername = "cluster1";
  const properties: CloudVmClusterUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.beginUpdateAndWait(
    resourceGroupName,
    cloudvmclustername,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchVMCluster();
}

main().catch(console.error);
