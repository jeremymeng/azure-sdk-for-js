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
  SolutionResource,
  SolutionCreateOptionalParams,
  HelpRP,
} from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a solution for the specific Azure resource or subscription using the inputs ‘solutionId and requiredInputs’ from discovery solutions. <br/> Azure solutions comprise a comprehensive library of self-help resources that have been thoughtfully curated by Azure engineers to aid customers in resolving typical troubleshooting issues. These solutions encompass: <br/> (1.) Dynamic and context-aware diagnostics, guided troubleshooting wizards, and data visualizations. <br/> (2.) Rich instructional video tutorials and illustrative diagrams and images. <br/> (3.) Thoughtfully assembled textual troubleshooting instructions. <br/> All these components are seamlessly converged into unified solutions tailored to address a specific support problem area.
 *
 * @summary Creates a solution for the specific Azure resource or subscription using the inputs ‘solutionId and requiredInputs’ from discovery solutions. <br/> Azure solutions comprise a comprehensive library of self-help resources that have been thoughtfully curated by Azure engineers to aid customers in resolving typical troubleshooting issues. These solutions encompass: <br/> (1.) Dynamic and context-aware diagnostics, guided troubleshooting wizards, and data visualizations. <br/> (2.) Rich instructional video tutorials and illustrative diagrams and images. <br/> (3.) Thoughtfully assembled textual troubleshooting instructions. <br/> All these components are seamlessly converged into unified solutions tailored to address a specific support problem area.
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/Solution_Create.json
 */
async function solutionCreate(): Promise<void> {
  const scope =
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp";
  const solutionResourceName = "SolutionResourceName1";
  const solutionRequestBody: SolutionResource = {
    parameters: {
      resourceUri:
        "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    },
    triggerCriteria: [{ name: "SolutionId", value: "SolutionId1" }],
  };
  const options: SolutionCreateOptionalParams = { solutionRequestBody };
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.beginCreateAndWait(
    scope,
    solutionResourceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  solutionCreate();
}

main().catch(console.error);
