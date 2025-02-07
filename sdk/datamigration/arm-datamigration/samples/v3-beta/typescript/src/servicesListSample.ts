/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to The services resource is the top-level resource that represents the Database Migration Service. This method returns a list of service resources in a subscription.
 *
 * @summary The services resource is the top-level resource that represents the Database Migration Service. This method returns a list of service resources in a subscription.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/Services_List.json
 */
async function servicesList(): Promise<void> {
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.services.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

servicesList().catch(console.error);
