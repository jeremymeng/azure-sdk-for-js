/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
create jobs. This method returns the list of jobs associated with operation.
 *
 * @summary Provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
create jobs. This method returns the list of jobs associated with operation.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2024-04-01/examples/AzureIaasVm/ProtectionPolicyOperationStatuses_Get.json
 */
async function getProtectionPolicyOperationStatus() {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const policyName = "testPolicy1";
  const operationId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicyOperationStatuses.get(
    vaultName,
    resourceGroupName,
    policyName,
    operationId,
  );
  console.log(result);
}

async function main() {
  getProtectionPolicyOperationStatus();
}

main().catch(console.error);
