/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Products } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureSphereManagementClient } from "../azureSphereManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  Product,
  ProductsListByCatalogNextOptionalParams,
  ProductsListByCatalogOptionalParams,
  ProductsListByCatalogResponse,
  DeviceGroup,
  ProductsGenerateDefaultDeviceGroupsNextOptionalParams,
  ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ProductsGenerateDefaultDeviceGroupsResponse,
  ProductsGetOptionalParams,
  ProductsGetResponse,
  ProductsCreateOrUpdateOptionalParams,
  ProductsCreateOrUpdateResponse,
  ProductUpdate,
  ProductsUpdateOptionalParams,
  ProductsUpdateResponse,
  ProductsDeleteOptionalParams,
  ProductsCountDevicesOptionalParams,
  ProductsCountDevicesResponse,
  ProductsListByCatalogNextResponse,
  ProductsGenerateDefaultDeviceGroupsNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Products operations. */
export class ProductsImpl implements Products {
  private readonly client: AzureSphereManagementClient;

  /**
   * Initialize a new instance of the class Products class.
   * @param client Reference to the service client
   */
  constructor(client: AzureSphereManagementClient) {
    this.client = client;
  }

  /**
   * List Product resources by Catalog
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param options The options parameters.
   */
  public listByCatalog(
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptionalParams,
  ): PagedAsyncIterableIterator<Product> {
    const iter = this.listByCatalogPagingAll(
      resourceGroupName,
      catalogName,
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
        return this.listByCatalogPagingPage(
          resourceGroupName,
          catalogName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByCatalogPagingPage(
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Product[]> {
    let result: ProductsListByCatalogResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByCatalog(
        resourceGroupName,
        catalogName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByCatalogNext(
        resourceGroupName,
        catalogName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByCatalogPagingAll(
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptionalParams,
  ): AsyncIterableIterator<Product> {
    for await (const page of this.listByCatalogPagingPage(
      resourceGroupName,
      catalogName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Generates default device groups for the product. '.default' and '.unassigned' are system defined
   * values and cannot be used for product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  public listGenerateDefaultDeviceGroups(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ): PagedAsyncIterableIterator<DeviceGroup> {
    const iter = this.generateDefaultDeviceGroupsPagingAll(
      resourceGroupName,
      catalogName,
      productName,
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
        return this.generateDefaultDeviceGroupsPagingPage(
          resourceGroupName,
          catalogName,
          productName,
          options,
          settings,
        );
      },
    };
  }

  private async *generateDefaultDeviceGroupsPagingPage(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DeviceGroup[]> {
    let result: ProductsGenerateDefaultDeviceGroupsResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._generateDefaultDeviceGroups(
        resourceGroupName,
        catalogName,
        productName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._generateDefaultDeviceGroupsNext(
        resourceGroupName,
        catalogName,
        productName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *generateDefaultDeviceGroupsPagingAll(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ): AsyncIterableIterator<DeviceGroup> {
    for await (const page of this.generateDefaultDeviceGroupsPagingPage(
      resourceGroupName,
      catalogName,
      productName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List Product resources by Catalog
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param options The options parameters.
   */
  private _listByCatalog(
    resourceGroupName: string,
    catalogName: string,
    options?: ProductsListByCatalogOptionalParams,
  ): Promise<ProductsListByCatalogResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, options },
      listByCatalogOperationSpec,
    );
  }

  /**
   * Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product
   * name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGetOptionalParams,
  ): Promise<ProductsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, productName, options },
      getOperationSpec,
    );
  }

  /**
   * Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    resource: Product,
    options?: ProductsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ProductsCreateOrUpdateResponse>,
      ProductsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<ProductsCreateOrUpdateResponse> => {
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
      args: { resourceGroupName, catalogName, productName, resource, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      ProductsCreateOrUpdateResponse,
      OperationState<ProductsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    resource: Product,
    options?: ProductsCreateOrUpdateOptionalParams,
  ): Promise<ProductsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      catalogName,
      productName,
      resource,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param properties The resource properties to be updated.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    properties: ProductUpdate,
    options?: ProductsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ProductsUpdateResponse>,
      ProductsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<ProductsUpdateResponse> => {
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
        catalogName,
        productName,
        properties,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      ProductsUpdateResponse,
      OperationState<ProductsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param properties The resource properties to be updated.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    properties: ProductUpdate,
    options?: ProductsUpdateOptionalParams,
  ): Promise<ProductsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      catalogName,
      productName,
      properties,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name'
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsDeleteOptionalParams,
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
      args: { resourceGroupName, catalogName, productName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for
   * product name'
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      catalogName,
      productName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used
   * for product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  countDevices(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsCountDevicesOptionalParams,
  ): Promise<ProductsCountDevicesResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, productName, options },
      countDevicesOperationSpec,
    );
  }

  /**
   * Generates default device groups for the product. '.default' and '.unassigned' are system defined
   * values and cannot be used for product name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param options The options parameters.
   */
  private _generateDefaultDeviceGroups(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    options?: ProductsGenerateDefaultDeviceGroupsOptionalParams,
  ): Promise<ProductsGenerateDefaultDeviceGroupsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, productName, options },
      generateDefaultDeviceGroupsOperationSpec,
    );
  }

  /**
   * ListByCatalogNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param nextLink The nextLink from the previous successful call to the ListByCatalog method.
   * @param options The options parameters.
   */
  private _listByCatalogNext(
    resourceGroupName: string,
    catalogName: string,
    nextLink: string,
    options?: ProductsListByCatalogNextOptionalParams,
  ): Promise<ProductsListByCatalogNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, nextLink, options },
      listByCatalogNextOperationSpec,
    );
  }

  /**
   * GenerateDefaultDeviceGroupsNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param productName Name of product.
   * @param nextLink The nextLink from the previous successful call to the GenerateDefaultDeviceGroups
   *                 method.
   * @param options The options parameters.
   */
  private _generateDefaultDeviceGroupsNext(
    resourceGroupName: string,
    catalogName: string,
    productName: string,
    nextLink: string,
    options?: ProductsGenerateDefaultDeviceGroupsNextOptionalParams,
  ): Promise<ProductsGenerateDefaultDeviceGroupsNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, catalogName, productName, nextLink, options },
      generateDefaultDeviceGroupsNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByCatalogOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductListResult,
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
    Parameters.catalogName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Product,
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Product,
    },
    201: {
      bodyMapper: Mappers.Product,
    },
    202: {
      bodyMapper: Mappers.Product,
    },
    204: {
      bodyMapper: Mappers.Product,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.resource2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Product,
    },
    201: {
      bodyMapper: Mappers.Product,
    },
    202: {
      bodyMapper: Mappers.Product,
    },
    204: {
      bodyMapper: Mappers.Product,
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const countDevicesOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CountDevicesResponse,
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const generateDefaultDeviceGroupsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/generateDefaultDeviceGroups",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DeviceGroupListResult,
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByCatalogNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductListResult,
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
    Parameters.catalogName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const generateDefaultDeviceGroupsNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeviceGroupListResult,
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
    Parameters.catalogName,
    Parameters.productName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
