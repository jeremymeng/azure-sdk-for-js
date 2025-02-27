/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MachineLearningWorkspacesManagementClient } from "@azure/arm-workspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List the authorization keys associated with this workspace.
 *
 * @summary List the authorization keys associated with this workspace.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaceKeys.json
 */
async function listWorkspaceKeys(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const workspaceName = "testworkspace";
  const resourceGroupName = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningWorkspacesManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.workspaces.listWorkspaceKeys(
    workspaceName,
    resourceGroupName
  );
  console.log(result);
}

listWorkspaceKeys().catch(console.error);
