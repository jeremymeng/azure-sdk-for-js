/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Remediate an alert incident.
 *
 * @summary Remediate an alert incident.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-08-01-preview/examples/RemediateAlertIncident.json
 */
async function remediateAlertIncident() {
  const scope = "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f";
  const alertId = "DuplicateRoleCreated";
  const alertIncidentId = "0645231d-16ba-4ebf-851a-0875df4052bd";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alertIncidents.remediate(
    scope,
    alertId,
    alertIncidentId
  );
  console.log(result);
}

async function main() {
  remediateAlertIncident();
}

main().catch(console.error);
