// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  createPipelineRequest,
  isNode,
  Pipeline as CorePipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  bearerTokenAuthenticationPolicy,
  SendRequest,
  createEmptyPipeline,
  createHttpHeaders
} from "@azure/core-https";
import { deserializationPolicy } from "@azure/core-client";
import { CanonicalCode } from "@opentelemetry/api";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { BlobClient, BlobDeleteOptions, BlobSetTierOptions } from "./Clients";
import { AccessTier } from "./generatedModels";
import { Mutex } from "./utils/Mutex";
import { Pipeline } from "./Pipeline";
import { attachCredential, getURLPath, getURLPathAndQuery, iEqual } from "./utils/utils.common";
import {
  HeaderConstants,
  BATCH_MAX_REQUEST,
  HTTP_VERSION_1_1,
  HTTP_LINE_ENDING,
  StorageOAuthScopes
} from "./utils/constants";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { createSpan } from "./utils/tracing";

/**
 * A request associated with a batch operation.
 */
export interface BatchSubRequest {
  /**
   * The URL of the resource to request operation.
   */
  url: string;

  /**
   * The credential used for sub request.
   * Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service.
   * You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   */
  credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
}

/**
 * A BlobBatch represents an aggregated set of operations on blobs.
 * Currently, only `delete` and `setAccessTier` are supported.
 */
export class BlobBatch {
  private batchRequest: InnerBatchRequest;
  private readonly batch: string = "batch";
  private batchType: "delete" | "setAccessTier" | undefined;

  constructor() {
    this.batchRequest = new InnerBatchRequest();
  }

  /**
   * Get the value of Content-Type for a batch request.
   * The value must be multipart/mixed with a batch boundary.
   * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
   */
  public getMultiPartContentType(): string {
    return this.batchRequest.getMultipartContentType();
  }

  /**
   * Get assembled HTTP request body for sub requests.
   */
  public getHttpRequestBody(): string {
    return this.batchRequest.getHttpRequestBody();
  }

  /**
   * Get sub requests that are added into the batch request.
   */
  public getSubRequests(): Map<number, BatchSubRequest> {
    return this.batchRequest.getSubRequests();
  }

  private async addSubRequestInternal(
    subRequest: BatchSubRequest,
    assembleSubRequestFunc: () => Promise<void>
  ): Promise<void> {
    await Mutex.lock(this.batch);

    try {
      this.batchRequest.preAddSubRequest(subRequest);
      await assembleSubRequestFunc();
      this.batchRequest.postAddSubRequest(subRequest);
    } finally {
      await Mutex.unlock(this.batch);
    }
  }

  private setBatchType(batchType: "delete" | "setAccessTier"): void {
    if (!this.batchType) {
      this.batchType = batchType;
    }
    if (this.batchType !== batchType) {
      throw new RangeError(
        `BlobBatch only supports one operation type per batch and it already is being used for ${this.batchType} operations.`
      );
    }
  }

  /**
   * The deleteBlob operation marks the specified blob or snapshot for deletion.
   * The blob is later deleted during garbage collection.
   * Only one kind of operation is allowed per batch request.
   *
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param url - The url of the blob resource to delete.
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options -
   */
  public async deleteBlob(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: BlobDeleteOptions
  ): Promise<void>;

  /**
   * The deleteBlob operation marks the specified blob or snapshot for deletion.
   * The blob is later deleted during garbage collection.
   * Only one kind of operation is allowed per batch request.
   *
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClient - The BlobClient.
   * @param options -
   */
  public async deleteBlob(blobClient: BlobClient, options?: BlobDeleteOptions): Promise<void>;

