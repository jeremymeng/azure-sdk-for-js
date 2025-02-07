/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SqlVirtualMachineManagementClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets all SQL virtual machine groups in a subscription.
 *
 * @summary Gets all SQL virtual machine groups in a subscription.
 * x-ms-original-file: specification/sqlvirtualmachine/resource-manager/Microsoft.SqlVirtualMachine/preview/2022-08-01-preview/examples/ListSubscriptionSqlVirtualMachineGroup.json
 */
async function getsAllSqlVirtualMachineGroupsInASubscription() {
  const subscriptionId =
    process.env["SQLVIRTUALMACHINE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new SqlVirtualMachineManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachineGroups.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getsAllSqlVirtualMachineGroupsInASubscription();
}

main().catch(console.error);
