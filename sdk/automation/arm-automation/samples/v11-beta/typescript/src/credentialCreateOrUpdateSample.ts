/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  CredentialCreateOrUpdateParameters,
  AutomationClient
} from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a credential.
 *
 * @summary Create a credential.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/createOrUpdateCredential.json
 */
async function createACredential() {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount18";
  const credentialName = "myCredential";
  const parameters: CredentialCreateOrUpdateParameters = {
    name: "myCredential",
    description: "my description goes here",
    password: "<password>",
    userName: "mylingaiah"
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.credentialOperations.createOrUpdate(
    resourceGroupName,
    automationAccountName,
    credentialName,
    parameters
  );
  console.log(result);
}

async function main() {
  createACredential();
}

main().catch(console.error);
