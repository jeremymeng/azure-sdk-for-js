/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { RoleManagementPolicies } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AuthorizationManagementClient } from "../authorizationManagementClient.js";
import {
  RoleManagementPolicy,
  RoleManagementPoliciesListForScopeNextOptionalParams,
  RoleManagementPoliciesListForScopeOptionalParams,
  RoleManagementPoliciesListForScopeResponse,
  RoleManagementPoliciesGetOptionalParams,
  RoleManagementPoliciesGetResponse,
  RoleManagementPoliciesUpdateOptionalParams,
  RoleManagementPoliciesUpdateResponse,
  RoleManagementPoliciesDeleteOptionalParams,
  RoleManagementPoliciesListForScopeNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing RoleManagementPolicies operations. */
export class RoleManagementPoliciesImpl implements RoleManagementPolicies {
  private readonly client: AuthorizationManagementClient;

  /**
   * Initialize a new instance of the class RoleManagementPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: AuthorizationManagementClient) {
    this.client = client;
  }

  /**
   * Gets role management policies for a resource scope.
   * @param scope The scope of the role management policy.
   * @param options The options parameters.
   */
  public listForScope(
    scope: string,
    options?: RoleManagementPoliciesListForScopeOptionalParams
  ): PagedAsyncIterableIterator<RoleManagementPolicy> {
    const iter = this.listForScopePagingAll(scope, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listForScopePagingPage(scope, options, settings);
      }
    };
  }

  private async *listForScopePagingPage(
    scope: string,
    options?: RoleManagementPoliciesListForScopeOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<RoleManagementPolicy[]> {
    let result: RoleManagementPoliciesListForScopeResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listForScope(scope, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listForScopeNext(scope, continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listForScopePagingAll(
    scope: string,
    options?: RoleManagementPoliciesListForScopeOptionalParams
  ): AsyncIterableIterator<RoleManagementPolicy> {
    for await (const page of this.listForScopePagingPage(scope, options)) {
      yield* page;
    }
  }

  /**
   * Get the specified role management policy for a resource scope
   * @param scope The scope of the role management policy.
   * @param roleManagementPolicyName The name (guid) of the role management policy to get.
   * @param options The options parameters.
   */
  get(
    scope: string,
    roleManagementPolicyName: string,
    options?: RoleManagementPoliciesGetOptionalParams
  ): Promise<RoleManagementPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      { scope, roleManagementPolicyName, options },
      getOperationSpec
    );
  }

  /**
   * Update a role management policy
   * @param scope The scope of the role management policy to upsert.
   * @param roleManagementPolicyName The name (guid) of the role management policy to upsert.
   * @param parameters Parameters for the role management policy.
   * @param options The options parameters.
   */
  update(
    scope: string,
    roleManagementPolicyName: string,
    parameters: RoleManagementPolicy,
    options?: RoleManagementPoliciesUpdateOptionalParams
  ): Promise<RoleManagementPoliciesUpdateResponse> {
    return this.client.sendOperationRequest(
      { scope, roleManagementPolicyName, parameters, options },
      updateOperationSpec
    );
  }

  /**
   * Delete a role management policy
   * @param scope The scope of the role management policy to upsert.
   * @param roleManagementPolicyName The name (guid) of the role management policy to upsert.
   * @param options The options parameters.
   */
  delete(
    scope: string,
    roleManagementPolicyName: string,
    options?: RoleManagementPoliciesDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, roleManagementPolicyName, options },
      deleteOperationSpec
    );
  }

  /**
   * Gets role management policies for a resource scope.
   * @param scope The scope of the role management policy.
   * @param options The options parameters.
   */
  private _listForScope(
    scope: string,
    options?: RoleManagementPoliciesListForScopeOptionalParams
  ): Promise<RoleManagementPoliciesListForScopeResponse> {
    return this.client.sendOperationRequest(
      { scope, options },
      listForScopeOperationSpec
    );
  }

  /**
   * ListForScopeNext
   * @param scope The scope of the role management policy.
   * @param nextLink The nextLink from the previous successful call to the ListForScope method.
   * @param options The options parameters.
   */
  private _listForScopeNext(
    scope: string,
    nextLink: string,
    options?: RoleManagementPoliciesListForScopeNextOptionalParams
  ): Promise<RoleManagementPoliciesListForScopeNextResponse> {
    return this.client.sendOperationRequest(
      { scope, nextLink, options },
      listForScopeNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleManagementPolicy
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.scope,
    Parameters.roleManagementPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.RoleManagementPolicy
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.scope,
    Parameters.roleManagementPolicyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.scope,
    Parameters.roleManagementPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listForScopeOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/roleManagementPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleManagementPolicyListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.$host, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};
const listForScopeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleManagementPolicyListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};
