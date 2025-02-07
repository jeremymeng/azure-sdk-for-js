/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureChangeAnalysisManagementClient } from "@azure/arm-changeanalysis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List the changes of a resource group within the specified time range. Customer data will always be masked.
 *
 * @summary List the changes of a resource group within the specified time range. Customer data will always be masked.
 * x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/ChangesListChangesByResourceGroup.json
 */
async function changesListChangesByResourceGroup() {
  const subscriptionId = "4d962866-1e3f-47f2-bd18-450c08f914c1";
  const resourceGroupName = "MyResourceGroup";
  const startTime = new Date("2021-04-25T12:09:03.141Z");
  const endTime = new Date("2021-04-26T12:09:03.141Z");
  const credential = new DefaultAzureCredential();
  const client = new AzureChangeAnalysisManagementClient(
    credential,
    subscriptionId
  );
  const resArray = new Array();
  for await (let item of client.changes.listChangesByResourceGroup(
    resourceGroupName,
    startTime,
    endTime
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

changesListChangesByResourceGroup().catch(console.error);
