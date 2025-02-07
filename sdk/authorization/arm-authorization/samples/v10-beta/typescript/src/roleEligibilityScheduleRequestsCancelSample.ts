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
 * This sample demonstrates how to Cancels a pending role eligibility schedule request.
 *
 * @summary Cancels a pending role eligibility schedule request.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-04-01-preview/examples/CancelRoleEligibilityScheduleRequestByName.json
 */
async function cancelRoleEligibilityScheduleRequestByName() {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const roleEligibilityScheduleRequestName =
    "64caffb6-55c0-4deb-a585-68e948ea1ad6";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleEligibilityScheduleRequests.cancel(
    scope,
    roleEligibilityScheduleRequestName
  );
  console.log(result);
}

async function main() {
  cancelRoleEligibilityScheduleRequestByName();
}

main().catch(console.error);
