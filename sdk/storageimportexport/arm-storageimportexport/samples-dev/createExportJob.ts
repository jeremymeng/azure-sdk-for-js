/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Creates a new job or updates an existing job in the specified subscription.
 *
 * @summary Creates a new job or updates an existing job in the specified subscription.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/CreateExportJob.json
 */
import type { PutJobParameters } from "@azure/arm-storageimportexport";
import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";

async function createExportJob(): Promise<void> {
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const jobName = "myExportJob";
  const resourceGroupName = "myResourceGroup";
  const body: PutJobParameters = {
    location: "West US",
    properties: {
      backupDriveManifest: true,
      diagnosticsPath: "waimportexport",
      export: { blobPathPrefix: ["/"] },
      jobType: "Export",
      logLevel: "Verbose",
      returnAddress: {
        city: "Redmond",
        countryOrRegion: "USA",
        email: "Test@contoso.com",
        phone: "4250000000",
        postalCode: "98007",
        recipientName: "Test",
        stateOrProvince: "wa",
        streetAddress1: "Street1",
        streetAddress2: "street2",
      },
      returnShipping: { carrierAccountNumber: "989ffff", carrierName: "FedEx" },
      storageAccountId:
        "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/myResourceGroup/providers/Microsoft.ClassicStorage/storageAccounts/test",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const result = await client.jobs.create(jobName, resourceGroupName, body);
  console.log(result);
}

createExportJob().catch(console.error);
