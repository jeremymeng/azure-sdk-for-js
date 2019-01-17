/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/backupFabricsMappers";
import * as Parameters from "../models/parameters";
import { RecoveryServicesBackupClientContext } from "../recoveryServicesBackupClientContext";

/** Class representing a BackupFabrics. */
export class BackupFabrics {
  private readonly client: RecoveryServicesBackupClientContext;

  /**
   * Create a BackupFabrics.
   * @param {RecoveryServicesBackupClientContext} client Reference to the service client.
   */
  constructor(client: RecoveryServicesBackupClientContext) {
    this.client = client;
  }

  /**
   * Retruns backup fabrics registered to Recovery Services Vault. Returns a pageable list of
   * fabrics.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param [options] The optional parameters
   * @returns Promise<Models.BackupFabricsListResponse>
   */
  list(vaultName: string, resourceGroupName: string, options?: Models.BackupFabricsListOptionalParams): Promise<Models.BackupFabricsListResponse>;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param callback The callback
   */
  list(vaultName: string, resourceGroupName: string, callback: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): void;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(vaultName: string, resourceGroupName: string, options: Models.BackupFabricsListOptionalParams, callback: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): void;
  list(vaultName: string, resourceGroupName: string, options?: Models.BackupFabricsListOptionalParams | msRest.ServiceCallback<Models.GenericBackupFabricResourceList>, callback?: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): Promise<Models.BackupFabricsListResponse> {
    return this.client.sendOperationRequest(
      {
        vaultName,
        resourceGroupName,
        options
      },
      listOperationSpec,
      callback) as Promise<Models.BackupFabricsListResponse>;
  }

  /**
   * Returns backup fabric registered to Recovery Services Vault.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param [options] The optional parameters
   * @returns Promise<Models.BackupFabricsGetResponse>
   */
  get(vaultName: string, resourceGroupName: string, fabricName: string, options?: Models.BackupFabricsGetOptionalParams): Promise<Models.BackupFabricsGetResponse>;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param callback The callback
   */
  get(vaultName: string, resourceGroupName: string, fabricName: string, callback: msRest.ServiceCallback<Models.GenericBackupFabricResource>): void;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(vaultName: string, resourceGroupName: string, fabricName: string, options: Models.BackupFabricsGetOptionalParams, callback: msRest.ServiceCallback<Models.GenericBackupFabricResource>): void;
  get(vaultName: string, resourceGroupName: string, fabricName: string, options?: Models.BackupFabricsGetOptionalParams | msRest.ServiceCallback<Models.GenericBackupFabricResource>, callback?: msRest.ServiceCallback<Models.GenericBackupFabricResource>): Promise<Models.BackupFabricsGetResponse> {
    return this.client.sendOperationRequest(
      {
        vaultName,
        resourceGroupName,
        fabricName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.BackupFabricsGetResponse>;
  }

  /**
   * Create or Update the backup fabric in Recovery Services Vault
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param parameters fabric resource item
   * @param [options] The optional parameters
   * @returns Promise<Models.BackupFabricsCreateOrUpdateResponse>
   */
  createOrUpdate(vaultName: string, resourceGroupName: string, fabricName: string, parameters: Models.GenericBackupFabricResource, options?: msRest.RequestOptionsBase): Promise<Models.BackupFabricsCreateOrUpdateResponse>;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param parameters fabric resource item
   * @param callback The callback
   */
  createOrUpdate(vaultName: string, resourceGroupName: string, fabricName: string, parameters: Models.GenericBackupFabricResource, callback: msRest.ServiceCallback<Models.GenericBackupFabricResource>): void;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param parameters fabric resource item
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(vaultName: string, resourceGroupName: string, fabricName: string, parameters: Models.GenericBackupFabricResource, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.GenericBackupFabricResource>): void;
  createOrUpdate(vaultName: string, resourceGroupName: string, fabricName: string, parameters: Models.GenericBackupFabricResource, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.GenericBackupFabricResource>, callback?: msRest.ServiceCallback<Models.GenericBackupFabricResource>): Promise<Models.BackupFabricsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        vaultName,
        resourceGroupName,
        fabricName,
        parameters,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.BackupFabricsCreateOrUpdateResponse>;
  }

  /**
   * Deletes the backup fabric in Recovery Services Vault
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(vaultName: string, resourceGroupName: string, fabricName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param callback The callback
   */
  deleteMethod(vaultName: string, resourceGroupName: string, fabricName: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param fabricName Name of the backup backup fabric.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(vaultName: string, resourceGroupName: string, fabricName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteMethod(vaultName: string, resourceGroupName: string, fabricName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        vaultName,
        resourceGroupName,
        fabricName,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Retruns backup fabrics registered to Recovery Services Vault. Returns a pageable list of
   * fabrics.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.BackupFabricsListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.BackupFabricsListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.GenericBackupFabricResourceList>, callback?: msRest.ServiceCallback<Models.GenericBackupFabricResourceList>): Promise<Models.BackupFabricsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.BackupFabricsListNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics",
  urlParameters: [
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion0,
    Parameters.filter,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.GenericBackupFabricResourceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}",
  urlParameters: [
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.fabricName
  ],
  queryParameters: [
    Parameters.apiVersion0,
    Parameters.filter,
    Parameters.skipToken
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.GenericBackupFabricResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}",
  urlParameters: [
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.fabricName
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.GenericBackupFabricResource,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.GenericBackupFabricResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}",
  urlParameters: [
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.fabricName
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.GenericBackupFabricResourceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
