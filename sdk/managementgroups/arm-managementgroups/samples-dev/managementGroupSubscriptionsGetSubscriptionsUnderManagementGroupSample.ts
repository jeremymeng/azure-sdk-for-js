/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Retrieves details about all subscriptions which are associated with the management group.

 *
 * @summary Retrieves details about all subscriptions which are associated with the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetAllSubscriptionsFromManagementGroup.json
 */
async function getAllSubscriptionsFromManagementGroup() {
  const groupId = "Group";
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroupSubscriptions.listSubscriptionsUnderManagementGroup(
    groupId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

getAllSubscriptionsFromManagementGroup().catch(console.error);
