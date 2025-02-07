/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  ContainerHostMapping,
  DevSpacesManagementClient
} from "@azure/arm-devspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns container host mapping object for a container host resource ID if an associated controller exists.
 *
 * @summary Returns container host mapping object for a container host resource ID if an associated controller exists.
 * x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ContainerHostMappingsGetContainerHostMapping_example.json
 */
async function containerHostMappingsGetContainerHostMapping(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const location = "eastus";
  const containerHostMapping: ContainerHostMapping = {
    containerHostResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myCluster"
  };
  const credential = new DefaultAzureCredential();
  const client = new DevSpacesManagementClient(credential, subscriptionId);
  const result = await client.containerHostMappings.getContainerHostMapping(
    resourceGroupName,
    location,
    containerHostMapping
  );
  console.log(result);
}

containerHostMappingsGetContainerHostMapping().catch(console.error);
