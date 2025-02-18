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
  AddRemoveDbNode,
  OracleDatabaseManagementClient,
} from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Remove VMs from the VM Cluster
 *
 * @summary Remove VMs from the VM Cluster
 * x-ms-original-file: specification/oracle/resource-manager/Oracle.Database/stable/2023-09-01/examples/vmClusters_removeVms.json
 */
async function removeVMSFromVMCluster(): Promise<void> {
  const subscriptionId =
    process.env["ORACLEDATABASE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ORACLEDATABASE_RESOURCE_GROUP"] || "rg000";
  const cloudvmclustername = "cluster1";
  const body: AddRemoveDbNode = { dbServers: ["ocid1..aaaa"] };
  const credential = new DefaultAzureCredential();
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.beginRemoveVmsAndWait(
    resourceGroupName,
    cloudvmclustername,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  removeVMSFromVMCluster();
}

main().catch(console.error);
