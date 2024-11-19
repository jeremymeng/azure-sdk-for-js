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
  JitNetworkAccessPolicyInitiateRequest,
  SecurityCenter,
} from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Initiate a JIT access from a specific Just-in-Time policy configuration.
 *
 * @summary Initiate a JIT access from a specific Just-in-Time policy configuration.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/JitNetworkAccessPolicies/InitiateJitNetworkAccessPolicy_example.json
 */
async function initiateAnActionOnAJitNetworkAccessPolicy() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] ||
    "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg1";
  const ascLocation = "westeurope";
  const jitNetworkAccessPolicyName = "default";
  const body: JitNetworkAccessPolicyInitiateRequest = {
    justification: "testing a new version of the product",
    virtualMachines: [
      {
        id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg1/providers/Microsoft.Compute/virtualMachines/vm1",
        ports: [{ allowedSourceAddressPrefix: "192.127.0.2", number: 3389, endTimeUtc: new Date() }],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.jitNetworkAccessPolicies.initiate(
    resourceGroupName,
    ascLocation,
    jitNetworkAccessPolicyName,
    body,
  );
  console.log(result);
}

async function main() {
  initiateAnActionOnAJitNetworkAccessPolicy();
}

main().catch(console.error);
