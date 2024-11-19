/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete a Association
 *
 * @summary Delete a Association
 * x-ms-original-file: specification/servicenetworking/resource-manager/Microsoft.ServiceNetworking/stable/2023-11-01/examples/AssociationDelete.json
 */
async function deleteAssociation() {
  const subscriptionId =
    process.env["SERVICENETWORKING_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["SERVICENETWORKING_RESOURCE_GROUP"] || "rg1";
  const trafficControllerName = "tc1";
  const associationName = "as1";
  const credential = new DefaultAzureCredential();
  const client = new ServiceNetworkingManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.associationsInterface.beginDeleteAndWait(
    resourceGroupName,
    trafficControllerName,
    associationName
  );
  console.log(result);
}

async function main() {
  deleteAssociation();
}

main().catch(console.error);
