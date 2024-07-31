/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BackupResourceVaultConfigs } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { RecoveryServicesBackupClient } from "../recoveryServicesBackupClient";
import {
  BackupResourceVaultConfigsGetOptionalParams,
  BackupResourceVaultConfigsGetResponse,
  BackupResourceVaultConfigResource,
  BackupResourceVaultConfigsUpdateOptionalParams,
  BackupResourceVaultConfigsUpdateResponse,
  BackupResourceVaultConfigsPutOptionalParams,
  BackupResourceVaultConfigsPutResponse,
} from "../models";

/** Class containing BackupResourceVaultConfigs operations. */
export class BackupResourceVaultConfigsImpl
  implements BackupResourceVaultConfigs
{
  private readonly client: RecoveryServicesBackupClient;

  /**
   * Initialize a new instance of the class BackupResourceVaultConfigs class.
   * @param client Reference to the service client
   */
  constructor(client: RecoveryServicesBackupClient) {
    this.client = client;
  }

  /**
   * Fetches resource vault config.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param options The options parameters.
   */
  get(
    vaultName: string,
    resourceGroupName: string,
    options?: BackupResourceVaultConfigsGetOptionalParams,
  ): Promise<BackupResourceVaultConfigsGetResponse> {
    return this.client.sendOperationRequest(
      { vaultName, resourceGroupName, options },
      getOperationSpec,
    );
  }

  /**
   * Updates vault security config.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param parameters resource config request
   * @param options The options parameters.
   */
  update(
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceVaultConfigResource,
    options?: BackupResourceVaultConfigsUpdateOptionalParams,
  ): Promise<BackupResourceVaultConfigsUpdateResponse> {
    return this.client.sendOperationRequest(
      { vaultName, resourceGroupName, parameters, options },
      updateOperationSpec,
    );
  }

  /**
   * Updates vault security config.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param parameters resource config request
   * @param options The options parameters.
   */
  put(
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceVaultConfigResource,
    options?: BackupResourceVaultConfigsPutOptionalParams,
  ): Promise<BackupResourceVaultConfigsPutResponse> {
    return this.client.sendOperationRequest(
      { vaultName, resourceGroupName, parameters, options },
      putOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupResourceVaultConfigResource,
    },
    default: {
      bodyMapper: Mappers.NewErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.BackupResourceVaultConfigResource,
    },
    default: {
      bodyMapper: Mappers.NewErrorResponse,
    },
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.xMsAuthorizationAuxiliary,
  ],
  mediaType: "json",
  serializer,
};
const putOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupconfig/vaultconfig",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BackupResourceVaultConfigResource,
    },
    default: {
      bodyMapper: Mappers.NewErrorResponse,
    },
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.xMsAuthorizationAuxiliary,
  ],
  mediaType: "json",
  serializer,
};
