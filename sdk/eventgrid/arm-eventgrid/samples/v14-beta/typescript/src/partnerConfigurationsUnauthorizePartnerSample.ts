/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Partner, EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Unauthorize a single partner either by partner registration immutable Id or by partner name.
 *
 * @summary Unauthorize a single partner either by partner registration immutable Id or by partner name.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2024-06-01-preview/examples/PartnerConfigurations_UnauthorizePartner.json
 */
async function partnerConfigurationsUnauthorizePartner(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerInfo: Partner = {
    authorizationExpirationTimeInUtc: new Date("2022-01-28T01:20:55.142Z"),
    partnerName: "Contoso.Finance",
    partnerRegistrationImmutableId: "941892bc-f5d0-4d1c-8fb5-477570fc2b71",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerConfigurations.unauthorizePartner(
    resourceGroupName,
    partnerInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  partnerConfigurationsUnauthorizePartner();
}

main().catch(console.error);
