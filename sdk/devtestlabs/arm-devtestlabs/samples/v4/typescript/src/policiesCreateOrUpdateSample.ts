/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { Policy, DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing policy.
 *
 * @summary Create or replace an existing policy.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Policies_CreateOrUpdate.json
 */
async function policiesCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const policySetName = "{policySetName}";
  const name = "{policyName}";
  const policy: Policy = {
    description: "{policyDescription}",
    evaluatorType: "{policyEvaluatorType}",
    factData: "{policyFactData}",
    factName: "{policyFactName}",
    location: "{location}",
    status: "{policyStatus}",
    tags: { tagName1: "tagValue1" },
    threshold: "{policyThreshold}"
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.policies.createOrUpdate(
    resourceGroupName,
    labName,
    policySetName,
    name,
    policy
  );
  console.log(result);
}

policiesCreateOrUpdate().catch(console.error);
