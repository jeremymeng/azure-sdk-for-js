/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { SignalRManagementClient } = require("@azure/arm-signalr");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create or update a custom certificate.
 *
 * @summary Create or update a custom certificate.
 * x-ms-original-file: specification/signalr/resource-manager/Microsoft.SignalRService/stable/2023-02-01/examples/SignalRCustomCertificates_CreateOrUpdate.json
 */
async function signalRCustomCertificatesCreateOrUpdate() {
  const subscriptionId =
    process.env["SIGNALR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SIGNALR_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "mySignalRService";
  const certificateName = "myCert";
  const parameters = {
    keyVaultBaseUri: "https://myvault.keyvault.azure.net/",
    keyVaultSecretName: "mycert",
    keyVaultSecretVersion: "bb6a44b2743f47f68dad0d6cc9756432",
  };
  const credential = new DefaultAzureCredential();
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomCertificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    certificateName,
    parameters
  );
  console.log(result);
}

async function main() {
  signalRCustomCertificatesCreateOrUpdate();
}

main().catch(console.error);
