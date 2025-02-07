/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a ScriptCmdlet
 *
 * @summary Get a ScriptCmdlet
 * x-ms-original-file: specification/vmware/resource-manager/Microsoft.AVS/stable/2023-09-01/examples/ScriptCmdlets_Get.json
 */
async function scriptCmdletsGet(): Promise<void> {
  const subscriptionId =
    process.env["AVS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["AVS_RESOURCE_GROUP"] || "group1";
  const privateCloudName = "cloud1";
  const scriptPackageName = "package@1.0.2";
  const scriptCmdletName = "New-ExternalSsoDomain";
  const credential = new DefaultAzureCredential();
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptCmdlets.get(
    resourceGroupName,
    privateCloudName,
    scriptPackageName,
    scriptCmdletName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scriptCmdletsGet();
}

main().catch(console.error);
