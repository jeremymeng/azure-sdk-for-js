/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RoutingRule, NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an routing rule.
 *
 * @summary Creates or updates an routing rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/NetworkManagerRoutingRulePut.json
 */
async function createADefaultRoutingRule(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestRoutingConfig";
  const ruleCollectionName = "testRuleCollection";
  const ruleName = "SampleRoutingRule";
  const routingRule: RoutingRule = {
    description: "This is Sample Routing Rule",
    destination: { type: "AddressPrefix", destinationAddress: "10.0.0.0/16" },
    nextHop: { nextHopType: "VirtualNetworkGateway" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRules.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    ruleName,
    routingRule,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an routing rule.
 *
 * @summary Creates or updates an routing rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/NetworkManagerRoutingRulePut.json
 */
async function createAnRoutingRule(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestRoutingConfig";
  const ruleCollectionName = "testRuleCollection";
  const ruleName = "SampleRoutingRule";
  const routingRule: RoutingRule = {
    description: "This is Sample Routing Rule",
    destination: { type: "AddressPrefix", destinationAddress: "10.0.0.0/16" },
    nextHop: { nextHopType: "VirtualNetworkGateway" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRules.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    ruleName,
    routingRule,
  );
  console.log(result);
}

async function main(): Promise<void> {
  createADefaultRoutingRule();
  createAnRoutingRule();
}

main().catch(console.error);
