/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ExpressRoutePortAuthorization } from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates an authorization in the specified express route port.
 *
 * @summary Creates or updates an authorization in the specified express route port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/ExpressRoutePortAuthorizationCreate.json
 */
async function createExpressRoutePortAuthorization() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "expressRoutePortName";
  const authorizationName = "authorizatinName";
  const authorizationParameters: ExpressRoutePortAuthorization = {};
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    expressRoutePortName,
    authorizationName,
    authorizationParameters,
  );
  console.log(result);
}

async function main() {
  await createExpressRoutePortAuthorization();
}

main().catch(console.error);
