/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { DataNetwork } from "@azure/arm-mobilenetwork";
import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a data network. Must be created in the same location as its parent mobile network.
 *
 * @summary Creates or updates a data network. Must be created in the same location as its parent mobile network.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/DataNetworkCreate.json
 */
async function createDataNetwork() {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const mobileNetworkName = "testMobileNetwork";
  const dataNetworkName = "testDataNetwork";
  const parameters: DataNetwork = {
    description: "myFavouriteDataNetwork",
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const result = await client.dataNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    mobileNetworkName,
    dataNetworkName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createDataNetwork();
}

main().catch(console.error);
