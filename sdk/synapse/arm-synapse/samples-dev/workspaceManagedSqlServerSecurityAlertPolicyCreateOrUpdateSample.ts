/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ServerSecurityAlertPolicy } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or Update a workspace managed sql server's threat detection policy.
 *
 * @summary Create or Update a workspace managed sql server's threat detection policy.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/WorkspaceManagedSqlServerSecurityAlertWithAllParameters.json
 */
async function updateAWorkspaceManagedSqlServerThreatDetectionPolicyWithAllParameters(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "wsg-7398";
  const workspaceName = "testWorkspace";
  const securityAlertPolicyName = "Default";
  const parameters: ServerSecurityAlertPolicy = {
    disabledAlerts: ["Access_Anomaly", "Usage_Anomaly"],
    emailAccountAdmins: true,
    emailAddresses: ["testSecurityAlert@microsoft.com"],
    retentionDays: 5,
    state: "Enabled",
    storageAccountAccessKey:
      "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
    storageEndpoint: "https://mystorage.blob.core.windows.net",
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result =
    await client.workspaceManagedSqlServerSecurityAlertPolicy.beginCreateOrUpdateAndWait(
      resourceGroupName,
      workspaceName,
      securityAlertPolicyName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update a workspace managed sql server's threat detection policy.
 *
 * @summary Create or Update a workspace managed sql server's threat detection policy.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/WorkspaceManagedSqlServerSecurityAlertCreateWithMinParameters.json
 */
async function updateAWorkspaceManagedSqlServerThreatDetectionPolicyWithMinimalParameters(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "wsg-7398";
  const workspaceName = "testWorkspace";
  const securityAlertPolicyName = "Default";
  const parameters: ServerSecurityAlertPolicy = {
    emailAccountAdmins: true,
    state: "Disabled",
    storageAccountAccessKey:
      "sdlfkjabc+sdlfkjsdlkfsjdfLDKFTERLKFDFKLjsdfksjdflsdkfD2342309432849328476458/3RSD==",
    storageEndpoint: "https://mystorage.blob.core.windows.net",
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result =
    await client.workspaceManagedSqlServerSecurityAlertPolicy.beginCreateOrUpdateAndWait(
      resourceGroupName,
      workspaceName,
      securityAlertPolicyName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAWorkspaceManagedSqlServerThreatDetectionPolicyWithAllParameters();
  await updateAWorkspaceManagedSqlServerThreatDetectionPolicyWithMinimalParameters();
}

main().catch(console.error);
