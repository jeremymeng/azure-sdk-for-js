// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-use-before-define */
import { assert } from "chai";
import {
  getCurrentVersion,
  isVersionInSupportedRange,
  onVersions,
  testServiceVersions
} from "../src/multiVersion";

describe.skip("Multi-service-version test support", () => {
  const allVersions = ["1.0", "1.1", "1.2"];
  describe("isVersionInSupportedRange() on version list", () => {
    [
      { currentVersion: "1.0", supported: ["1.0", "1.1"], expected: true },
      { currentVersion: "1.2", supported: ["1.0", "1.1"], expected: false },
      { currentVersion: "1.0", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.1", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.0", supported: { minVer: "1.1", maxVer: undefined }, expected: false },
      { currentVersion: "1.0", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.1", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.2", supported: { minVer: undefined, maxVer: "1.1" }, expected: false }
    ].forEach((arg) => {
      const { currentVersion, supported, expected } = arg;
      let versions: string;
      if (supported instanceof Array) {
        versions = `[${supported.join()}]`;
      } else {
        versions = `[min ${supported.minVer ?? "<unspecified>"}, max ${supported.maxVer ??
          "<unspecified>"}]`;
      }
      it(`returns ${expected} for ${currentVersion} and supported versions ${versions}`, function() {
        const result = isVersionInSupportedRange(currentVersion, supported, allVersions);
        assert.equal(result.isSupported, expected);
      });
    });
  });
});

testServiceVersions(["7.0", "7.1"]).describe("test suite 1", function() {
  beforeEach(async function() {
    console.log(` beforeEach. testing service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }
  });

  afterEach(async function() {
    console.log(` afterEach. testing service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }
  });

  it("test case 2", function() {
    console.log(` 2. testing service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }
  });

  describe("nested test suite 3", function() {
    console.log(` 3. suite for service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }

    it("nested test 4", function() {
      console.log(` 4. testing service version ${getCurrentVersion(this)}`);
      if (!getCurrentVersion(this)) {
        throw new Error("Expecting valid current version");
      }
    });
  });

  onVersions(["7.0"]).it("test case 5", function() {
    console.log(` 5. testing service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }
  });

  onVersions({ minVer: "7.1" }).it("test case 6", async function() {
    console.log(` 6. testing service version ${getCurrentVersion(this)}`);
    if (!getCurrentVersion(this)) {
      throw new Error("Expecting valid current version");
    }
  });
});
