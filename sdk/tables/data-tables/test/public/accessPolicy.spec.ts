// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";

import { assert, afterEach, beforeEach, describe, it, beforeAll, afterAll, expect } from "vitest";
import { TableClient } from "../../src";
import { createTableClient } from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";

describe.skipIf(!isNode)(`Access Policy operations`, function () {
  let client: TableClient;
  let unrecordedClient: TableClient;
  let recorder: Recorder;
  const tableName = `AccessPolicy`;

  beforeEach(async function() {
    recorder = new Recorder({
      contextType: "vitest",
      testTitle: expect.getState().currentTestName ?? "test",
    });
    client = await createTableClient(tableName, "AccountKey", recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  beforeAll(async function() {
    if (!isPlaybackMode()) {
      unrecordedClient = await createTableClient(tableName, "SASConnectionString");
      await unrecordedClient.createTable();
    }
  });

  afterAll(async function () {
    if (!isPlaybackMode() && isNode) {
      await unrecordedClient.deleteTable();
    }
  });

  it("should send a null AP", async function () {
    const date = new Date("2021-07-08T09:10:09Z");
    await client.setAccessPolicy([
      { id: "null" },
      { id: "empty", accessPolicy: {} },
      { id: "partial", accessPolicy: { permission: "r" } },
      { id: "full", accessPolicy: { start: date, expiry: date, permission: "r" } },
    ]);

    const acl = await client.getAccessPolicy();

    assert.isDefined(acl);
    assert.lengthOf(acl, 4);

    const nullAcl = acl.find((a) => a.id === "null");
    assert.isDefined(nullAcl);
    assert.deepEqual(nullAcl?.accessPolicy, {});

    const emptyAcl = acl.find((a) => a.id === "empty");
    assert.isDefined(emptyAcl);
    assert.deepEqual(emptyAcl?.accessPolicy, {});

    const partialAcl = acl.find((a) => a.id === "partial");
    assert.isDefined(partialAcl);
    assert.equal(partialAcl?.accessPolicy?.permission, "r");
    assert.isUndefined(partialAcl?.accessPolicy?.start);
    assert.isUndefined(partialAcl?.accessPolicy?.expiry);

    const fullAcl = acl.find((a) => a.id === "full");
    assert.isDefined(fullAcl);
    assert.deepEqual(fullAcl?.accessPolicy, { start: date, expiry: date, permission: "r" });
  });
});
