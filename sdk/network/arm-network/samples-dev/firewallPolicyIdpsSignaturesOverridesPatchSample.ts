/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { SignaturesOverrides } from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Will update the status of policy's signature overrides for IDPS
 *
 * @summary Will update the status of policy's signature overrides for IDPS
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/FirewallPolicySignatureOverridesPatch.json
 */
async function patchSignatureOverrides() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const parameters: SignaturesOverrides = {
    name: "default",
    type: "Microsoft.Network/firewallPolicies/signatureOverrides",
    id: "/subscriptions/e747cc13-97d4-4a79-b463-42d7f4e558f2/resourceGroups/rg1/providers/Microsoft.Network/firewallPolicies/firewallPolicy/signatureOverrides/default",
    properties: { signatures: { "2000105": "Off", "2000106": "Deny" } },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyIdpsSignaturesOverrides.patch(
    resourceGroupName,
    firewallPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await patchSignatureOverrides();
}

main().catch(console.error);
