/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type {
  HostPoolPatch,
  HostPoolsUpdateOptionalParams,
} from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a host pool.
 *
 * @summary Update a host pool.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/HostPool_Update.json
 */
async function hostPoolUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostPool1";
  const hostPool: HostPoolPatch = {
    description: "des1",
    agentUpdate: {
      type: "Scheduled",
      maintenanceWindowTimeZone: "Alaskan Standard Time",
      maintenanceWindows: [
        { dayOfWeek: "Friday", hour: 7 },
        { dayOfWeek: "Saturday", hour: 8 },
      ],
      useSessionHostLocalTime: false,
    },
    customRdpProperty: undefined,
    friendlyName: "friendly",
    loadBalancerType: "BreadthFirst",
    maxSessionLimit: 999999,
    personalDesktopAssignmentType: "Automatic",
    registrationInfo: {
      expirationTime: new Date("2020-10-01T15:01:54.9571247Z"),
      registrationTokenOperation: "Update",
    },
    ssoClientId: "client",
    ssoClientSecretKeyVaultPath: "https://keyvault/secret",
    ssoSecretType: "SharedKey",
    ssoadfsAuthority: "https://adfs",
    startVMOnConnect: false,
    tags: { tag1: "value1", tag2: "value2" },
    vmTemplate: "{json:json}",
  };
  const options: HostPoolsUpdateOptionalParams = { hostPool };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.hostPools.update(resourceGroupName, hostPoolName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await hostPoolUpdate();
}

main().catch(console.error);
