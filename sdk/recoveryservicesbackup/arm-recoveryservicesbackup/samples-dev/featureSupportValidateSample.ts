/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AzureVMResourceFeatureSupportRequest } from "@azure/arm-recoveryservicesbackup";
import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to It will validate if given feature with resource properties is supported in service
 *
 * @summary It will validate if given feature with resource properties is supported in service
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2024-04-01/examples/AzureIaasVm/BackupFeature_Validate.json
 */
async function checkAzureVMBackupFeatureSupport() {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const azureRegion = "southeastasia";
  const parameters: AzureVMResourceFeatureSupportRequest = {
    featureType: "AzureVMResourceBackup",
    vmSize: "Basic_A0",
    vmSku: "Premium",
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.featureSupport.validate(azureRegion, parameters);
  console.log(result);
}

async function main() {
  await checkAzureVMBackupFeatureSupport();
}

main().catch(console.error);
