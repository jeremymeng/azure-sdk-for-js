// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { MetricsAdvisorKeyCredential } from "../../src";

describe("MetricsAdvisorKeyCredential", () => {
  let credential: MetricsAdvisorKeyCredential;

  beforeEach(function() {
    credential = new MetricsAdvisorKeyCredential("key1", "key2");
  });

  it("update subscriptionKey", async function() {
    const newSubscriptionKey = "Abc";
    credential.updateKey({ subscriptionKey: newSubscriptionKey });
    assert.equal(credential.subscriptionKey, newSubscriptionKey);
  });

  it("update apiKey", async function() {
    const newApiKey = "Abcdef";
    credential.updateKey({ apiKey: newApiKey });
    assert.equal(credential.apiKey, newApiKey);
  });
});
