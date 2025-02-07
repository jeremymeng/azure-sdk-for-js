/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { FirewallRules } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { RedisManagementClient } from "../redisManagementClient.js";
import {
  RedisFirewallRule,
  FirewallRulesListNextOptionalParams,
  FirewallRulesListOptionalParams,
  FirewallRulesListResponse,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesCreateOrUpdateResponse,
  FirewallRulesGetOptionalParams,
  FirewallRulesGetResponse,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing FirewallRules operations. */
export class FirewallRulesImpl implements FirewallRules {
  private readonly client: RedisManagementClient;

  /**
   * Initialize a new instance of the class FirewallRules class.
   * @param client Reference to the service client
   */
  constructor(client: RedisManagementClient) {
    this.client = client;
  }

  /**
   * Gets all firewall rules in the specified redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    cacheName: string,
    options?: FirewallRulesListOptionalParams,
  ): PagedAsyncIterableIterator<RedisFirewallRule> {
    const iter = this.listPagingAll(resourceGroupName, cacheName, options);
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
        return this.listPagingPage(
          resourceGroupName,
          cacheName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    cacheName: string,
    options?: FirewallRulesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RedisFirewallRule[]> {
    let result: FirewallRulesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, cacheName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        cacheName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    cacheName: string,
    options?: FirewallRulesListOptionalParams,
  ): AsyncIterableIterator<RedisFirewallRule> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      cacheName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets all firewall rules in the specified redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    cacheName: string,
    options?: FirewallRulesListOptionalParams,
  ): Promise<FirewallRulesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, options },
      listOperationSpec,
    );
  }

  /**
   * Create or update a redis cache firewall rule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param ruleName The name of the firewall rule.
   * @param parameters Parameters supplied to the create or update redis firewall rule operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    parameters: RedisFirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ): Promise<FirewallRulesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, ruleName, parameters, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Gets a single firewall rule in a specified redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param ruleName The name of the firewall rule.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    options?: FirewallRulesGetOptionalParams,
  ): Promise<FirewallRulesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, ruleName, options },
      getOperationSpec,
    );
  }

  /**
   * Deletes a single firewall rule in a specified redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param ruleName The name of the firewall rule.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, ruleName, options },
      deleteOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    cacheName: string,
    nextLink: string,
    options?: FirewallRulesListNextOptionalParams,
  ): Promise<FirewallRulesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cacheName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/firewallRules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RedisFirewallRuleListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/firewallRules/{ruleName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RedisFirewallRule,
    },
    201: {
      bodyMapper: Mappers.RedisFirewallRule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.ruleName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/firewallRules/{ruleName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RedisFirewallRule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.ruleName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redis/{cacheName}/firewallRules/{ruleName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
    Parameters.ruleName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RedisFirewallRuleListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cacheName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
