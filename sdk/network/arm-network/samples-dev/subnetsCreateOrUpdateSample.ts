/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Subnet } from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/SubnetCreate.json
 */
async function createSubnet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const subnetParameters: Subnet = { addressPrefix: "10.0.0.0/16" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    subnetParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/SubnetCreateWithDelegation.json
 */
async function createSubnetWithADelegation() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const subnetParameters: Subnet = { addressPrefix: "10.0.0.0/16" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    subnetParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/SubnetCreateServiceEndpoint.json
 */
async function createSubnetWithServiceEndpoints() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const subnetParameters: Subnet = {
    addressPrefix: "10.0.0.0/16",
    serviceEndpoints: [{ service: "Microsoft.Storage" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    subnetParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/SubnetCreateServiceEndpointNetworkIdentifier.json
 */
async function createSubnetWithServiceEndpointsWithNetworkIdentifier() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const subnetParameters: Subnet = {
    addressPrefix: "10.0.0.0/16",
    serviceEndpoints: [
      {
        networkIdentifier: {
          id: "/subscriptions/subid/resourceGroups/subnet-test/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        service: "Microsoft.Storage",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    subnetParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/SubnetCreateWithSharingScope.json
 */
async function createSubnetWithSharingScope() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const subnetParameters: Subnet = { addressPrefix: "10.0.0.0/16" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subnets.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    subnetParameters,
  );
  console.log(result);
}

async function main() {
  await createSubnet();
  await createSubnetWithADelegation();
  await createSubnetWithServiceEndpoints();
  await createSubnetWithServiceEndpointsWithNetworkIdentifier();
  await createSubnetWithSharingScope();
}

main().catch(console.error);
