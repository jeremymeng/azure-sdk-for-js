// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as msRest from "@azure/ms-rest-js";
import { Vaults, KeyVaultManagementClientContext } from "@azure/arm-keyvault";
import { ResourceGroups, ResourceManagementClientContext } from "@azure/arm-resources";
import { getUniqueName } from './utils.common';

const subscriptionId = process.env["SUBSCRIPTION_ID"];

export async function createResourceGroup(
  credentials: msRest.ServiceClientCredentials,
  resourceGoupName: string,
  location: string) {
  if (!subscriptionId) {
    throw new Error(
      `${subscriptionId} environment variable not specified.`
    )
  };

  const client = new ResourceManagementClientContext(credentials, subscriptionId);
  const resourceGroups = new ResourceGroups(client);

  const response = await resourceGroups.createOrUpdate(resourceGoupName, { location: location });
  console.log(response);
}

export async function createVaults(
  credentials: msRest.ServiceClientCredentials,
  resourceGroupName: string,
  vaultName: string,
  location: string) {
  if (!subscriptionId) {
    throw new Error(
      `${subscriptionId} environment variable not specified.`
    )
  };

  const client = new KeyVaultManagementClientContext(credentials, subscriptionId);
  const vaults = new Vaults(client);

  const response = await vaults.createOrUpdate(resourceGroupName, vaultName, {
    location: location,
    properties: {
      tenantId: process.env["TENANT_ID"] || "",
      sku: {
        name: "standard"
      },
      accessPolicies: [
        {
          tenantId: process.env["TENANT_ID"] || "",
          objectId: process.env["CLIENT_ID"] || "",
          permissions: {
            secrets: [
              "get",
              "list",
              "set",
              "delete",
              "backup",
              "restore",
              "recover",
              "purge"
            ]
          }
        }
      ]
    }
  });
  console.log(response);
}
