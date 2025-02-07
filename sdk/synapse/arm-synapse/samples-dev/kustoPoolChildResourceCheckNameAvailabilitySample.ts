/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { DatabaseCheckNameRequest } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Checks that the Kusto Pool child resource name is valid and is not already in use.
 *
 * @summary Checks that the Kusto Pool child resource name is valid and is not already in use.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/KustoPoolAttachedDatabaseConfigurationCheckNameAvailability.json
 */
async function kustoPoolAttachedDatabaseConfigurationCheckNameAvailability() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const workspaceName = "kustorptest";
  const kustoPoolName = "kustoclusterrptest4";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "kustorptest";
  const resourceName: DatabaseCheckNameRequest = {
    name: "adc1",
    type: "Microsoft.Synapse/workspaces/kustoPools/attachedDatabaseConfigurations",
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.kustoPoolChildResource.checkNameAvailability(
    workspaceName,
    kustoPoolName,
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Checks that the Kusto Pool child resource name is valid and is not already in use.
 *
 * @summary Checks that the Kusto Pool child resource name is valid and is not already in use.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/KustoPoolDatabasesCheckNameAvailability.json
 */
async function kustoPoolDatabasesCheckNameAvailability() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const workspaceName = "synapseWorkspaceName";
  const kustoPoolName = "kustoclusterrptest4";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "kustorptest";
  const resourceName: DatabaseCheckNameRequest = {
    name: "database1",
    type: "Microsoft.Synapse/workspaces/kustoPools/databases",
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.kustoPoolChildResource.checkNameAvailability(
    workspaceName,
    kustoPoolName,
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main() {
  await kustoPoolAttachedDatabaseConfigurationCheckNameAvailability();
  await kustoPoolDatabasesCheckNameAvailability();
}

main().catch(console.error);
