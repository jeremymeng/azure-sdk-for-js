/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2023-05-01/examples/storageTaskAssignmentsCrud/PutStorageTaskAssignment.json
 */
async function putStorageTaskAssignment() {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto4445";
  const storageTaskAssignmentName = "myassignment1";
  const parameters = {
    properties: {
      description: "My Storage task assignment",
      enabled: true,
      executionContext: {
        target: { excludePrefix: [], prefix: ["prefix1", "prefix2"] },
        trigger: {
          type: "RunOnce",
          parameters: { startOn: new Date("2022-11-15T21:52:47.8145095Z") },
        },
      },
      report: { prefix: "container1" },
      taskId:
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.StorageActions/storageTasks/mytask1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.beginCreateAndWait(
    resourceGroupName,
    accountName,
    storageTaskAssignmentName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2023-05-01/examples/storageTaskAssignmentsCrud/PutStorageTaskAssignmentRequiredProperties.json
 */
async function putStorageTaskAssignmentRequiredProperties() {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto4445";
  const storageTaskAssignmentName = "myassignment1";
  const parameters = {
    properties: {
      description: "My Storage task assignment",
      enabled: true,
      executionContext: {
        trigger: {
          type: "RunOnce",
          parameters: { startOn: new Date("2022-11-15T21:52:47.8145095Z") },
        },
      },
      report: { prefix: "container1" },
      taskId:
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.StorageActions/storageTasks/mytask1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.beginCreateAndWait(
    resourceGroupName,
    accountName,
    storageTaskAssignmentName,
    parameters,
  );
  console.log(result);
}

async function main() {
  putStorageTaskAssignment();
  putStorageTaskAssignmentRequiredProperties();
}

main().catch(console.error);
