/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Environment } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates new or updates existing environment.
 *
 * @summary Creates new or updates existing environment.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Environments_CreateOrUpdate.json
 */
async function environmentsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const environmentName = "public";
  const payload: Environment = {
    properties: {
      description: "The primary Azure API Management service for the European division of Contoso.",
      kind: "production",
      onboarding: {
        developerPortalUri: ["https://developer.contoso.com"],
        instructions:
          "Sign in or sign up in the specified developer portal to request API access. You must complete the internal privacy training for your account to be approved.",
      },
      server: {
        type: "Azure API Management",
        managementPortalUri: [
          "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ApiManagement/service/contoso",
        ],
      },
      title: "Contoso Europe Azure API Management",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.environments.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceName,
    environmentName,
    payload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsCreateOrUpdate();
}

main().catch(console.error);
