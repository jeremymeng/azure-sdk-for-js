/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { RestorableTimeRanges } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DataProtectionClient } from "../dataProtectionClient";
import {
  AzureBackupFindRestorableTimeRangesRequest,
  RestorableTimeRangesFindOptionalParams,
  RestorableTimeRangesFindResponse
} from "../models";

/** Class containing RestorableTimeRanges operations. */
export class RestorableTimeRangesImpl implements RestorableTimeRanges {
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class RestorableTimeRanges class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * @param resourceGroupName The name of the resource group where the backup vault is present.
   * @param vaultName The name of the backup vault.
   * @param backupInstanceName The name of the backup instance
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  find(
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: AzureBackupFindRestorableTimeRangesRequest,
    options?: RestorableTimeRangesFindOptionalParams
  ): Promise<RestorableTimeRangesFindResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, backupInstanceName, parameters, options },
      findOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const findOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/findRestorableTimeRanges",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AzureBackupFindRestorableTimeRangesResponseResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters12,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.backupInstanceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
