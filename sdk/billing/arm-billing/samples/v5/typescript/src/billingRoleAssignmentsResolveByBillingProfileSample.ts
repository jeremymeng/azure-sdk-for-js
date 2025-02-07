/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the role assignments for the caller on an billing profile while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @summary Lists the role assignments for the caller on an billing profile while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/resolveBillingRoleAssignmentByBillingProfile.json
 */
async function resolveBillingRoleAssignmentByBillingProfile() {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2018-09-30";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result =
    await client.billingRoleAssignments.beginResolveByBillingProfileAndWait(
      billingAccountName,
      billingProfileName,
    );
  console.log(result);
}

async function main() {
  resolveBillingRoleAssignmentByBillingProfile();
}

main().catch(console.error);
