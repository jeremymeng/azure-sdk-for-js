// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenCredential, NamedKeyCredential } from "../../../src/auth/sasTokenCredential.js";
import { describe, it, assert, beforeEach } from "vitest";

describe("SasTokenCredential", () => {
  let sasTokenCredential: SasTokenCredential;
  let namedKeyCredential: NamedKeyCredential;

  beforeEach(() => {
    namedKeyCredential = { sharedAccessKeyName: "testKeyName", sharedAccessKey: "testKeyValue" };
    sasTokenCredential = new SasTokenCredential(namedKeyCredential);
  });

  it("should create an instance of SasTokenCredential", () => {
    assert.instanceOf(sasTokenCredential, SasTokenCredential);
  });

  it("should return a token for one scope", async () => {
    const token = await sasTokenCredential.getToken("testScope");
    assert.isDefined(token);
    assert.isDefined(token?.token);
    assert.isDefined(token?.expiresOnTimestamp);
    assert.ok(token.expiresOnTimestamp > Date.now() / 1000);
    assert.ok(token.token.includes("SharedAccessSignature sr="));
  });

  it("should return a token for multiple scopes", async () => {
    const token = await sasTokenCredential.getToken(["testScope1", "testScope2"]);
    assert.isDefined(token);
    assert.isDefined(token?.token);
    assert.isDefined(token?.expiresOnTimestamp);
    assert.ok(token.expiresOnTimestamp > Date.now() / 1000);
    assert.ok(token.token.includes("SharedAccessSignature sr="));
  });
});
