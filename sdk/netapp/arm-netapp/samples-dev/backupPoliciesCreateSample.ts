/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { BackupPolicy } from "@azure/arm-netapp";
import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create a backup policy for Netapp Account
 *
 * @summary Create a backup policy for Netapp Account
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/preview/2024-07-01-preview/examples/BackupPolicies_Create.json
 */
async function backupPoliciesCreate() {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] || "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const backupPolicyName = "backupPolicyName";
  const body: BackupPolicy = {
    dailyBackupsToKeep: 10,
    enabled: true,
    location: "westus",
    monthlyBackupsToKeep: 10,
    weeklyBackupsToKeep: 10,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupPolicies.beginCreateAndWait(
    resourceGroupName,
    accountName,
    backupPolicyName,
    body,
  );
  console.log(result);
}

async function main() {
  await backupPoliciesCreate();
}

main().catch(console.error);
