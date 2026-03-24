// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { ExtendedServiceClientOptions } from "@azure/core-http-compat";
import type { HttpClient, Pipeline as CorePipeline } from "@azure/core-rest-pipeline";
import type { OperationTracingOptions } from "@azure/core-tracing";
import { BlobServiceClient } from "@azure/storage-blob";
import type { AnonymousCredential, StorageSharedKeyCredential } from "@azure/storage-blob";
import { DataLakeClient } from "./generated/index.js";
import type {
  DataLakeClientOptionalParams,
  FileSystemOperations,
  PathOperations,
  ServiceOperations,
} from "./generated/index.js";
import type { DataLakeClientConfig } from "./models.js";
import type { Pipeline, PipelineLike, StoragePipelineOptions } from "./Pipeline.js";
import { toBlobEndpointUrl, toDfsEndpointUrl } from "./transforms.js";
import {
  escapeURLPath,
  getAccountNameFromUrl,
  getURLScheme,
  iEqual,
} from "./utils/utils.common.js";

/**
 * An interface for options common to every remote operation.
 */
export interface CommonOptions {
  tracingOptions?: OperationTracingOptions;
}

type StorageClientContextOptions = ExtendedServiceClientOptions &
  DataLakeClientOptionalParams & {
    credential?: TokenCredential;
  };

const unusedTokenCredential: TokenCredential = {
  async getToken() {
    return null;
  },
};

export class StorageClientContext {
  public readonly dataLakeClient: DataLakeClient;
  public readonly service: ServiceOperations;
  public readonly fileSystem: FileSystemOperations;
  public readonly path: PathOperations;

  /** The shared core pipeline used by operations. */
  public get pipeline(): CorePipeline {
    return this.dataLakeClient.pipeline;
  }

  constructor(url: string, options: StorageClientContextOptions = {}) {
    const { credential, ...clientOptions } = options;
    this.dataLakeClient = new DataLakeClient(
      url,
      credential ?? unusedTokenCredential,
      clientOptions,
    );
    this.service = this.dataLakeClient.service;
    this.fileSystem = this.dataLakeClient.fileSystem;
    this.path = this.dataLakeClient.path;

    const { pipeline: corePipeline } = options;
    if (!corePipeline) {
      throw new Error("Pipeline is required in options");
    }
    (this.dataLakeClient as any).pipeline = corePipeline;
    this.dataLakeClient["_client"].pipeline = corePipeline;
  }
}

// This function relies on the Pipeline already being initialized by a storage-blob client
function getCoreClientOptions(pipeline: Pipeline): StorageClientContextOptions {
  const restOptions = { ...(pipeline.options as StoragePipelineOptions) };
  delete restOptions.httpClient;

  const httpClient = Reflect.get(pipeline, "_coreHttpClient") as HttpClient | undefined;
  if (!httpClient) {
    throw new Error("Pipeline not correctly initialized; missing V2 HttpClient");
  }

  const corePipeline = Reflect.get(pipeline, "_corePipeline") as CorePipeline | undefined;
  if (!corePipeline) {
    throw new Error("Pipeline not correctly initialized; missing V2 Pipeline");
  }

  return {
    ...restOptions,
    allowInsecureConnection: true,
    httpClient,
    pipeline: corePipeline,
  };
}

/**
 * A StorageClient represents a based URL class for {@link BlobServiceClient}, {@link ContainerClient}
 * and etc.
 */
export abstract class StorageClient {
  /**
   * Encoded URL string value.
   */
  public readonly url: string;

  public readonly accountName: string;

  /**
   * Encoded URL string value for corresponding blob endpoint.
   */
  protected readonly blobEndpointUrl: string;

  /**
   * Encoded URL string value for corresponding dfs endpoint.
   */
  protected readonly dfsEndpointUrl: string;

  /**
   * Request policy pipeline.
   *
   * @internal
   */
  protected readonly pipeline: Pipeline;

  /**
   * Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   */
  public readonly credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;

  /**
   * StorageClient is a reference to protocol layer operations entry.
   */
  protected readonly storageClientContext: StorageClientContext;

  /**
   * StorageClientContext with its url pointing to the Blob endpoint.
   */
  protected readonly storageClientContextToBlobEndpoint: StorageClientContext;

  /**
   */
  protected readonly isHttps: boolean;

  /**
   *
   */
  protected readonly dataLakeClientConfig?: DataLakeClientConfig;

  /**
   * Creates an instance of StorageClient.
   * @param url - url to resource
   * @param pipeline - request policy pipeline.
   */
  protected constructor(url: string, pipeline: PipelineLike, options?: DataLakeClientConfig) {
    // URL should be encoded and only once, protocol layer shouldn't encode URL again
    this.url = escapeURLPath(url);
    this.blobEndpointUrl = toBlobEndpointUrl(this.url);
    this.dfsEndpointUrl = toDfsEndpointUrl(this.url);
    this.accountName = getAccountNameFromUrl(this.blobEndpointUrl);
    this.pipeline = pipeline;

    const blobClient = new BlobServiceClient(url, pipeline);
    this.credential = Reflect.get(blobClient, "credential") as
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential;

    const coreClientOptions = getCoreClientOptions(pipeline);
    if (isTokenCredential(this.credential)) {
      coreClientOptions.credential = this.credential;
    }

    // Create StorageClientContext with account-level URLs (no path segments).
    // The generated operations add /{filesystem}/{path} via URL templates.
    const dfsAccountUrl = new URL(this.dfsEndpointUrl).origin;
    const blobAccountUrl = new URL(this.blobEndpointUrl).origin;

    this.storageClientContext = new StorageClientContext(dfsAccountUrl, coreClientOptions);
    this.storageClientContextToBlobEndpoint = new StorageClientContext(
      blobAccountUrl,
      coreClientOptions,
    );

    this.isHttps = iEqual(getURLScheme(this.url) || "", "https");
    this.dataLakeClientConfig = options;
  }
}
