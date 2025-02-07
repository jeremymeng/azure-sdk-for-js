/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  CertificateResource,
  AppPlatformManagementClient
} from "@azure/arm-appplatform";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update certificate resource.
 *
 * @summary Create or update certificate resource.
 * x-ms-original-file: specification/appplatform/resource-manager/Microsoft.AppPlatform/stable/2023-12-01/examples/Certificates_CreateOrUpdate.json
 */
async function certificatesCreateOrUpdate() {
  const subscriptionId =
    process.env["APPPLATFORM_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APPPLATFORM_RESOURCE_GROUP"] || "myResourceGroup";
  const serviceName = "myservice";
  const certificateName = "mycertificate";
  const certificateResource: CertificateResource = {
    properties: {
      type: "KeyVaultCertificate",
      autoSync: "Enabled",
      certVersion: "08a219d06d874795a96db47e06fbb01e",
      keyVaultCertName: "mycert",
      vaultUri: "https://myvault.vault.azure.net"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new AppPlatformManagementClient(credential, subscriptionId);
  const result = await client.certificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    certificateName,
    certificateResource
  );
  console.log(result);
}

async function main() {
  certificatesCreateOrUpdate();
}

main().catch(console.error);
