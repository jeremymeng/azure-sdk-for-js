/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AutoUpgradeProfiles } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ContainerServiceFleetClient } from "../containerServiceFleetClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  AutoUpgradeProfile,
  AutoUpgradeProfilesListByFleetNextOptionalParams,
  AutoUpgradeProfilesListByFleetOptionalParams,
  AutoUpgradeProfilesListByFleetResponse,
  AutoUpgradeProfilesGetOptionalParams,
  AutoUpgradeProfilesGetResponse,
  AutoUpgradeProfilesCreateOrUpdateOptionalParams,
  AutoUpgradeProfilesCreateOrUpdateResponse,
  AutoUpgradeProfilesDeleteOptionalParams,
  AutoUpgradeProfilesDeleteResponse,
  AutoUpgradeProfilesListByFleetNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AutoUpgradeProfiles operations. */
export class AutoUpgradeProfilesImpl implements AutoUpgradeProfiles {
  private readonly client: ContainerServiceFleetClient;

  /**
   * Initialize a new instance of the class AutoUpgradeProfiles class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerServiceFleetClient) {
    this.client = client;
  }

  /**
   * List AutoUpgradeProfile resources by Fleet
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param options The options parameters.
   */
  public listByFleet(
    resourceGroupName: string,
    fleetName: string,
    options?: AutoUpgradeProfilesListByFleetOptionalParams,
  ): PagedAsyncIterableIterator<AutoUpgradeProfile> {
    const iter = this.listByFleetPagingAll(
      resourceGroupName,
      fleetName,
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
        return this.listByFleetPagingPage(
          resourceGroupName,
          fleetName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByFleetPagingPage(
    resourceGroupName: string,
    fleetName: string,
    options?: AutoUpgradeProfilesListByFleetOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AutoUpgradeProfile[]> {
    let result: AutoUpgradeProfilesListByFleetResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByFleet(resourceGroupName, fleetName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByFleetNext(
        resourceGroupName,
        fleetName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByFleetPagingAll(
    resourceGroupName: string,
    fleetName: string,
    options?: AutoUpgradeProfilesListByFleetOptionalParams,
  ): AsyncIterableIterator<AutoUpgradeProfile> {
    for await (const page of this.listByFleetPagingPage(
      resourceGroupName,
      fleetName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List AutoUpgradeProfile resources by Fleet
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param options The options parameters.
   */
  private _listByFleet(
    resourceGroupName: string,
    fleetName: string,
    options?: AutoUpgradeProfilesListByFleetOptionalParams,
  ): Promise<AutoUpgradeProfilesListByFleetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, options },
      listByFleetOperationSpec,
    );
  }

  /**
   * Get a AutoUpgradeProfile
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param autoUpgradeProfileName The name of the AutoUpgradeProfile resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfilesGetOptionalParams,
  ): Promise<AutoUpgradeProfilesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, autoUpgradeProfileName, options },
      getOperationSpec,
    );
  }

  /**
   * Create a AutoUpgradeProfile
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param autoUpgradeProfileName The name of the AutoUpgradeProfile resource.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    resource: AutoUpgradeProfile,
    options?: AutoUpgradeProfilesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AutoUpgradeProfilesCreateOrUpdateResponse>,
      AutoUpgradeProfilesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<AutoUpgradeProfilesCreateOrUpdateResponse> => {
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
        fleetName,
        autoUpgradeProfileName,
        resource,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      AutoUpgradeProfilesCreateOrUpdateResponse,
      OperationState<AutoUpgradeProfilesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a AutoUpgradeProfile
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param autoUpgradeProfileName The name of the AutoUpgradeProfile resource.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    resource: AutoUpgradeProfile,
    options?: AutoUpgradeProfilesCreateOrUpdateOptionalParams,
  ): Promise<AutoUpgradeProfilesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      fleetName,
      autoUpgradeProfileName,
      resource,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a AutoUpgradeProfile
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param autoUpgradeProfileName The name of the AutoUpgradeProfile resource.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfilesDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AutoUpgradeProfilesDeleteResponse>,
      AutoUpgradeProfilesDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<AutoUpgradeProfilesDeleteResponse> => {
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
      args: { resourceGroupName, fleetName, autoUpgradeProfileName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      AutoUpgradeProfilesDeleteResponse,
      OperationState<AutoUpgradeProfilesDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a AutoUpgradeProfile
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param autoUpgradeProfileName The name of the AutoUpgradeProfile resource.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfilesDeleteOptionalParams,
  ): Promise<AutoUpgradeProfilesDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      fleetName,
      autoUpgradeProfileName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByFleetNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param nextLink The nextLink from the previous successful call to the ListByFleet method.
   * @param options The options parameters.
   */
  private _listByFleetNext(
    resourceGroupName: string,
    fleetName: string,
    nextLink: string,
    options?: AutoUpgradeProfilesListByFleetNextOptionalParams,
  ): Promise<AutoUpgradeProfilesListByFleetNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, nextLink, options },
      listByFleetNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByFleetOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutoUpgradeProfileListResult,
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
    Parameters.fleetName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutoUpgradeProfile,
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
    Parameters.fleetName,
    Parameters.autoUpgradeProfileName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AutoUpgradeProfile,
    },
    201: {
      bodyMapper: Mappers.AutoUpgradeProfile,
    },
    202: {
      bodyMapper: Mappers.AutoUpgradeProfile,
    },
    204: {
      bodyMapper: Mappers.AutoUpgradeProfile,
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
    Parameters.fleetName,
    Parameters.autoUpgradeProfileName,
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.AutoUpgradeProfilesDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.AutoUpgradeProfilesDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.AutoUpgradeProfilesDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.AutoUpgradeProfilesDeleteHeaders,
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
    Parameters.fleetName,
    Parameters.autoUpgradeProfileName,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer,
};
const listByFleetNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AutoUpgradeProfileListResult,
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
    Parameters.fleetName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
