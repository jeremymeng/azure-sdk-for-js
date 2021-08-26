/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Provider } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { WebSiteManagementClientContext } from "../webSiteManagementClientContext";
import {
  ApplicationStackResource,
  ProviderGetAvailableStacksNextOptionalParams,
  ProviderGetAvailableStacksOptionalParams,
  FunctionAppStack,
  ProviderGetFunctionAppStacksNextOptionalParams,
  ProviderGetFunctionAppStacksOptionalParams,
  ProviderGetFunctionAppStacksForLocationNextOptionalParams,
  ProviderGetFunctionAppStacksForLocationOptionalParams,
  WebAppStack,
  ProviderGetWebAppStacksForLocationNextOptionalParams,
  ProviderGetWebAppStacksForLocationOptionalParams,
  CsmOperationDescription,
  ProviderListOperationsNextOptionalParams,
  ProviderListOperationsOptionalParams,
  ProviderGetWebAppStacksNextOptionalParams,
  ProviderGetWebAppStacksOptionalParams,
  ProviderGetAvailableStacksOnPremNextOptionalParams,
  ProviderGetAvailableStacksOnPremOptionalParams,
  ProviderGetAvailableStacksResponse,
  ProviderGetFunctionAppStacksResponse,
  ProviderGetFunctionAppStacksForLocationResponse,
  ProviderGetWebAppStacksForLocationResponse,
  ProviderListOperationsResponse,
  ProviderGetWebAppStacksResponse,
  ProviderGetAvailableStacksOnPremResponse,
  ProviderGetAvailableStacksNextResponse,
  ProviderGetFunctionAppStacksNextResponse,
  ProviderGetFunctionAppStacksForLocationNextResponse,
  ProviderGetWebAppStacksForLocationNextResponse,
  ProviderListOperationsNextResponse,
  ProviderGetWebAppStacksNextResponse,
  ProviderGetAvailableStacksOnPremNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a Provider. */
export class ProviderImpl implements Provider {
  private readonly client: WebSiteManagementClientContext;

  /**
   * Initialize a new instance of the class Provider class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClientContext) {
    this.client = client;
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  public listAvailableStacks(
    options?: ProviderGetAvailableStacksOptionalParams
  ): PagedAsyncIterableIterator<ApplicationStackResource> {
    const iter = this.getAvailableStacksPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getAvailableStacksPagingPage(options);
      }
    };
  }

  private async *getAvailableStacksPagingPage(
    options?: ProviderGetAvailableStacksOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource[]> {
    let result = await this._getAvailableStacks(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getAvailableStacksNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getAvailableStacksPagingAll(
    options?: ProviderGetAvailableStacksOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource> {
    for await (const page of this.getAvailableStacksPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available Function app frameworks and their versions
   * @param options The options parameters.
   */
  public listFunctionAppStacks(
    options?: ProviderGetFunctionAppStacksOptionalParams
  ): PagedAsyncIterableIterator<FunctionAppStack> {
    const iter = this.getFunctionAppStacksPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getFunctionAppStacksPagingPage(options);
      }
    };
  }

  private async *getFunctionAppStacksPagingPage(
    options?: ProviderGetFunctionAppStacksOptionalParams
  ): AsyncIterableIterator<FunctionAppStack[]> {
    let result = await this._getFunctionAppStacks(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getFunctionAppStacksNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getFunctionAppStacksPagingAll(
    options?: ProviderGetFunctionAppStacksOptionalParams
  ): AsyncIterableIterator<FunctionAppStack> {
    for await (const page of this.getFunctionAppStacksPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available Function app frameworks and their versions for location
   * @param location Function App stack location.
   * @param options The options parameters.
   */
  public listFunctionAppStacksForLocation(
    location: string,
    options?: ProviderGetFunctionAppStacksForLocationOptionalParams
  ): PagedAsyncIterableIterator<FunctionAppStack> {
    const iter = this.getFunctionAppStacksForLocationPagingAll(
      location,
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
        return this.getFunctionAppStacksForLocationPagingPage(
          location,
          options
        );
      }
    };
  }

  private async *getFunctionAppStacksForLocationPagingPage(
    location: string,
    options?: ProviderGetFunctionAppStacksForLocationOptionalParams
  ): AsyncIterableIterator<FunctionAppStack[]> {
    let result = await this._getFunctionAppStacksForLocation(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getFunctionAppStacksForLocationNext(
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getFunctionAppStacksForLocationPagingAll(
    location: string,
    options?: ProviderGetFunctionAppStacksForLocationOptionalParams
  ): AsyncIterableIterator<FunctionAppStack> {
    for await (const page of this.getFunctionAppStacksForLocationPagingPage(
      location,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Description for Get available Web app frameworks and their versions for location
   * @param location Web App stack location.
   * @param options The options parameters.
   */
  public listWebAppStacksForLocation(
    location: string,
    options?: ProviderGetWebAppStacksForLocationOptionalParams
  ): PagedAsyncIterableIterator<WebAppStack> {
    const iter = this.getWebAppStacksForLocationPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getWebAppStacksForLocationPagingPage(location, options);
      }
    };
  }

  private async *getWebAppStacksForLocationPagingPage(
    location: string,
    options?: ProviderGetWebAppStacksForLocationOptionalParams
  ): AsyncIterableIterator<WebAppStack[]> {
    let result = await this._getWebAppStacksForLocation(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getWebAppStacksForLocationNext(
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getWebAppStacksForLocationPagingAll(
    location: string,
    options?: ProviderGetWebAppStacksForLocationOptionalParams
  ): AsyncIterableIterator<WebAppStack> {
    for await (const page of this.getWebAppStacksForLocationPagingPage(
      location,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes
   * resource metric definitions
   * @param options The options parameters.
   */
  public listOperations(
    options?: ProviderListOperationsOptionalParams
  ): PagedAsyncIterableIterator<CsmOperationDescription> {
    const iter = this.listOperationsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listOperationsPagingPage(options);
      }
    };
  }

  private async *listOperationsPagingPage(
    options?: ProviderListOperationsOptionalParams
  ): AsyncIterableIterator<CsmOperationDescription[]> {
    let result = await this._listOperations(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listOperationsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listOperationsPagingAll(
    options?: ProviderListOperationsOptionalParams
  ): AsyncIterableIterator<CsmOperationDescription> {
    for await (const page of this.listOperationsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available Web app frameworks and their versions
   * @param options The options parameters.
   */
  public listWebAppStacks(
    options?: ProviderGetWebAppStacksOptionalParams
  ): PagedAsyncIterableIterator<WebAppStack> {
    const iter = this.getWebAppStacksPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getWebAppStacksPagingPage(options);
      }
    };
  }

  private async *getWebAppStacksPagingPage(
    options?: ProviderGetWebAppStacksOptionalParams
  ): AsyncIterableIterator<WebAppStack[]> {
    let result = await this._getWebAppStacks(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getWebAppStacksNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getWebAppStacksPagingAll(
    options?: ProviderGetWebAppStacksOptionalParams
  ): AsyncIterableIterator<WebAppStack> {
    for await (const page of this.getWebAppStacksPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  public listAvailableStacksOnPrem(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): PagedAsyncIterableIterator<ApplicationStackResource> {
    const iter = this.getAvailableStacksOnPremPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getAvailableStacksOnPremPagingPage(options);
      }
    };
  }

  private async *getAvailableStacksOnPremPagingPage(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource[]> {
    let result = await this._getAvailableStacksOnPrem(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getAvailableStacksOnPremNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getAvailableStacksOnPremPagingAll(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource> {
    for await (const page of this.getAvailableStacksOnPremPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  private _getAvailableStacks(
    options?: ProviderGetAvailableStacksOptionalParams
  ): Promise<ProviderGetAvailableStacksResponse> {
    return this.client.sendOperationRequest(
      { options },
      getAvailableStacksOperationSpec
    );
  }

  /**
   * Description for Get available Function app frameworks and their versions
   * @param options The options parameters.
   */
  private _getFunctionAppStacks(
    options?: ProviderGetFunctionAppStacksOptionalParams
  ): Promise<ProviderGetFunctionAppStacksResponse> {
    return this.client.sendOperationRequest(
      { options },
      getFunctionAppStacksOperationSpec
    );
  }

  /**
   * Description for Get available Function app frameworks and their versions for location
   * @param location Function App stack location.
   * @param options The options parameters.
   */
  private _getFunctionAppStacksForLocation(
    location: string,
    options?: ProviderGetFunctionAppStacksForLocationOptionalParams
  ): Promise<ProviderGetFunctionAppStacksForLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      getFunctionAppStacksForLocationOperationSpec
    );
  }

  /**
   * Description for Get available Web app frameworks and their versions for location
   * @param location Web App stack location.
   * @param options The options parameters.
   */
  private _getWebAppStacksForLocation(
    location: string,
    options?: ProviderGetWebAppStacksForLocationOptionalParams
  ): Promise<ProviderGetWebAppStacksForLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      getWebAppStacksForLocationOperationSpec
    );
  }

  /**
   * Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes
   * resource metric definitions
   * @param options The options parameters.
   */
  private _listOperations(
    options?: ProviderListOperationsOptionalParams
  ): Promise<ProviderListOperationsResponse> {
    return this.client.sendOperationRequest(
      { options },
      listOperationsOperationSpec
    );
  }

  /**
   * Description for Get available Web app frameworks and their versions
   * @param options The options parameters.
   */
  private _getWebAppStacks(
    options?: ProviderGetWebAppStacksOptionalParams
  ): Promise<ProviderGetWebAppStacksResponse> {
    return this.client.sendOperationRequest(
      { options },
      getWebAppStacksOperationSpec
    );
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  private _getAvailableStacksOnPrem(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): Promise<ProviderGetAvailableStacksOnPremResponse> {
    return this.client.sendOperationRequest(
      { options },
      getAvailableStacksOnPremOperationSpec
    );
  }

  /**
   * GetAvailableStacksNext
   * @param nextLink The nextLink from the previous successful call to the GetAvailableStacks method.
   * @param options The options parameters.
   */
  private _getAvailableStacksNext(
    nextLink: string,
    options?: ProviderGetAvailableStacksNextOptionalParams
  ): Promise<ProviderGetAvailableStacksNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getAvailableStacksNextOperationSpec
    );
  }

  /**
   * GetFunctionAppStacksNext
   * @param nextLink The nextLink from the previous successful call to the GetFunctionAppStacks method.
   * @param options The options parameters.
   */
  private _getFunctionAppStacksNext(
    nextLink: string,
    options?: ProviderGetFunctionAppStacksNextOptionalParams
  ): Promise<ProviderGetFunctionAppStacksNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getFunctionAppStacksNextOperationSpec
    );
  }

  /**
   * GetFunctionAppStacksForLocationNext
   * @param location Function App stack location.
   * @param nextLink The nextLink from the previous successful call to the
   *                 GetFunctionAppStacksForLocation method.
   * @param options The options parameters.
   */
  private _getFunctionAppStacksForLocationNext(
    location: string,
    nextLink: string,
    options?: ProviderGetFunctionAppStacksForLocationNextOptionalParams
  ): Promise<ProviderGetFunctionAppStacksForLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      getFunctionAppStacksForLocationNextOperationSpec
    );
  }

  /**
   * GetWebAppStacksForLocationNext
   * @param location Web App stack location.
   * @param nextLink The nextLink from the previous successful call to the GetWebAppStacksForLocation
   *                 method.
   * @param options The options parameters.
   */
  private _getWebAppStacksForLocationNext(
    location: string,
    nextLink: string,
    options?: ProviderGetWebAppStacksForLocationNextOptionalParams
  ): Promise<ProviderGetWebAppStacksForLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      getWebAppStacksForLocationNextOperationSpec
    );
  }

  /**
   * ListOperationsNext
   * @param nextLink The nextLink from the previous successful call to the ListOperations method.
   * @param options The options parameters.
   */
  private _listOperationsNext(
    nextLink: string,
    options?: ProviderListOperationsNextOptionalParams
  ): Promise<ProviderListOperationsNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listOperationsNextOperationSpec
    );
  }

  /**
   * GetWebAppStacksNext
   * @param nextLink The nextLink from the previous successful call to the GetWebAppStacks method.
   * @param options The options parameters.
   */
  private _getWebAppStacksNext(
    nextLink: string,
    options?: ProviderGetWebAppStacksNextOptionalParams
  ): Promise<ProviderGetWebAppStacksNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getWebAppStacksNextOperationSpec
    );
  }

  /**
   * GetAvailableStacksOnPremNext
   * @param nextLink The nextLink from the previous successful call to the GetAvailableStacksOnPrem
   *                 method.
   * @param options The options parameters.
   */
  private _getAvailableStacksOnPremNext(
    nextLink: string,
    options?: ProviderGetAvailableStacksOnPremNextOptionalParams
  ): Promise<ProviderGetAvailableStacksOnPremNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getAvailableStacksOnPremNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getAvailableStacksOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/availableStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getFunctionAppStacksOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/functionAppStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FunctionAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getFunctionAppStacksForLocationOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/locations/{location}/functionAppStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FunctionAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType1],
  urlParameters: [Parameters.$host, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer
};
const getWebAppStacksForLocationOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/locations/{location}/webAppStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WebAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType2],
  urlParameters: [Parameters.$host, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getWebAppStacksOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Web/webAppStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WebAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType3],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksOnPremOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/availableStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected1],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getFunctionAppStacksNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FunctionAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getFunctionAppStacksForLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FunctionAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType1],
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer
};
const getWebAppStacksForLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WebAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType2],
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getWebAppStacksNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WebAppStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.stackOsType3],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksOnPremNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
