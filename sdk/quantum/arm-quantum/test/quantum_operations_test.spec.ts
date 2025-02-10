/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, delay, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import type { Context } from "mocha";
import { AzureQuantumManagementClient } from "../src/azureQuantumManagementClient";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("quantum test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AzureQuantumManagementClient;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new AzureQuantumManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus2euap";
    resourceGroup = "myjstest";
    resourcename = "resource-test1";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("workspaces create test", async function () {
    const res = await client.workspaces.beginCreateOrUpdateAndWait(
      resourceGroup,
      resourcename,
      {
        location,
        properties: {
          providers: [
            {
              providerId: "microsoft-qc",
              providerSku: "learn-and-develop",
            },
          ],
          storageAccount:
            "/subscriptions/" +
            subscriptionId +
            "/resourcegroups/" +
            resourceGroup +
            "/providers/Microsoft.Storage/storageAccounts/czwtestsa",
        },
        identity: { type: "SystemAssigned" },
      },
      testPollingOptions,
    );
    await delay(isPlaybackMode() ? 1000 : 10000);
    assert.equal(res.name, resourcename);
  });

  it("workspaces get test", async function () {
    const res = await client.workspaces.get(resourceGroup, resourcename);
    assert.equal(res.name, resourcename);
  });

  it("workspaces list test", async function () {
    const resArray = new Array();
    for await (const item of client.workspaces.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("workspaces delete test", async function () {
    const resArray = new Array();
    const res = await client.workspaces.beginDeleteAndWait(
      resourceGroup,
      resourcename,
      testPollingOptions,
    );
    for await (const item of client.workspaces.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
