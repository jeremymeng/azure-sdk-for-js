// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  HttpClient as IHttpClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpPipelineLogger as IHttpPipelineLogger,
  HttpPipelineLogLevel,
  HttpRequestBody,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  ServiceClientOptions,
  WebResource
} from "@azure/ms-rest-js";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  IHttpClient,
  IHttpPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
  HttpOperationResponse,
  HttpRequestBody,
  WebResource,
  BaseRequestPolicy,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
};

/**
 * Option interface for Pipeline constructor.
 *
 * @export
 * @interface PipelineOptions
 */
export interface PipelineOptions {
  logger?: IHttpPipelineLogger;
  HTTPClient?: IHttpClient;
}

/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling StorageClient.newPipeline().
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 * Refer to StorageClient.newPipeline() and provided policies as reference before
 * implementing your customized Pipeline.
 *
 * @export
 * @class Pipeline
 */
export class Pipeline {
  public readonly factories: RequestPolicyFactory[];
  public readonly options: PipelineOptions;

  /**
   * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
   *
   * @param {RequestPolicyFactory[]} factories
   * @param {PipelineOptions} [options={}]
   * @memberof Pipeline
   */
  constructor(factories: RequestPolicyFactory[], options: PipelineOptions = {}) {
    this.factories = factories;
    this.options = options;
  }

  /**
   * Transfer Pipeline object to ServiceClientOptions object which required by
   * ServiceClient constructor.
   *
   * @returns {ServiceClientOptions}
   * @memberof Pipeline
   */
  public toServiceClientOptions(): ServiceClientOptions {
    return {
      httpClient: this.options.HTTPClient,
      httpPipelineLogger: this.options.logger,
      requestPolicyFactories: this.factories
    };
  }
}
