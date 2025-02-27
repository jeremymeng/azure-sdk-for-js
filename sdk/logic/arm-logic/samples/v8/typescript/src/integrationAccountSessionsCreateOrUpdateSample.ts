/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  IntegrationAccountSession,
  LogicManagementClient
} from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an integration account session.
 *
 * @summary Creates or updates an integration account session.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountSessions_CreateOrUpdate.json
 */
async function createOrUpdateAnIntegrationAccountSession(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testrg123";
  const integrationAccountName = "testia123";
  const sessionName = "testsession123-ICN";
  const session: IntegrationAccountSession = {
    content: {
      controlNumber: "1234",
      controlNumberChangedTime: "2017-02-21T22:30:11.9923759Z"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountSessions.createOrUpdate(
    resourceGroupName,
    integrationAccountName,
    sessionName,
    session
  );
  console.log(result);
}

async function main(): Promise<void> {
  createOrUpdateAnIntegrationAccountSession();
}

main().catch(console.error);
