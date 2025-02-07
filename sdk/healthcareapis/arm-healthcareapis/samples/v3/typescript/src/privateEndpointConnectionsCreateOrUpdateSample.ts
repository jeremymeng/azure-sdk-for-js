/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  PrivateEndpointConnection,
  HealthcareApisManagementClient,
} from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of the specified private endpoint connection associated with the service.
 *
 * @summary Update the state of the specified private endpoint connection associated with the service.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/legacy/ServiceCreatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "rgname";
  const resourceName = "service1";
  const privateEndpointConnectionName = "myConnection";
  const properties: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Auto-Approved",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result =
    await client.privateEndpointConnections.beginCreateOrUpdateAndWait(
      resourceGroupName,
      resourceName,
      privateEndpointConnectionName,
      properties,
    );
  console.log(result);
}

async function main(): Promise<void> {
  privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
