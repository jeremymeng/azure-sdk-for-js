/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  JitRequestsGetOptionalParams,
  JitRequestsGetResponse,
  JitRequestDefinition,
  JitRequestsCreateOrUpdateOptionalParams,
  JitRequestsCreateOrUpdateResponse,
  JitRequestPatchable,
  JitRequestsUpdateOptionalParams,
  JitRequestsUpdateResponse,
  JitRequestsDeleteOptionalParams,
  JitRequestsListBySubscriptionOptionalParams,
  JitRequestsListBySubscriptionResponse,
  JitRequestsListByResourceGroupOptionalParams,
  JitRequestsListByResourceGroupResponse
} from "../models/index.js";

/** Interface representing a JitRequests. */
export interface JitRequests {
  /**
   * Gets the JIT request.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jitRequestName The name of the JIT request.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    jitRequestName: string,
    options?: JitRequestsGetOptionalParams
  ): Promise<JitRequestsGetResponse>;
  /**
   * Creates or updates the JIT request.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jitRequestName The name of the JIT request.
   * @param parameters Parameters supplied to the update JIT request.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    jitRequestName: string,
    parameters: JitRequestDefinition,
    options?: JitRequestsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<JitRequestsCreateOrUpdateResponse>,
      JitRequestsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates the JIT request.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jitRequestName The name of the JIT request.
   * @param parameters Parameters supplied to the update JIT request.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    jitRequestName: string,
    parameters: JitRequestDefinition,
    options?: JitRequestsCreateOrUpdateOptionalParams
  ): Promise<JitRequestsCreateOrUpdateResponse>;
  /**
   * Updates the JIT request.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jitRequestName The name of the JIT request.
   * @param parameters Parameters supplied to the update JIT request.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    jitRequestName: string,
    parameters: JitRequestPatchable,
    options?: JitRequestsUpdateOptionalParams
  ): Promise<JitRequestsUpdateResponse>;
  /**
   * Deletes the JIT request.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jitRequestName The name of the JIT request.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    jitRequestName: string,
    options?: JitRequestsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Lists all JIT requests within the subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: JitRequestsListBySubscriptionOptionalParams
  ): Promise<JitRequestsListBySubscriptionResponse>;
  /**
   * Lists all JIT requests within the resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: JitRequestsListByResourceGroupOptionalParams
  ): Promise<JitRequestsListByResourceGroupResponse>;
}
