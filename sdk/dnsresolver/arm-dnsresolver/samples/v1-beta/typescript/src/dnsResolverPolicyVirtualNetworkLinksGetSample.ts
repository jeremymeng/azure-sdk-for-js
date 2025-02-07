/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets properties of a DNS resolver policy virtual network link.
 *
 * @summary Gets properties of a DNS resolver policy virtual network link.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/DnsResolverPolicyVirtualNetworkLink_Get.json
 */
async function retrieveDnsResolverPolicyVirtualNetworkLink(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsResolverPolicyVirtualNetworkLinkName = "sampleVirtualNetworkLink";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicyVirtualNetworkLinks.get(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsResolverPolicyVirtualNetworkLinkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  retrieveDnsResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
