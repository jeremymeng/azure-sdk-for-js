/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required.
 *
 * @summary Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2024-12-18-preview/examples/SubscriptionQuotaAllocationRequests/SubscriptionQuotaAllocationRequests_List-Compute.json
 */
async function subscriptionQuotaAllocationListRequestForCompute(): Promise<void> {
  const subscriptionId =
    process.env["QUOTA_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const resourceProviderName = "Microsoft.Compute";
  const filter = "location eq westus";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotaSubscriptionAllocationRequest.list(
    managementGroupId,
    groupQuotaName,
    resourceProviderName,
    filter,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await subscriptionQuotaAllocationListRequestForCompute();
}

main().catch(console.error);
