/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List all reports for the guest configuration assignment, latest report first.
 *
 * @summary List all reports for the guest configuration assignment, latest report first.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/listAllGuestConfigurationHCRPAssignmentReports.json
 */
async function listAllGuestConfigurationAssignmentsForAVirtualMachine() {
  const subscriptionId =
    process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionid";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const guestConfigurationAssignmentName = "AuditSecureProtocol";
  const machineName = "myMachineName";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationHcrpAssignmentReports.list(
    resourceGroupName,
    guestConfigurationAssignmentName,
    machineName,
  );
  console.log(result);
}

async function main() {
  listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
