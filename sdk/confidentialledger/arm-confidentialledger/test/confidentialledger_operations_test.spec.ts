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
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { ConfidentialLedgerClient } from "../src/confidentialLedgerClient.js";
import { describe, it, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
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

describe("ConfidentialLedger test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new ConfidentialLedgerClient(credential, subscriptionId, recorder.configureClientOptions({}));

  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("operation list test", async function () {
    const resArray = new Array();
    for await (let item of client.operations.list()) {
      resArray.push(item);
    }

  });

})
