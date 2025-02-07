/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete a custom domain.
 *
 * @summary Delete a custom domain.
 * x-ms-original-file: specification/signalr/resource-manager/Microsoft.SignalRService/preview/2023-08-01-preview/examples/SignalRCustomDomains_Delete.json
 */
async function signalRCustomDomainsDelete() {
  const subscriptionId =
    process.env["SIGNALR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SIGNALR_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "mySignalRService";
  const name = "example";
  const credential = new DefaultAzureCredential();
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomDomains.beginDeleteAndWait(
    resourceGroupName,
    resourceName,
    name,
  );
  console.log(result);
}

async function main() {
  await signalRCustomDomainsDelete();
}

main().catch(console.error);
