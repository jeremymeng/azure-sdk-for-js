/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary Creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/EventHubs/EHEventHubCreate.json
 */
async function ehEventHubCreate() {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const eventHubName = "sdk-EventHub-6547";
  const parameters = {
    captureDescription: {
      destination: {
        name: "EventHubArchive.AzureBlockBlob",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        blobContainer: "container",
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
        },
        storageAccountResourceId:
          "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
      },
      enabled: true,
      encoding: "Avro",
      intervalInSeconds: 120,
      sizeLimitInBytes: 10485763,
    },
    partitionCount: 4,
    status: "Active",
    userMetadata: "key",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventHubName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary Creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/EventHubs/EHEventHubWithCompactPolicyCreate.json
 */
async function ehEventHubWithCompactPolicyCreate() {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const eventHubName = "sdk-EventHub-6547";
  const parameters = {
    captureDescription: {
      destination: {
        name: "EventHubArchive.AzureBlockBlob",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        blobContainer: "container",
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
        },
        storageAccountResourceId:
          "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
      },
      enabled: true,
      encoding: "Avro",
      intervalInSeconds: 120,
      sizeLimitInBytes: 10485763,
    },
    messageRetentionInDays: 4,
    messageTimestampDescription: { timestampType: "LogAppend" },
    partitionCount: 4,
    retentionDescription: {
      cleanupPolicy: "Compact",
      minCompactionLagInMins: 10,
      tombstoneRetentionTimeInHours: 1,
    },
    status: "Active",
    userMetadata: "key",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventHubName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary Creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/EventHubs/EHEventHubWithDeleteOrCompactPolicyCreate.json
 */
async function ehEventHubWithDeleteOrCompactPolicyCreate() {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const eventHubName = "sdk-EventHub-6547";
  const parameters = {
    captureDescription: {
      destination: {
        name: "EventHubArchive.AzureBlockBlob",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        blobContainer: "container",
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
        },
        storageAccountResourceId:
          "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
      },
      enabled: true,
      encoding: "Avro",
      intervalInSeconds: 120,
      sizeLimitInBytes: 10485763,
    },
    messageRetentionInDays: 4,
    messageTimestampDescription: { timestampType: "LogAppend" },
    partitionCount: 4,
    retentionDescription: {
      cleanupPolicy: "DeleteOrCompact",
      retentionTimeInHours: 24,
    },
    status: "Active",
    userMetadata: "key",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventHubName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary Creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/EventHubs/EHEventHubWithDeletePolicyCreate.json
 */
async function ehEventHubWithDeletePolicyCreate() {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const eventHubName = "sdk-EventHub-6547";
  const parameters = {
    captureDescription: {
      destination: {
        name: "EventHubArchive.AzureBlockBlob",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        blobContainer: "container",
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/SampleSubscription/resourceGroups/ResurceGroupSample/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ud2",
        },
        storageAccountResourceId:
          "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
      },
      enabled: true,
      encoding: "Avro",
      intervalInSeconds: 120,
      sizeLimitInBytes: 10485763,
    },
    messageRetentionInDays: 4,
    messageTimestampDescription: { timestampType: "LogAppend" },
    partitionCount: 4,
    retentionDescription: { cleanupPolicy: "Delete", retentionTimeInHours: 24 },
    status: "Active",
    userMetadata: "key",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventHubName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await ehEventHubCreate();
  await ehEventHubWithCompactPolicyCreate();
  await ehEventHubWithDeleteOrCompactPolicyCreate();
  await ehEventHubWithDeletePolicyCreate();
}

main().catch(console.error);
