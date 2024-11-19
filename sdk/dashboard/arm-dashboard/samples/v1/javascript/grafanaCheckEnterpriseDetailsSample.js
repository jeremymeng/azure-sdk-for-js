/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Retrieve enterprise add-on details information
 *
 * @summary Retrieve enterprise add-on details information
 * x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/EnterpriseDetails_Post.json
 */
async function enterpriseDetailsPost() {
  const subscriptionId =
    process.env["DASHBOARD_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DASHBOARD_RESOURCE_GROUP"] || "myResourceGroup";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.checkEnterpriseDetails(resourceGroupName, workspaceName);
  console.log(result);
}

async function main() {
  enterpriseDetailsPost();
}

main().catch(console.error);
