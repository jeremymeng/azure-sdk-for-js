/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Access } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ConfluentManagementClient } from "../confluentManagementClient.js";
import {
  ListAccessRequestModel,
  AccessListUsersOptionalParams,
  AccessListUsersResponse,
  AccessListServiceAccountsOptionalParams,
  AccessListServiceAccountsResponse,
  AccessListInvitationsOptionalParams,
  AccessListInvitationsResponse,
  AccessInviteUserAccountModel,
  AccessInviteUserOptionalParams,
  AccessInviteUserResponse,
  AccessListEnvironmentsOptionalParams,
  AccessListEnvironmentsResponse,
  AccessListClustersOptionalParams,
  AccessListClustersResponse,
  AccessListRoleBindingsOptionalParams,
  AccessListRoleBindingsResponse,
  AccessCreateRoleBindingRequestModel,
  AccessCreateRoleBindingOptionalParams,
  AccessCreateRoleBindingResponse,
  AccessDeleteRoleBindingOptionalParams,
  AccessListRoleBindingNameListOptionalParams,
  AccessListRoleBindingNameListResponse,
} from "../models/index.js";

/** Class containing Access operations. */
export class AccessImpl implements Access {
  private readonly client: ConfluentManagementClient;

  /**
   * Initialize a new instance of the class Access class.
   * @param client Reference to the service client
   */
  constructor(client: ConfluentManagementClient) {
    this.client = client;
  }

  /**
   * Organization users details
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listUsers(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListUsersOptionalParams,
  ): Promise<AccessListUsersResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listUsersOperationSpec,
    );
  }

  /**
   * Organization service accounts details
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listServiceAccounts(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListServiceAccountsOptionalParams,
  ): Promise<AccessListServiceAccountsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listServiceAccountsOperationSpec,
    );
  }

  /**
   * Organization accounts invitation details
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listInvitations(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListInvitationsOptionalParams,
  ): Promise<AccessListInvitationsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listInvitationsOperationSpec,
    );
  }

  /**
   * Invite user to the organization
   * @param resourceGroupName Resource group name
   * @param organizationName Organization resource name
   * @param body Invite user account model
   * @param options The options parameters.
   */
  inviteUser(
    resourceGroupName: string,
    organizationName: string,
    body: AccessInviteUserAccountModel,
    options?: AccessInviteUserOptionalParams,
  ): Promise<AccessInviteUserResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      inviteUserOperationSpec,
    );
  }

  /**
   * Environment list of an organization
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listEnvironments(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListEnvironmentsOptionalParams,
  ): Promise<AccessListEnvironmentsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listEnvironmentsOperationSpec,
    );
  }

  /**
   * Cluster details
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listClusters(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListClustersOptionalParams,
  ): Promise<AccessListClustersResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listClustersOperationSpec,
    );
  }

  /**
   * Organization role bindings
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listRoleBindings(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListRoleBindingsOptionalParams,
  ): Promise<AccessListRoleBindingsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listRoleBindingsOperationSpec,
    );
  }

  /**
   * Organization role bindings
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param body Create role binding Request Model
   * @param options The options parameters.
   */
  createRoleBinding(
    resourceGroupName: string,
    organizationName: string,
    body: AccessCreateRoleBindingRequestModel,
    options?: AccessCreateRoleBindingOptionalParams,
  ): Promise<AccessCreateRoleBindingResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      createRoleBindingOperationSpec,
    );
  }

  /**
   * Organization role bindings
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param roleBindingId Confluent Role binding id
   * @param options The options parameters.
   */
  deleteRoleBinding(
    resourceGroupName: string,
    organizationName: string,
    roleBindingId: string,
    options?: AccessDeleteRoleBindingOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, roleBindingId, options },
      deleteRoleBindingOperationSpec,
    );
  }

  /**
   * Organization role bindings
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param organizationName Organization resource name
   * @param body List Access Request Model
   * @param options The options parameters.
   */
  listRoleBindingNameList(
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListRoleBindingNameListOptionalParams,
  ): Promise<AccessListRoleBindingNameListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, organizationName, body, options },
      listRoleBindingNameListOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listUsersOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listUsers",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListUsersSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.organizationName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listServiceAccountsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listServiceAccounts",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListServiceAccountsSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.organizationName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listInvitationsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listInvitations",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListInvitationsSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.organizationName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const inviteUserOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createInvitation",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.InvitationRecord,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.organizationName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listEnvironmentsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listEnvironments",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListEnvironmentsSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listClustersOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listClusters",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListClusterSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listRoleBindingsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindings",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessListRoleBindingsSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const createRoleBindingOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createRoleBinding",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RoleBindingRecord,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteRoleBindingOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/deleteRoleBinding/{roleBindingId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
    Parameters.roleBindingId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listRoleBindingNameListOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindingNameList",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessRoleBindingNameListSuccessResponse,
    },
    default: {
      bodyMapper: Mappers.ResourceProviderDefaultErrorResponse,
    },
  },
  requestBody: Parameters.body3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.organizationName,
    Parameters.resourceGroupName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
