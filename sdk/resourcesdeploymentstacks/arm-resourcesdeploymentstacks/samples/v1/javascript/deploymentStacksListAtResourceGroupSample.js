/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists all the Deployment stacks within the specified Resource Group.
 *
 * @summary Lists all the Deployment stacks within the specified Resource Group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupList.json
 */
async function deploymentStacksResourceGroupList() {
  const subscriptionId =
    process.env["RESOURCESDEPLOYMENTSTACKS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCESDEPLOYMENTSTACKS_RESOURCE_GROUP"] || "deploymentStacksRG";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.deploymentStacks.listAtResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  deploymentStacksResourceGroupList();
}

main().catch(console.error);
