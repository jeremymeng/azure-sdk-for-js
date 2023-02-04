/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ScriptExecution, AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update a script execution in a private cloud
 *
 * @summary Create or update a script execution in a private cloud
 * x-ms-original-file: specification/vmware/resource-manager/Microsoft.AVS/stable/2022-05-01/examples/ScriptExecutions_CreateOrUpdate.json
 */
async function scriptExecutionsCreateOrUpdate() {
  const subscriptionId =
    process.env["AVS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["AVS_RESOURCE_GROUP"] || "group1";
  const privateCloudName = "cloud1";
  const scriptExecutionName = "addSsoServer";
  const scriptExecution: ScriptExecution = {
    hiddenParameters: [
      {
        name: "Password",
        type: "SecureValue",
        secureValue: "PlaceholderPassword"
      }
    ],
    parameters: [
      { name: "DomainName", type: "Value", value: "placeholderDomain.local" },
      {
        name: "BaseUserDN",
        type: "Value",
        value: "DC=placeholder, DC=placeholder"
      }
    ],
    retention: "P0Y0M60DT0H60M60S",
    scriptCmdletId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/scriptPackages/AVS.PowerCommands@1.0.0/scriptCmdlets/New-SsoExternalIdentitySource",
    timeout: "P0Y0M0DT0H60M60S"
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    privateCloudName,
    scriptExecutionName,
    scriptExecution
  );
  console.log(result);
}

async function main() {
  scriptExecutionsCreateOrUpdate();
}

main().catch(console.error);
