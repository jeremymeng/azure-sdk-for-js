/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a list of all relevant applications over a subscription level scope
 *
 * @summary Get a list of all relevant applications over a subscription level scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-07-01-preview/examples/Applications/ListBySubscriptionApplications_example.json
 */
async function listApplicationsSecurityBySubscriptionLevelScope() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listApplicationsSecurityBySubscriptionLevelScope();
}

main().catch(console.error);
