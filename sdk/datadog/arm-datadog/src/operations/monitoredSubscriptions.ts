/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { MonitoredSubscriptions } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MicrosoftDatadogClient } from "../microsoftDatadogClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  MonitoredSubscriptionProperties,
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsListResponse,
  MonitoredSubscriptionsGetOptionalParams,
  MonitoredSubscriptionsGetResponse,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateResponse,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsUpdateResponse,
  MonitoredSubscriptionsDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing MonitoredSubscriptions operations. */
export class MonitoredSubscriptionsImpl implements MonitoredSubscriptions {
  private readonly client: MicrosoftDatadogClient;

  /**
   * Initialize a new instance of the class MonitoredSubscriptions class.
   * @param client Reference to the service client
   */
  constructor(client: MicrosoftDatadogClient) {
    this.client = client;
  }

  /**
   * List the subscriptions currently being monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams
  ): PagedAsyncIterableIterator<MonitoredSubscriptionProperties> {
    const iter = this.listPagingAll(resourceGroupName, monitorName, options);
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
          monitorName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<MonitoredSubscriptionProperties[]> {
    let result: MonitoredSubscriptionsListResponse;
    result = await this._list(resourceGroupName, monitorName, options);
    yield result.value || [];
  }

  private async *listPagingAll(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams
  ): AsyncIterableIterator<MonitoredSubscriptionProperties> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      monitorName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List the subscriptions currently being monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams
  ): Promise<MonitoredSubscriptionsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, options },
      listOperationSpec
    );
  }

  /**
   * List the subscriptions currently being monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName The configuration name. Only 'default' value is supported.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsGetOptionalParams
  ): Promise<MonitoredSubscriptionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, configurationName, options },
      getOperationSpec
    );
  }

  /**
   * Add the subscriptions that should be monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName The configuration name. Only 'default' value is supported.
   * @param options The options parameters.
   */
  async beginCreateorUpdate(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitoredSubscriptionsCreateorUpdateResponse>,
      MonitoredSubscriptionsCreateorUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<MonitoredSubscriptionsCreateorUpdateResponse> => {
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
      args: { resourceGroupName, monitorName, configurationName, options },
      spec: createorUpdateOperationSpec
    });
    const poller = await createHttpPoller<
      MonitoredSubscriptionsCreateorUpdateResponse,
      OperationState<MonitoredSubscriptionsCreateorUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Add the subscriptions that should be monitored by the Datadog monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName The configuration name. Only 'default' value is supported.
   * @param options The options parameters.
   */
  async beginCreateorUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams
  ): Promise<MonitoredSubscriptionsCreateorUpdateResponse> {
    const poller = await this.beginCreateorUpdate(
      resourceGroupName,
      monitorName,
      configurationName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates the subscriptions that are being monitored by the Datadog monitor resource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName The configuration name. Only 'default' value is supported.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitoredSubscriptionsUpdateResponse>,
      MonitoredSubscriptionsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<MonitoredSubscriptionsUpdateResponse> => {
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
      args: { resourceGroupName, monitorName, configurationName, options },
      spec: updateOperationSpec
    });
    const poller = await createHttpPoller<
      MonitoredSubscriptionsUpdateResponse,
      OperationState<MonitoredSubscriptionsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates the subscriptions that are being monitored by the Datadog monitor resource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName The configuration name. Only 'default' value is supported.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams
  ): Promise<MonitoredSubscriptionsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      monitorName,
      configurationName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates the subscriptions that are being monitored by the Datadog monitor resource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName Configuration name
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      args: { resourceGroupName, monitorName, configurationName, options },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates the subscriptions that are being monitored by the Datadog monitor resource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName Configuration name
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      monitorName,
      configurationName,
      options
    );
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MonitoredSubscriptionPropertiesList
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
    Parameters.monitorName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
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
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createorUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    201: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    202: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    204: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    201: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    202: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    204: {
      bodyMapper: Mappers.MonitoredSubscriptionProperties
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
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
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
