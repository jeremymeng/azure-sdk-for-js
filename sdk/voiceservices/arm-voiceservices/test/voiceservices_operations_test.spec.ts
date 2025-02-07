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
import { MicrosoftVoiceServices } from "../src/microsoftVoiceServices.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
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

describe("voiceservices test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: MicrosoftVoiceServices;
  let location: string;
  let resourceGroup: string;
  let communicationsGatewayName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new MicrosoftVoiceServices(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "westcentralus";
    resourceGroup = "czwjstest";
    communicationsGatewayName = "mycgtest6"; // if you got this error message"Existing entry found in CosmosDB for new resource mycgtest - reject the request" when creating, use a new name to create
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("communicationsGateways create test", async () => {
    const res = await client.communicationsGateways.beginCreateOrUpdateAndWait(
      resourceGroup,
      communicationsGatewayName,
      {
        autoGeneratedDomainNameLabelScope: "NoReuse",
        codecs: ["PCMA"],
        connectivity: "PublicAddress",
        e911Type: "Standard",
        location,
        platforms: ["OperatorConnect"],
        serviceLocations: [
          {
            name: location,
            primaryRegionProperties: {
              allowedMediaSourceAddressPrefixes: ["10.1.2.0/24"],
              allowedSignalingSourceAddressPrefixes: ["10.1.1.0/24"],
              operatorAddresses: ["198.51.100.1"],
            },
          },
          {
            name: "eastus2",
            primaryRegionProperties: {
              allowedMediaSourceAddressPrefixes: ["10.2.2.0/24"],
              allowedSignalingSourceAddressPrefixes: ["10.2.1.0/24"],
              operatorAddresses: ["198.51.100.2"],
            },
          },
        ],
        teamsVoicemailPilotNumber: "1234567890",
      },
      testPollingOptions,
    );
    assert.equal(res.name, communicationsGatewayName);
  });

  it("communicationsGateways get test", async () => {
    const res = await client.communicationsGateways.get(resourceGroup, communicationsGatewayName);
    assert.equal(res.name, communicationsGatewayName);
  });

  it("communicationsGateways list test", async () => {
    const resArray = new Array();
    for await (const item of client.communicationsGateways.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("communicationsGateways delete test", async () => {
    const resArray = new Array();
    for await (const item of client.communicationsGateways.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
