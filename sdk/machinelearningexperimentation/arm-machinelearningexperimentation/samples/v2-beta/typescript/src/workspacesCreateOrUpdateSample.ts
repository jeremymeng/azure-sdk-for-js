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
  Workspace,
  MLTeamAccountManagementClient
} from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a machine learning workspace with the specified parameters.
 *
 * @summary Creates or updates a machine learning workspace with the specified parameters.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceCreate.json
 */
async function workspaceCreate(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] ||
    "myResourceGroup";
  const accountName = "testaccount";
  const workspaceName = "testworkspace";
  const parameters: Workspace = {
    friendlyName: "testName",
    location: "East US",
    tags: { tagKey1: "TagValue1" }
  };
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    resourceGroupName,
    accountName,
    workspaceName,
    parameters
  );
  console.log(result);
}

async function main(): Promise<void> {
  workspaceCreate();
}

main().catch(console.error);
