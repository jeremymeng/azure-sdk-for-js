/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { JobRuns } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { StorageMoverClient } from "../storageMoverClient.js";
import {
  JobRun,
  JobRunsListNextOptionalParams,
  JobRunsListOptionalParams,
  JobRunsListResponse,
  JobRunsGetOptionalParams,
  JobRunsGetResponse,
  JobRunsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing JobRuns operations. */
export class JobRunsImpl implements JobRuns {
  private readonly client: StorageMoverClient;

  /**
   * Initialize a new instance of the class JobRuns class.
   * @param client Reference to the service client
   */
  constructor(client: StorageMoverClient) {
    this.client = client;
  }

  /**
   * Lists all Job Runs in a Job Definition.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageMoverName The name of the Storage Mover resource.
   * @param projectName The name of the Project resource.
   * @param jobDefinitionName The name of the Job Definition resource.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobRunsListOptionalParams,
  ): PagedAsyncIterableIterator<JobRun> {
    const iter = this.listPagingAll(
      resourceGroupName,
      storageMoverName,
      projectName,
      jobDefinitionName,
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
          storageMoverName,
          projectName,
          jobDefinitionName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobRunsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<JobRun[]> {
    let result: JobRunsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
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
        storageMoverName,
        projectName,
        jobDefinitionName,
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
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobRunsListOptionalParams,
  ): AsyncIterableIterator<JobRun> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      storageMoverName,
      projectName,
      jobDefinitionName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists all Job Runs in a Job Definition.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageMoverName The name of the Storage Mover resource.
   * @param projectName The name of the Project resource.
   * @param jobDefinitionName The name of the Job Definition resource.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobRunsListOptionalParams,
  ): Promise<JobRunsListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      },
      listOperationSpec,
    );
  }

  /**
   * Gets a Job Run resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageMoverName The name of the Storage Mover resource.
   * @param projectName The name of the Project resource.
   * @param jobDefinitionName The name of the Job Definition resource.
   * @param jobRunName The name of the Job Run resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    jobRunName: string,
    options?: JobRunsGetOptionalParams,
  ): Promise<JobRunsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        jobRunName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageMoverName The name of the Storage Mover resource.
   * @param projectName The name of the Project resource.
   * @param jobDefinitionName The name of the Job Definition resource.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    nextLink: string,
    options?: JobRunsListNextOptionalParams,
  ): Promise<JobRunsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
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
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JobRunList,
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
    Parameters.storageMoverName,
    Parameters.projectName,
    Parameters.jobDefinitionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns/{jobRunName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JobRun,
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
    Parameters.storageMoverName,
    Parameters.projectName,
    Parameters.jobDefinitionName,
    Parameters.jobRunName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JobRunList,
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
    Parameters.storageMoverName,
    Parameters.projectName,
    Parameters.jobDefinitionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
