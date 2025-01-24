/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200.
 *
 * @summary Returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2024-12-18-preview/examples/GroupQuotasSubscriptions/GetGroupQuotaSubscriptions.json
 */
async function groupQuotaSubscriptionsGetSubscriptions(): Promise<void> {
  const subscriptionId =
    process.env["QUOTA_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaSubscriptions.get(
    managementGroupId,
    groupQuotaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotaSubscriptionsGetSubscriptions();
}

main().catch(console.error);
