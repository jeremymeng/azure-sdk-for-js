/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Certificate } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a certificate.
 *
 * @summary Create or update a certificate.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/CreateOrUpdateCertificate.json
 */
async function createOrUpdateCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testc6282";
  const certificateEnvelope: Certificate = {
    name: "testc6282",
    type: "Microsoft.Web/certificates",
    expirationDate: new Date("2039-12-31T23:59:59+00:00"),
    friendlyName: "",
    hostNames: ["ServerCert"],
    id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Web/certificates/testc6282",
    issueDate: new Date("2015-11-12T23:40:25+00:00"),
    issuer: "CACert",
    location: "East US",
    password: "<password>",
    subjectName: "ServerCert",
    thumbprint: "FE703D7411A44163B6D32B3AD9B03E175886EBFE",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate(
    resourceGroupName,
    name,
    certificateEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
