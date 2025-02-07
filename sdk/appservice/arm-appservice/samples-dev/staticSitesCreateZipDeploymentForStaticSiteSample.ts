/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { StaticSiteZipDeploymentARMResource } from "@azure/arm-appservice";
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Deploys zipped content to a static site.
 *
 * @summary Description for Deploys zipped content to a static site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-12-01/examples/StaticSiteZipDeploy.json
 */
async function deployASiteFromAZippedPackage(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource = {
    apiZipUrl:
      "https://teststorageaccount.net/happy-sea-15afae3e-master-81828877/api-zipdeploy.zip",
    appZipUrl:
      "https://teststorageaccount.net/happy-sea-15afae3e-master-81828877/app-zipdeploy.zip",
    deploymentTitle: "Update index.html",
    functionLanguage: "testFunctionLanguage",
    provider: "testProvider",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.beginCreateZipDeploymentForStaticSiteAndWait(
    resourceGroupName,
    name,
    staticSiteZipDeploymentEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deployASiteFromAZippedPackage();
}

main().catch(console.error);
