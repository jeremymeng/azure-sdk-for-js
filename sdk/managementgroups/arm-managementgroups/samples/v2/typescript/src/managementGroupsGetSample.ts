/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ManagementGroupsGetOptionalParams,
  ManagementGroupsAPI
} from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get the details of the management group.

 *
 * @summary Get the details of the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroup.json
 */
async function getManagementGroup(): Promise<void> {
  const groupId = "20000000-0001-0000-0000-000000000000";
  const cacheControl = "no-cache";
  const options: ManagementGroupsGetOptionalParams = { cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get(groupId, options);
  console.log(result);
}

getManagementGroup().catch(console.error);

/**
 * This sample demonstrates how to Get the details of the management group.

 *
 * @summary Get the details of the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroupWithAncestors.json
 */
async function getManagementGroupWithAncestors(): Promise<void> {
  const groupId = "20000000-0001-0000-0000-00000000000";
  const expand = "ancestors";
  const cacheControl = "no-cache";
  const options: ManagementGroupsGetOptionalParams = { expand, cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get(groupId, options);
  console.log(result);
}

getManagementGroupWithAncestors().catch(console.error);

/**
 * This sample demonstrates how to Get the details of the management group.

 *
 * @summary Get the details of the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroupWithExpand.json
 */
async function getManagementGroupWithExpand(): Promise<void> {
  const groupId = "20000000-0001-0000-0000-000000000000";
  const expand = "children";
  const cacheControl = "no-cache";
  const options: ManagementGroupsGetOptionalParams = { expand, cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get(groupId, options);
  console.log(result);
}

getManagementGroupWithExpand().catch(console.error);

/**
 * This sample demonstrates how to Get the details of the management group.

 *
 * @summary Get the details of the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroupWithPath.json
 */
async function getManagementGroupWithPath(): Promise<void> {
  const groupId = "20000000-0001-0000-0000-000000000000";
  const expand = "path";
  const cacheControl = "no-cache";
  const options: ManagementGroupsGetOptionalParams = { expand, cacheControl };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get(groupId, options);
  console.log(result);
}

getManagementGroupWithPath().catch(console.error);

/**
 * This sample demonstrates how to Get the details of the management group.

 *
 * @summary Get the details of the management group.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroupWithExpandAndRecurse.json
 */
async function getManagementGroupsWithExpandAndRecurse(): Promise<void> {
  const groupId = "20000000-0001-0000-0000-000000000000";
  const expand = "children";
  const recurse = true;
  const cacheControl = "no-cache";
  const options: ManagementGroupsGetOptionalParams = {
    expand,
    recurse,
    cacheControl
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get(groupId, options);
  console.log(result);
}

getManagementGroupsWithExpandAndRecurse().catch(console.error);
