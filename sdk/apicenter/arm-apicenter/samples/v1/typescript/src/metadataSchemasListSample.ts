/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Returns a collection of metadata schemas.
 *
 * @summary Returns a collection of metadata schemas.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/MetadataSchemas_List.json
 */
async function metadataSchemasListByService() {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.metadataSchemas.list(
    resourceGroupName,
    serviceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  metadataSchemasListByService();
}

main().catch(console.error);
