/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { NetworkInterface } from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a network interface.
 *
 * @summary Creates or updates a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/NetworkInterfaceCreate.json
 */
async function createNetworkInterface(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkInterfaceName = "test-nic";
  const parameters: NetworkInterface = {
    disableTcpStateTracking: true,
    enableAcceleratedNetworking: true,
    ipConfigurations: [
      {
        name: "ipconfig1",
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
        },
      },
      { name: "ipconfig2", privateIPAddressPrefixLength: 28 },
    ],
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkInterfaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a network interface.
 *
 * @summary Creates or updates a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/NetworkInterfaceCreateGatewayLoadBalancerConsumer.json
 */
async function createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkInterfaceName = "test-nic";
  const parameters: NetworkInterface = {
    enableAcceleratedNetworking: true,
    ipConfigurations: [
      {
        name: "ipconfig1",
        gatewayLoadBalancer: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb-provider",
        },
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
        },
      },
    ],
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkInterfaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkInterface();
  await createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured();
}

main().catch(console.error);
