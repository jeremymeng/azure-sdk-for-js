/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { DetachTrafficFilterUpdateOptionalParams } from "../models/index.js";

/** Interface representing a DetachTrafficFilter. */
export interface DetachTrafficFilter {
  /**
   * Detach traffic filter for the given deployment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Detach traffic filter for the given deployment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ): Promise<void>;
}
