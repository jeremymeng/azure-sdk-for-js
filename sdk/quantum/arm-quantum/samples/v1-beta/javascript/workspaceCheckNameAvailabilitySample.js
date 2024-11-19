/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureQuantumManagementClient } = require("@azure/arm-quantum");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Check the availability of the resource name.
 *
 * @summary Check the availability of the resource name.
 * x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesCheckNameAvailability.json
 */
async function quantumWorkspacesCheckNameAvailability() {
  const subscriptionId =
    process.env["QUANTUM_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "westus2";
  const checkNameAvailabilityParameters = {
    name: "sample-workspace-name",
    type: "Microsoft.Quantum/Workspaces",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureQuantumManagementClient(credential, subscriptionId);
  const result = await client.workspace.checkNameAvailability(
    locationName,
    checkNameAvailabilityParameters,
  );
  console.log(result);
}

async function main() {
  quantumWorkspacesCheckNameAvailability();
}

main().catch(console.error);
