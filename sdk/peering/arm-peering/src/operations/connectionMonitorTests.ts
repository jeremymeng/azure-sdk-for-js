/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ConnectionMonitorTests } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { PeeringManagementClient } from "../peeringManagementClient.js";
import {
  ConnectionMonitorTest,
  ConnectionMonitorTestsListByPeeringServiceNextOptionalParams,
  ConnectionMonitorTestsListByPeeringServiceOptionalParams,
  ConnectionMonitorTestsListByPeeringServiceResponse,
  ConnectionMonitorTestsGetOptionalParams,
  ConnectionMonitorTestsGetResponse,
  ConnectionMonitorTestsCreateOrUpdateOptionalParams,
  ConnectionMonitorTestsCreateOrUpdateResponse,
  ConnectionMonitorTestsDeleteOptionalParams,
  ConnectionMonitorTestsListByPeeringServiceNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ConnectionMonitorTests operations. */
export class ConnectionMonitorTestsImpl implements ConnectionMonitorTests {
  private readonly client: PeeringManagementClient;

  /**
   * Initialize a new instance of the class ConnectionMonitorTests class.
   * @param client Reference to the service client
   */
  constructor(client: PeeringManagementClient) {
    this.client = client;
  }

  /**
   * Lists all connection monitor tests under the given subscription, resource group and peering service.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param options The options parameters.
   */
  public listByPeeringService(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams
  ): PagedAsyncIterableIterator<ConnectionMonitorTest> {
    const iter = this.listByPeeringServicePagingAll(
      resourceGroupName,
      peeringServiceName,
      options
    );
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
        return this.listByPeeringServicePagingPage(
          resourceGroupName,
          peeringServiceName,
          options,
          settings
        );
      }
    };
  }

  private async *listByPeeringServicePagingPage(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<ConnectionMonitorTest[]> {
    let result: ConnectionMonitorTestsListByPeeringServiceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByPeeringService(
        resourceGroupName,
        peeringServiceName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByPeeringServiceNext(
        resourceGroupName,
        peeringServiceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByPeeringServicePagingAll(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams
  ): AsyncIterableIterator<ConnectionMonitorTest> {
    for await (const page of this.listByPeeringServicePagingPage(
      resourceGroupName,
      peeringServiceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets an existing connection monitor test with the specified name under the given subscription,
   * resource group and peering service.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param connectionMonitorTestName The name of the connection monitor test
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    options?: ConnectionMonitorTestsGetOptionalParams
  ): Promise<ConnectionMonitorTestsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        peeringServiceName,
        connectionMonitorTestName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a connection monitor test with the specified name under the given subscription,
   * resource group and peering service.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param connectionMonitorTestName The name of the connection monitor test
   * @param connectionMonitorTest The properties needed to create a connection monitor test
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    connectionMonitorTest: ConnectionMonitorTest,
    options?: ConnectionMonitorTestsCreateOrUpdateOptionalParams
  ): Promise<ConnectionMonitorTestsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        peeringServiceName,
        connectionMonitorTestName,
        connectionMonitorTest,
        options
      },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Deletes an existing connection monitor test with the specified name under the given subscription,
   * resource group and peering service.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param connectionMonitorTestName The name of the connection monitor test
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    peeringServiceName: string,
    connectionMonitorTestName: string,
    options?: ConnectionMonitorTestsDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        peeringServiceName,
        connectionMonitorTestName,
        options
      },
      deleteOperationSpec
    );
  }

  /**
   * Lists all connection monitor tests under the given subscription, resource group and peering service.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param options The options parameters.
   */
  private _listByPeeringService(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: ConnectionMonitorTestsListByPeeringServiceOptionalParams
  ): Promise<ConnectionMonitorTestsListByPeeringServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, peeringServiceName, options },
      listByPeeringServiceOperationSpec
    );
  }

  /**
   * ListByPeeringServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param nextLink The nextLink from the previous successful call to the ListByPeeringService method.
   * @param options The options parameters.
   */
  private _listByPeeringServiceNext(
    resourceGroupName: string,
    peeringServiceName: string,
    nextLink: string,
    options?: ConnectionMonitorTestsListByPeeringServiceNextOptionalParams
  ): Promise<ConnectionMonitorTestsListByPeeringServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, peeringServiceName, nextLink, options },
      listByPeeringServiceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionMonitorTest
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName,
    Parameters.connectionMonitorTestName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionMonitorTest
    },
    201: {
      bodyMapper: Mappers.ConnectionMonitorTest
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.connectionMonitorTest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName,
    Parameters.connectionMonitorTestName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName,
    Parameters.connectionMonitorTestName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByPeeringServiceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionMonitorTestListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByPeeringServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionMonitorTestListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
