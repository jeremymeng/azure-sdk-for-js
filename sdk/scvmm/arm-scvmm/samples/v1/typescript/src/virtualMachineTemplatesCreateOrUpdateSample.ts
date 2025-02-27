/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { VirtualMachineTemplate, ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Onboards the ScVmm VM Template as an Azure VM Template resource.
 *
 * @summary Onboards the ScVmm VM Template as an Azure VM Template resource.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineTemplates_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineTemplatesCreateOrUpdateMaximumSet(): Promise<void> {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const virtualMachineTemplateName = "6";
  const resource: VirtualMachineTemplate = {
    extendedLocation: {
      name: "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ExtendedLocation/customLocations/customLocationName",
      type: "customLocation",
    },
    location: "ayxsyduviotylbojh",
    properties: {
      dynamicMemoryEnabled: "true",
      inventoryItemId: "qjrykoogccwlgkd",
      isCustomizable: "true",
      isHighlyAvailable: "true",
      limitCpuForMigration: "true",
      osType: "Windows",
      uuid: "12345678-1234-1234-1234-12345678abcd",
      vmmServerId:
        "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/vmmServers/vmmServerName",
    },
    tags: { key9494: "kkbmfpwhmvlobm" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result =
    await client.virtualMachineTemplates.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualMachineTemplateName,
      resource,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Onboards the ScVmm VM Template as an Azure VM Template resource.
 *
 * @summary Onboards the ScVmm VM Template as an Azure VM Template resource.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineTemplates_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineTemplatesCreateOrUpdateMinimumSet(): Promise<void> {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const virtualMachineTemplateName = "P";
  const resource: VirtualMachineTemplate = {
    extendedLocation: {},
    location: "ayxsyduviotylbojh",
  };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result =
    await client.virtualMachineTemplates.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualMachineTemplateName,
      resource,
    );
  console.log(result);
}

async function main(): Promise<void> {
  virtualMachineTemplatesCreateOrUpdateMaximumSet();
  virtualMachineTemplatesCreateOrUpdateMinimumSet();
}

main().catch(console.error);
