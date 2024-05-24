/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  TieringCostOperationStatusGetOptionalParams,
  TieringCostOperationStatusGetResponse,
} from "../models";

/** Interface representing a TieringCostOperationStatus. */
export interface TieringCostOperationStatus {
  /**
   * Gets the status of async operations of tiering cost
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param vaultName The name of the recovery services vault.
   * @param operationId
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: TieringCostOperationStatusGetOptionalParams,
  ): Promise<TieringCostOperationStatusGetResponse>;
}
