/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationsStatusGetOptionalParams,
  OperationsStatusGetResponse
} from "../models/index.js";

/** Interface representing a OperationsStatus. */
export interface OperationsStatus {
  /**
   * Gets the details of a specified job on a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param name The job name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: OperationsStatusGetOptionalParams
  ): Promise<OperationsStatusGetResponse>;
}
