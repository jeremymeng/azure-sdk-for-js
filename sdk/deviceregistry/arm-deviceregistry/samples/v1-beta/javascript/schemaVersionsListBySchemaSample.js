// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SchemaVersion resources by Schema
 *
 * @summary list SchemaVersion resources by Schema
 * x-ms-original-file: 2024-09-01-preview/List_SchemaVersions_Schema.json
 */
async function listSchemaVersionsSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.schemaVersions.listBySchema(
    "myResourceGroup",
    "my-schema-registry",
    "my-schema",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listSchemaVersionsSchema();
}

main().catch(console.error);
