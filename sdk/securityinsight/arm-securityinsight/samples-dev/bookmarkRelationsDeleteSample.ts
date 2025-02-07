/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete the bookmark relation.
 *
 * @summary Delete the bookmark relation.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/bookmarks/relations/DeleteBookmarkRelation.json
 */
async function deleteTheBookmarkRelation() {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const bookmarkId = "2216d0e1-91e3-4902-89fd-d2df8c535096";
  const relationName = "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmarkRelations.delete(
    resourceGroupName,
    workspaceName,
    bookmarkId,
    relationName,
  );
  console.log(result);
}

async function main() {
  await deleteTheBookmarkRelation();
}

main().catch(console.error);
