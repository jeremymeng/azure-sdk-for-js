/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { TagRule } from "@azure/arm-newrelicobservability";
import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a TagRule
 *
 * @summary Create a TagRule
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_CreateOrUpdate_MaximumSet_Gen.json
 */
async function tagRulesCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const resource: TagRule = {
    logRules: {
      filteringTags: [
        {
          name: "saokgpjvdlorciqbjmjxazpee",
          action: "Include",
          value: "sarxrqsxouhdjwsrqqicbeirdb",
        },
      ],
      sendAadLogs: "Enabled",
      sendActivityLogs: "Enabled",
      sendSubscriptionLogs: "Enabled",
    },
    metricRules: {
      filteringTags: [
        {
          name: "saokgpjvdlorciqbjmjxazpee",
          action: "Include",
          value: "sarxrqsxouhdjwsrqqicbeirdb",
        },
      ],
      userEmail: "test@testing.com",
    },
    provisioningState: "Accepted",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    ruleSetName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a TagRule
 *
 * @summary Create a TagRule
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function tagRulesCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const resource: TagRule = {};
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    ruleSetName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tagRulesCreateOrUpdateMaximumSetGen();
  await tagRulesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
