// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import type { CpkInfo, BlobHTTPHeaders, FileShareTokenIntent } from "./generatedModels.js";
import type {
  AppendBlobRequestConditions,
  BlobRequestConditions,
  Metadata,
  Tags,
  MatchConditions,
  ModificationConditions,
  BlobImmutabilityPolicy,
  HttpAuthorization,
} from "./models.js";
import type { CommonOptions } from "./StorageClient.js";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import {
  getDefaultProxySettings,
  type RequestBodyType as HttpRequestBody,
} from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { StorageSharedKeyCredential, AnonymousCredential } from "@azure/storage-common";
import { BlobClient } from "./Clients.js";
import type { AppendBlob, AppendBlobSealHeaders } from "./generated/src/index.js";
import type {
  AppendBlobCreateHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobAppendBlockFromUrlHeaders,
} from "./generatedModels.js";
import type {
  AppendBlobCreateResponse,
  AppendBlobAppendBlockResponse,
  AppendBlobAppendBlockFromUrlResponse,
} from "./index.js";
import { ensureCpkIfSpecified } from "./models.js";
import {
  type StoragePipelineOptions,
  type PipelineLike,
  isPipelineLike,
  newPipeline,
} from "./Pipeline.js";
import { rangeToString } from "./Range.js";
import { URLConstants, ETagAny } from "./utils/constants.js";
import { tracingClient } from "./utils/tracing.js";
import {
  extractConnectionStringParts,
  appendToURLPath,
  setURLParameter,
  assertResponse,
  toBlobTagsString,
  httpAuthorizationToString,
} from "./utils/utils.common.js";

/**
 * Options to configure {@link AppendBlobClient.create} operation.
 */
export interface AppendBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Conditions to meet when creating append blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when creating append blobs. A common header
   * to set is `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/**
 * Options to configure {@link AppendBlobClient.createIfNotExists} operation.
 */
export interface AppendBlobCreateIfNotExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * HTTP headers to set when creating append blobs. A common header to set is
   * `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
}

/**
 * Options to configure {@link AppendBlobClient.seal} operation.
 */
export interface AppendBlobSealOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet.
   */
  conditions?: AppendBlobRequestConditions;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlock} operation.
 */
export interface AppendBlobAppendBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Callback to receive events on the progress of append block operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlockFromURL} operation.
 */
export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * An MD5 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
}

/**
 * Contains response data for the {@link appendBlobClient.createIfNotExists} operation.
 */
export interface AppendBlobCreateIfNotExistsResponse extends AppendBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 */

export class AppendBlobClient extends BlobClient {
  /**
   * appendBlobsContext provided by protocol layer.
   */
  private appendBlobContext: AppendBlob;

