/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { WebPubSubManagementClient } from "../src/webPubSubManagementClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

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

describe("webPubSub test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: WebPubSubManagementClient;
  let location: string;
  let resourceGroup: string;
  let resourceName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new WebPubSubManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    resourceGroup = "myjstest";
    resourceName = "myWebPubSubService1";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("checkname test", async () => {
    assert(true);
  });

  it("webPubSub create test", async () => {
    const res = await client.webPubSub.beginCreateOrUpdateAndWait(
      resourceGroup,
      resourceName,
      {
        disableAadAuth: false,
        disableLocalAuth: false,
        identity: { type: "SystemAssigned" },
        liveTraceConfiguration: {
          categories: [{ name: "ConnectivityLogs", enabled: "true" }],
          enabled: "false",
        },
        location,
        publicNetworkAccess: "Enabled",
        sku: { name: "Free_F1", capacity: 1, tier: "Free" },
        tags: { key1: "value1" },
        tls: { clientCertEnabled: false },
      },
      testPollingOptions,
    );
    assert.equal(res.name, resourceName);
  });

  it("webPubSub get test", async () => {
    const res = await client.webPubSub.get(resourceGroup, resourceName);
    assert.equal(res.name, resourceName);
  });

  it("webPubSub list test", async () => {
    const resArray = new Array();
    for await (const item of client.webPubSub.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("webPubSub delete test", async () => {
    const resArray = new Array();
    for await (const item of client.webPubSub.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
