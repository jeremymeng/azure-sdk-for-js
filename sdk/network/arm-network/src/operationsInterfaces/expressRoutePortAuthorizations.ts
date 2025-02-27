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
  ExpressRoutePortAuthorization,
  ExpressRoutePortAuthorizationsListOptionalParams,
  ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ExpressRoutePortAuthorizationsGetOptionalParams,
  ExpressRoutePortAuthorizationsGetResponse,
  ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRoutePortAuthorizationsCreateOrUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ExpressRoutePortAuthorizations. */
export interface ExpressRoutePortAuthorizations {
  /**
   * Gets all authorizations in an express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortAuthorizationsListOptionalParams,
  ): PagedAsyncIterableIterator<ExpressRoutePortAuthorization>;
  /**
   * Deletes the specified authorization from the specified express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param authorizationName The name of the authorization.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes the specified authorization from the specified express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param authorizationName The name of the authorization.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets the specified authorization from the specified express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param authorizationName The name of the authorization.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    options?: ExpressRoutePortAuthorizationsGetOptionalParams,
  ): Promise<ExpressRoutePortAuthorizationsGetResponse>;
  /**
   * Creates or updates an authorization in the specified express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param authorizationName The name of the authorization.
   * @param authorizationParameters Parameters supplied to the create or update express route port
   *                                authorization operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    authorizationParameters: ExpressRoutePortAuthorization,
    options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ExpressRoutePortAuthorizationsCreateOrUpdateResponse>,
      ExpressRoutePortAuthorizationsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates an authorization in the specified express route port.
   * @param resourceGroupName The name of the resource group.
   * @param expressRoutePortName The name of the express route port.
   * @param authorizationName The name of the authorization.
   * @param authorizationParameters Parameters supplied to the create or update express route port
   *                                authorization operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    expressRoutePortName: string,
    authorizationName: string,
    authorizationParameters: ExpressRoutePortAuthorization,
    options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams,
  ): Promise<ExpressRoutePortAuthorizationsCreateOrUpdateResponse>;
}
