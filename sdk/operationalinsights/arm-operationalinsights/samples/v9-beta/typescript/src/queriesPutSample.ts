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
  LogAnalyticsQueryPackQuery,
  OperationalInsightsManagementClient
} from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Adds or Updates a specific Query within a Log Analytics QueryPack.
 *
 * @summary Adds or Updates a specific Query within a Log Analytics QueryPack.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/2019-09-01/examples/QueryPackQueriesPut.json
 */
async function queryPut() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const queryPackName = "my-querypack";
  const id = "a449f8af-8e64-4b3a-9b16-5a7165ff98c4";
  const queryPayload: LogAnalyticsQueryPackQuery = {
    description: "my description",
    body:
      "let newExceptionsTimeRange = 1d;\nlet timeRangeToCheckBefore = 7d;\nexceptions\n| where timestamp < ago(timeRangeToCheckBefore)\n| summarize count() by problemId\n| join kind= rightanti (\nexceptions\n| where timestamp >= ago(newExceptionsTimeRange)\n| extend stack = tostring(details[0].rawStack)\n| summarize count(), dcount(user_AuthenticatedId), min(timestamp), max(timestamp), any(stack) by problemId  \n) on problemId \n| order by  count_ desc\n",
    displayName: "Exceptions - New in the last 24 hours",
    related: { categories: ["analytics"] },
    tags: { myLabel: ["label1"], myOtherLabel: ["label2"] }
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.queries.put(
    resourceGroupName,
    queryPackName,
    id,
    queryPayload
  );
  console.log(result);
}

async function main() {
  queryPut();
}

main().catch(console.error);
