/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CheckMhsmNameAvailabilityParameters } from "@azure/arm-keyvault";
import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Checks that the managed hsm name is valid and is not already in use.
 *
 * @summary Checks that the managed hsm name is valid and is not already in use.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2023-07-01/examples/ManagedHsm_checkMhsmNameAvailability.json
 */
async function validateAManagedHsmName() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const mhsmName: CheckMhsmNameAvailabilityParameters = { name: "sample-mhsm" };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.checkMhsmNameAvailability(mhsmName);
  console.log(result);
}

async function main() {
  await validateAManagedHsmName();
}

main().catch(console.error);
