/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List a workflow run repetition request history.
 *
 * @summary List a workflow run repetition request history.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowRunActionRepetitionsRequestHistories_List.json
 */
async function listRepetitionRequestHistory() {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const workflowName = "test-workflow";
  const runName = "08586776228332053161046300351";
  const actionName = "HTTP_Webhook";
  const repetitionName = "000001";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.workflowRunActionRepetitionsRequestHistories.list(
    resourceGroupName,
    workflowName,
    runName,
    actionName,
    repetitionName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listRepetitionRequestHistory();
}

main().catch(console.error);
