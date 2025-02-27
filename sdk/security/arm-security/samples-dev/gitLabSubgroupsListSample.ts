/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets nested subgroups of given GitLab Group which are onboarded to the connector.
 *
 * @summary Gets nested subgroups of given GitLab Group which are onboarded to the connector.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-09-01-preview/examples/SecurityConnectorsDevOps/ListGitLabSubgroups_example.json
 */
async function listGitLabSubgroups(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg";
  const securityConnectorName = "mySecurityConnectorName";
  const groupFQName = "myGitLabGroup";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitLabSubgroups.list(
    resourceGroupName,
    securityConnectorName,
    groupFQName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listGitLabSubgroups();
}

main().catch(console.error);
