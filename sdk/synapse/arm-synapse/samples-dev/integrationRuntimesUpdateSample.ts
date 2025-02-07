/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { UpdateIntegrationRuntimeRequest } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update an integration runtime
 *
 * @summary Update an integration runtime
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/IntegrationRuntimes_Update.json
 */
async function updateIntegrationRuntime() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "exampleResourceGroup";
  const workspaceName = "exampleWorkspace";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const updateIntegrationRuntimeRequest: UpdateIntegrationRuntimeRequest = {
    autoUpdate: "Off",
    updateDelayOffset: '"PT3H"',
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.update(
    resourceGroupName,
    workspaceName,
    integrationRuntimeName,
    updateIntegrationRuntimeRequest,
  );
  console.log(result);
}

async function main() {
  await updateIntegrationRuntime();
}

main().catch(console.error);
