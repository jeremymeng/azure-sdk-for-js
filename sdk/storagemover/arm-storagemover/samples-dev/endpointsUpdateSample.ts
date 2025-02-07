/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { EndpointBaseUpdateParameters } from "@azure/arm-storagemover";
import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Endpoints_Update_AzureStorageBlobContainer.json
 */
async function endpointsUpdateAzureStorageBlobContainer() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const resourceGroupName = process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const endpointName = "examples-endpointName";
  const endpoint: EndpointBaseUpdateParameters = {
    properties: {
      description: "Updated Endpoint Description",
      endpointType: "AzureStorageBlobContainer",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpoint,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Endpoints_Update_AzureStorageSmbFileShare.json
 */
async function endpointsUpdateAzureStorageSmbFileShare() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const resourceGroupName = process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const endpointName = "examples-endpointName";
  const endpoint: EndpointBaseUpdateParameters = {
    properties: {
      description: "Updated Endpoint Description",
      endpointType: "AzureStorageSmbFileShare",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpoint,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Endpoints_Update_NfsMount.json
 */
async function endpointsUpdateNfsMount() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const resourceGroupName = process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const endpointName = "examples-endpointName";
  const endpoint: EndpointBaseUpdateParameters = {
    properties: {
      description: "Updated Endpoint Description",
      endpointType: "NfsMount",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpoint,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Endpoints_Update_SmbMount.json
 */
async function endpointsUpdateSmbMount() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] || "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const resourceGroupName = process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const endpointName = "examples-endpointName";
  const endpoint: EndpointBaseUpdateParameters = {
    properties: {
      description: "Updated Endpoint Description",
      credentials: {
        type: "AzureKeyVaultSmb",
        passwordUri:
          "https://examples-azureKeyVault.vault.azure.net/secrets/examples-updated-password",
        usernameUri:
          "https://examples-azureKeyVault.vault.azure.net/secrets/examples-updated-username",
      },
      endpointType: "SmbMount",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    resourceGroupName,
    storageMoverName,
    endpointName,
    endpoint,
  );
  console.log(result);
}

async function main() {
  await endpointsUpdateAzureStorageBlobContainer();
  await endpointsUpdateAzureStorageSmbFileShare();
  await endpointsUpdateNfsMount();
  await endpointsUpdateSmbMount();
}

main().catch(console.error);
