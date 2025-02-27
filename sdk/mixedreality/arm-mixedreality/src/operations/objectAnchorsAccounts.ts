/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ObjectAnchorsAccounts } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MixedRealityClient } from "../mixedRealityClient.js";
import {
  ObjectAnchorsAccount,
  ObjectAnchorsAccountsListBySubscriptionNextOptionalParams,
  ObjectAnchorsAccountsListBySubscriptionOptionalParams,
  ObjectAnchorsAccountsListBySubscriptionResponse,
  ObjectAnchorsAccountsListByResourceGroupNextOptionalParams,
  ObjectAnchorsAccountsListByResourceGroupOptionalParams,
  ObjectAnchorsAccountsListByResourceGroupResponse,
  ObjectAnchorsAccountsDeleteOptionalParams,
  ObjectAnchorsAccountsGetOptionalParams,
  ObjectAnchorsAccountsGetResponse,
  ObjectAnchorsAccountsUpdateOptionalParams,
  ObjectAnchorsAccountsUpdateResponse,
  ObjectAnchorsAccountsCreateOptionalParams,
  ObjectAnchorsAccountsCreateResponse,
  ObjectAnchorsAccountsListKeysOptionalParams,
  ObjectAnchorsAccountsListKeysResponse,
  AccountKeyRegenerateRequest,
  ObjectAnchorsAccountsRegenerateKeysOptionalParams,
  ObjectAnchorsAccountsRegenerateKeysResponse,
  ObjectAnchorsAccountsListBySubscriptionNextResponse,
  ObjectAnchorsAccountsListByResourceGroupNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ObjectAnchorsAccounts operations. */
export class ObjectAnchorsAccountsImpl implements ObjectAnchorsAccounts {
  private readonly client: MixedRealityClient;

  /**
   * Initialize a new instance of the class ObjectAnchorsAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: MixedRealityClient) {
    this.client = client;
  }

  /**
   * List Object Anchors Accounts by Subscription
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: ObjectAnchorsAccountsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<ObjectAnchorsAccount> {
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
    options?: ObjectAnchorsAccountsListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ObjectAnchorsAccount[]> {
    let result: ObjectAnchorsAccountsListBySubscriptionResponse;
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
    options?: ObjectAnchorsAccountsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<ObjectAnchorsAccount> {
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
    options?: ObjectAnchorsAccountsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<ObjectAnchorsAccount> {
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
    options?: ObjectAnchorsAccountsListByResourceGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ObjectAnchorsAccount[]> {
    let result: ObjectAnchorsAccountsListByResourceGroupResponse;
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
    options?: ObjectAnchorsAccountsListByResourceGroupOptionalParams
  ): AsyncIterableIterator<ObjectAnchorsAccount> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List Object Anchors Accounts by Subscription
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: ObjectAnchorsAccountsListBySubscriptionOptionalParams
  ): Promise<ObjectAnchorsAccountsListBySubscriptionResponse> {
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
    options?: ObjectAnchorsAccountsListByResourceGroupOptionalParams
  ): Promise<ObjectAnchorsAccountsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Delete an Object Anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    accountName: string,
    options?: ObjectAnchorsAccountsDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      deleteOperationSpec
    );
  }

  /**
   * Retrieve an Object Anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    options?: ObjectAnchorsAccountsGetOptionalParams
  ): Promise<ObjectAnchorsAccountsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      getOperationSpec
    );
  }

  /**
   * Updating an Object Anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param objectAnchorsAccount Object Anchors Account parameter.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    objectAnchorsAccount: ObjectAnchorsAccount,
    options?: ObjectAnchorsAccountsUpdateOptionalParams
  ): Promise<ObjectAnchorsAccountsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, objectAnchorsAccount, options },
      updateOperationSpec
    );
  }

  /**
   * Creating or Updating an object anchors Account.
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param objectAnchorsAccount Object Anchors Account parameter.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    accountName: string,
    objectAnchorsAccount: ObjectAnchorsAccount,
    options?: ObjectAnchorsAccountsCreateOptionalParams
  ): Promise<ObjectAnchorsAccountsCreateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, objectAnchorsAccount, options },
      createOperationSpec
    );
  }

  /**
   * List Both of the 2 Keys of an object anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    accountName: string,
    options?: ObjectAnchorsAccountsListKeysOptionalParams
  ): Promise<ObjectAnchorsAccountsListKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listKeysOperationSpec
    );
  }

  /**
   * Regenerate specified Key of an object anchors Account
   * @param resourceGroupName Name of an Azure resource group.
   * @param accountName Name of an Mixed Reality Account.
   * @param regenerate Required information for key regeneration.
   * @param options The options parameters.
   */
  regenerateKeys(
    resourceGroupName: string,
    accountName: string,
    regenerate: AccountKeyRegenerateRequest,
    options?: ObjectAnchorsAccountsRegenerateKeysOptionalParams
  ): Promise<ObjectAnchorsAccountsRegenerateKeysResponse> {
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
    options?: ObjectAnchorsAccountsListBySubscriptionNextOptionalParams
  ): Promise<ObjectAnchorsAccountsListBySubscriptionNextResponse> {
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
    options?: ObjectAnchorsAccountsListByResourceGroupNextOptionalParams
  ): Promise<ObjectAnchorsAccountsListByResourceGroupNextResponse> {
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
    "/subscriptions/{subscriptionId}/providers/Microsoft.MixedReality/objectAnchorsAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ObjectAnchorsAccountPage
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ObjectAnchorsAccountPage
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}",
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ObjectAnchorsAccount
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ObjectAnchorsAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.objectAnchorsAccount,
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ObjectAnchorsAccount
    },
    201: {
      bodyMapper: Mappers.ObjectAnchorsAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.objectAnchorsAccount,
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}/listKeys",
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MixedReality/objectAnchorsAccounts/{accountName}/regenerateKeys",
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
      bodyMapper: Mappers.ObjectAnchorsAccountPage
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
      bodyMapper: Mappers.ObjectAnchorsAccountPage
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
