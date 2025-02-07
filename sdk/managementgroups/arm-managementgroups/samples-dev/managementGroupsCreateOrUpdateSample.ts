/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type {
  CreateManagementGroupRequest,
  ManagementGroupsCreateOrUpdateOptionalParams,
} from "@azure/arm-managementgroups";
import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or update a management group.
If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.

 *
 * @summary Create or update a management group.
If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutManagementGroup.json
 */
async function putManagementGroup() {
  const groupId = "ChildGroup";
  const cacheControl = "no-cache";
  const createManagementGroupRequest: CreateManagementGroupRequest = {
    displayName: "ChildGroup",
    details: {
      parent: {
        id: "/providers/Microsoft.Management/managementGroups/RootGroup",
      },
    },
  };
  const options: ManagementGroupsCreateOrUpdateOptionalParams = {
    cacheControl,
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.beginCreateOrUpdateAndWait(
    groupId,
    createManagementGroupRequest,
    options,
  );
  console.log(result);
}

putManagementGroup().catch(console.error);
