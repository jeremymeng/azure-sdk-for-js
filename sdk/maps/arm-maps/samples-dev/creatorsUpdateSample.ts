/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CreatorUpdateParameters } from "@azure/arm-maps";
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 *
 * @summary Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 * x-ms-original-file: specification/maps/resource-manager/Microsoft.Maps/stable/2023-06-01/examples/UpdateMapsCreator.json
 */
async function updateCreatorResource(): Promise<void> {
  const subscriptionId =
    process.env["MAPS_SUBSCRIPTION_ID"] || "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const resourceGroupName = process.env["MAPS_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myMapsAccount";
  const creatorName = "myCreator";
  const creatorUpdateParameters: CreatorUpdateParameters = {
    storageUnits: 10,
    tags: { specialTag: "true" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.update(
    resourceGroupName,
    accountName,
    creatorName,
    creatorUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateCreatorResource();
}

main().catch(console.error);
