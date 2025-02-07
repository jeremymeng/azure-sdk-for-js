/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { Update, AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Put specified Update
 *
 * @summary Put specified Update
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/PutUpdates.json
 */
async function putASpecificUpdate() {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] ||
    "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const resourceGroupName =
    process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "testrg";
  const clusterName = "testcluster";
  const updateName = "Microsoft4.2203.2.32";
  const updateProperties: Update = {
    description: "AzS Update 4.2203.2.32",
    additionalProperties: "additional properties",
    availabilityType: "Local",
    displayName: "AzS Update - 4.2203.2.32",
    installedDate: new Date("2022-04-06T14:08:18.254Z"),
    notifyMessage:
      "Brief message with instructions for updates of AvailabilityType Notify",
    packagePath:
      "\\\\SU1FileServer\\SU1_Infrastructure_2\\Updates\\Packages\\Microsoft4.2203.2.32",
    packageSizeInMb: 18858,
    packageType: "Infrastructure",
    prerequisites: [
      {
        packageName: "update package name",
        updateType: "update type",
        version: "prerequisite version",
      },
    ],
    progressPercentage: 0,
    publisher: "Microsoft",
    releaseLink:
      "https://docs.microsoft.com/azure-stack/operator/release-notes?view=azs-2203",
    state: "Installed",
    version: "4.2203.2.32",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updates.put(
    resourceGroupName,
    clusterName,
    updateName,
    updateProperties,
  );
  console.log(result);
}

async function main() {
  putASpecificUpdate();
}

main().catch(console.error);
