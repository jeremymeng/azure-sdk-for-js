/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get the list of all traffic filters for the account.
 *
 * @summary Get the list of all traffic filters for the account.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AllTrafficFilters_list.json
 */
async function allTrafficFiltersList() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.allTrafficFilters.list(resourceGroupName, monitorName);
  console.log(result);
}

async function main() {
  allTrafficFiltersList();
}

main().catch(console.error);
