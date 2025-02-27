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
  DeploymentStack,
  DeploymentStacksClient,
} from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Deployment stack at Resource Group scope.
 *
 * @summary Creates or updates a Deployment stack at Resource Group scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupCreate.json
 */
async function deploymentStacksResourceGroupCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCESDEPLOYMENTSTACKS_RESOURCE_GROUP"] ||
    "deploymentStacksRG";
  const deploymentStackName = "simpleDeploymentStack";
  const deploymentStack: DeploymentStack = {
    location: "eastus",
    properties: {
      actionOnUnmanage: {
        managementGroups: "detach",
        resourceGroups: "delete",
        resources: "delete",
      },
      denySettings: {
        applyToChildScopes: false,
        excludedActions: ["action"],
        excludedPrincipals: ["principal"],
        mode: "denyDelete",
      },
      parameters: { parameter1: { value: "a string" } },
    },
    tags: { tagkey: "tagVal" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result =
    await client.deploymentStacks.beginCreateOrUpdateAtResourceGroupAndWait(
      resourceGroupName,
      deploymentStackName,
      deploymentStack,
    );
  console.log(result);
}

async function main(): Promise<void> {
  deploymentStacksResourceGroupCreateOrUpdate();
}

main().catch(console.error);
