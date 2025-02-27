/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TemplateSpecsClient } from "@azure/arm-templatespecs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes a specific version from a Template Spec. When operation completes, status code 200 returned without content.
 *
 * @summary Deletes a specific version from a Template Spec. When operation completes, status code 200 returned without content.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsDelete.json
 */
async function templateSpecVersionsDelete(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "templateSpecRG";
  const templateSpecName = "simpleTemplateSpec";
  const templateSpecVersion = "v1.0";
  const credential = new DefaultAzureCredential();
  const client = new TemplateSpecsClient(credential, subscriptionId);
  const result = await client.templateSpecVersions.delete(
    resourceGroupName,
    templateSpecName,
    templateSpecVersion
  );
  console.log(result);
}

templateSpecVersionsDelete().catch(console.error);
