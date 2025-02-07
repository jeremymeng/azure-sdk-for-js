/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes a server trust group.
 *
 * @summary Deletes a server trust group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerTrustGroupDelete.json
 */
async function dropServerTrustGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const locationName = "Japan East";
  const serverTrustGroupName = "server-trust-group-test";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.beginDeleteAndWait(
    resourceGroupName,
    locationName,
    serverTrustGroupName,
  );
  console.log(result);
}

async function main() {
  await dropServerTrustGroup();
}

main().catch(console.error);
