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
  PartnerDestination,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Asynchronously creates a new partner destination with the specified parameters.
 *
 * @summary Asynchronously creates a new partner destination with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2024-06-01-preview/examples/PartnerDestinations_CreateOrUpdate.json
 */
async function partnerDestinationsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerDestinationName = "examplePartnerDestinationName1";
  const partnerDestination: PartnerDestination = {
    endpointBaseUrl: "https://www.example/endpoint",
    endpointServiceContext: "This is an example",
    expirationTimeIfNotActivatedUtc: new Date("2022-03-14T19:33:43.430Z"),
    location: "westus2",
    messageForActivation: "Sample Activation message",
    partnerRegistrationImmutableId: "0bd70ee2-7d95-447e-ab1f-c4f320019404",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerDestinations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    partnerDestinationName,
    partnerDestination,
  );
  console.log(result);
}

async function main(): Promise<void> {
  partnerDestinationsCreateOrUpdate();
}

main().catch(console.error);
