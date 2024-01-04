// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { ContainerClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils";
import { record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Aborter", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await containerClient.create({ abortSignal: AbortSignal.timeout(1) });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = containerClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await containerClient.create({ abortSignal: aborter.signal });
    aborter.abort();
  });
});