  public async deleteBlob(
    urlOrBlobClient: string | BlobClient,
    credentialOrOptions:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | BlobDeleteOptions
      | undefined,
    options?: BlobDeleteOptions
  ): Promise<void> {
    let url: string;
    let credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;

    if (
      typeof urlOrBlobClient === "string" &&
      ((isNode && credentialOrOptions instanceof StorageSharedKeyCredential) ||
        credentialOrOptions instanceof AnonymousCredential ||
        isTokenCredential(credentialOrOptions))
    ) {
      // First overload
      url = urlOrBlobClient;
      credential = credentialOrOptions;
    } else if (urlOrBlobClient instanceof BlobClient) {
      // Second overload
      url = urlOrBlobClient.url;
      credential = urlOrBlobClient.credential;
      options = credentialOrOptions as BlobDeleteOptions;
    } else {
      throw new RangeError(
        "Invalid arguments. Either url and credential, or BlobClient need be provided."
      );
    }

    if (!options) {
      options = {};
    }

    const { span, spanOptions } = createSpan(
      "BatchDeleteRequest-addSubRequest",
      options.tracingOptions
    );

    try {
      this.setBatchType("delete");
      await this.addSubRequestInternal(
        {
          url: url,
          credential: credential
        },
        async () => {
          await new BlobClient(url, this.batchRequest.createPipeline(credential)).delete({
            ...options,
            tracingOptions: { ...options!.tracingOptions, spanOptions }
          });
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * The setBlobAccessTier operation sets the tier on a blob.
   * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
   * Only one kind of operation is allowed per batch request.
   *
   * A block blob's tier determines Hot/Cool/Archive storage type.
   * This operation does not update the blob's ETag.
   * For detailed information about block blob level tiering
   * see [hot, cool, and archive access tiers](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
   * The operation will be authenticated and authorized
   * with specified credential. See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param url - The url of the blob resource to delete.
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param tier -
   * @param options -
   */
  public async setBlobAccessTier(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<void>;

  /**
   * The setBlobAccessTier operation sets the tier on a blob.
   * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
   * Only one kind of operation is allowed per batch request.
   *
   * A block blob's tier determines Hot/Cool/Archive storage type.
   * This operation does not update the blob's ETag.
   * For detailed information about block blob level tiering
   * see [hot, cool, and archive access tiers](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
   * The operation will be authenticated and authorized
   * with specified credential. See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClient - The BlobClient.
   * @param tier -
   * @param options -
   */
  public async setBlobAccessTier(
    blobClient: BlobClient,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<void>;

  public async setBlobAccessTier(
    urlOrBlobClient: string | BlobClient,
    credentialOrTier:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | AccessTier,
    tierOrOptions?: AccessTier | BlobSetTierOptions,
    options?: BlobSetTierOptions
  ): Promise<void> {
    let url: string;
    let credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
    let tier: AccessTier;

    if (
      typeof urlOrBlobClient === "string" &&
      ((isNode && credentialOrTier instanceof StorageSharedKeyCredential) ||
        credentialOrTier instanceof AnonymousCredential ||
        isTokenCredential(credentialOrTier))
    ) {
      // First overload
      url = urlOrBlobClient;
      credential = credentialOrTier as
        | StorageSharedKeyCredential
        | AnonymousCredential
        | TokenCredential;
      tier = tierOrOptions as AccessTier;
    } else if (urlOrBlobClient instanceof BlobClient) {
      // Second overload
      url = urlOrBlobClient.url;
      credential = urlOrBlobClient.credential;
      tier = credentialOrTier as AccessTier;
      options = tierOrOptions as BlobSetTierOptions;
    } else {
      throw new RangeError(
        "Invalid arguments. Either url and credential, or BlobClient need be provided."
      );
    }

    if (!options) {
      options = {};
    }

    const { span, spanOptions } = createSpan(
      "BatchSetTierRequest-addSubRequest",
      options.tracingOptions
    );

    try {
      this.setBatchType("setAccessTier");
      await this.addSubRequestInternal(
        {
          url: url,
          credential: credential
        },
        async () => {
          await new BlobClient(url, this.batchRequest.createPipeline(credential)).setAccessTier(
            tier,
            {
              ...options,
              tracingOptions: { ...options!.tracingOptions, spanOptions }
            }
          );
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * Inner batch request class which is responsible for assembling and serializing sub requests.
 * See https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#request-body for how requests are assembled.
 */
class InnerBatchRequest {
  private operationCount: number;
  private body: string;
  private subRequests: Map<number, BatchSubRequest>;
  private readonly boundary: string;
  private readonly subRequestPrefix: string;
  private readonly multipartContentType: string;
  private readonly batchRequestEnding: string;

  constructor() {
    this.operationCount = 0;
    this.body = "";

    const tempGuid = uuidv4();

    // batch_{batchid}
    this.boundary = `batch_${tempGuid}`;
    // --batch_{batchid}
    // Content-Type: application/http
    // Content-Transfer-Encoding: binary
    this.subRequestPrefix = `--${this.boundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: application/http${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;
    // multipart/mixed; boundary=batch_{batchid}
    this.multipartContentType = `multipart/mixed; boundary=${this.boundary}`;
    // --batch_{batchid}--
    this.batchRequestEnding = `--${this.boundary}--`;

    this.subRequests = new Map();
  }

  /**
   * Create pipeline to assemble sub requests. The idea here is to use existing
   * credential and serialization/deserialization components, with additional policies to
   * filter unnecessary headers, assemble sub requests into request's body
   * and intercept request from going to wire.
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   */
  public createPipeline(
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential
  ): Pipeline {
    const isAnonymousCreds = credential instanceof AnonymousCredential;
    const factories: CorePipeline = createEmptyPipeline();

    factories.addPolicy(deserializationPolicy());
    factories.addPolicy(new BatchHeaderFilterPolicy());

    if (!isAnonymousCreds) {
      if (isTokenCredential(credential)) {
        factories.addPolicy(
          attachCredential(
            bearerTokenAuthenticationPolicy({
              credential,
              scopes: StorageOAuthScopes
            }),
            credential
          )
        );
      } else {
        factories.addPolicy(credential);
      }
    }
    factories.addPolicy(new BatchRequestAssemblePolicy(this)); // Use batch assemble policy to assemble request and intercept request from going to wire

    return new Pipeline(factories, {});
  }

  public appendSubRequestToBody(request: PipelineRequest) {
    // Start to assemble sub request
    this.body += [
      this.subRequestPrefix, // sub request constant prefix
      `${HeaderConstants.CONTENT_ID}: ${this.operationCount}`, // sub request's content ID
      "", // empty line after sub request's content ID
      `${request.method.toString()} ${getURLPathAndQuery(
        request.url
      )} ${HTTP_VERSION_1_1}${HTTP_LINE_ENDING}` // sub request start line with method
    ].join(HTTP_LINE_ENDING);

    for (const [name, value] of request.headers) {
      this.body += `${name}: ${value}${HTTP_LINE_ENDING}`;
    }

    this.body += HTTP_LINE_ENDING; // sub request's headers need be ending with an empty line
    // No body to assemble for current batch request support
    // End to assemble sub request
  }

  public preAddSubRequest(subRequest: BatchSubRequest) {
    if (this.operationCount >= BATCH_MAX_REQUEST) {
      throw new RangeError(`Cannot exceed ${BATCH_MAX_REQUEST} sub requests in a single batch`);
    }

    // Fast fail if url for sub request is invalid
    const path = getURLPath(subRequest.url);
    if (!path || path == "") {
      throw new RangeError(`Invalid url for sub request: '${subRequest.url}'`);
    }
  }

  public postAddSubRequest(subRequest: BatchSubRequest) {
    this.subRequests.set(this.operationCount, subRequest);
    this.operationCount++;
  }

  // Return the http request body with assembling the ending line to the sub request body.
  public getHttpRequestBody(): string {
    return `${this.body}${this.batchRequestEnding}${HTTP_LINE_ENDING}`;
  }

  public getMultipartContentType(): string {
    return this.multipartContentType;
  }

  public getSubRequests(): Map<number, BatchSubRequest> {
    return this.subRequests;
  }
}

class BatchRequestAssemblePolicy implements PipelinePolicy {
  public name = "StorageBatchRequestAssemblePolicy";

  private batchRequest: InnerBatchRequest;
  private readonly dummyResponse: PipelineResponse = {
    request: createPipelineRequest({ url: "https://example.com" }),
    status: 200,
    headers: createHttpHeaders()
  };

  constructor(batchRequest: InnerBatchRequest) {
    this.batchRequest = batchRequest;
  }

  public async sendRequest(
    request: PipelineRequest,
    _next: SendRequest
  ): Promise<PipelineResponse> {
    await this.batchRequest.appendSubRequestToBody(request);

    return this.dummyResponse; // Intercept request from going to wire
  }
}

class BatchHeaderFilterPolicy implements PipelinePolicy {
  public name = "StorageBatchHeaderFilterPolicy";

  public async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    let xMsHeaderName = "";

    for (const [name, _value] of request.headers) {
      if (iEqual(name, HeaderConstants.X_MS_VERSION)) {
        xMsHeaderName = name;
      }
    }

    if (xMsHeaderName !== "") {
      request.headers.delete(xMsHeaderName); // The subrequests should not have the x-ms-version header.
    }

    return next(request);
  }
}
