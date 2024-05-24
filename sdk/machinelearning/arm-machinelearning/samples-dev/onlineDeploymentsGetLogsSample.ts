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
  DeploymentLogsRequest,
  AzureMachineLearningWorkspaces,
} from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Polls an Endpoint operation.
 *
 * @summary Polls an Endpoint operation.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2022-10-01/examples/OnlineDeployment/getLogs.json
 */
async function getOnlineDeploymentLogs() {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["MACHINELEARNING_RESOURCE_GROUP"] || "testrg123";
  const workspaceName = "workspace123";
  const endpointName = "testEndpoint";
  const deploymentName = "testDeployment";
  const body: DeploymentLogsRequest = {
    containerType: "StorageInitializer",
    tail: 0,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningWorkspaces(credential, subscriptionId);
  const result = await client.onlineDeployments.getLogs(
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
    body,
  );
  console.log(result);
}

async function main() {
  getOnlineDeploymentLogs();
}

main().catch(console.error);
