/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets a deleted backup instance with name in a backup vault
 *
 * @summary Gets a deleted backup instance with name in a backup vault
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/preview/2022-11-01-preview/examples/DeletedBackupInstanceOperations/GetDeletedBackupInstance.json
 */
async function getDeletedBackupInstance() {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] || "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName = process.env["DATAPROTECTION_RESOURCE_GROUP"] || "000pikumar";
  const vaultName = "PratikPrivatePreviewVault1";
  const backupInstanceName = "testInstance1";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.deletedBackupInstances.get(
    resourceGroupName,
    vaultName,
    backupInstanceName
  );
  console.log(result);
}

async function main() {
  getDeletedBackupInstance();
}

main().catch(console.error);
