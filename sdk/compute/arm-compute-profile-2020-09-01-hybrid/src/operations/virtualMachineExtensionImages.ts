/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { VirtualMachineExtensionImages } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ComputeManagementClient } from "../computeManagementClient.js";
import {
  VirtualMachineExtensionImagesGetOptionalParams,
  VirtualMachineExtensionImagesGetResponse,
  VirtualMachineExtensionImagesListTypesOptionalParams,
  VirtualMachineExtensionImagesListTypesResponse,
  VirtualMachineExtensionImagesListVersionsOptionalParams,
  VirtualMachineExtensionImagesListVersionsResponse
} from "../models/index.js";

/** Class containing VirtualMachineExtensionImages operations. */
export class VirtualMachineExtensionImagesImpl
  implements VirtualMachineExtensionImages {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class VirtualMachineExtensionImages class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * Gets a virtual machine extension image.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param typeParam
   * @param version
   * @param options The options parameters.
   */
  get(
    location: string,
    publisherName: string,
    typeParam: string,
    version: string,
    options?: VirtualMachineExtensionImagesGetOptionalParams
  ): Promise<VirtualMachineExtensionImagesGetResponse> {
    return this.client.sendOperationRequest(
      { location, publisherName, typeParam, version, options },
      getOperationSpec
    );
  }

  /**
   * Gets a list of virtual machine extension image types.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param options The options parameters.
   */
  listTypes(
    location: string,
    publisherName: string,
    options?: VirtualMachineExtensionImagesListTypesOptionalParams
  ): Promise<VirtualMachineExtensionImagesListTypesResponse> {
    return this.client.sendOperationRequest(
      { location, publisherName, options },
      listTypesOperationSpec
    );
  }

  /**
   * Gets a list of virtual machine extension image versions.
   * @param location The name of a supported Azure region.
   * @param publisherName
   * @param typeParam
   * @param options The options parameters.
   */
  listVersions(
    location: string,
    publisherName: string,
    typeParam: string,
    options?: VirtualMachineExtensionImagesListVersionsOptionalParams
  ): Promise<VirtualMachineExtensionImagesListVersionsResponse> {
    return this.client.sendOperationRequest(
      { location, publisherName, typeParam, options },
      listVersionsOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions/{version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineExtensionImage
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.typeParam,
    Parameters.version
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listTypesOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineExtensionImage"
            }
          }
        }
      }
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVersionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/publishers/{publisherName}/artifacttypes/vmextension/types/{type}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "VirtualMachineExtensionImage"
            }
          }
        }
      }
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.publisherName,
    Parameters.typeParam
  ],
  headerParameters: [Parameters.accept],
  serializer
};
