/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CloudHsmClusterPrivateEndpointConnections } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureHSMResourceProvider } from "../azureHSMResourceProvider.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PrivateEndpointConnection,
  CloudHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  CloudHsmClusterPrivateEndpointConnectionsCreateResponse,
  CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  CloudHsmClusterPrivateEndpointConnectionsDeleteResponse,
  CloudHsmClusterPrivateEndpointConnectionsGetOptionalParams,
  CloudHsmClusterPrivateEndpointConnectionsGetResponse,
} from "../models/index.js";

/** Class containing CloudHsmClusterPrivateEndpointConnections operations. */
export class CloudHsmClusterPrivateEndpointConnectionsImpl
  implements CloudHsmClusterPrivateEndpointConnections
{
  private readonly client: AzureHSMResourceProvider;

  /**
   * Initialize a new instance of the class CloudHsmClusterPrivateEndpointConnections class.
   * @param client Reference to the service client
   */
  constructor(client: AzureHSMResourceProvider) {
    this.client = client;
  }

  /**
   * Creates or updates the private endpoint connection for the Cloud Hsm Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudHsmClusterName The name of the Cloud HSM Cluster within the specified resource group.
   *                            Cloud HSM Cluster names must be between 3 and 23 characters in length.
   * @param peConnectionName Name of the private endpoint connection associated with the Cloud HSM
   *                         Cluster.
   * @param properties Parameters of the PrivateEndpointConnection
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: CloudHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  ): Promise<CloudHsmClusterPrivateEndpointConnectionsCreateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        cloudHsmClusterName,
        peConnectionName,
        properties,
        options,
      },
      createOperationSpec,
    );
  }

  /**
   * Deletes the private endpoint connection for the Cloud Hsm Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudHsmClusterName The name of the Cloud HSM Cluster within the specified resource group.
   *                            Cloud HSM Cluster names must be between 3 and 23 characters in length.
   * @param peConnectionName Name of the private endpoint connection associated with the Cloud HSM
   *                         Cluster.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    options?: CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CloudHsmClusterPrivateEndpointConnectionsDeleteResponse>,
      CloudHsmClusterPrivateEndpointConnectionsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<CloudHsmClusterPrivateEndpointConnectionsDeleteResponse> => {
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
        cloudHsmClusterName,
        peConnectionName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      CloudHsmClusterPrivateEndpointConnectionsDeleteResponse,
      OperationState<CloudHsmClusterPrivateEndpointConnectionsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the private endpoint connection for the Cloud Hsm Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudHsmClusterName The name of the Cloud HSM Cluster within the specified resource group.
   *                            Cloud HSM Cluster names must be between 3 and 23 characters in length.
   * @param peConnectionName Name of the private endpoint connection associated with the Cloud HSM
   *                         Cluster.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    options?: CloudHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<CloudHsmClusterPrivateEndpointConnectionsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      cloudHsmClusterName,
      peConnectionName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets the private endpoint connection for the Cloud Hsm Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudHsmClusterName The name of the Cloud HSM Cluster within the specified resource group.
   *                            Cloud HSM Cluster names must be between 3 and 23 characters in length.
   * @param peConnectionName Name of the private endpoint connection associated with the Cloud HSM
   *                         Cluster.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cloudHsmClusterName: string,
    peConnectionName: string,
    options?: CloudHsmClusterPrivateEndpointConnectionsGetOptionalParams,
  ): Promise<CloudHsmClusterPrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cloudHsmClusterName, peConnectionName, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.properties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cloudHsmClusterName,
    Parameters.peConnectionName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper:
        Mappers.CloudHsmClusterPrivateEndpointConnectionsDeleteHeaders,
    },
    201: {
      headersMapper:
        Mappers.CloudHsmClusterPrivateEndpointConnectionsDeleteHeaders,
    },
    202: {
      headersMapper:
        Mappers.CloudHsmClusterPrivateEndpointConnectionsDeleteHeaders,
    },
    204: {
      headersMapper:
        Mappers.CloudHsmClusterPrivateEndpointConnectionsDeleteHeaders,
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
    Parameters.cloudHsmClusterName,
    Parameters.peConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
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
    Parameters.cloudHsmClusterName,
    Parameters.peConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
