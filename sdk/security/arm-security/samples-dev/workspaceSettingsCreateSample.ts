/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { WorkspaceSetting } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to creating settings about where we should store your security data and logs
 *
 * @summary creating settings about where we should store your security data and logs
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2017-08-01-preview/examples/WorkspaceSettings/CreateWorkspaceSetting_example.json
 */
async function createAWorkspaceSettingDataForSubscription() {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const workspaceSettingName = "default";
  const workspaceSetting: WorkspaceSetting = {
    name: "default",
    type: "Microsoft.Security/workspaceSettings",
    id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/providers/Microsoft.Security/workspaceSettings/default",
    scope: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    workspaceId:
      "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspaces/myWorkspace",
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.workspaceSettings.create(workspaceSettingName, workspaceSetting);
  console.log(result);
}

async function main() {
  await createAWorkspaceSettingDataForSubscription();
}

main().catch(console.error);
