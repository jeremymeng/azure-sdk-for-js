/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update a gallery Application Version.
 *
 * @summary Update a gallery Application Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/GalleryApplicationVersion_Update.json
 */
async function updateASimpleGalleryApplicationVersion() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const galleryApplicationVersionName = "1.0.0";
  const galleryApplicationVersion = {
    publishingProfile: {
      endOfLifeDate: new Date("2019-07-01T07:00:00Z"),
      manageActions: {
        install:
          'powershell -command "Expand-Archive -Path package.zip -DestinationPath C:\\package"',
        remove: "del C:\\package ",
      },
      replicaCount: 1,
      source: {
        mediaLink:
          "https://mystorageaccount.blob.core.windows.net/mycontainer/package.zip?{sasKey}",
      },
      storageAccountType: "Standard_LRS",
      targetRegions: [
        {
          name: "West US",
          excludeFromLatest: false,
          regionalReplicaCount: 1,
          storageAccountType: "Standard_LRS",
        },
      ],
    },
    safetyProfile: { allowDeletionOfReplicatedLocations: false },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryApplicationVersions.beginUpdateAndWait(
    resourceGroupName,
    galleryName,
    galleryApplicationName,
    galleryApplicationVersionName,
    galleryApplicationVersion,
  );
  console.log(result);
}

async function main() {
  updateASimpleGalleryApplicationVersion();
}

main().catch(console.error);
