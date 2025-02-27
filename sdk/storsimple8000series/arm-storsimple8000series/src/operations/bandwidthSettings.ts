/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BandwidthSettings } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  BandwidthSetting,
  BandwidthSettingsListByManagerOptionalParams,
  BandwidthSettingsListByManagerResponse,
  BandwidthSettingsGetOptionalParams,
  BandwidthSettingsGetResponse,
  BandwidthSettingsCreateOrUpdateOptionalParams,
  BandwidthSettingsCreateOrUpdateResponse,
  BandwidthSettingsDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing BandwidthSettings operations. */
export class BandwidthSettingsImpl implements BandwidthSettings {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class BandwidthSettings class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves all the bandwidth setting in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  public listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsListByManagerOptionalParams
  ): PagedAsyncIterableIterator<BandwidthSetting> {
    const iter = this.listByManagerPagingAll(
      resourceGroupName,
      managerName,
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
        return this.listByManagerPagingPage(
          resourceGroupName,
          managerName,
          options,
          settings
        );
      }
    };
  }

  private async *listByManagerPagingPage(
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsListByManagerOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<BandwidthSetting[]> {
    let result: BandwidthSettingsListByManagerResponse;
    result = await this._listByManager(resourceGroupName, managerName, options);
    yield result.value || [];
  }

  private async *listByManagerPagingAll(
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsListByManagerOptionalParams
  ): AsyncIterableIterator<BandwidthSetting> {
    for await (const page of this.listByManagerPagingPage(
      resourceGroupName,
      managerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Retrieves all the bandwidth setting in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  private _listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsListByManagerOptionalParams
  ): Promise<BandwidthSettingsListByManagerResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      listByManagerOperationSpec
    );
  }

  /**
   * Returns the properties of the specified bandwidth setting name.
   * @param bandwidthSettingName The name of bandwidth setting to be fetched.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  get(
    bandwidthSettingName: string,
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsGetOptionalParams
  ): Promise<BandwidthSettingsGetResponse> {
    return this.client.sendOperationRequest(
      { bandwidthSettingName, resourceGroupName, managerName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates the bandwidth setting
   * @param bandwidthSettingName The bandwidth setting name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The bandwidth setting to be added or updated.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    bandwidthSettingName: string,
    resourceGroupName: string,
    managerName: string,
    parameters: BandwidthSetting,
    options?: BandwidthSettingsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<BandwidthSettingsCreateOrUpdateResponse>,
      BandwidthSettingsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<BandwidthSettingsCreateOrUpdateResponse> => {
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
        bandwidthSettingName,
        resourceGroupName,
        managerName,
        parameters,
        options
      },
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
   * Creates or updates the bandwidth setting
   * @param bandwidthSettingName The bandwidth setting name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The bandwidth setting to be added or updated.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    bandwidthSettingName: string,
    resourceGroupName: string,
    managerName: string,
    parameters: BandwidthSetting,
    options?: BandwidthSettingsCreateOrUpdateOptionalParams
  ): Promise<BandwidthSettingsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      bandwidthSettingName,
      resourceGroupName,
      managerName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes the bandwidth setting
   * @param bandwidthSettingName The name of the bandwidth setting.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  async beginDelete(
    bandwidthSettingName: string,
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsDeleteOptionalParams
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
      { bandwidthSettingName, resourceGroupName, managerName, options },
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
   * Deletes the bandwidth setting
   * @param bandwidthSettingName The name of the bandwidth setting.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    bandwidthSettingName: string,
    resourceGroupName: string,
    managerName: string,
    options?: BandwidthSettingsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      bandwidthSettingName,
      resourceGroupName,
      managerName,
      options
    );
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByManagerOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/bandwidthSettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSettingList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/bandwidthSettings/{bandwidthSettingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSetting
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.bandwidthSettingName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/bandwidthSettings/{bandwidthSettingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BandwidthSetting
    },
    201: {
      bodyMapper: Mappers.BandwidthSetting
    },
    202: {
      bodyMapper: Mappers.BandwidthSetting
    },
    204: {
      bodyMapper: Mappers.BandwidthSetting
    }
  },
  requestBody: Parameters.parameters6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.bandwidthSettingName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/bandwidthSettings/{bandwidthSettingName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.bandwidthSettingName
  ],
  serializer
};
