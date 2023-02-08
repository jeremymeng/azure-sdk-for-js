/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes a vault.
 *
 * @summary Deletes a vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2022-04-01/examples/DeleteVault.json
 */
async function deleteRecoveryServicesVault() {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] ||
    "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] ||
    "Default-RecoveryServices-ResourceGroup";
  const vaultName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.delete(resourceGroupName, vaultName);
  console.log(result);
}

async function main() {
  deleteRecoveryServicesVault();
}

main().catch(console.error);
