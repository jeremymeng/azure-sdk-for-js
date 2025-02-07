/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the Alerts for external cloud provider type defined.
 *
 * @summary Lists the Alerts for external cloud provider type defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExternalBillingAccountAlerts.json
 */
async function externalBillingAccountAlerts(): Promise<void> {
  const externalCloudProviderType = "externalBillingAccounts";
  const externalCloudProviderId = "100";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.listExternal(
    externalCloudProviderType,
    externalCloudProviderId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the Alerts for external cloud provider type defined.
 *
 * @summary Lists the Alerts for external cloud provider type defined.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExternalSubscriptionAlerts.json
 */
async function externalSubscriptionAlerts(): Promise<void> {
  const externalCloudProviderType = "externalSubscriptions";
  const externalCloudProviderId = "100";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.alerts.listExternal(
    externalCloudProviderType,
    externalCloudProviderId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalBillingAccountAlerts();
  await externalSubscriptionAlerts();
}

main().catch(console.error);
