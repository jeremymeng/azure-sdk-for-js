/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ModelVersion } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update version.
 *
 * @summary Create or update version.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/ModelVersion/createOrUpdate.json
 */
async function createOrUpdateRegistryModelVersion() {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "my-aml-registry";
  const modelName = "string";
  const version = "string";
  const body: ModelVersion = {
    properties: {
      description: "string",
      flavors: { string: { data: { string: "string" } } },
      isAnonymous: false,
      modelType: "CustomModel",
      modelUri: "string",
      properties: { string: "string" },
      tags: { string: "string" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryModelVersions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    registryName,
    modelName,
    version,
    body,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateRegistryModelVersion();
}

main().catch(console.error);
