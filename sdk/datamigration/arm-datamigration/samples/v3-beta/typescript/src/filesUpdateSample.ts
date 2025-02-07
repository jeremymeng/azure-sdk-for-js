/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  ProjectFile,
  DataMigrationManagementClient
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to This method updates an existing file.
 *
 * @summary This method updates an existing file.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/Files_Update.json
 */
async function filesUpdate(): Promise<void> {
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const fileName = "x114d023d8";
  const parameters: ProjectFile = {
    properties: { filePath: "DmsSdkFilePath/DmsSdkFile.sql" }
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.update(
    groupName,
    serviceName,
    projectName,
    fileName,
    parameters
  );
  console.log(result);
}

filesUpdate().catch(console.error);
