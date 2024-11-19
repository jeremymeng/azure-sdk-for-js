/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to The operation to update a license.
 *
 * @summary The operation to update a license.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2024-07-31-preview/examples/license/License_Update.json
 */
async function updateALicense() {
  const subscriptionId = process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const licenseName = "{licenseName}";
  const parameters = {
    type: "pCore",
    edition: "Datacenter",
    licenseType: "ESU",
    processors: 6,
    state: "Activated",
    target: "Windows Server 2012",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.licenses.beginUpdateAndWait(
    resourceGroupName,
    licenseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  updateALicense();
}

main().catch(console.error);
