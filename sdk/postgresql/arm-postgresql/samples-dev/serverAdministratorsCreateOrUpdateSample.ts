/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ServerAdministratorResource } from "@azure/arm-postgresql";
import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates or update active directory administrator on an existing server. The update action will overwrite the existing administrator.
 *
 * @summary Creates or update active directory administrator on an existing server. The update action will overwrite the existing administrator.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/ServerAdminCreateUpdate.json
 */
async function serverAdministratorCreate() {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "pgtestsvc4";
  const properties: ServerAdministratorResource = {
    administratorType: "ActiveDirectory",
    login: "bob@contoso.com",
    sid: "c6b82b90-a647-49cb-8a62-0d2d3cb7ac7c",
    tenantId: "c6b82b90-a647-49cb-8a62-0d2d3cb7ac7c",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.serverAdministrators.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    properties,
  );
  console.log(result);
}

serverAdministratorCreate().catch(console.error);
