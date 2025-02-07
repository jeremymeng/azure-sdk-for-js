// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SchemaVersion
 *
 * @summary get a SchemaVersion
 * x-ms-original-file: 2024-09-01-preview/Get_SchemaVersion.json
 */
async function getSchemaVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.schemaVersions.get(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
    "1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSchemaVersion();
}

main().catch(console.error);
