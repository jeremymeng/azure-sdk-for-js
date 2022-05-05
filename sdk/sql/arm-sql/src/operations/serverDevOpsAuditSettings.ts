/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ServerDevOpsAuditSettings } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClient } from "../sqlManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  ServerDevOpsAuditingSettings,
  ServerDevOpsAuditSettingsListByServerNextOptionalParams,
  ServerDevOpsAuditSettingsListByServerOptionalParams,
  ServerDevOpsAuditSettingsGetOptionalParams,
  ServerDevOpsAuditSettingsGetResponse,
  ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams,
  ServerDevOpsAuditSettingsCreateOrUpdateResponse,
  ServerDevOpsAuditSettingsListByServerResponse,
  ServerDevOpsAuditSettingsListByServerNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing ServerDevOpsAuditSettings operations. */
export class ServerDevOpsAuditSettingsImpl
  implements ServerDevOpsAuditSettings {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class ServerDevOpsAuditSettings class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Lists DevOps audit settings of a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  public listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams
  ): PagedAsyncIterableIterator<ServerDevOpsAuditingSettings> {
    const iter = this.listByServerPagingAll(
      resourceGroupName,
      serverName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByServerPagingPage(
          resourceGroupName,
          serverName,
          options
        );
      }
    };
  }

  private async *listByServerPagingPage(
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams
  ): AsyncIterableIterator<ServerDevOpsAuditingSettings[]> {
    let result = await this._listByServer(
      resourceGroupName,
      serverName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByServerNext(
        resourceGroupName,
        serverName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByServerPagingAll(
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams
  ): AsyncIterableIterator<ServerDevOpsAuditingSettings> {
    for await (const page of this.listByServerPagingPage(
      resourceGroupName,
      serverName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    options?: ServerDevOpsAuditSettingsGetOptionalParams
  ): Promise<ServerDevOpsAuditSettingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serverName, devOpsAuditingSettingsName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param parameters Properties of DevOps audit settings
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ServerDevOpsAuditSettingsCreateOrUpdateResponse>,
      ServerDevOpsAuditSettingsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<ServerDevOpsAuditSettingsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
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

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        serverName,
        devOpsAuditingSettingsName,
        parameters,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a server's DevOps audit settings.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param devOpsAuditingSettingsName The name of the devops audit settings. This should always be
   *                                   'default'.
   * @param parameters Properties of DevOps audit settings
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    devOpsAuditingSettingsName: string,
    parameters: ServerDevOpsAuditingSettings,
    options?: ServerDevOpsAuditSettingsCreateOrUpdateOptionalParams
  ): Promise<ServerDevOpsAuditSettingsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      serverName,
      devOpsAuditingSettingsName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Lists DevOps audit settings of a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  private _listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: ServerDevOpsAuditSettingsListByServerOptionalParams
  ): Promise<ServerDevOpsAuditSettingsListByServerResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serverName, options },
      listByServerOperationSpec
    );
  }

  /**
   * ListByServerNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param nextLink The nextLink from the previous successful call to the ListByServer method.
   * @param options The options parameters.
   */
  private _listByServerNext(
    resourceGroupName: string,
    serverName: string,
    nextLink: string,
    options?: ServerDevOpsAuditSettingsListByServerNextOptionalParams
  ): Promise<ServerDevOpsAuditSettingsListByServerNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serverName, nextLink, options },
      listByServerNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDevOpsAuditingSettings
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.devOpsAuditingSettingsName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDevOpsAuditingSettings
    },
    201: {
      bodyMapper: Mappers.ServerDevOpsAuditingSettings
    },
    202: {
      bodyMapper: Mappers.ServerDevOpsAuditingSettings
    },
    204: {
      bodyMapper: Mappers.ServerDevOpsAuditingSettings
    },
    default: {}
  },
  requestBody: Parameters.parameters61,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.devOpsAuditingSettingsName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByServerOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDevOpsAuditSettingsListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByServerNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDevOpsAuditSettingsListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
