/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 *
 * @summary Description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2023-12-01/examples/Diagnostics_ListAppServiceCertificateOrderDetectorResponse.json
 */
async function listAppServiceCertificateDetectorResponse() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const certificateOrderName = "SampleCertificateOrderName";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.certificateOrdersDiagnostics.listAppServiceCertificateOrderDetectorResponse(
    resourceGroupName,
    certificateOrderName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listAppServiceCertificateDetectorResponse();
}

main().catch(console.error);
