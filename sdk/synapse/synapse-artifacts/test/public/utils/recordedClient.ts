// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Context } from "mocha";

import {
  env,
  Recorder,
  record,
  RecorderEnvironmentSetup,
  isPlaybackMode
} from "@azure/test-utils-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";

import { ArtifactsClient, ArtifactsClientOptionalParams } from "../../../src";
import "./env";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  TEXT_ANALYTICS_API_KEY: "api_key",
  // Second API key
  TEXT_ANALYTICS_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://testaccount.dev.azuresynapse.net"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording
        .replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`)
        .replace(/scope=https(.+?)(&+|$)/, `scope=https%3A%2F%2Fsanitized%2F$2`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace(
        "testaccount.dev.azuresynapse.net:443",
        "testaccount.dev.azuresynapse.net"
      );
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export function createClient(options?: ArtifactsClientOptionalParams): ArtifactsClient {
  let credential: TokenCredential;

  credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );

  const updatedOptions = isPlaybackMode()
    ? {
        ...options,
        credentialScopes: "https://sanitized/"
      }
    : options;
  return new ArtifactsClient(credential, env.ENDPOINT, updatedOptions);
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}
