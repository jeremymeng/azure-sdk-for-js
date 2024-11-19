/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { MhsmPrivateEndpointConnections } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { KeyVaultManagementClient } from "../keyVaultManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  MhsmPrivateEndpointConnection,
  MhsmPrivateEndpointConnectionsListByResourceNextOptionalParams,
  MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  MhsmPrivateEndpointConnectionsListByResourceResponse,
  MhsmPrivateEndpointConnectionsGetOptionalParams,
  MhsmPrivateEndpointConnectionsGetResponse,
  MhsmPrivateEndpointConnectionsPutOptionalParams,
  MhsmPrivateEndpointConnectionsPutResponse,
  MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  MhsmPrivateEndpointConnectionsDeleteResponse,
  MhsmPrivateEndpointConnectionsListByResourceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing MhsmPrivateEndpointConnections operations. */
export class MhsmPrivateEndpointConnectionsImpl
  implements MhsmPrivateEndpointConnections {
  private readonly client: KeyVaultManagementClient;

  /**
   * Initialize a new instance of the class MhsmPrivateEndpointConnections class.
   * @param client Reference to the service client
   */
  constructor(client: KeyVaultManagementClient) {
    this.client = client;
  }

  /**
   * The List operation gets information about the private endpoint connections associated with the
   * managed HSM Pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param options The options parameters.
   */
  public listByResource(
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams
  ): PagedAsyncIterableIterator<MhsmPrivateEndpointConnection> {
    const iter = this.listByResourcePagingAll(resourceGroupName, name, options);
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
        return this.listByResourcePagingPage(
          resourceGroupName,
          name,
          options,
          settings
        );
      }
    };
  }

  private async *listByResourcePagingPage(
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<MhsmPrivateEndpointConnection[]> {
    let result: MhsmPrivateEndpointConnectionsListByResourceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResource(resourceGroupName, name, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceNext(
        resourceGroupName,
        name,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourcePagingAll(
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams
  ): AsyncIterableIterator<MhsmPrivateEndpointConnection> {
    for await (const page of this.listByResourcePagingPage(
      resourceGroupName,
      name,
      options
    )) {
      yield* page;
    }
  }

  /**
   * The List operation gets information about the private endpoint connections associated with the
   * managed HSM Pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param options The options parameters.
   */
  private _listByResource(
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceOptionalParams
  ): Promise<MhsmPrivateEndpointConnectionsListByResourceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, name, options },
      listByResourceOperationSpec
    );
  }

  /**
   * Gets the specified private endpoint connection associated with the managed HSM Pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the
   *                                      managed hsm pool.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsGetOptionalParams
  ): Promise<MhsmPrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, name, privateEndpointConnectionName, options },
      getOperationSpec
    );
  }

  /**
   * Updates the specified private endpoint connection associated with the managed hsm pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the
   *                                      managed hsm pool.
   * @param properties The intended state of private endpoint connection.
   * @param options The options parameters.
   */
  put(
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    properties: MhsmPrivateEndpointConnection,
    options?: MhsmPrivateEndpointConnectionsPutOptionalParams
  ): Promise<MhsmPrivateEndpointConnectionsPutResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        properties,
        options
      },
      putOperationSpec
    );
  }

  /**
   * Deletes the specified private endpoint connection associated with the managed hsm pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the
   *                                      managed hsm pool.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MhsmPrivateEndpointConnectionsDeleteResponse>,
      MhsmPrivateEndpointConnectionsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<MhsmPrivateEndpointConnectionsDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, name, privateEndpointConnectionName, options },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<
      MhsmPrivateEndpointConnectionsDeleteResponse,
      OperationState<MhsmPrivateEndpointConnectionsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified private endpoint connection associated with the managed hsm pool.
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the
   *                                      managed hsm pool.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: MhsmPrivateEndpointConnectionsDeleteOptionalParams
  ): Promise<MhsmPrivateEndpointConnectionsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      name,
      privateEndpointConnectionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByResourceNext
   * @param resourceGroupName Name of the resource group that contains the managed HSM pool.
   * @param name Name of the managed HSM Pool
   * @param nextLink The nextLink from the previous successful call to the ListByResource method.
   * @param options The options parameters.
   */
  private _listByResourceNext(
    resourceGroupName: string,
    name: string,
    nextLink: string,
    options?: MhsmPrivateEndpointConnectionsListByResourceNextOptionalParams
  ): Promise<MhsmPrivateEndpointConnectionsListByResourceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, name, nextLink, options },
      listByResourceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByResourceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnectionsListResult
    },
    default: {
      bodyMapper: Mappers.ManagedHsmError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection
    },
    default: {
      bodyMapper: Mappers.ManagedHsmError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.privateEndpointConnectionName,
    Parameters.name1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const putOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection,
      headersMapper: Mappers.MhsmPrivateEndpointConnectionsPutHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.properties1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.privateEndpointConnectionName,
    Parameters.name1
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection
    },
    201: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection
    },
    202: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection
    },
    204: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnection
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
    Parameters.privateEndpointConnectionName,
    Parameters.name1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MhsmPrivateEndpointConnectionsListResult
    },
    default: {
      bodyMapper: Mappers.ManagedHsmError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.name1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
