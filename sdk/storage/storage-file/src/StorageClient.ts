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
import { escapeURLPath } from "./utils/utils.common";

export { deserializationPolicy };

/**
 * Option interface for Pipeline.newPipeline method.
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
  retryOptions?: RetryOptions;

  logger?: IHttpPipelineLogger;
  httpClient?: IHttpClient;
}

/**
 * A ServiceClient represents a based URL class for ServiceClient, ContainerURL and etc.
 *
 * @export
 * @class StorageClient
 */
export abstract class StorageClient {
  /**
   * A static method used to create a new Pipeline object with Credential provided.
   *
   * @static
   * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential.
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
   * @protected
   * @type {StorageClient}
   * @memberof StorageClient
   */
  protected readonly storageClientContext: StorageClientContext;

  /**
   * Creates an instance of StorageClient.
   * @param {string} url
   * @param {Pipeline} pipeline
   * @memberof StorageClient
   */
  protected constructor(url: string, pipeline: Pipeline) {
    // URL should be encoded and only once, protocol layer shouldn't encode URL again
    this.url = escapeURLPath(url);

    this.pipeline = pipeline;
    this.storageClientContext = new StorageClientContext(
      this.url,
      pipeline.toServiceClientOptions()
    );

    // Remove the default content-type in generated code of StorageClientContext
    const storageClientContext = this.storageClientContext as any;
    if (storageClientContext.requestContentType) {
      storageClientContext.requestContentType = undefined;
    }
  }
}
