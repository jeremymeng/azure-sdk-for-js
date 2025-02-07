/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ConnectedEnvironmentsCertificates } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ContainerAppsAPIClient } from "../containerAppsAPIClient.js";
import {
  Certificate,
  ConnectedEnvironmentsCertificatesListNextOptionalParams,
  ConnectedEnvironmentsCertificatesListOptionalParams,
  ConnectedEnvironmentsCertificatesListResponse,
  ConnectedEnvironmentsCertificatesGetOptionalParams,
  ConnectedEnvironmentsCertificatesGetResponse,
  ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesCreateOrUpdateResponse,
  ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  CertificatePatch,
  ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesUpdateResponse,
  ConnectedEnvironmentsCertificatesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ConnectedEnvironmentsCertificates operations. */
export class ConnectedEnvironmentsCertificatesImpl
  implements ConnectedEnvironmentsCertificates
{
  private readonly client: ContainerAppsAPIClient;

  /**
   * Initialize a new instance of the class ConnectedEnvironmentsCertificates class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerAppsAPIClient) {
    this.client = client;
  }

  /**
   * Get the Certificates in a given connected environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsCertificatesListOptionalParams,
  ): PagedAsyncIterableIterator<Certificate> {
    const iter = this.listPagingAll(
      resourceGroupName,
      connectedEnvironmentName,
      options,
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
        return this.listPagingPage(
          resourceGroupName,
          connectedEnvironmentName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsCertificatesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Certificate[]> {
    let result: ConnectedEnvironmentsCertificatesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        connectedEnvironmentName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        connectedEnvironmentName,
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
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsCertificatesListOptionalParams,
  ): AsyncIterableIterator<Certificate> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      connectedEnvironmentName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get the Certificates in a given connected environment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsCertificatesListOptionalParams,
  ): Promise<ConnectedEnvironmentsCertificatesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, connectedEnvironmentName, options },
      listOperationSpec,
    );
  }

  /**
   * Get the specified Certificate.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param certificateName Name of the Certificate.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesGetOptionalParams,
  ): Promise<ConnectedEnvironmentsCertificatesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, connectedEnvironmentName, certificateName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or Update a Certificate.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param certificateName Name of the Certificate.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ): Promise<ConnectedEnvironmentsCertificatesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, connectedEnvironmentName, certificateName, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Deletes the specified Certificate.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param certificateName Name of the Certificate.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, connectedEnvironmentName, certificateName, options },
      deleteOperationSpec,
    );
  }

  /**
   * Patches a certificate. Currently only patching of tags is supported
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param certificateName Name of the Certificate.
   * @param certificateEnvelope Properties of a certificate that need to be updated
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    certificateEnvelope: CertificatePatch,
    options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ): Promise<ConnectedEnvironmentsCertificatesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        certificateEnvelope,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param connectedEnvironmentName Name of the Connected Environment.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    connectedEnvironmentName: string,
    nextLink: string,
    options?: ConnectedEnvironmentsCertificatesListNextOptionalParams,
  ): Promise<ConnectedEnvironmentsCertificatesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, connectedEnvironmentName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CertificateCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.connectedEnvironmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Certificate,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.connectedEnvironmentName,
    Parameters.certificateName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Certificate,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  requestBody: Parameters.certificateEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.connectedEnvironmentName,
    Parameters.certificateName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.connectedEnvironmentName,
    Parameters.certificateName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Certificate,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  requestBody: Parameters.certificateEnvelope1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.connectedEnvironmentName,
    Parameters.certificateName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CertificateCollection,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.connectedEnvironmentName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
