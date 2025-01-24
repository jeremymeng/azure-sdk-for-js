/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { GroupQuotaSubscriptionAllocationRequest } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureQuotaExtensionAPI } from "../azureQuotaExtensionAPI.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  QuotaAllocationRequestStatus,
  GroupQuotaSubscriptionAllocationRequestListNextOptionalParams,
  GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  GroupQuotaSubscriptionAllocationRequestListResponse,
  SubscriptionQuotaAllocationsList,
  GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
  GroupQuotaSubscriptionAllocationRequestUpdateResponse,
  GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  GroupQuotaSubscriptionAllocationRequestGetResponse,
  GroupQuotaSubscriptionAllocationRequestListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing GroupQuotaSubscriptionAllocationRequest operations. */
export class GroupQuotaSubscriptionAllocationRequestImpl
  implements GroupQuotaSubscriptionAllocationRequest
{
  private readonly client: AzureQuotaExtensionAPI;

  /**
   * Initialize a new instance of the class GroupQuotaSubscriptionAllocationRequest class.
   * @param client Reference to the service client
   */
  constructor(client: AzureQuotaExtensionAPI) {
    this.client = client;
  }

  /**
   * Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for
   * location is required.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param filter | Field | Supported operators
   *               |---------------------|------------------------
   *
   *                location eq {location}
   *                Example: $filter=location eq eastus
   * @param options The options parameters.
   */
  public list(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  ): PagedAsyncIterableIterator<QuotaAllocationRequestStatus> {
    const iter = this.listPagingAll(
      managementGroupId,
      groupQuotaName,
      resourceProviderName,
      filter,
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
          managementGroupId,
          groupQuotaName,
          resourceProviderName,
          filter,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<QuotaAllocationRequestStatus[]> {
    let result: GroupQuotaSubscriptionAllocationRequestListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        filter,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
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
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  ): AsyncIterableIterator<QuotaAllocationRequestStatus> {
    for await (const page of this.listPagingPage(
      managementGroupId,
      groupQuotaName,
      resourceProviderName,
      filter,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Request to assign quota from group quota to a specific Subscription. The assign GroupQuota to
   * subscriptions or reduce the quota allocated to subscription to give back the unused quota ( quota >=
   * usages) to the groupQuota. So, this API can be used to assign Quota to subscriptions and assign back
   * unused quota to group quota, which can be assigned to another subscriptions in the GroupQuota. User
   * can collect unused quotas from multiple subscriptions within the groupQuota and assign the
   * groupQuota to the subscription, where it's needed.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param location The name of the Azure region.
   * @param allocateQuotaRequest Quota requests payload.
   * @param options The options parameters.
   */
  async beginUpdate(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    allocateQuotaRequest: SubscriptionQuotaAllocationsList,
    options?: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<GroupQuotaSubscriptionAllocationRequestUpdateResponse>,
      GroupQuotaSubscriptionAllocationRequestUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<GroupQuotaSubscriptionAllocationRequestUpdateResponse> => {
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
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        allocateQuotaRequest,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      GroupQuotaSubscriptionAllocationRequestUpdateResponse,
      OperationState<GroupQuotaSubscriptionAllocationRequestUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Request to assign quota from group quota to a specific Subscription. The assign GroupQuota to
   * subscriptions or reduce the quota allocated to subscription to give back the unused quota ( quota >=
   * usages) to the groupQuota. So, this API can be used to assign Quota to subscriptions and assign back
   * unused quota to group quota, which can be assigned to another subscriptions in the GroupQuota. User
   * can collect unused quotas from multiple subscriptions within the groupQuota and assign the
   * groupQuota to the subscription, where it's needed.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param location The name of the Azure region.
   * @param allocateQuotaRequest Quota requests payload.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    allocateQuotaRequest: SubscriptionQuotaAllocationsList,
    options?: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
  ): Promise<GroupQuotaSubscriptionAllocationRequestUpdateResponse> {
    const poller = await this.beginUpdate(
      managementGroupId,
      groupQuotaName,
      resourceProviderName,
      location,
      allocateQuotaRequest,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Get the quota allocation request status for the subscriptionId by allocationId.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param allocationId Request Id.
   * @param options The options parameters.
   */
  get(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    allocationId: string,
    options?: GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  ): Promise<GroupQuotaSubscriptionAllocationRequestGetResponse> {
    return this.client.sendOperationRequest(
      {
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        allocationId,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for
   * location is required.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param filter | Field | Supported operators
   *               |---------------------|------------------------
   *
   *                location eq {location}
   *                Example: $filter=location eq eastus
   * @param options The options parameters.
   */
  private _list(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  ): Promise<GroupQuotaSubscriptionAllocationRequestListResponse> {
    return this.client.sendOperationRequest(
      {
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        filter,
        options,
      },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    nextLink: string,
    options?: GroupQuotaSubscriptionAllocationRequestListNextOptionalParams,
  ): Promise<GroupQuotaSubscriptionAllocationRequestListNextResponse> {
    return this.client.sendOperationRequest(
      {
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        nextLink,
        options,
      },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const updateOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionQuotaAllocationsList,
    },
    201: {
      bodyMapper: Mappers.SubscriptionQuotaAllocationsList,
    },
    202: {
      bodyMapper: Mappers.SubscriptionQuotaAllocationsList,
    },
    204: {
      bodyMapper: Mappers.SubscriptionQuotaAllocationsList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.allocateQuotaRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.managementGroupId,
    Parameters.groupQuotaName,
    Parameters.subscriptionId,
    Parameters.resourceProviderName,
    Parameters.location,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests/{allocationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaAllocationRequestStatus,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.managementGroupId,
    Parameters.groupQuotaName,
    Parameters.subscriptionId,
    Parameters.resourceProviderName,
    Parameters.allocationId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaAllocationRequestStatusList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.managementGroupId,
    Parameters.groupQuotaName,
    Parameters.subscriptionId,
    Parameters.resourceProviderName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaAllocationRequestStatusList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.managementGroupId,
    Parameters.groupQuotaName,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceProviderName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
