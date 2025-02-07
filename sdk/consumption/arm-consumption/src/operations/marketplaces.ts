/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Marketplaces } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ConsumptionManagementClient } from "../consumptionManagementClient.js";
import {
  Marketplace,
  MarketplacesListNextOptionalParams,
  MarketplacesListOptionalParams,
  MarketplacesListResponse,
  MarketplacesListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Marketplaces operations. */
export class MarketplacesImpl implements Marketplaces {
  private readonly client: ConsumptionManagementClient;

  /**
   * Initialize a new instance of the class Marketplaces class.
   * @param client Reference to the service client
   */
  constructor(client: ConsumptionManagementClient) {
    this.client = client;
  }

  /**
   * Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API
   * only for May 1, 2014 or later.
   * @param scope The scope associated with marketplace operations. This includes
   *              '/subscriptions/{subscriptionId}/' for subscription scope,
   *              '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope,
   *              '/providers/Microsoft.Billing/departments/{departmentId}' for Department scope,
   *              '/providers/Microsoft.Billing/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope
   *              and '/providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group
   *              scope. For subscription, billing account, department, enrollment account and ManagementGroup, you
   *              can also add billing period to the scope using
   *              '/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'. For e.g. to specify billing
   *              period at department scope use
   *              '/providers/Microsoft.Billing/departments/{departmentId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'
   * @param options The options parameters.
   */
  public list(
    scope: string,
    options?: MarketplacesListOptionalParams
  ): PagedAsyncIterableIterator<Marketplace> {
    const iter = this.listPagingAll(scope, options);
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
        return this.listPagingPage(scope, options, settings);
      }
    };
  }

  private async *listPagingPage(
    scope: string,
    options?: MarketplacesListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Marketplace[]> {
    let result: MarketplacesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(scope, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(scope, continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    scope: string,
    options?: MarketplacesListOptionalParams
  ): AsyncIterableIterator<Marketplace> {
    for await (const page of this.listPagingPage(scope, options)) {
      yield* page;
    }
  }

  /**
   * Lists the marketplaces for a scope at the defined scope. Marketplaces are available via this API
   * only for May 1, 2014 or later.
   * @param scope The scope associated with marketplace operations. This includes
   *              '/subscriptions/{subscriptionId}/' for subscription scope,
   *              '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope,
   *              '/providers/Microsoft.Billing/departments/{departmentId}' for Department scope,
   *              '/providers/Microsoft.Billing/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope
   *              and '/providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group
   *              scope. For subscription, billing account, department, enrollment account and ManagementGroup, you
   *              can also add billing period to the scope using
   *              '/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'. For e.g. to specify billing
   *              period at department scope use
   *              '/providers/Microsoft.Billing/departments/{departmentId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'
   * @param options The options parameters.
   */
  private _list(
    scope: string,
    options?: MarketplacesListOptionalParams
  ): Promise<MarketplacesListResponse> {
    return this.client.sendOperationRequest(
      { scope, options },
      listOperationSpec
    );
  }

  /**
   * ListNext
   * @param scope The scope associated with marketplace operations. This includes
   *              '/subscriptions/{subscriptionId}/' for subscription scope,
   *              '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope,
   *              '/providers/Microsoft.Billing/departments/{departmentId}' for Department scope,
   *              '/providers/Microsoft.Billing/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope
   *              and '/providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group
   *              scope. For subscription, billing account, department, enrollment account and ManagementGroup, you
   *              can also add billing period to the scope using
   *              '/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'. For e.g. to specify billing
   *              period at department scope use
   *              '/providers/Microsoft.Billing/departments/{departmentId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}'
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    scope: string,
    nextLink: string,
    options?: MarketplacesListNextOptionalParams
  ): Promise<MarketplacesListNextResponse> {
    return this.client.sendOperationRequest(
      { scope, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Consumption/marketplaces",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MarketplacesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.skiptoken,
    Parameters.top,
    Parameters.apiVersion
  ],
  urlParameters: [Parameters.$host, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MarketplacesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [Parameters.$host, Parameters.scope, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
