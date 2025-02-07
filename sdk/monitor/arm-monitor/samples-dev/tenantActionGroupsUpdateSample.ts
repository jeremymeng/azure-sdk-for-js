/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ActionGroupPatchBodyAutoGenerated } from "@azure/arm-monitor";
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary Updates an existing tenant action group's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/preview/2023-05-01-preview/examples/patchTenantActionGroup.json
 */
async function patchATenantActionGroup() {
  const managementGroupId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const tenantActionGroupName = "testTenantActionGroup";
  const xMsClientTenantId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const tenantActionGroupPatch: ActionGroupPatchBodyAutoGenerated = {
    enabled: false,
    tags: { key1: "value1", key2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.tenantActionGroups.update(
    managementGroupId,
    tenantActionGroupName,
    xMsClientTenantId,
    tenantActionGroupPatch,
  );
  console.log(result);
}

async function main() {
  await patchATenantActionGroup();
}

main().catch(console.error);
