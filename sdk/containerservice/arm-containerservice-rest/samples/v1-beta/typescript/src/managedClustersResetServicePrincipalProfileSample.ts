/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import ContainerServiceManagementClient, {
  getLongRunningPoller,
  ManagedClustersResetServicePrincipalProfileParameters,
} from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to This action cannot be performed on a cluster that is not using a service principal
 *
 * @summary This action cannot be performed on a cluster that is not using a service principal
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/ManagedClustersResetServicePrincipalProfile.json
 */
async function resetServicePrincipalProfile(): Promise<void> {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const parameters: ManagedClustersResetServicePrincipalProfileParameters = {
    body: {
      clientId: "clientid",
      secret: "secret",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile",
      subscriptionId,
      resourceGroupName,
      resourceName,
    )
    .post(parameters);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = poller.pollUntilDone();
  console.log(result);
}

resetServicePrincipalProfile().catch(console.error);
