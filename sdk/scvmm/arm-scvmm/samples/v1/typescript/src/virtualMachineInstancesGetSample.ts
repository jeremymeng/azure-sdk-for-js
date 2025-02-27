/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves information about a virtual machine instance.
 *
 * @summary Retrieves information about a virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_Get_MaximumSet_Gen.json
 */
async function virtualMachineInstancesGetMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.get(resourceUri);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about a virtual machine instance.
 *
 * @summary Retrieves information about a virtual machine instance.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_Get_MinimumSet_Gen.json
 */
async function virtualMachineInstancesGetMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.get(resourceUri);
  console.log(result);
}

async function main(): Promise<void> {
  virtualMachineInstancesGetMaximumSet();
  virtualMachineInstancesGetMinimumSet();
}

main().catch(console.error);
