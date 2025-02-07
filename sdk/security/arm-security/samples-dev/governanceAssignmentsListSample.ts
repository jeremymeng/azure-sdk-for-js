/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get governance assignments on all of your resources inside a scope
 *
 * @summary Get governance assignments on all of your resources inside a scope
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceAssignments/ListGovernanceAssignments_example.json
 */
async function listGovernanceAssignments() {
  const scope = "subscriptions/c32e05d9-7207-4e22-bdf4-4f7d9c72e5fd";
  const assessmentName = "6b9421dd-5555-2251-9b3d-2be58e2f82cd";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.governanceAssignments.list(scope, assessmentName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listGovernanceAssignments();
}

main().catch(console.error);
