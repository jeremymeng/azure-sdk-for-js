/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes the specified application on the HDInsight cluster.
 *
 * @summary Deletes the specified application on the HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/DeleteApplication.json
 */
async function deleteApplicationFromHdInsightCluster() {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const applicationName = "hue";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    applicationName,
  );
  console.log(result);
}

async function main() {
  deleteApplicationFromHdInsightCluster();
}

main().catch(console.error);
