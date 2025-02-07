/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { Formula, DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing formula. This operation can take a while to complete.
 *
 * @summary Create or replace an existing formula. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Formulas_CreateOrUpdate.json
 */
async function formulasCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{formulaName}";
  const formula: Formula = {
    description: "Formula using a Linux base",
    formulaContent: {
      allowClaim: false,
      artifacts: [
        {
          artifactId:
            "/artifactsources/{artifactSourceName}/artifacts/linux-install-nodejs",
          parameters: []
        }
      ],
      disallowPublicIpAddress: true,
      galleryImageReference: {
        offer: "0001-com-ubuntu-server-groovy",
        osType: "Linux",
        publisher: "canonical",
        sku: "20_10",
        version: "latest"
      },
      isAuthenticationWithSshKey: false,
      labSubnetName: "Dtl{labName}Subnet",
      labVirtualNetworkId: "/virtualnetworks/dtl{labName}",
      location: "{location}",
      networkInterface: {
        sharedPublicIpAddressConfiguration: {
          inboundNatRules: [{ backendPort: 22, transportProtocol: "Tcp" }]
        }
      },
      notes: "Ubuntu Server 20.10",
      size: "Standard_B1ms",
      storageType: "Standard",
      userName: "user"
    },
    location: "{location}"
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.formulas.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    name,
    formula
  );
  console.log(result);
}

formulasCreateOrUpdate().catch(console.error);
