/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RetrieveThroughputParameters } from "@azure/arm-cosmosdb";
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve throughput distribution for an Azure Cosmos DB MongoDB database
 *
 * @summary Retrieve throughput distribution for an Azure Cosmos DB MongoDB database
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/preview/2024-12-01-preview/examples/CosmosDBMongoDBDatabaseRetrieveThroughputDistribution.json
 */
async function cosmosDbMongoDbdatabaseRetrieveThroughputDistribution(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const retrieveThroughputParameters: RetrieveThroughputParameters = {
    resource: { physicalPartitionIds: [{ id: "0" }, { id: "1" }] },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginMongoDBDatabaseRetrieveThroughputDistributionAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      retrieveThroughputParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbdatabaseRetrieveThroughputDistribution();
}

main().catch(console.error);
