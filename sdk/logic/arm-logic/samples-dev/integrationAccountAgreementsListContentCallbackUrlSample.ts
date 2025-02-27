/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { GetCallbackUrlParameters } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the content callback url.
 *
 * @summary Get the content callback url.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountAgreements_ListContentCallbackUrl.json
 */
async function getTheContentCallbackUrl(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const agreementName = "testAgreement";
  const listContentCallbackUrl: GetCallbackUrlParameters = {
    keyType: "Primary",
    notAfter: new Date("2018-04-19T16:00:00Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountAgreements.listContentCallbackUrl(
    resourceGroupName,
    integrationAccountName,
    agreementName,
    listContentCallbackUrl,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheContentCallbackUrl();
}

main().catch(console.error);
