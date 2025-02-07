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
 * This sample demonstrates how to Retrieve all SQL migration services in the subscriptions.
 *
 * @summary Retrieve all SQL migration services in the subscriptions.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/ListBySubscriptionMigrationService.json
 */
async function getServicesInTheSubscriptions(): Promise<void> {
  const subscriptionId =
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/managedInstance1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.sqlMigrationServices.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

getServicesInTheSubscriptions().catch(console.error);
