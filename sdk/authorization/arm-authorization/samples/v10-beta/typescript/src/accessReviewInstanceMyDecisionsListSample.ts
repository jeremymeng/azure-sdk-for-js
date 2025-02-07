/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get my access review instance decisions.
 *
 * @summary Get my access review instance decisions.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/GetAccessReviewInstanceMyDecisions.json
 */
async function getAccessReviews() {
  const scheduleDefinitionId = "488a6d0e-0a63-4946-86e3-1f5bbc934661";
  const id = "4135f961-be78-4005-8101-c72a5af307a2";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.accessReviewInstanceMyDecisions.list(
    scheduleDefinitionId,
    id
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  getAccessReviews();
}

main().catch(console.error);
