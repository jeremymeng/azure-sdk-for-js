/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RecommendedSensitivityLabelUpdateList } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update recommended sensitivity labels states of a given SQL Pool using an operations batch.
 *
 * @summary Update recommended sensitivity labels states of a given SQL Pool using an operations batch.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/SensitivityLabelsRecommendedUpdate.json
 */
async function updateRecommendedSensitivityLabelsOfAGivenSqlPoolUsingAnOperationsBatch() {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "myRG";
  const workspaceName = "myWorkspace";
  const sqlPoolName = "mySqlPool";
  const parameters: RecommendedSensitivityLabelUpdateList = {
    operations: [
      { schema: "dbo", column: "column1", op: "enable", table: "table1" },
      { schema: "dbo", column: "column2", op: "enable", table: "table2" },
      { schema: "dbo", column: "column3", op: "disable", table: "table1" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.sqlPoolRecommendedSensitivityLabels.update(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateRecommendedSensitivityLabelsOfAGivenSqlPoolUsingAnOperationsBatch();
}

main().catch(console.error);
