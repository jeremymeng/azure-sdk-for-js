/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  record,
  RecorderEnvironmentSetup,
  Recorder,
  delay,
  isPlaybackMode
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { AttestationManagementClient } from "../src/attestationManagementClient";

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    SUBSCRIPTION_ID: "azure_subscription_id"
  },
  customizationsOnRecordings: [
    (recording: any): any =>
      recording.replace(
        /"access_token":"[^"]*"/g,
        `"access_token":"access_token"`
      )
  ],
  queryParametersToSkip: []
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Attestation test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AttestationManagementClient;
  let location: string;
  let resourceGroup: string;
  let providerName: string;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    subscriptionId = env.SUBSCRIPTION_ID;
    // This is an example of how the environment variables are used
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
    client = new AttestationManagementClient(credential, subscriptionId);
    location = "eastus";
    resourceGroup = "myjstest";
    providerName = "myservicexxx";
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("attestationProviders create test", async function() {
    const res = await client.attestationProviders.create(resourceGroup,providerName,{
        properties: {
            
        },
        location: location
    })
    assert.equal(res.name,providerName);
  });

  it("attestationProviders get test", async function() {
    const res = await client.attestationProviders.get(resourceGroup,providerName)
    assert.equal(res.name,providerName);
  });

  it("attestationProviders list test", async function() {
    const res = await client.attestationProviders.listByResourceGroup(resourceGroup)
    assert.notEqual(res.value?.length,0);
  });

  it("attestationProviders update test", async function() {
    const res = await client.attestationProviders.update(resourceGroup,providerName,{
        tags: {
            tag1: "value1",
            tag2: "value2"
        }
    })
    assert.equal(res.type,"Microsoft.Attestation/attestationProviders")
  });

  it("attestationProviders delete test", async function() {
    const resDelete = await client.attestationProviders.delete(resourceGroup,providerName)
    const res = await client.attestationProviders.listByResourceGroup(resourceGroup)
    assert.equal(res.value?.length,0);
  });
});
