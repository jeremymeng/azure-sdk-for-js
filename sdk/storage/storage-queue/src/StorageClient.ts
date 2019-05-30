// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { deserializationPolicy, RequestPolicyFactory } from "@azure/ms-rest-js";

import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { Credential } from "./credentials/Credential";
import { StorageClientContext } from "./generated/lib/storageClientContext";
import { LoggingPolicyFactory } from "./LoggingPolicyFactory";
import { IHttpClient, IHttpPipelineLogger, Pipeline } from "./Pipeline";
import { RetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryOptions, TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";

export { deserializationPolicy };

/**
 * Option interface for newPipeline() method.
 *
 * @export
 * @interface NewPipelineOptions
 */
export interface NewPipelineOptions {
  /**
   * Telemetry configures the built-in telemetry policy behavior.
   *
   * @type {TelemetryOptions}
   * @memberof NewPipelineOptions
   */
  telemetry?: TelemetryOptions;
  /**
   * Configures the built-in retry policy behavior.
   *
   * @type {RetryOptions}
   * @memberof NewPipelineOptions
   */
  retryOptions?: RetryOptions;

  /**
   * Configures the HTTP pipeline logger.
   *
   * @type {IHttpPipelineLogger}
   * @memberof NewPipelineOptions
   */
  logger?: IHttpPipelineLogger;
  /**
   * Configures the HTTP client to send requests and receive responses.
   *
   * @type {IHttpClient}
   * @memberof NewPipelineOptions
   */
  httpClient?: IHttpClient;
}

/**
 * A StorageClient represents a based client class for QueueServiceClient, QueueClient and etc.
 *
 * @export
 * @class StorageClient
 */
export class StorageClient {
  /**
   * A static method used to create a new Pipeline object with Credential provided.
   *
   * @static
   * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof Pipeline
   */
  public static newPipeline(
    credential: Credential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const factories: RequestPolicyFactory[] = [
      new TelemetryPolicyFactory(pipelineOptions.telemetry),
      new UniqueRequestIDPolicyFactory(),
      new BrowserPolicyFactory(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      new RetryPolicyFactory(pipelineOptions.retryOptions),
      new LoggingPolicyFactory(),
      credential
    ];

    return new Pipeline(factories, {
      HTTPClient: pipelineOptions.httpClient,
      logger: pipelineOptions.logger
    });
  }

  /**
   * Request policy pipeline.
   *
   * @internal
   * @type {Pipeline}
   * @memberof StorageClient
   */
  public readonly pipeline: Pipeline;

  /**
   * URL string value.
   *
   * @type {string}
   * @memberof StorageClient
   */
  public readonly url: string;

  /**
   * StorageClient is a reference to protocol layer operations entry, which is
   * generated by AutoRest generator.
   *
   * @internal
   * @type {StorageClient}
   * @memberof StorageClient
   */
  public readonly storageClientContext: StorageClientContext;

  /**
   * Creates an instance of StorageClient.
   * @param {string} url
   * @param {Pipeline} pipeline
   * @memberof StorageClient
   */
  constructor(url: string, pipeline: Pipeline) {
    this.url = url;
    this.pipeline = pipeline;
    this.storageClientContext = new StorageClientContext(url, pipeline.toServiceClientOptions());

    // Override protocol layer's default content-type
    const storageClientContext = this.storageClientContext as any;
    storageClientContext.requestContentType = undefined;
  }
}
