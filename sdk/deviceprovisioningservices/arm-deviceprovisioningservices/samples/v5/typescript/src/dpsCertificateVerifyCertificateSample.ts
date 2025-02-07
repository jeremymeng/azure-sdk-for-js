/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  VerificationCodeRequest,
  IotDpsClient
} from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 *
 * @summary Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/stable/2022-02-05/examples/DPSVerifyCertificate.json
 */
async function dpsVerifyCertificate(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const certificateName = "cert";
  const ifMatch = "AAAAAAAADGk=";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] ||
    "myResourceGroup";
  const provisioningServiceName = "myFirstProvisioningService";
  const request: VerificationCodeRequest = {
    certificate: "#####################################"
  };
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.verifyCertificate(
    certificateName,
    ifMatch,
    resourceGroupName,
    provisioningServiceName,
    request
  );
  console.log(result);
}

async function main(): Promise<void> {
  dpsVerifyCertificate();
}

main().catch(console.error);
