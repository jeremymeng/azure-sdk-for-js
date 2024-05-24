/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or update a security Application on the given security connector.
 *
 * @summary Creates or update a security Application on the given security connector.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-07-01-preview/examples/Applications/PutSecurityConnectorApplication_example.json
 */
async function createApplication() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "gcpResourceGroup";
  const securityConnectorName = "gcpconnector";
  const applicationId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const application = {
    description: "An application on critical GCP recommendations",
    conditionSets: [
      {
        conditions: [{ operator: "contains", property: "$.Id", value: "-prod-" }],
      },
    ],
    displayName: "GCP Admin's application",
    sourceResourceType: "Assessments",
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityConnectorApplication.createOrUpdate(
    resourceGroupName,
    securityConnectorName,
    applicationId,
    application,
  );
  console.log(result);
}

async function main() {
  createApplication();
}

main().catch(console.error);
