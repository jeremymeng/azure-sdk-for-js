/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to get the details of an Azure Site recovery event.
 *
 * @summary The operation to get the details of an Azure Site recovery event.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2023-08-01/examples/ReplicationEvents_Get.json
 */
async function getTheDetailsOfAnAzureSiteRecoveryEvent() {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceName = "vault1";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] || "resourceGroupPS1";
  const eventName = "654b71d0-b2ce-4e6e-a861-98528d4bd375";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationEvents.get(resourceName, resourceGroupName, eventName);
  console.log(result);
}

async function main() {
  await getTheDetailsOfAnAzureSiteRecoveryEvent();
}

main().catch(console.error);
