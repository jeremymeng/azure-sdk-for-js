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
 * This sample demonstrates how to Lists the billing permissions the caller has for a customer.
 *
 * @summary Lists the billing permissions the caller has for a customer.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPermissionsListByCustomer.json
 */
async function billingPermissionsListByCustomer() {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "BKM6-54VH-BG7-PGB";
  const customerName = "11111111-1111-1111-1111-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.billingPermissions.listByCustomer(
    billingAccountName,
    billingProfileName,
    customerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  billingPermissionsListByCustomer();
}

main().catch(console.error);
