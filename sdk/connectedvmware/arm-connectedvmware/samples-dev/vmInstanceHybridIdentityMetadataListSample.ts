/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the list of HybridIdentityMetadata of the given vm.
 *
 * @summary Returns the list of HybridIdentityMetadata of the given vm.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/HybridIdentityMetadata_ListByVmInstance.json
 */
async function hybridIdentityMetadataListByVM(): Promise<void> {
  const resourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM";
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential);
  const resArray = new Array();
  for await (const item of client.vmInstanceHybridIdentityMetadataOperations.list(resourceUri)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await hybridIdentityMetadataListByVM();
}

main().catch(console.error);
