/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get API to check the status of a GroupQuota request by requestId.
 *
 * @summary Get API to check the status of a GroupQuota request by requestId.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/preview/2024-12-18-preview/examples/GroupQuotaLimitsRequests/GroupQuotaLimitsRequests_Get.json
 */
async function groupQuotaLimitsRequestsGet() {
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const requestId = "requestId";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.groupQuotaLimitsRequest.get(
    managementGroupId,
    groupQuotaName,
    requestId,
  );
  console.log(result);
}

async function main() {
  await groupQuotaLimitsRequestsGet();
}

main().catch(console.error);
