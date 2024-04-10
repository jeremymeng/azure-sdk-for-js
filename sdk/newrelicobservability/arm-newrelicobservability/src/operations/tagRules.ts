/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { TagRules } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NewRelicObservability } from "../newRelicObservability";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  TagRule,
  TagRulesListByNewRelicMonitorResourceNextOptionalParams,
  TagRulesListByNewRelicMonitorResourceOptionalParams,
  TagRulesListByNewRelicMonitorResourceResponse,
  TagRulesGetOptionalParams,
  TagRulesGetResponse,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesCreateOrUpdateResponse,
  TagRulesDeleteOptionalParams,
  TagRuleUpdate,
  TagRulesUpdateOptionalParams,
  TagRulesUpdateResponse,
  TagRulesListByNewRelicMonitorResourceNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing TagRules operations. */
export class TagRulesImpl implements TagRules {
  private readonly client: NewRelicObservability;

  /**
   * Initialize a new instance of the class TagRules class.
   * @param client Reference to the service client
   */
  constructor(client: NewRelicObservability) {
    this.client = client;
  }

  /**
   * List TagRule resources by NewRelicMonitorResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param options The options parameters.
   */
  public listByNewRelicMonitorResource(
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
  ): PagedAsyncIterableIterator<TagRule> {
    const iter = this.listByNewRelicMonitorResourcePagingAll(
      resourceGroupName,
      monitorName,
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
        return this.listByNewRelicMonitorResourcePagingPage(
          resourceGroupName,
          monitorName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByNewRelicMonitorResourcePagingPage(
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<TagRule[]> {
    let result: TagRulesListByNewRelicMonitorResourceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByNewRelicMonitorResource(
        resourceGroupName,
        monitorName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByNewRelicMonitorResourceNext(
        resourceGroupName,
        monitorName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByNewRelicMonitorResourcePagingAll(
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
  ): AsyncIterableIterator<TagRule> {
    for await (const page of this.listByNewRelicMonitorResourcePagingPage(
      resourceGroupName,
      monitorName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List TagRule resources by NewRelicMonitorResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param options The options parameters.
   */
  private _listByNewRelicMonitorResource(
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
  ): Promise<TagRulesListByNewRelicMonitorResourceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, options },
      listByNewRelicMonitorResourceOperationSpec,
    );
  }

  /**
   * Get a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ): Promise<TagRulesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, ruleSetName, options },
      getOperationSpec,
    );
  }

  /**
   * Create a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<TagRulesCreateOrUpdateResponse>,
      TagRulesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<TagRulesCreateOrUpdateResponse> => {
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
      args: { resourceGroupName, monitorName, ruleSetName, resource, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      TagRulesCreateOrUpdateResponse,
      OperationState<TagRulesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ): Promise<TagRulesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      monitorName,
      ruleSetName,
      resource,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
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
      args: { resourceGroupName, monitorName, ruleSetName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      monitorName,
      ruleSetName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Update a TagRule
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param ruleSetName Name of the TagRule
   * @param properties The resource properties to be updated.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    properties: TagRuleUpdate,
    options?: TagRulesUpdateOptionalParams,
  ): Promise<TagRulesUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, ruleSetName, properties, options },
      updateOperationSpec,
    );
  }

  /**
   * ListByNewRelicMonitorResourceNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Name of the Monitors resource
   * @param nextLink The nextLink from the previous successful call to the ListByNewRelicMonitorResource
   *                 method.
   * @param options The options parameters.
   */
  private _listByNewRelicMonitorResourceNext(
    resourceGroupName: string,
    monitorName: string,
    nextLink: string,
    options?: TagRulesListByNewRelicMonitorResourceNextOptionalParams,
  ): Promise<TagRulesListByNewRelicMonitorResourceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, nextLink, options },
      listByNewRelicMonitorResourceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByNewRelicMonitorResourceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagRuleListResult,
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
    Parameters.monitorName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagRule,
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
    Parameters.monitorName,
    Parameters.ruleSetName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.TagRule,
    },
    201: {
      bodyMapper: Mappers.TagRule,
    },
    202: {
      bodyMapper: Mappers.TagRule,
    },
    204: {
      bodyMapper: Mappers.TagRule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.resource1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.ruleSetName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}",
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
    Parameters.monitorName,
    Parameters.ruleSetName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.TagRule,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.properties1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.ruleSetName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByNewRelicMonitorResourceNextOperationSpec: coreClient.OperationSpec =
  {
    path: "{nextLink}",
    httpMethod: "GET",
    responses: {
      200: {
        bodyMapper: Mappers.TagRuleListResult,
      },
      default: {
        bodyMapper: Mappers.ErrorResponse,
      },
    },
    urlParameters: [
      Parameters.$host,
      Parameters.nextLink,
      Parameters.subscriptionId,
      Parameters.resourceGroupName,
      Parameters.monitorName,
    ],
    headerParameters: [Parameters.accept],
    serializer,
  };
