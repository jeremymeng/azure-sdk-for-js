/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RegenerateKeyParameters } from "@azure/arm-appconfiguration";
import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Regenerates an access key for the specified configuration store.
 *
 * @summary Regenerates an access key for the specified configuration store.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-05-01/examples/ConfigurationStoresRegenerateKey.json
 */
async function configurationStoresRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] || "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName = process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const regenerateKeyParameters: RegenerateKeyParameters = {
    id: "439AD01B4BE67DB1",
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.regenerateKey(
    resourceGroupName,
    configStoreName,
    regenerateKeyParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresRegenerateKey();
}

main().catch(console.error);
