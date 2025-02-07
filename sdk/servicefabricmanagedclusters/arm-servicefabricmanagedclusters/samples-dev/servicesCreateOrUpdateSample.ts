/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ServiceResource } from "@azure/arm-servicefabricmanagedclusters";
import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update a Service Fabric managed service resource with the specified name.
 *
 * @summary Create or update a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/preview/2024-09-01-preview/examples/ServicePutOperation_example_max.json
 */
async function putAServiceWithMaximumParameters() {
  const subscriptionId =
    process.env["SERVICEFABRICMANAGEDCLUSTERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICEFABRICMANAGEDCLUSTERS_RESOURCE_GROUP"] || "resRg";
  const clusterName = "myCluster";
  const applicationName = "myApp";
  const serviceName = "myService";
  const parameters: ServiceResource = {
    location: "eastus",
    properties: {
      correlationScheme: [
        {
          scheme: "AlignedAffinity",
          serviceName:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resRg/providers/Microsoft.ServiceFabric/managedclusters/myCluster/applications/myApp/services/myService1",
        },
      ],
      defaultMoveCost: "Medium",
      instanceCount: 5,
      minInstanceCount: 3,
      minInstancePercentage: 30,
      partitionDescription: { partitionScheme: "Singleton" },
      placementConstraints: "NodeType==frontend",
      scalingPolicies: [
        {
          scalingMechanism: {
            kind: "ScalePartitionInstanceCount",
            maxInstanceCount: 9,
            minInstanceCount: 3,
            scaleIncrement: 2,
          },
          scalingTrigger: {
            kind: "AveragePartitionLoadTrigger",
            lowerLoadThreshold: 2,
            metricName: "metricName",
            scaleInterval: "00:01:00",
            upperLoadThreshold: 8,
          },
        },
      ],
      serviceDnsName: "myservicednsname.myApp",
      serviceKind: "Stateless",
      serviceLoadMetrics: [{ name: "metric1", defaultLoad: 3, weight: "Low" }],
      servicePackageActivationMode: "SharedProcess",
      servicePlacementPolicies: [{ type: "NonPartiallyPlaceService" }],
      serviceTypeName: "myServiceType",
    },
    tags: { a: "b" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    applicationName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a Service Fabric managed service resource with the specified name.
 *
 * @summary Create or update a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/preview/2024-09-01-preview/examples/ServicePutOperation_example_min.json
 */
async function putAServiceWithMinimumParameters() {
  const subscriptionId =
    process.env["SERVICEFABRICMANAGEDCLUSTERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICEFABRICMANAGEDCLUSTERS_RESOURCE_GROUP"] || "resRg";
  const clusterName = "myCluster";
  const applicationName = "myApp";
  const serviceName = "myService";
  const parameters: ServiceResource = {
    location: "eastus",
    properties: {
      instanceCount: 1,
      partitionDescription: { partitionScheme: "Singleton" },
      serviceKind: "Stateless",
      serviceTypeName: "myServiceType",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    applicationName,
    serviceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await putAServiceWithMaximumParameters();
  await putAServiceWithMinimumParameters();
}

main().catch(console.error);
