/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Post Scheduled Event Acknowledgement
 *
 * @summary Post Scheduled Event Acknowledgement
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/ScheduledEvents_Acknowledge.json
 */
async function scheduledEventsAcknowledge() {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const resourceType = "virtualMachines";
  const resourceName = "configuration1";
  const scheduledEventId = "ad6d85cf-2c9e-4eec-9a1e-af3213cc0486";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.scheduledEvent.acknowledge(
    resourceGroupName,
    resourceType,
    resourceName,
    scheduledEventId,
  );
  console.log(result);
}

async function main() {
  scheduledEventsAcknowledge();
}

main().catch(console.error);
