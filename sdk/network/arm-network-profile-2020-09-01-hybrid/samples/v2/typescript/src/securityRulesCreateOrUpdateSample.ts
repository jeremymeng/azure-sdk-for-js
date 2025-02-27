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
  SecurityRule,
  NetworkManagementClient
} from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a security rule in the specified network security group.
 *
 * @summary Creates or updates a security rule in the specified network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/NetworkSecurityGroupRuleCreate.json
 */
async function createSecurityRule(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityGroupName = "testnsg";
  const securityRuleName = "rule1";
  const securityRuleParameters: SecurityRule = {
    access: "Deny",
    destinationAddressPrefix: "11.0.0.0/8",
    destinationPortRange: "8080",
    direction: "Outbound",
    priority: 100,
    sourceAddressPrefix: "10.0.0.0/8",
    sourcePortRange: "*",
    protocol: "*"
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkSecurityGroupName,
    securityRuleName,
    securityRuleParameters
  );
  console.log(result);
}

async function main(): Promise<void> {
  createSecurityRule();
}

main().catch(console.error);
