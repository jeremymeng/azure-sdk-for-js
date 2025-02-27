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
import { AzureNetworkFabricManagementServiceAPI } from "../src/azureNetworkFabricManagementServiceAPI.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
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

describe("managednetworkfabric test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AzureNetworkFabricManagementServiceAPI;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new AzureNetworkFabricManagementServiceAPI(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus2euap";
    resourceGroup = "myjstest";
    resourcename = "resourcetest";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("ipPrefixes create test", async () => {
    const res = await client.ipPrefixes.beginCreateAndWait(
      resourceGroup,
      resourcename,
      {
        annotation: "annotation",
        ipPrefixRules: [
          {
            action: "Permit",
            condition: "GreaterThanOrEqualTo",
            networkPrefix: "10.10.10.10/30",
            sequenceNumber: 4155123341,
            subnetMaskLength: "31",
          },
        ],
        location,
        tags: { keyID: "KeyValue" },
      },
      testPollingOptions,
    );
    assert.equal(res.name, resourcename);
  });

  it("ipPrefixes get test", async () => {
    const res = await client.ipPrefixes.get(resourceGroup, resourcename);
    assert.equal(res.name, resourcename);
  });

  it("ipPrefixes list test", async () => {
    const resArray = new Array();
    for await (const item of client.ipPrefixes.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("ipPrefixes delete test", async () => {
    const resArray = new Array();
    for await (const item of client.ipPrefixes.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("operation list test", async () => {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });
});
