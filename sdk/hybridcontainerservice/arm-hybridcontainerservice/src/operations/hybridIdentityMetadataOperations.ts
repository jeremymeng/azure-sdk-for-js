/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { HybridIdentityMetadataOperations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { HybridContainerServiceClient } from "../hybridContainerServiceClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  HybridIdentityMetadata,
  HybridIdentityMetadataListByClusterNextOptionalParams,
  HybridIdentityMetadataListByClusterOptionalParams,
  HybridIdentityMetadataListByClusterResponse,
  HybridIdentityMetadataPutOptionalParams,
  HybridIdentityMetadataPutResponse,
  HybridIdentityMetadataGetOptionalParams,
  HybridIdentityMetadataGetResponse,
  HybridIdentityMetadataDeleteOptionalParams,
  HybridIdentityMetadataDeleteResponse,
  HybridIdentityMetadataListByClusterNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing HybridIdentityMetadataOperations operations. */
export class HybridIdentityMetadataOperationsImpl
  implements HybridIdentityMetadataOperations {
  private readonly client: HybridContainerServiceClient;

  /**
   * Initialize a new instance of the class HybridIdentityMetadataOperations class.
   * @param client Reference to the service client
   */
  constructor(client: HybridContainerServiceClient) {
    this.client = client;
  }

  /**
   * Lists the hybrid identity metadata proxy resource in a provisioned cluster instance.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param options The options parameters.
   */
  public listByCluster(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataListByClusterOptionalParams
  ): PagedAsyncIterableIterator<HybridIdentityMetadata> {
    const iter = this.listByClusterPagingAll(
      connectedClusterResourceUri,
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
        return this.listByClusterPagingPage(
          connectedClusterResourceUri,
          options,
          settings
        );
      }
    };
  }

  private async *listByClusterPagingPage(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataListByClusterOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<HybridIdentityMetadata[]> {
    let result: HybridIdentityMetadataListByClusterResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByCluster(connectedClusterResourceUri, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByClusterNext(
        connectedClusterResourceUri,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByClusterPagingAll(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataListByClusterOptionalParams
  ): AsyncIterableIterator<HybridIdentityMetadata> {
    for await (const page of this.listByClusterPagingPage(
      connectedClusterResourceUri,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Creates the hybrid identity metadata proxy resource that facilitates the managed identity
   * provisioning.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param body Hybrid Identity Metadata resource definition
   * @param options The options parameters.
   */
  put(
    connectedClusterResourceUri: string,
    body: HybridIdentityMetadata,
    options?: HybridIdentityMetadataPutOptionalParams
  ): Promise<HybridIdentityMetadataPutResponse> {
    return this.client.sendOperationRequest(
      { connectedClusterResourceUri, body, options },
      putOperationSpec
    );
  }

  /**
   * Get the hybrid identity metadata proxy resource.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param options The options parameters.
   */
  get(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataGetOptionalParams
  ): Promise<HybridIdentityMetadataGetResponse> {
    return this.client.sendOperationRequest(
      { connectedClusterResourceUri, options },
      getOperationSpec
    );
  }

  /**
   * Deletes the hybrid identity metadata proxy resource.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param options The options parameters.
   */
  async beginDelete(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataDeleteOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<HybridIdentityMetadataDeleteResponse>,
      HybridIdentityMetadataDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<HybridIdentityMetadataDeleteResponse> => {
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
      args: { connectedClusterResourceUri, options },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<
      HybridIdentityMetadataDeleteResponse,
      OperationState<HybridIdentityMetadataDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the hybrid identity metadata proxy resource.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataDeleteOptionalParams
  ): Promise<HybridIdentityMetadataDeleteResponse> {
    const poller = await this.beginDelete(connectedClusterResourceUri, options);
    return poller.pollUntilDone();
  }

  /**
   * Lists the hybrid identity metadata proxy resource in a provisioned cluster instance.
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param options The options parameters.
   */
  private _listByCluster(
    connectedClusterResourceUri: string,
    options?: HybridIdentityMetadataListByClusterOptionalParams
  ): Promise<HybridIdentityMetadataListByClusterResponse> {
    return this.client.sendOperationRequest(
      { connectedClusterResourceUri, options },
      listByClusterOperationSpec
    );
  }

  /**
   * ListByClusterNext
   * @param connectedClusterResourceUri The fully qualified Azure Resource Manager identifier of the
   *                                    connected cluster resource.
   * @param nextLink The nextLink from the previous successful call to the ListByCluster method.
   * @param options The options parameters.
   */
  private _listByClusterNext(
    connectedClusterResourceUri: string,
    nextLink: string,
    options?: HybridIdentityMetadataListByClusterNextOptionalParams
  ): Promise<HybridIdentityMetadataListByClusterNextResponse> {
    return this.client.sendOperationRequest(
      { connectedClusterResourceUri, nextLink, options },
      listByClusterNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const putOperationSpec: coreClient.OperationSpec = {
  path:
    "/{connectedClusterResourceUri}/providers/Microsoft.HybridContainerService/provisionedClusterInstances/default/hybridIdentityMetadata/default",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.HybridIdentityMetadata
    },
    201: {
      bodyMapper: Mappers.HybridIdentityMetadata
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.connectedClusterResourceUri],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/{connectedClusterResourceUri}/providers/Microsoft.HybridContainerService/provisionedClusterInstances/default/hybridIdentityMetadata/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HybridIdentityMetadata
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.connectedClusterResourceUri],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/{connectedClusterResourceUri}/providers/Microsoft.HybridContainerService/provisionedClusterInstances/default/hybridIdentityMetadata/default",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.HybridIdentityMetadataDeleteHeaders
    },
    201: {
      headersMapper: Mappers.HybridIdentityMetadataDeleteHeaders
    },
    202: {
      headersMapper: Mappers.HybridIdentityMetadataDeleteHeaders
    },
    204: {
      headersMapper: Mappers.HybridIdentityMetadataDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.connectedClusterResourceUri],
  headerParameters: [Parameters.accept],
  serializer
};
const listByClusterOperationSpec: coreClient.OperationSpec = {
  path:
    "/{connectedClusterResourceUri}/providers/Microsoft.HybridContainerService/provisionedClusterInstances/default/hybridIdentityMetadata",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HybridIdentityMetadataList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.connectedClusterResourceUri],
  headerParameters: [Parameters.accept],
  serializer
};
const listByClusterNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HybridIdentityMetadataList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.connectedClusterResourceUri,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
