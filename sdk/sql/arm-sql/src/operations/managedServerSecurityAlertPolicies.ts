/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ManagedServerSecurityAlertPolicies } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClientContext } from "../sqlManagementClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  ManagedServerSecurityAlertPolicy,
  ManagedServerSecurityAlertPoliciesListByInstanceNextOptionalParams,
  ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams,
  SecurityAlertPolicyNameAutoGenerated,
  ManagedServerSecurityAlertPoliciesGetOptionalParams,
  ManagedServerSecurityAlertPoliciesGetResponse,
  ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ManagedServerSecurityAlertPoliciesCreateOrUpdateResponse,
  ManagedServerSecurityAlertPoliciesListByInstanceResponse,
  ManagedServerSecurityAlertPoliciesListByInstanceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a ManagedServerSecurityAlertPolicies. */
export class ManagedServerSecurityAlertPoliciesImpl
  implements ManagedServerSecurityAlertPolicies {
  private readonly client: SqlManagementClientContext;

  /**
   * Initialize a new instance of the class ManagedServerSecurityAlertPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClientContext) {
    this.client = client;
  }

  /**
   * Get the managed server's threat detection policies.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param options The options parameters.
   */
  public listByInstance(
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams
  ): PagedAsyncIterableIterator<ManagedServerSecurityAlertPolicy> {
    const iter = this.listByInstancePagingAll(
      resourceGroupName,
      managedInstanceName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByInstancePagingPage(
          resourceGroupName,
          managedInstanceName,
          options
        );
      }
    };
  }

  private async *listByInstancePagingPage(
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams
  ): AsyncIterableIterator<ManagedServerSecurityAlertPolicy[]> {
    let result = await this._listByInstance(
      resourceGroupName,
      managedInstanceName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByInstanceNext(
        resourceGroupName,
        managedInstanceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByInstancePagingAll(
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams
  ): AsyncIterableIterator<ManagedServerSecurityAlertPolicy> {
    for await (const page of this.listByInstancePagingPage(
      resourceGroupName,
      managedInstanceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get a managed server's threat detection policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param securityAlertPolicyName The name of the security alert policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyNameAutoGenerated,
    options?: ManagedServerSecurityAlertPoliciesGetOptionalParams
  ): Promise<ManagedServerSecurityAlertPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a threat detection policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param securityAlertPolicyName The name of the security alert policy.
   * @param parameters The managed server security alert policy.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyNameAutoGenerated,
    parameters: ManagedServerSecurityAlertPolicy,
    options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        ManagedServerSecurityAlertPoliciesCreateOrUpdateResponse
      >,
      ManagedServerSecurityAlertPoliciesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<ManagedServerSecurityAlertPoliciesCreateOrUpdateResponse> => {
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
        resourceGroupName,
        managedInstanceName,
        securityAlertPolicyName,
        parameters,
        options
      },
      createOrUpdateOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Creates or updates a threat detection policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param securityAlertPolicyName The name of the security alert policy.
   * @param parameters The managed server security alert policy.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    managedInstanceName: string,
    securityAlertPolicyName: SecurityAlertPolicyNameAutoGenerated,
    parameters: ManagedServerSecurityAlertPolicy,
    options?: ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams
  ): Promise<ManagedServerSecurityAlertPoliciesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      managedInstanceName,
      securityAlertPolicyName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get the managed server's threat detection policies.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param options The options parameters.
   */
  private _listByInstance(
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams
  ): Promise<ManagedServerSecurityAlertPoliciesListByInstanceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managedInstanceName, options },
      listByInstanceOperationSpec
    );
  }

  /**
   * ListByInstanceNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param nextLink The nextLink from the previous successful call to the ListByInstance method.
   * @param options The options parameters.
   */
  private _listByInstanceNext(
    resourceGroupName: string,
    managedInstanceName: string,
    nextLink: string,
    options?: ManagedServerSecurityAlertPoliciesListByInstanceNextOptionalParams
  ): Promise<ManagedServerSecurityAlertPoliciesListByInstanceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managedInstanceName, nextLink, options },
      listByInstanceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicy
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.securityAlertPolicyName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicy
    },
    201: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicy
    },
    202: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicy
    },
    204: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicy
    },
    default: {}
  },
  requestBody: Parameters.parameters61,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.securityAlertPolicyName1
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByInstanceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicyListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByInstanceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedServerSecurityAlertPolicyListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.managedInstanceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
