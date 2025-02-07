/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PatchedWebService } from "@azure/arm-webservices";
import { AzureMLWebServicesManagementClient } from "@azure/arm-webservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Modifies an existing web service resource. The PATCH API call is an asynchronous operation. To determine whether it has completed successfully, you must perform a Get operation.
 *
 * @summary Modifies an existing web service resource. The PATCH API call is an asynchronous operation. To determine whether it has completed successfully, you must perform a Get operation.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/patchWebService.json
 */
async function patchWebService() {
  const subscriptionId = "subscription-id";
  const resourceGroupName = "OneResourceGroupName";
  const webServiceName = "TargetWebServiceName";
  const patchPayload: PatchedWebService = {
    location: "West US",
    properties: {
      description: "New Web Service Description",
      packageType: "Graph",
      title: "New Web Service Title",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMLWebServicesManagementClient(credential, subscriptionId);
  const result = await client.webServices.beginPatchAndWait(
    resourceGroupName,
    webServiceName,
    patchPayload,
  );
  console.log(result);
}

patchWebService().catch(console.error);
