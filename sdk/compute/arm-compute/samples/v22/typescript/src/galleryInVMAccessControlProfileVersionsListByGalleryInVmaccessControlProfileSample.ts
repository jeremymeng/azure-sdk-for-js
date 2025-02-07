/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile
 *
 * @summary List gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_ListByGalleryInVMAccessControlProfile.json
 */
async function listGalleryInVMAccessControlProfileVersionsInAGalleryInVmaccessControlProfile(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const inVMAccessControlProfileName = "myInVMAccessControlProfileName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.galleryInVMAccessControlProfileVersions.listByGalleryInVMAccessControlProfile(
    resourceGroupName,
    galleryName,
    inVMAccessControlProfileName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  listGalleryInVMAccessControlProfileVersionsInAGalleryInVmaccessControlProfile();
}

main().catch(console.error);
