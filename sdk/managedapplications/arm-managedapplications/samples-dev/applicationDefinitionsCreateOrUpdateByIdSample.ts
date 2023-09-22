/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ApplicationDefinition,
  ApplicationClient
} from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a managed application definition.
 *
 * @summary Creates or updates a managed application definition.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/createOrUpdateApplicationDefinition.json
 */
async function createOrUpdateManagedApplicationDefinition() {
  const subscriptionId =
    process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const applicationDefinitionName = "myManagedApplicationDef";
  const parameters: ApplicationDefinition = {
    description: "myManagedApplicationDef description",
    authorizations: [
      { principalId: "validprincipalguid", roleDefinitionId: "validroleguid" }
    ],
    displayName: "myManagedApplicationDef",
    lockLevel: "None",
    packageFileUri: "https://path/to/packagezipfile"
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.applicationDefinitions.createOrUpdateById(
    resourceGroupName,
    applicationDefinitionName,
    parameters
  );
  console.log(result);
}

async function main() {
  createOrUpdateManagedApplicationDefinition();
}

main().catch(console.error);
