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
import { NetworkManagementClient } from "../src/networkManagementClient";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
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

describe("Network test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: NetworkManagementClient;
  let location: string;
  let resourceGroupName: string;
  let virtualNetworkName: string;
  let subnetName: string;
  let ipGroupName: string;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new NetworkManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    resourceGroupName = "myjstest";
    virtualNetworkName = "virtualnetworkzzz";
    subnetName = "subnetzzz";
    ipGroupName = "ipgroupyyy";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("operations list test", async function () {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });

  it("virtualNetworks create test", async function () {
    const res = await client.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualNetworkName,
      {
        addressSpace: {
          addressPrefixes: ["10.0.0.0/16"],
        },
        location: "eastus",
      },
      testPollingOptions,
    );
  });

  it("subnets create test", async function () {
    const res = await client.subnets.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      { addressPrefix: "10.0.0.0/24" },
      testPollingOptions,
    );
  });

  it("ipGroups create test", async function () {
    const res = await client.ipGroups.beginCreateOrUpdateAndWait(
      resourceGroupName,
      virtualNetworkName,
      {
        tags: {
          key1: "value1",
        },
        location: "eastus",
        ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"],
      },
      testPollingOptions,
    );
  });

  it("virtualNetworks get test", async function () {
    const res = await client.virtualNetworks.get(resourceGroupName, virtualNetworkName);
    assert.equal(res.name, virtualNetworkName);
  });

  it("subnets get test", async function () {
    const res = await client.subnets.get(resourceGroupName, virtualNetworkName, subnetName);
    assert.equal(res.name, subnetName);
  });

  it("ipGroups get test", async function () {
    const res = await client.ipGroups.get(resourceGroupName, virtualNetworkName);
    assert.equal(res.type, "Microsoft.Network/IpGroups");
  });

  it("virtualNetworks list test", async function () {
    const resArray = new Array();
    for await (const item of client.virtualNetworks.list(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("subnets list test", async function () {
    const resArray = new Array();
    for await (const item of client.subnets.list(resourceGroupName, virtualNetworkName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("ipGroups list test", async function () {
    const resArray = new Array();
    for await (const item of client.ipGroups.listByResourceGroup(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("virtualNetworks updatetags test", async function () {
    const res = await client.virtualNetworks.updateTags(resourceGroupName, virtualNetworkName, {
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.equal(res.name, virtualNetworkName);
  });

  it("ipGroups beginDeleteAndWait test", async function () {
    const res = await client.ipGroups.beginDeleteAndWait(
      resourceGroupName,
      virtualNetworkName,
      testPollingOptions,
    );
    const resArray = new Array();
    for await (const item of client.ipGroups.listByResourceGroup(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("subnets beginDeleteAndWait test", async function () {
    const res = await client.subnets.beginDeleteAndWait(
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      testPollingOptions,
    );
    const resArray = new Array();
    for await (const item of client.subnets.list(resourceGroupName, virtualNetworkName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("virtualNetworks beginDeleteAndWait test", async function () {
    const res = await client.virtualNetworks.beginDeleteAndWait(
      resourceGroupName,
      virtualNetworkName,
      testPollingOptions,
    );
    const resArray = new Array();
    for await (const item of client.virtualNetworks.list(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
