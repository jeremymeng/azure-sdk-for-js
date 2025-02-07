/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { VirtualNetworkGatewayConnection } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a virtual network gateway connection in the specified resource group.
 *
 * @summary Creates or updates a virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/VirtualNetworkGatewayConnectionCreate.json
 */
async function createVirtualNetworkGatewayConnectionS2S() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "connS2S";
  const parameters: VirtualNetworkGatewayConnection = {
    connectionProtocol: "IKEv2",
    connectionType: "IPsec",
    enableBgp: false,
    ipsecPolicies: [],
    localNetworkGateway2: {
      etag: 'W/"00000000-0000-0000-0000-000000000000"',
      gatewayIpAddress: "x.x.x.x",
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/localNetworkGateways/localgw",
      localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
      location: "centralus",
      resourceGuid: "00000000-0000-0000-0000-000000000000",
      tags: {},
    },
    location: "centralus",
    routingWeight: 0,
    sharedKey: "Abc123",
    usePolicyBasedTrafficSelectors: false,
    virtualNetworkGateway1: {
      active: false,
      bgpSettings: {
        asn: 65514,
        bgpPeeringAddress: "10.0.1.30",
        peerWeight: 0,
      },
      enableBgp: false,
      etag: 'W/"00000000-0000-0000-0000-000000000000"',
      gatewayType: "Vpn",
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw",
      ipConfigurations: [
        {
          name: "gwipconfig1",
          etag: 'W/"00000000-0000-0000-0000-000000000000"',
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/vpngw/ipConfigurations/gwipconfig1",
          privateIPAllocationMethod: "Dynamic",
          publicIPAddress: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/gwpip",
          },
          subnet: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/GatewaySubnet",
          },
        },
      ],
      location: "centralus",
      resourceGuid: "00000000-0000-0000-0000-000000000000",
      sku: { name: "VpnGw1", capacity: 2, tier: "VpnGw1" },
      tags: {},
      vpnType: "RouteBased",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createVirtualNetworkGatewayConnectionS2S();
}

main().catch(console.error);
