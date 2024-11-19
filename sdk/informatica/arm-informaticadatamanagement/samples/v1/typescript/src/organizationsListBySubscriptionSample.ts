/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List InformaticaOrganizationResource resources by subscription ID
 *
 * @summary List InformaticaOrganizationResource resources by subscription ID
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscription() {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] ||
    "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List InformaticaOrganizationResource resources by subscription ID
 *
 * @summary List InformaticaOrganizationResource resources by subscription ID
 * x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_ListBySubscription_MinimumSet_Gen.json
 */
async function organizationsListBySubscriptionMin() {
  const subscriptionId =
    process.env["INFORMATICA_SUBSCRIPTION_ID"] ||
    "3599DA28-E346-4D9F-811E-189C0445F0FE";
  const credential = new DefaultAzureCredential();
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  organizationsListBySubscription();
  organizationsListBySubscriptionMin();
}

main().catch(console.error);
