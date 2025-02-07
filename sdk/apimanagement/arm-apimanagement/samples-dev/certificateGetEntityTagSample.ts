/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of the certificate specified by its identifier.
 *
 * @summary Gets the entity state (Etag) version of the certificate specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementHeadCertificate.json
 */
async function apiManagementHeadCertificate(): Promise<void> {
  const subscriptionId = process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const certificateId = "templateCert1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.certificate.getEntityTag(
    resourceGroupName,
    serviceName,
    certificateId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadCertificate();
}

main().catch(console.error);
