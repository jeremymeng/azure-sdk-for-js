/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { SpatialAnchorsAccounts } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MixedRealityClient } from "../mixedRealityClient.js";
import {
  SpatialAnchorsAccount,
  SpatialAnchorsAccountsListBySubscriptionNextOptionalParams,
  SpatialAnchorsAccountsListBySubscriptionOptionalParams,
  SpatialAnchorsAccountsListBySubscriptionResponse,
  SpatialAnchorsAccountsListByResourceGroupNextOptionalParams,
  SpatialAnchorsAccountsListByResourceGroupOptionalParams,
  SpatialAnchorsAccountsListByResourceGroupResponse,
  SpatialAnchorsAccountsDeleteOptionalParams,
  SpatialAnchorsAccountsGetOptionalParams,
  SpatialAnchorsAccountsGetResponse,
  SpatialAnchorsAccountsUpdateOptionalParams,
  SpatialAnchorsAccountsUpdateResponse,
  SpatialAnchorsAccountsCreateOptionalParams,
  SpatialAnchorsAccountsCreateResponse,
  SpatialAnchorsAccountsListKeysOptionalParams,
  SpatialAnchorsAccountsListKeysResponse,
  AccountKeyRegenerateRequest,
  SpatialAnchorsAccountsRegenerateKeysOptionalParams,
  SpatialAnchorsAccountsRegenerateKeysResponse,
  SpatialAnchorsAccountsListBySubscriptionNextResponse,
  SpatialAnchorsAccountsListByResourceGroupNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing SpatialAnchorsAccounts operations. */
export class SpatialAnchorsAccountsImpl implements SpatialAnchorsAccounts {
  private readonly client: MixedRealityClient;

  /**
   * Initialize a new instance of the class SpatialAnchorsAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: MixedRealityClient) {
    this.client = client;
  }

  /**
   * List Spatial Anchors Accounts by Subscription
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: SpatialAnchorsAccountsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<SpatialAnchorsAccount> {
    const iter = this.listBySubscriptionPagingAll(options);
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
        return this.listBySubscriptionPagingPage(options, settings);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: SpatialAnchorsAccountsListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SpatialAnchorsAccount[]> {
    let result: SpatialAnchorsAccountsListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: SpatialAnchorsAccountsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<SpatialAnchorsAccount> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List Resources by Resource Group
   * @param resourceGroupName Name of an Azure resource group.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: SpatialAnchorsAccountsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<SpatialAnchorsAccount> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
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
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: SpatialAnchorsAccountsListByResourceGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SpatialAnchorsAccount[]> {
    let result: SpatialAnchorsAccountsListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: SpatialAnchorsAccountsListByResourceGroupOptionalParams
  ): AsyncIterableIterator<SpatialAnchorsAccount> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List Spatial Anchors Accounts by Subscription
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: SpatialAnchorsAccountsListBySubscriptionOptionalParams
  ): Promise<SpatialAnchorsAccountsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * List Resources by Resource Group
   * @param resourceGroupName Name of an Azure resource group.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: SpatialAnchorsAccountsListByResourceGroupOptionalParams
  ): Promise<SpatialAnchorsAccountsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Delete a Spatial Anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    accountName: string,
    options?: SpatialAnchorsAccountsDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      deleteOperationSpec
    );
  }

  /**
   * Retrieve a Spatial Anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    options?: SpatialAnchorsAccountsGetOptionalParams
  ): Promise<SpatialAnchorsAccountsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      getOperationSpec
    );
  }

  /**
   * Updating a Spatial Anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param spatialAnchorsAccount Spatial Anchors Account parameter.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    spatialAnchorsAccount: SpatialAnchorsAccount,
    options?: SpatialAnchorsAccountsUpdateOptionalParams
  ): Promise<SpatialAnchorsAccountsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, spatialAnchorsAccount, options },
      updateOperationSpec
    );
  }

  /**
   * Creating or Updating a Spatial Anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param spatialAnchorsAccount Spatial Anchors Account parameter.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    accountName: string,
    spatialAnchorsAccount: SpatialAnchorsAccount,
    options?: SpatialAnchorsAccountsCreateOptionalParams
  ): Promise<SpatialAnchorsAccountsCreateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, spatialAnchorsAccount, options },
      createOperationSpec
    );
  }

  /**
   * List Both of the 2 Keys of a Spatial Anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    accountName: string,
    options?: SpatialAnchorsAccountsListKeysOptionalParams
  ): Promise<SpatialAnchorsAccountsListKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listKeysOperationSpec
    );
  }

  /**
   * Regenerate specified Key of a Spatial Anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param regenerate Required information for key regeneration.
   * @param options The options parameters.
   */
  regenerateKeys(
    resourceGroupName: string,
    accountName: string,
    regenerate: AccountKeyRegenerateRequest,
    options?: SpatialAnchorsAccountsRegenerateKeysOptionalParams
  ): Promise<SpatialAnchorsAccountsRegenerateKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, regenerate, options },
      regenerateKeysOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: SpatialAnchorsAccountsListBySubscriptionNextOptionalParams
  ): Promise<SpatialAnchorsAccountsListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName Name of an Azure resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: SpatialAnchorsAccountsListByResourceGroupNextOptionalParams
  ): Promise<SpatialAnchorsAccountsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.MixedReality/spatialAnchorsAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccountPage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccountPage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.spatialAnchorsAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccount
    },
    201: {
      bodyMapper: Mappers.SpatialAnchorsAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.spatialAnchorsAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listKeysOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}/listKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccountKeys
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const regenerateKeysOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/spatialAnchorsAccounts/{accountName}/regenerateKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccountKeys
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.regenerate,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccountPage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SpatialAnchorsAccountPage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
