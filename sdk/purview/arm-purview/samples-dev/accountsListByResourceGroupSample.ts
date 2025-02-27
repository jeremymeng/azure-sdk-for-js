/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List accounts in ResourceGroup
 *
 * @summary List accounts in ResourceGroup
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListByResourceGroup.json
 */
async function accountsListByResourceGroup(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "SampleResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

accountsListByResourceGroup().catch(console.error);
