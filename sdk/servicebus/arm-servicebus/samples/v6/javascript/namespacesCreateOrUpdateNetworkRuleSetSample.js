/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Create or update NetworkRuleSet for a Namespace.
 *
 * @summary Create or update NetworkRuleSet for a Namespace.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/examples/NameSpaces/VirtualNetworkRule/SBNetworkRuleSetCreate.json
 */
async function nameSpaceNetworkRuleSetCreate() {
  const subscriptionId = "Subscription";
  const resourceGroupName = "ResourceGroup";
  const namespaceName = "sdk-Namespace-6019";
  const parameters = {
    defaultAction: "Deny",
    ipRules: [
      { action: "Allow", ipMask: "1.1.1.1" },
      { action: "Allow", ipMask: "1.1.1.2" },
      { action: "Allow", ipMask: "1.1.1.3" },
      { action: "Allow", ipMask: "1.1.1.4" },
      { action: "Allow", ipMask: "1.1.1.5" },
    ],
    virtualNetworkRules: [
      {
        ignoreMissingVnetServiceEndpoint: true,
        subnet: {
          id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet2",
        },
      },
      {
        ignoreMissingVnetServiceEndpoint: false,
        subnet: {
          id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet3",
        },
      },
      {
        ignoreMissingVnetServiceEndpoint: false,
        subnet: {
          id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet6",
        },
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateNetworkRuleSet(
    resourceGroupName,
    namespaceName,
    parameters
  );
  console.log(result);
}

nameSpaceNetworkRuleSetCreate().catch(console.error);
