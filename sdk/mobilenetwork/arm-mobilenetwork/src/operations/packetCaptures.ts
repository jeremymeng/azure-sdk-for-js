/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { PacketCaptures } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MobileNetworkManagementClient } from "../mobileNetworkManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PacketCapture,
  PacketCapturesListByPacketCoreControlPlaneNextOptionalParams,
  PacketCapturesListByPacketCoreControlPlaneOptionalParams,
  PacketCapturesListByPacketCoreControlPlaneResponse,
  PacketCapturesCreateOrUpdateOptionalParams,
  PacketCapturesCreateOrUpdateResponse,
  PacketCapturesGetOptionalParams,
  PacketCapturesGetResponse,
  PacketCapturesDeleteOptionalParams,
  PacketCapturesStopOptionalParams,
  PacketCapturesStopResponse,
  PacketCapturesListByPacketCoreControlPlaneNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PacketCaptures operations. */
export class PacketCapturesImpl implements PacketCaptures {
  private readonly client: MobileNetworkManagementClient;

  /**
   * Initialize a new instance of the class PacketCaptures class.
   * @param client Reference to the service client
   */
  constructor(client: MobileNetworkManagementClient) {
    this.client = client;
  }

  /**
   * Lists all the packet capture sessions under a packet core control plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param options The options parameters.
   */
  public listByPacketCoreControlPlane(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: PacketCapturesListByPacketCoreControlPlaneOptionalParams,
  ): PagedAsyncIterableIterator<PacketCapture> {
    const iter = this.listByPacketCoreControlPlanePagingAll(
      resourceGroupName,
      packetCoreControlPlaneName,
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
        return this.listByPacketCoreControlPlanePagingPage(
          resourceGroupName,
          packetCoreControlPlaneName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByPacketCoreControlPlanePagingPage(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: PacketCapturesListByPacketCoreControlPlaneOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<PacketCapture[]> {
    let result: PacketCapturesListByPacketCoreControlPlaneResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByPacketCoreControlPlane(
        resourceGroupName,
        packetCoreControlPlaneName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByPacketCoreControlPlaneNext(
        resourceGroupName,
        packetCoreControlPlaneName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByPacketCoreControlPlanePagingAll(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: PacketCapturesListByPacketCoreControlPlaneOptionalParams,
  ): AsyncIterableIterator<PacketCapture> {
    for await (const page of this.listByPacketCoreControlPlanePagingPage(
      resourceGroupName,
      packetCoreControlPlaneName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Creates or updates a packet capture.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param parameters Parameters supplied to the create or update packet capture operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    parameters: PacketCapture,
    options?: PacketCapturesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PacketCapturesCreateOrUpdateResponse>,
      PacketCapturesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PacketCapturesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCaptureName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      PacketCapturesCreateOrUpdateResponse,
      OperationState<PacketCapturesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a packet capture.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param parameters Parameters supplied to the create or update packet capture operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    parameters: PacketCapture,
    options?: PacketCapturesCreateOrUpdateOptionalParams,
  ): Promise<PacketCapturesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCaptureName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets information about the specified packet capture session.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    options?: PacketCapturesGetOptionalParams,
  ): Promise<PacketCapturesGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCaptureName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Deletes the specified packet capture.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    options?: PacketCapturesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCaptureName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified packet capture.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    options?: PacketCapturesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCaptureName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Stop a packet capture session.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param options The options parameters.
   */
  async beginStop(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    options?: PacketCapturesStopOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PacketCapturesStopResponse>,
      PacketCapturesStopResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PacketCapturesStopResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCaptureName,
        options,
      },
      spec: stopOperationSpec,
    });
    const poller = await createHttpPoller<
      PacketCapturesStopResponse,
      OperationState<PacketCapturesStopResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Stop a packet capture session.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCaptureName The name of the packet capture session.
   * @param options The options parameters.
   */
  async beginStopAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCaptureName: string,
    options?: PacketCapturesStopOptionalParams,
  ): Promise<PacketCapturesStopResponse> {
    const poller = await this.beginStop(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCaptureName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Lists all the packet capture sessions under a packet core control plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param options The options parameters.
   */
  private _listByPacketCoreControlPlane(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: PacketCapturesListByPacketCoreControlPlaneOptionalParams,
  ): Promise<PacketCapturesListByPacketCoreControlPlaneResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, packetCoreControlPlaneName, options },
      listByPacketCoreControlPlaneOperationSpec,
    );
  }

  /**
   * ListByPacketCoreControlPlaneNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param nextLink The nextLink from the previous successful call to the ListByPacketCoreControlPlane
   *                 method.
   * @param options The options parameters.
   */
  private _listByPacketCoreControlPlaneNext(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    nextLink: string,
    options?: PacketCapturesListByPacketCoreControlPlaneNextOptionalParams,
  ): Promise<PacketCapturesListByPacketCoreControlPlaneNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, packetCoreControlPlaneName, nextLink, options },
      listByPacketCoreControlPlaneNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCaptures/{packetCaptureName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PacketCapture,
    },
    201: {
      bodyMapper: Mappers.PacketCapture,
    },
    202: {
      bodyMapper: Mappers.PacketCapture,
    },
    204: {
      bodyMapper: Mappers.PacketCapture,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCaptureName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCaptures/{packetCaptureName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PacketCapture,
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
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCaptureName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCaptures/{packetCaptureName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
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
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCaptureName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const stopOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCaptures/{packetCaptureName}/stop",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AsyncOperationStatus,
    },
    201: {
      bodyMapper: Mappers.AsyncOperationStatus,
    },
    202: {
      bodyMapper: Mappers.AsyncOperationStatus,
    },
    204: {
      bodyMapper: Mappers.AsyncOperationStatus,
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
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCaptureName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByPacketCoreControlPlaneOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCaptures",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PacketCaptureListResult,
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
    Parameters.packetCoreControlPlaneName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByPacketCoreControlPlaneNextOperationSpec: coreClient.OperationSpec =
  {
    path: "{nextLink}",
    httpMethod: "GET",
    responses: {
      200: {
        bodyMapper: Mappers.PacketCaptureListResult,
      },
      default: {
        bodyMapper: Mappers.ErrorResponse,
      },
    },
    urlParameters: [
      Parameters.$host,
      Parameters.subscriptionId,
      Parameters.resourceGroupName,
      Parameters.packetCoreControlPlaneName,
      Parameters.nextLink,
    ],
    headerParameters: [Parameters.accept],
    serializer,
  };
