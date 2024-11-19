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
  PolicyFragmentGetOptionalParams,
  ApiManagementClient
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a policy fragment.
 *
 * @summary Gets a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGetPolicyFragment.json
 */
async function apiManagementGetPolicyFragment() {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const id = "policyFragment1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyFragment.get(
    resourceGroupName,
    serviceName,
    id
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a policy fragment.
 *
 * @summary Gets a policy fragment.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGetPolicyFragmentFormat.json
 */
async function apiManagementGetPolicyFragmentFormat() {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const id = "policyFragment1";
  const format = "rawxml";
  const options: PolicyFragmentGetOptionalParams = { format };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyFragment.get(
    resourceGroupName,
    serviceName,
    id,
    options
  );
  console.log(result);
}

async function main() {
  apiManagementGetPolicyFragment();
  apiManagementGetPolicyFragmentFormat();
}

main().catch(console.error);
