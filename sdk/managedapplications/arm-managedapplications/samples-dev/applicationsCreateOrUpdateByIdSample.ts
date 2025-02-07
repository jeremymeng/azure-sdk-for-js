/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Application } from "@azure/arm-managedapplications";
import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a managed application.
 *
 * @summary Creates or updates a managed application.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/createOrUpdateApplicationById.json
 */
async function createsOrUpdatesAManagedApplication() {
  const applicationId =
    "subscriptions/subid/resourceGroups/rg/providers/Microsoft.Solutions/applications/myManagedApplication";
  const parameters: Application = {
    applicationDefinitionId:
      "/subscriptions/subid/resourceGroups/rg/providers/Microsoft.Solutions/applicationDefinitions/myAppDef",
    kind: "ServiceCatalog",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential);
  const result = await client.applications.beginCreateOrUpdateByIdAndWait(
    applicationId,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAManagedApplication();
}

main().catch(console.error);
