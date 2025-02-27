/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { OnlineDeploymentsListSkusOptionalParams } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List Inference Endpoint Deployment Skus.
 *
 * @summary List Inference Endpoint Deployment Skus.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/OnlineDeployment/KubernetesOnlineDeployment/listSkus.json
 */
async function listKubernetesOnlineDeploymentSkus(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const endpointName = "testEndpointName";
  const deploymentName = "testDeploymentName";
  const count = 1;
  const options: OnlineDeploymentsListSkusOptionalParams = { count };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineDeployments.listSkus(
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List Inference Endpoint Deployment Skus.
 *
 * @summary List Inference Endpoint Deployment Skus.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/OnlineDeployment/ManagedOnlineDeployment/listSkus.json
 */
async function listManagedOnlineDeploymentSkus(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const endpointName = "testEndpointName";
  const deploymentName = "testDeploymentName";
  const count = 1;
  const options: OnlineDeploymentsListSkusOptionalParams = { count };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineDeployments.listSkus(
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listKubernetesOnlineDeploymentSkus();
  await listManagedOnlineDeploymentSkus();
}

main().catch(console.error);
