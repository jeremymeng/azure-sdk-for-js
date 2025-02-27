/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { DatabaseConnectionPatchRequest } from "@azure/arm-appservice";
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Create or update a database connection for a static site build
 *
 * @summary Description for Create or update a database connection for a static site build
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-04-01/examples/PatchStaticSiteBuildDatabaseConnection.json
 */
async function patchADatabaseConnectionForAStaticSiteBuild(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const environmentName = "default";
  const databaseConnectionName = "default";
  const databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest = {};
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.updateBuildDatabaseConnection(
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchADatabaseConnectionForAStaticSiteBuild();
}

main().catch(console.error);
