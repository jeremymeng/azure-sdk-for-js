/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureVMwareSolutionAPI } from "../src/azureVMwareSolutionAPI";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id"
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

describe("avs test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AzureVMwareSolutionAPI;
  let location: string;
  let resourceGroup: string;
  let privateCloudName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new AzureVMwareSolutionAPI(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "eastasia";
    resourceGroup = "myjstest";
    privateCloudName = "cloud1";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  //skip private clouds curd function because it costs too long.
  it.skip("privateClouds create test", async function () {
    const res = await client.privateClouds.beginCreateOrUpdateAndWait(
      resourceGroup,
      privateCloudName,
      {
        availability: {
          strategy: "SingleZone"
        },
        identity: { type: "SystemAssigned" },
        location,
        managementCluster: {
          clusterId: 1,
          clusterSize: 3
        },
        networkBlock: "192.168.0.0/16",
        sku: { name: "AV36" },
        tags: {}
      },
      testPollingOptions
    );
    assert.equal(res.name, privateCloudName);
  }).timeout(36000000);

  it.skip("privateClouds get test", async function () {
    const res = await client.privateClouds.get(resourceGroup, privateCloudName);
    assert.equal(res.name, privateCloudName);
  });

  it.skip("privateClouds list test", async function () {
    const resArray = new Array();
    for await (let item of client.privateClouds.listInSubscription()) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);//should be 1,but when testing this test there's 2 resources on portal
  });

  it("operation list test", async function () {
    const resArray = new Array();
    for await (let item of client.operations.list()) {
      resArray.push(item);
    }
  });

  it.skip("privateClouds delete test", async function () {
    const resArray = new Array();
    const res = await client.privateClouds.beginDeleteAndWait(resourceGroup, privateCloudName, testPollingOptions)
    for await (let item of client.privateClouds.listInSubscription()) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
})
