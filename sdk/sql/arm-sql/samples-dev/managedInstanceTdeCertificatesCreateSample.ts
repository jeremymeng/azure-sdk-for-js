/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { TdeCertificate } from "@azure/arm-sql";
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a TDE certificate for a given server.
 *
 * @summary Creates a TDE certificate for a given server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstanceTdeCertificate.json
 */
async function uploadATdeCertificate() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000001";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testtdecert";
  const managedInstanceName = "testtdecert";
  const parameters: TdeCertificate = { privateBlob: "MIIXXXXXXXX" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceTdeCertificates.beginCreateAndWait(
    resourceGroupName,
    managedInstanceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await uploadATdeCertificate();
}

main().catch(console.error);
