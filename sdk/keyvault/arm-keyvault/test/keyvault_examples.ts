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
import { KeyVaultManagementClient } from "../src/keyVaultManagementClient";

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

describe("Keyvault test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: KeyVaultManagementClient;
  let location: string;
  let resourceGroup: string;
  let vaultName: string;
  let tenantId: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    tenantId = env.AZURE_TENANT_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new KeyVaultManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    resourceGroup = "myjstest";
    vaultName = "myvaultzzzz" + "231019";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("vaults create test", async function () {
    const res = await client.vaults.beginCreateOrUpdateAndWait(
      resourceGroup,
      vaultName,
      {
        location: "eastus",
        properties: {
          tenantId: tenantId,
          sku: {
            family: "A",
            name: "standard",
          },
          accessPolicies: [
            {
              tenantId: tenantId,
              objectId: "00000000-0000-0000-0000-000000000000",
              permissions: {
                keys: [
                  "encrypt",
                  "decrypt",
                  "wrapKey",
                  "unwrapKey",
                  "sign",
                  "verify",
                  "get",
                  "list",
                  "create",
                  "update",
                  "import",
                  "delete",
                  "backup",
                  "restore",
                  "recover",
                  "purge",
                ],
                secrets: ["get", "list", "set", "delete", "backup", "restore", "recover", "purge"],
                certificates: [
                  "get",
                  "list",
                  "delete",
                  "create",
                  "import",
                  "update",
                  "managecontacts",
                  "getissuers",
                  "listissuers",
                  "setissuers",
                  "deleteissuers",
                  "manageissuers",
                  "recover",
                  "purge",
                ],
              },
            },
          ],
          enabledForDeployment: true,
          enabledForDiskEncryption: true,
          enabledForTemplateDeployment: true,
        },
      },
      testPollingOptions,
    );
    assert.equal(res.name, vaultName);
  });

  it("vaults get test", async function () {
    if (isPlaybackMode()) {
      this.skip();
    }

    const res = await client.vaults.get(resourceGroup, vaultName);
    assert.equal(res.name, vaultName);
  });

  it("vaults list test", async function () {
    if (isPlaybackMode()) {
      this.skip();
    }
    const resArray = new Array();
    for await (const item of client.vaults.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("vaults update test", async function () {
    const res = await client.vaults.update(resourceGroup, vaultName, {
      properties: {
        tenantId: tenantId,
        sku: {
          family: "A",
          name: "standard",
        },
        accessPolicies: [
          {
            tenantId: tenantId,
            objectId: "00000000-0000-0000-0000-000000000000",
            permissions: {
              keys: [
                "encrypt",
                "decrypt",
                "wrapKey",
                "unwrapKey",
                "sign",
                "verify",
                "get",
                "list",
                "create",
                "update",
                "import",
                "delete",
                "backup",
                "restore",
                "recover",
                "purge",
              ],
              secrets: ["get", "list", "set", "delete", "backup", "restore", "recover", "purge"],
              certificates: [
                "get",
                "list",
                "delete",
                "create",
                "import",
                "update",
                "managecontacts",
                "getissuers",
                "listissuers",
                "setissuers",
                "deleteissuers",
                "manageissuers",
                "recover",
                "purge",
              ],
            },
          },
        ],
        enabledForDeployment: true,
        enabledForDiskEncryption: true,
        enabledForTemplateDeployment: true,
      },
    });
    assert.equal(res.type, "Microsoft.KeyVault/vaults");
  });

  it("vaults delete test", async function () {
    const res = await client.vaults.delete(resourceGroup, vaultName);
    const resArray = new Array();
    for await (const item of client.vaults.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
