/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Returns details of a specific file in a work space.
 *
 * @summary Returns details of a specific file in a work space.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetFileDetailsForSubscription.json
 */
async function getDetailsOfASubscriptionFile() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] || "132d901f-189d-4381-9214-fe68e27e05a1";
  const fileWorkspaceName = "testworkspace";
  const fileName = "test.txt";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.files.get(fileWorkspaceName, fileName);
  console.log(result);
}

async function main() {
  getDetailsOfASubscriptionFile();
}

main().catch(console.error);
