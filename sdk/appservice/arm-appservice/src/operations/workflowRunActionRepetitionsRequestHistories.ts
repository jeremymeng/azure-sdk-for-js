/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { WorkflowRunActionRepetitionsRequestHistories } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { WebSiteManagementClient } from "../webSiteManagementClient.js";
import {
  RequestHistory,
  WorkflowRunActionRepetitionsRequestHistoriesListNextOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesListResponse,
  WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesGetResponse,
  WorkflowRunActionRepetitionsRequestHistoriesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing WorkflowRunActionRepetitionsRequestHistories operations. */
export class WorkflowRunActionRepetitionsRequestHistoriesImpl
  implements WorkflowRunActionRepetitionsRequestHistories
{
  private readonly client: WebSiteManagementClient;

  /**
   * Initialize a new instance of the class WorkflowRunActionRepetitionsRequestHistories class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClient) {
    this.client = client;
  }

  /**
   * List a workflow run repetition request history.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  ): PagedAsyncIterableIterator<RequestHistory> {
    const iter = this.listPagingAll(
      resourceGroupName,
      name,
      workflowName,
      runName,
      actionName,
      repetitionName,
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
          name,
          workflowName,
          runName,
          actionName,
          repetitionName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RequestHistory[]> {
    let result: WorkflowRunActionRepetitionsRequestHistoriesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
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
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
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
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  ): AsyncIterableIterator<RequestHistory> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      name,
      workflowName,
      runName,
      actionName,
      repetitionName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List a workflow run repetition request history.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  ): Promise<WorkflowRunActionRepetitionsRequestHistoriesListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options,
      },
      listOperationSpec,
    );
  }

  /**
   * Gets a workflow run repetition request history.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param requestHistoryName The request history name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    requestHistoryName: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
  ): Promise<WorkflowRunActionRepetitionsRequestHistoriesGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        requestHistoryName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param name Site name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    name: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    nextLink: string,
    options?: WorkflowRunActionRepetitionsRequestHistoriesListNextOptionalParams,
  ): Promise<WorkflowRunActionRepetitionsRequestHistoriesListNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        nextLink,
        options,
      },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RequestHistoryListResult,
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
    Parameters.name,
    Parameters.workflowName1,
    Parameters.runName,
    Parameters.actionName,
    Parameters.repetitionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories/{requestHistoryName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RequestHistory,
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
    Parameters.name,
    Parameters.workflowName1,
    Parameters.runName,
    Parameters.actionName,
    Parameters.repetitionName,
    Parameters.requestHistoryName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RequestHistoryListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.nextLink,
    Parameters.workflowName1,
    Parameters.runName,
    Parameters.actionName,
    Parameters.repetitionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
