/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ProtectionPolicyOperationStatuses } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { RecoveryServicesBackupClient } from "../recoveryServicesBackupClient.js";
import {
  ProtectionPolicyOperationStatusesGetOptionalParams,
  ProtectionPolicyOperationStatusesGetResponse,
} from "../models/index.js";

/** Class containing ProtectionPolicyOperationStatuses operations. */
export class ProtectionPolicyOperationStatusesImpl
  implements ProtectionPolicyOperationStatuses
{
  private readonly client: RecoveryServicesBackupClient;

  /**
   * Initialize a new instance of the class ProtectionPolicyOperationStatuses class.
   * @param client Reference to the service client
   */
  constructor(client: RecoveryServicesBackupClient) {
    this.client = client;
  }

  /**
   * Provides the status of the asynchronous operations like backup, restore. The status can be in
   * progress, completed
   * or failed. You can refer to the Operation Status enum for all the possible states of an operation.
   * Some operations
   * create jobs. This method returns the list of jobs associated with operation.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param policyName Backup policy name whose operation's status needs to be fetched.
   * @param operationId Operation ID which represents an operation whose status needs to be fetched.
   * @param options The options parameters.
   */
  get(
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    operationId: string,
    options?: ProtectionPolicyOperationStatusesGetOptionalParams,
  ): Promise<ProtectionPolicyOperationStatusesGetResponse> {
    return this.client.sendOperationRequest(
      { vaultName, resourceGroupName, policyName, operationId, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}/operations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationStatus,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.operationId,
    Parameters.policyName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
