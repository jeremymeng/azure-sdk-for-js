/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Description for Creates or updates a Kubernetes Environment.
 *
 * @summary Description for Creates or updates a Kubernetes Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-12-01/examples/KubeEnvironments_CreateOrUpdate.json
 */
async function createKubeEnvironments() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "examplerg";
  const name = "testkubeenv";
  const kubeEnvironmentEnvelope = {
    location: "East US",
    staticIp: "1.2.3.4",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.kubeEnvironments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    name,
    kubeEnvironmentEnvelope,
  );
  console.log(result);
}

async function main() {
  createKubeEnvironments();
}

main().catch(console.error);
