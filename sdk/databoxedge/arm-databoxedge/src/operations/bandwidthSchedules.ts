/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { BandwidthSchedules } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataBoxEdgeManagementClient } from "../dataBoxEdgeManagementClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  BandwidthSchedule,
  BandwidthSchedulesListByDataBoxEdgeDeviceNextOptionalParams,
  BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
  BandwidthSchedulesListByDataBoxEdgeDeviceResponse,
  BandwidthSchedulesGetOptionalParams,
  BandwidthSchedulesGetResponse,
  BandwidthSchedulesCreateOrUpdateOptionalParams,
  BandwidthSchedulesCreateOrUpdateResponse,
  BandwidthSchedulesDeleteOptionalParams,
  BandwidthSchedulesListByDataBoxEdgeDeviceNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing BandwidthSchedules operations. */
export class BandwidthSchedulesImpl implements BandwidthSchedules {
  private readonly client: DataBoxEdgeManagementClient;

  /**
   * Initialize a new instance of the class BandwidthSchedules class.
   * @param client Reference to the service client
   */
  constructor(client: DataBoxEdgeManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  public listByDataBoxEdgeDevice(
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams
  ): PagedAsyncIterableIterator<BandwidthSchedule> {
    const iter = this.listByDataBoxEdgeDevicePagingAll(
      deviceName,
      resourceGroupName,
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
        return this.listByDataBoxEdgeDevicePagingPage(
          deviceName,
          resourceGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByDataBoxEdgeDevicePagingPage(
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<BandwidthSchedule[]> {
    let result: BandwidthSchedulesListByDataBoxEdgeDeviceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByDataBoxEdgeDevice(
        deviceName,
        resourceGroupName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByDataBoxEdgeDeviceNext(
        deviceName,
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

  private async *listByDataBoxEdgeDevicePagingAll(
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams
  ): AsyncIterableIterator<BandwidthSchedule> {
    for await (const page of this.listByDataBoxEdgeDevicePagingPage(
      deviceName,
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  private _listByDataBoxEdgeDevice(
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams
  ): Promise<BandwidthSchedulesListByDataBoxEdgeDeviceResponse> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, options },
      listByDataBoxEdgeDeviceOperationSpec
    );
  }

  /**
   * Gets the properties of the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesGetOptionalParams
  ): Promise<BandwidthSchedulesGetResponse> {
    return this.client.sendOperationRequest(
      { deviceName, name, resourceGroupName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name which needs to be added/updated.
   * @param resourceGroupName The resource group name.
   * @param parameters The bandwidth schedule to be added or updated.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<BandwidthSchedulesCreateOrUpdateResponse>,
      BandwidthSchedulesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<BandwidthSchedulesCreateOrUpdateResponse> => {
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
      { deviceName, name, resourceGroupName, parameters, options },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name which needs to be added/updated.
   * @param resourceGroupName The resource group name.
   * @param parameters The bandwidth schedule to be added or updated.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams
  ): Promise<BandwidthSchedulesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      deviceName,
      name,
      resourceGroupName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDelete(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      { deviceName, name, resourceGroupName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      deviceName,
      name,
      resourceGroupName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByDataBoxEdgeDeviceNext
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param nextLink The nextLink from the previous successful call to the ListByDataBoxEdgeDevice
   *                 method.
   * @param options The options parameters.
   */
  private _listByDataBoxEdgeDeviceNext(
    deviceName: string,
    resourceGroupName: string,
    nextLink: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceNextOptionalParams
  ): Promise<BandwidthSchedulesListByDataBoxEdgeDeviceNextResponse> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, nextLink, options },
      listByDataBoxEdgeDeviceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByDataBoxEdgeDeviceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/bandwidthSchedules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSchedulesList
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
    Parameters.deviceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/bandwidthSchedules/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSchedule
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
    Parameters.deviceName,
    Parameters.name
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/bandwidthSchedules/{name}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSchedule
    },
    201: {
      bodyMapper: Mappers.BandwidthSchedule
    },
    202: {
      bodyMapper: Mappers.BandwidthSchedule
    },
    204: {
      bodyMapper: Mappers.BandwidthSchedule
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.name
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/bandwidthSchedules/{name}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
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
    Parameters.deviceName,
    Parameters.name
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByDataBoxEdgeDeviceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSchedulesList
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
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
