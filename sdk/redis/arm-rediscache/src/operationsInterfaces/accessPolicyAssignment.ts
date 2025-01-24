/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  RedisCacheAccessPolicyAssignment,
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentCreateUpdateResponse,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
  AccessPolicyAssignmentGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AccessPolicyAssignment. */
export interface AccessPolicyAssignment {
  /**
   * Gets the list of access policy assignments associated with this redis cache
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    cacheName: string,
    options?: AccessPolicyAssignmentListOptionalParams,
  ): PagedAsyncIterableIterator<RedisCacheAccessPolicyAssignment>;
  /**
   * Adds the access policy assignment to the specified users
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param accessPolicyAssignmentName The name of the access policy assignment.
   * @param parameters Parameters supplied to the Create Update Access Policy Assignment operation.
   * @param options The options parameters.
   */
  beginCreateUpdate(
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    parameters: RedisCacheAccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AccessPolicyAssignmentCreateUpdateResponse>,
      AccessPolicyAssignmentCreateUpdateResponse
    >
  >;
  /**
   * Adds the access policy assignment to the specified users
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param accessPolicyAssignmentName The name of the access policy assignment.
   * @param parameters Parameters supplied to the Create Update Access Policy Assignment operation.
   * @param options The options parameters.
   */
  beginCreateUpdateAndWait(
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    parameters: RedisCacheAccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ): Promise<AccessPolicyAssignmentCreateUpdateResponse>;
  /**
   * Deletes the access policy assignment from a redis cache
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param accessPolicyAssignmentName The name of the access policy assignment.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the access policy assignment from a redis cache
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param accessPolicyAssignmentName The name of the access policy assignment.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets the list of assignments for an access policy of a redis cache
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param accessPolicyAssignmentName The name of the access policy assignment.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentGetOptionalParams,
  ): Promise<AccessPolicyAssignmentGetResponse>;
}
