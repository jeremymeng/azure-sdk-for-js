/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  MaintenanceConfiguration,
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a maintenance configuration in the specified managed cluster.
 *
 * @summary Creates or updates a maintenance configuration in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2024-10-01/examples/MaintenanceConfigurationsCreate_Update.json
 */
async function createOrUpdateMaintenanceConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "default";
  const parameters: MaintenanceConfiguration = {
    notAllowedTime: [
      {
        end: new Date("2020-11-30T12:00:00Z"),
        start: new Date("2020-11-26T03:00:00Z"),
      },
    ],
    timeInWeek: [{ day: "Monday", hourSlots: [1, 2] }],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    resourceGroupName,
    resourceName,
    configName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a maintenance configuration in the specified managed cluster.
 *
 * @summary Creates or updates a maintenance configuration in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2024-10-01/examples/MaintenanceConfigurationsCreate_Update_MaintenanceWindow.json
 */
async function createOrUpdateMaintenanceConfigurationWithMaintenanceWindow(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "aksManagedAutoUpgradeSchedule";
  const parameters: MaintenanceConfiguration = {
    maintenanceWindow: {
      durationHours: 10,
      notAllowedDates: [
        { end: new Date("2023-02-25"), start: new Date("2023-02-18") },
        { end: new Date("2024-01-05"), start: new Date("2023-12-23") },
      ],
      schedule: {
        relativeMonthly: {
          dayOfWeek: "Monday",
          intervalMonths: 3,
          weekIndex: "First",
        },
      },
      startDate: new Date("2023-01-01"),
      startTime: "08:30",
      utcOffset: "+05:30",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    resourceGroupName,
    resourceName,
    configName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMaintenanceConfiguration();
  await createOrUpdateMaintenanceConfigurationWithMaintenanceWindow();
}

main().catch(console.error);
