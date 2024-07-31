/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create a WorkloadNetworkVMGroup
 *
 * @summary Create a WorkloadNetworkVMGroup
 * x-ms-original-file: specification/vmware/resource-manager/Microsoft.AVS/stable/2023-09-01/examples/WorkloadNetworks_CreateVMGroup.json
 */
async function workloadNetworksCreateVMGroup() {
  const subscriptionId =
    process.env["AVS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["AVS_RESOURCE_GROUP"] || "group1";
  const privateCloudName = "cloud1";
  const vmGroupId = "vmGroup1";
  const workloadNetworkVMGroup = {
    displayName: "vmGroup1",
    members: ["564d43da-fefc-2a3b-1d92-42855622fa50"],
    revision: 1,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.beginCreateVMGroupAndWait(
    resourceGroupName,
    privateCloudName,
    vmGroupId,
    workloadNetworkVMGroup,
  );
  console.log(result);
}

async function main() {
  workloadNetworksCreateVMGroup();
}

main().catch(console.error);
