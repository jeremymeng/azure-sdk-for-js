/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the attestation provider.
 *
 * @summary Gets the specified private endpoint connection associated with the attestation provider.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderGetPrivateEndpointConnection.json
 */
async function attestationProviderGetPrivateEndpointConnection(): Promise<void> {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res6977";
  const providerName = "sto2527";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    providerName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

attestationProviderGetPrivateEndpointConnection().catch(console.error);
