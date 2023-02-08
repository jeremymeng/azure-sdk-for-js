/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RelayNamespace, RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create Azure Relay namespace.
 *
 * @summary Create Azure Relay namespace.
 * x-ms-original-file: specification/relay/resource-manager/Microsoft.Relay/stable/2017-04-01/examples/NameSpaces/RelayNameSpaceCreate.json
 */
async function relayNamespaceCreate() {
  const subscriptionId =
    process.env["RELAY_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["RELAY_RESOURCE_GROUP"] || "resourcegroup";
  const namespaceName = "example-RelayNamespace-01";
  const parameters: RelayNamespace = {
    location: "West US",
    sku: { name: "Standard", tier: "Standard" },
    tags: { tag1: "value1", tag2: "value2" }
  };
  const credential = new DefaultAzureCredential();
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName,
    parameters
  );
  console.log(result);
}

async function main() {
  relayNamespaceCreate();
}

main().catch(console.error);
