/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/schedulesMappers";
import * as Parameters from "../models/parameters";
import { DevTestLabsClientContext } from "../devTestLabsClientContext";

/** Class representing a Schedules. */
export class Schedules {
  private readonly client: DevTestLabsClientContext;

  /**
   * Create a Schedules.
   * @param {DevTestLabsClientContext} client Reference to the service client.
   */
  constructor(client: DevTestLabsClientContext) {
    this.client = client;
  }

  /**
   * List schedules in a given lab.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesListResponse>
   */
  list(resourceGroupName: string, labName: string, options?: Models.SchedulesListOptionalParams): Promise<Models.SchedulesListResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, options: Models.SchedulesListOptionalParams, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  list(resourceGroupName: string, labName: string, options?: Models.SchedulesListOptionalParams | msRest.ServiceCallback<Models.ScheduleList>, callback?: msRest.ServiceCallback<Models.ScheduleList>): Promise<Models.SchedulesListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        options
      },
      listOperationSpec,
      callback) as Promise<Models.SchedulesListResponse>;
  }

  /**
   * Get schedule.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesGetResponse>
   */
  get(resourceGroupName: string, labName: string, name: string, options?: Models.SchedulesGetOptionalParams): Promise<Models.SchedulesGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, name: string, callback: msRest.ServiceCallback<Models.Schedule>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, name: string, options: Models.SchedulesGetOptionalParams, callback: msRest.ServiceCallback<Models.Schedule>): void;
  get(resourceGroupName: string, labName: string, name: string, options?: Models.SchedulesGetOptionalParams | msRest.ServiceCallback<Models.Schedule>, callback?: msRest.ServiceCallback<Models.Schedule>): Promise<Models.SchedulesGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.SchedulesGetResponse>;
  }

  /**
   * Create or replace an existing schedule.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, schedule: Models.Schedule, options?: msRest.RequestOptionsBase): Promise<Models.SchedulesCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, schedule: Models.Schedule, callback: msRest.ServiceCallback<Models.Schedule>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, schedule: Models.Schedule, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Schedule>): void;
  createOrUpdate(resourceGroupName: string, labName: string, name: string, schedule: Models.Schedule, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Schedule>, callback?: msRest.ServiceCallback<Models.Schedule>): Promise<Models.SchedulesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        schedule,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.SchedulesCreateOrUpdateResponse>;
  }

  /**
   * Delete schedule.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, labName: string, name: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, labName: string, name: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Modify properties of schedules.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesUpdateResponse>
   */
  update(resourceGroupName: string, labName: string, name: string, schedule: Models.ScheduleFragment, options?: msRest.RequestOptionsBase): Promise<Models.SchedulesUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param callback The callback
   */
  update(resourceGroupName: string, labName: string, name: string, schedule: Models.ScheduleFragment, callback: msRest.ServiceCallback<Models.Schedule>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param schedule A schedule.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, labName: string, name: string, schedule: Models.ScheduleFragment, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Schedule>): void;
  update(resourceGroupName: string, labName: string, name: string, schedule: Models.ScheduleFragment, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Schedule>, callback?: msRest.ServiceCallback<Models.Schedule>): Promise<Models.SchedulesUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        schedule,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.SchedulesUpdateResponse>;
  }

  /**
   * Execute a schedule. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  execute(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginExecute(resourceGroupName,labName,name,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Lists all applicable schedules
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesListApplicableResponse>
   */
  listApplicable(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase): Promise<Models.SchedulesListApplicableResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param callback The callback
   */
  listApplicable(resourceGroupName: string, labName: string, name: string, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param options The optional parameters
   * @param callback The callback
   */
  listApplicable(resourceGroupName: string, labName: string, name: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  listApplicable(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ScheduleList>, callback?: msRest.ServiceCallback<Models.ScheduleList>): Promise<Models.SchedulesListApplicableResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        options
      },
      listApplicableOperationSpec,
      callback) as Promise<Models.SchedulesListApplicableResponse>;
  }

  /**
   * Execute a schedule. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the schedule.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginExecute(resourceGroupName: string, labName: string, name: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        labName,
        name,
        options
      },
      beginExecuteOperationSpec,
      options);
  }

  /**
   * List schedules in a given lab.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.SchedulesListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ScheduleList>, callback?: msRest.ServiceCallback<Models.ScheduleList>): Promise<Models.SchedulesListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.SchedulesListNextResponse>;
  }

  /**
   * Lists all applicable schedules
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.SchedulesListApplicableNextResponse>
   */
  listApplicableNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.SchedulesListApplicableNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listApplicableNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listApplicableNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ScheduleList>): void;
  listApplicableNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ScheduleList>, callback?: msRest.ServiceCallback<Models.ScheduleList>): Promise<Models.SchedulesListApplicableNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listApplicableNextOperationSpec,
      callback) as Promise<Models.SchedulesListApplicableNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName
  ],
  queryParameters: [
    Parameters.expand,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.expand,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Schedule
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "schedule",
    mapper: {
      ...Mappers.Schedule,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.Schedule
    },
    201: {
      bodyMapper: Mappers.Schedule
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const updateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "schedule",
    mapper: {
      ...Mappers.ScheduleFragment,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.Schedule
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listApplicableOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}/listApplicable",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginExecuteOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/schedules/{name}/execute",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listApplicableNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ScheduleList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
