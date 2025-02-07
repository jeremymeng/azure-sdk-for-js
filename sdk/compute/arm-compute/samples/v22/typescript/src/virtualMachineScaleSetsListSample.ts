/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a list of all VM scale sets under a resource group.
 *
 * @summary Gets a list of all VM scale sets under a resource group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-07-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_List_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.virtualMachineScaleSets.list(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets a list of all VM scale sets under a resource group.
 *
 * @summary Gets a list of all VM scale sets under a resource group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-07-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_List_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.virtualMachineScaleSets.list(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  virtualMachineScaleSetListMaximumSetGen();
  virtualMachineScaleSetListMinimumSetGen();
}

main().catch(console.error);
