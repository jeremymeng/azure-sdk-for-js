/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { OperationsManagementClient } from "@azure/arm-operations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Retrieves the user ManagementAssociation.
 *
 * @summary Retrieves the user ManagementAssociation.
 * x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationGet.json
 */
async function solutionGet() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const providerName = "providerName";
  const resourceType = "resourceType";
  const resourceName = "resourceName";
  const managementAssociationName = "managementAssociation1";
  const credential = new DefaultAzureCredential();
  const client = new OperationsManagementClient(credential, subscriptionId);
  const result = await client.managementAssociations.get(
    resourceGroupName,
    providerName,
    resourceType,
    resourceName,
    managementAssociationName,
  );
  console.log(result);
}

solutionGet().catch(console.error);
