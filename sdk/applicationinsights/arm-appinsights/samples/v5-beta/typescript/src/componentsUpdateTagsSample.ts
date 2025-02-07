/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  TagsResource,
  ApplicationInsightsManagementClient
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary Updates an existing component's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2020-02-02/examples/ComponentsUpdateTagsOnly.json
 */
async function componentUpdateTagsOnly() {
  const subscriptionId = "subid";
  const resourceGroupName = "my-resource-group";
  const resourceName = "my-component";
  const componentTags: TagsResource = {
    tags: {
      applicationGatewayType: "Internal-Only",
      billingEntity: "Self",
      color: "AzureBlue",
      customField01: "Custom text in some random field named randomly",
      nodeType: "Edge"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.components.updateTags(
    resourceGroupName,
    resourceName,
    componentTags
  );
  console.log(result);
}

componentUpdateTagsOnly().catch(console.error);
