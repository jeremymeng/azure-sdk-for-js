/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists the billing permissions the caller has for a department.
 *
 * @summary Lists the billing permissions the caller has for a department.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPermissionsListByDepartment.json
 */
async function billingPermissionsListByDepartment() {
  const billingAccountName = "6100092";
  const departmentName = "123456";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.billingPermissions.listByDepartment(
    billingAccountName,
    departmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  billingPermissionsListByDepartment();
}

main().catch(console.error);
