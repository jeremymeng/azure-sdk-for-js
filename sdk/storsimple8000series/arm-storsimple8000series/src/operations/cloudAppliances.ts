/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { CloudAppliances } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  CloudApplianceConfiguration,
  CloudAppliancesListSupportedConfigurationsOptionalParams,
  CloudAppliancesListSupportedConfigurationsResponse,
  CloudAppliance,
  CloudAppliancesProvisionOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing CloudAppliances operations. */
export class CloudAppliancesImpl implements CloudAppliances {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class CloudAppliances class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Lists supported cloud appliance models and supported configurations.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  public listSupportedConfigurations(
    resourceGroupName: string,
    managerName: string,
    options?: CloudAppliancesListSupportedConfigurationsOptionalParams
  ): PagedAsyncIterableIterator<CloudApplianceConfiguration> {
    const iter = this.listSupportedConfigurationsPagingAll(
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
        return this.listSupportedConfigurationsPagingPage(
          resourceGroupName,
          managerName,
          options,
          settings
        );
      }
    };
  }

  private async *listSupportedConfigurationsPagingPage(
    resourceGroupName: string,
    managerName: string,
    options?: CloudAppliancesListSupportedConfigurationsOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<CloudApplianceConfiguration[]> {
    let result: CloudAppliancesListSupportedConfigurationsResponse;
    result = await this._listSupportedConfigurations(
      resourceGroupName,
      managerName,
      options
    );
    yield result.value || [];
  }

  private async *listSupportedConfigurationsPagingAll(
    resourceGroupName: string,
    managerName: string,
    options?: CloudAppliancesListSupportedConfigurationsOptionalParams
  ): AsyncIterableIterator<CloudApplianceConfiguration> {
    for await (const page of this.listSupportedConfigurationsPagingPage(
      resourceGroupName,
      managerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists supported cloud appliance models and supported configurations.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  private _listSupportedConfigurations(
    resourceGroupName: string,
    managerName: string,
    options?: CloudAppliancesListSupportedConfigurationsOptionalParams
  ): Promise<CloudAppliancesListSupportedConfigurationsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      listSupportedConfigurationsOperationSpec
    );
  }

  /**
   * Provisions cloud appliance.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The cloud appliance
   * @param options The options parameters.
   */
  async beginProvision(
    resourceGroupName: string,
    managerName: string,
    parameters: CloudAppliance,
    options?: CloudAppliancesProvisionOptionalParams
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
      { resourceGroupName, managerName, parameters, options },
      provisionOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Provisions cloud appliance.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The cloud appliance
   * @param options The options parameters.
   */
  async beginProvisionAndWait(
    resourceGroupName: string,
    managerName: string,
    parameters: CloudAppliance,
    options?: CloudAppliancesProvisionOptionalParams
  ): Promise<void> {
    const poller = await this.beginProvision(
      resourceGroupName,
      managerName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listSupportedConfigurationsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/cloudApplianceConfigurations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CloudApplianceConfigurationList
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
const provisionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/provisionCloudAppliance",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
