/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  RecommendedSensitivityLabelUpdateList,
  RecommendedSensitivityLabelsUpdateOptionalParams,
} from "../models/index.js";

/** Interface representing a RecommendedSensitivityLabels. */
export interface RecommendedSensitivityLabels {
  /**
   * Update recommended sensitivity labels states of a given database using an operations batch.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param parameters A list of recommended sensitivity label update operations.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: RecommendedSensitivityLabelUpdateList,
    options?: RecommendedSensitivityLabelsUpdateOptionalParams,
  ): Promise<void>;
}
