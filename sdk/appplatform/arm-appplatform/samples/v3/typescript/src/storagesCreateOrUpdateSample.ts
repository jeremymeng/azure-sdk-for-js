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
  StorageResource,
  AppPlatformManagementClient
} from "@azure/arm-appplatform";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update storage resource.
 *
 * @summary Create or update storage resource.
 * x-ms-original-file: specification/appplatform/resource-manager/Microsoft.AppPlatform/stable/2023-12-01/examples/Storages_CreateOrUpdate.json
 */
async function storagesCreateOrUpdate() {
  const subscriptionId =
    process.env["APPPLATFORM_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APPPLATFORM_RESOURCE_GROUP"] || "myResourceGroup";
  const serviceName = "myservice";
  const storageName = "mystorage";
  const storageResource: StorageResource = {
    properties: {
      accountKey: "account-key-of-storage-account",
      accountName: "storage-account-name",
      storageType: "StorageAccount"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new AppPlatformManagementClient(credential, subscriptionId);
  const result = await client.storages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    storageName,
    storageResource
  );
  console.log(result);
}

async function main() {
  storagesCreateOrUpdate();
}

main().catch(console.error);