  /**
   *
   * Creates an instance of AppendBlobClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param blobName - Blob name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    blobNameOrOptions?: string | StoragePipelineOptions,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: PipelineLike;
    let url: string;
    options = options || {};
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNodeLike && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)      url = urlOrConnectionString;
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNodeLike) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          );

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.appendBlobContext = this.storageClientContext.appendBlob;
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): AppendBlobClient {
    return new AppendBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param options - Options to the Append Block Create operation.
   *
   *
   * Example usage:
   *
   * ```ts snippet:ClientsCreateAppendBlob
   * import { BlobServiceClient } from "@azure/storage-blob";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const containerName = "<container name>";
   * const blobName = "<blob name>";
   * const containerClient = blobServiceClient.getContainerClient(containerName);
   *
   * const appendBlobClient = containerClient.getAppendBlobClient(blobName);
   * await appendBlobClient.create();
   * ```
   */
  public async create(options: AppendBlobCreateOptions = {}): Promise<AppendBlobCreateResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("AppendBlobClient-create", options, async (updatedOptions) => {
      return assertResponse<AppendBlobCreateHeaders, AppendBlobCreateHeaders>(
        await this.appendBlobContext.create(0, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          blobTagsString: toBlobTagsString(options.tags),
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * If the blob with the same name already exists, the content of the existing blob will remain unchanged.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param options -
   */
  public async createIfNotExists(
    options: AppendBlobCreateIfNotExistsOptions = {},
  ): Promise<AppendBlobCreateIfNotExistsResponse> {
    const conditions = { ifNoneMatch: ETagAny };
    return tracingClient.withSpan(
      "AppendBlobClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const res = assertResponse(
            await this.create({
              ...updatedOptions,
              conditions,
            }),
          );
          return {
            succeeded: true,
            ...res,
            _response: res._response, // _response is made non-enumerable
          };
        } catch (e: any) {
          if (e.details?.errorCode === "BlobAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Seals the append blob, making it read only.
   *
   * @param options -
   */
  public async seal(options: AppendBlobSealOptions = {}): Promise<AppendBlobAppendBlockResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("AppendBlobClient-seal", options, async (updatedOptions) => {
      return assertResponse<AppendBlobSealHeaders, AppendBlobSealHeaders>(
        await this.appendBlobContext.seal({
          abortSignal: options.abortSignal,
          appendPositionAccessConditions: options.conditions,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/append-block
   *
   * @param body - Data to be appended.
   * @param contentLength - Length of the body in bytes.
   * @param options - Options to the Append Block operation.
   *
   *
   * Example usage:
   *
   * ```ts snippet:ClientsAppendBlock
   * import { BlobServiceClient } from "@azure/storage-blob";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const containerName = "<container name>";
   * const blobName = "<blob name>";
   * const containerClient = blobServiceClient.getContainerClient(containerName);
   *
   * const content = "Hello World!";
   *
   * // Create a new append blob and append data to the blob.
   * const newAppendBlobClient = containerClient.getAppendBlobClient(blobName);
   * await newAppendBlobClient.create();
   * await newAppendBlobClient.appendBlock(content, content.length);
   *
   * // Append data to an existing append blob.
   * const existingAppendBlobClient = containerClient.getAppendBlobClient(blobName);
   * await existingAppendBlobClient.appendBlock(content, content.length);
   * ```
   */
  public async appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options: AppendBlobAppendBlockOptions = {},
  ): Promise<AppendBlobAppendBlockResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "AppendBlobClient-appendBlock",
      options,
      async (updatedOptions) => {
        return assertResponse<AppendBlobAppendBlockHeaders, AppendBlobAppendBlockHeaders>(
          await this.appendBlobContext.appendBlock(contentLength, body, {
            abortSignal: options.abortSignal,
            appendPositionAccessConditions: options.conditions,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            requestOptions: {
              onUploadProgress: options.onProgress,
            },
            transactionalContentMD5: options.transactionalContentMD5,
            transactionalContentCrc64: options.transactionalContentCrc64,
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://learn.microsoft.com/rest/api/storageservices/append-block-from-url
   *
   * @param sourceURL -
   *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
   *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
   *                 must either be public or must be authenticated via a shared access signature. If the source blob is
   *                 public, no authentication is required to perform the operation.
   * @param sourceOffset - Offset in source to be appended
   * @param count - Number of bytes to be appended as a block
   * @param options -
   */
  public async appendBlockFromURL(
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options: AppendBlobAppendBlockFromURLOptions = {},
  ): Promise<AppendBlobAppendBlockFromUrlResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};

    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "AppendBlobClient-appendBlockFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<
          AppendBlobAppendBlockFromUrlHeaders,
          AppendBlobAppendBlockFromUrlHeaders
        >(
          await this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
            abortSignal: options.abortSignal,
            sourceRange: rangeToString({ offset: sourceOffset, count }),
            sourceContentMD5: options.sourceContentMD5,
            sourceContentCrc64: options.sourceContentCrc64,
            leaseAccessConditions: options.conditions,
            appendPositionAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions?.ifMatch,
              sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
            },
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
}
