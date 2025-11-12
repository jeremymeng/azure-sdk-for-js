// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import {
  getDefaultProxySettings,
  type RequestBodyType as HttpRequestBody,
} from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import { StorageSharedKeyCredential, AnonymousCredential } from "@azure/storage-common";
import { BlobClient } from "./Clients.js";
import type {
  PageBlob,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseInternal,
  PageList as PageListInternal,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseInternal,
} from "./generated/src/index.js";
import type {
  PageBlobCreateHeaders,
  PageBlobUploadPagesHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobClearPagesHeaders,
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobResizeHeaders,
  SequenceNumberActionType,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobCopyIncrementalHeaders,
} from "./generatedModels.js";
import type {
  PageBlobCreateResponse,
  PageBlobUploadPagesResponse,
  PageBlobUploadPagesFromURLResponse,
  PageBlobClearPagesResponse,
  PageBlobGetPageRangesResponseModel,
  PageRangeInfo,
  PageBlobGetPageRangesDiffResponseModel,
  PageBlobResizeResponse,
  PageBlobUpdateSequenceNumberResponse,
  PageBlobCopyIncrementalResponse,
} from "./index.js";
import { ensureCpkIfSpecified, toAccessTier } from "./models.js";
import {
  type PageBlobGetPageRangesResponse,
  rangeResponseFromModel,
  type PageBlobGetPageRangesDiffResponse,
} from "./PageBlobRangeResponse.js";
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
  ExtractPageRangeInfoItems,
} from "./utils/utils.common.js";
import type { CommonOptions } from "./StorageClient.js";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import type { CpkInfo, BlobHTTPHeaders, FileShareTokenIntent } from "./generatedModels.js";
import type {
  BlobRequestConditions,
  Metadata,
  PageBlobRequestConditions,
  PremiumPageBlobTier,
  Tags,
  MatchConditions,
  ModificationConditions,
  ModifiedAccessConditions,
  BlobImmutabilityPolicy,
  HttpAuthorization,
} from "./models.js";

/**
 * Options to configure the {@link PageBlobClient.create} operation.
 */
export interface PageBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when creating a page blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
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
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: PremiumPageBlobTier | string;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/**
 * Options to configure the {@link PageBlobClient.createIfNotExists} operation.
 */
export interface PageBlobCreateIfNotExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
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
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: PremiumPageBlobTier | string;
}

/**
 * Options to configure the {@link PageBlobClient.uploadPages} operation.
 */
export interface PageBlobUploadPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading pages.
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Callback to receive events on the progress of upload pages operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the content. This hash is used to verify the integrity of the content during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content. This hash is used to verify the integrity of the content during transport.
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
 * Options to configure the {@link PageBlobClient.clearPages} operation.
 */
export interface PageBlobClearPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when clearing pages.
   */
  conditions?: PageBlobRequestConditions;
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
 * Options to configure the {@link PageBlobClient.getPageRanges} operation.
 */
export interface PageBlobGetPageRangesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure page blob - get page ranges segment operations.
 *
 * See:
 * - {@link PageBlobClient.listPageRangesSegment}
 * - {@link PageBlobClient.listPageRangeItemSegments}
 * - {@link PageBlobClient.listPageRangeItems}
 */
interface PageBlobListPageRangesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies the maximum number of containers
   * to return. If the request does not specify maxPageSize, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxPageSize, or than the default of 5000.
   */
  maxPageSize?: number;
}

/**
 * Options to configure the {@link PageBlobClient.listPageRanges} operation.
 */
export interface PageBlobListPageRangesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure the {@link PageBlobClient.getRangesDiff} operation.
 */
export interface PageBlobGetPageRangesDiffOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges diff.
   */
  conditions?: BlobRequestConditions;
  /**
   * (unused)
   */
  range?: string;
}

/**
 * Options to configure page blob - get page ranges diff segment operations.
 *
 * See:
 * - {@link PageBlobClient.listPageRangesDiffSegment}
 * - {@link PageBlobClient.listPageRangeDiffItemSegments}
 * - {@link PageBlobClient.listPageRangeDiffItems}
 */
interface PageBlobListPageRangesDiffSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies the maximum number of containers
   * to return. If the request does not specify maxPageSize, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxPageSize, or than the default of 5000.
   */
  maxPageSize?: number;
}

/**
 * Options to configure the {@link PageBlobClient.listPageRangesDiff} operation.
 */
export interface PageBlobListPageRangesDiffOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges diff.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link PageBlobClient.resize} operation.
 */
export interface PageBlobResizeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when resizing a page blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link PageBlobClient.updateSequenceNumber} operation.
 */
export interface PageBlobUpdateSequenceNumberOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link PageBlobClient.startCopyIncremental} operation.
 */
export interface PageBlobStartCopyIncrementalOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when starting a copy incremental operation.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure {@link PageBlobClient.uploadPagesFromURL} operation.
 */
export interface PageBlobUploadPagesFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * An MD5 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
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
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
}

/**
 * Contains response data for the {@link PageBlobClient.createIfNotExists} operation.
 */
export interface PageBlobCreateIfNotExistsResponse extends PageBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 */

export class PageBlobClient extends BlobClient {
  /**
   * pageBlobsContext provided by protocol layer.
   */
  private pageBlobContext: PageBlob;

  /**
   *
   * Creates an instance of PageBlobClient.
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
   * Creates an instance of PageBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A Client string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
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
   * Creates an instance of PageBlobClient.
   *
   * @param url - A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
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
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
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
    this.pageBlobContext = this.storageClientContext.pageBlob;
  }

  /**
   * Creates a new PageBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): PageBlobClient {
    return new PageBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options - Options to the Page Blob Create operation.
   * @returns Response data for the Page Blob Create operation.
   */
  public async create(
    size: number,
    options: PageBlobCreateOptions = {},
  ): Promise<PageBlobCreateResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("PageBlobClient-create", options, async (updatedOptions) => {
      return assertResponse<PageBlobCreateHeaders, PageBlobCreateHeaders>(
        await this.pageBlobContext.create(0, size, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          blobSequenceNumber: options.blobSequenceNumber,
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
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob. If the blob with the same name already exists, the content
   * of the existing blob will remain unchanged.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options -
   */
  public async createIfNotExists(
    size: number,
    options: PageBlobCreateIfNotExistsOptions = {},
  ): Promise<PageBlobCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "PageBlobClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const conditions = { ifNoneMatch: ETagAny };
          const res = assertResponse(
            await this.create(size, {
              ...options,
              conditions,
              tracingOptions: updatedOptions.tracingOptions,
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
   * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-page
   *
   * @param body - Data to upload
   * @param offset - Offset of destination page blob
   * @param count - Content length of the body, also number of bytes to be uploaded
   * @param options - Options to the Page Blob Upload Pages operation.
   * @returns Response data for the Page Blob Upload Pages operation.
   */
  public async uploadPages(
    body: HttpRequestBody,
    offset: number,
    count: number,
    options: PageBlobUploadPagesOptions = {},
  ): Promise<PageBlobUploadPagesResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("PageBlobClient-uploadPages", options, async (updatedOptions) => {
      return assertResponse<PageBlobUploadPagesHeaders, PageBlobUploadPagesHeaders>(
        await this.pageBlobContext.uploadPages(count, body, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onUploadProgress: options.onProgress,
          },
          range: rangeToString({ offset, count }),
          sequenceNumberAccessConditions: options.conditions,
          transactionalContentMD5: options.transactionalContentMD5,
          transactionalContentCrc64: options.transactionalContentCrc64,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * The Upload Pages operation writes a range of pages to a page blob where the
   * contents are read from a URL.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-page-from-url
   *
   * @param sourceURL - Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
   * @param sourceOffset - The source offset to copy from. Pass 0 to copy from the beginning of source page blob
   * @param destOffset - Offset of destination page blob
   * @param count - Number of bytes to be uploaded from source page blob
   * @param options -
   */
  public async uploadPagesFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options: PageBlobUploadPagesFromURLOptions = {},
  ): Promise<PageBlobUploadPagesFromURLResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "PageBlobClient-uploadPagesFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<PageBlobUploadPagesFromURLHeaders, PageBlobUploadPagesFromURLHeaders>(
          await this.pageBlobContext.uploadPagesFromURL(
            sourceURL,
            rangeToString({ offset: sourceOffset, count }),
            0,
            rangeToString({ offset: destOffset, count }),
            {
              abortSignal: options.abortSignal,
              sourceContentMD5: options.sourceContentMD5,
              sourceContentCrc64: options.sourceContentCrc64,
              leaseAccessConditions: options.conditions,
              sequenceNumberAccessConditions: options.conditions,
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
              cpkInfo: options.customerProvidedKey,
              encryptionScope: options.encryptionScope,
              copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
              fileRequestIntent: options.sourceShareTokenIntent,
              tracingOptions: updatedOptions.tracingOptions,
            },
          ),
        );
      },
    );
  }

  /**
   * Frees the specified pages from the page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-page
   *
   * @param offset - Starting byte position of the pages to clear.
   * @param count - Number of bytes to clear.
   * @param options - Options to the Page Blob Clear Pages operation.
   * @returns Response data for the Page Blob Clear Pages operation.
   */
  public async clearPages(
    offset: number = 0,
    count?: number,
    options: PageBlobClearPagesOptions = {},
  ): Promise<PageBlobClearPagesResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("PageBlobClient-clearPages", options, async (updatedOptions) => {
      return assertResponse<PageBlobClearPagesHeaders, PageBlobClearPagesHeaders>(
        await this.pageBlobContext.clearPages(0, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          range: rangeToString({ offset, count }),
          sequenceNumberAccessConditions: options.conditions,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns Response data for the Page Blob Get Ranges operation.
   */
  public async getPageRanges(
    offset: number = 0,
    count?: number,
    options: PageBlobGetPageRangesOptions = {},
  ): Promise<PageBlobGetPageRangesResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-getPageRanges",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRanges({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(response);
      },
    );
  }

  /**
   * getPageRangesSegment returns a single segment of page ranges starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call getPageRangesSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to PageBlob Get Page Ranges Segment operation.
   */
  private async listPageRangesSegment(
    offset: number = 0,
    count?: number,
    marker?: string,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): Promise<PageBlobGetPageRangesResponseModel> {
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesSegment",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRanges({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({ offset, count }),
            marker: marker,
            maxPageSize: options.maxPageSize,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
  /**
   * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesResponseModel}
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param marker - A string value that identifies the portion of
   *                          the get of page ranges to be returned with the next getting operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          getting operation did not return all page ranges remaining within the current page.
   *                          The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of get
   *                          items. The marker value is opaque to the client.
   * @param options - Options to List Page Ranges operation.
   */
  private async *listPageRangeItemSegments(
    offset: number = 0,
    count?: number,
    marker?: string,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): AsyncIterableIterator<PageBlobGetPageRangesResponseModel> {
    let getPageRangeItemSegmentsResponse;
    if (!!marker || marker === undefined) {
      do {
        getPageRangeItemSegmentsResponse = await this.listPageRangesSegment(
          offset,
          count,
          marker,
          options,
        );
        marker = getPageRangeItemSegmentsResponse.continuationToken;
        yield await getPageRangeItemSegmentsResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to List Page Ranges operation.
   */
  private async *listPageRangeItems(
    offset: number = 0,
    count?: number,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): AsyncIterableIterator<PageRangeInfo> {
    let marker: string | undefined;
    for await (const getPageRangesSegment of this.listPageRangeItemSegments(
      offset,
      count,
      marker,
      options,
    )) {
      yield* ExtractPageRangeInfoItems(getPageRangesSegment);
    }
  }

  /**
   * Returns an async iterable iterator to list of page ranges for a page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   *  .byPage() returns an async iterable iterator to list of page ranges for a page blob.
   *
   * ```ts snippet:ClientsListPageBlobs
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
   * const pageBlobClient = containerClient.getPageBlobClient(blobName);
   *
   * // Example using `for await` syntax
   * let i = 1;
   * for await (const pageRange of pageBlobClient.listPageRanges()) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   *
   * // Example using `iter.next()` syntax
   * i = 1;
   * const iter = pageBlobClient.listPageRanges();
   * let { value, done } = await iter.next();
   * while (!done) {
   *   console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
   *   ({ value, done } = await iter.next());
   * }
   *
   * // Example using `byPage()` syntax
   * i = 1;
   * for await (const page of pageBlobClient.listPageRanges().byPage({ maxPageSize: 20 })) {
   *   for (const pageRange of page.pageRange || []) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   *
   * // Example using paging with a marker
   * i = 1;
   * let iterator = pageBlobClient.listPageRanges().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   * // Prints 2 page ranges
   * if (response.pageRange) {
   *   for (const pageRange of response.pageRange) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = pageBlobClient.listPageRanges().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   * // Prints 10 page ranges
   * if (response.pageRange) {
   *   for (const pageRange of response.pageRange) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * ```
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  public listPageRanges(
    offset: number = 0,
    count?: number,
    options: PageBlobListPageRangesOptions = {},
  ): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesResponseModel> {
    options.conditions = options.conditions || {};
    // AsyncIterableIterator to iterate over blobs
    const iter = this.listPageRangeItems(offset, count, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listPageRangeItemSegments(offset, count, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page blob
   * @param count - Number of bytes to get ranges diff.
   * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   * @returns Response data for the Page Blob Get Page Range Diff operation.
   */
  public async getPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobGetPageRangesDiffOptions = {},
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesDiff",
      options,
      async (updatedOptions) => {
        const result = assertResponse<
          PageBlobGetPageRangesDiffResponseInternal,
          PageBlobGetPageRangesDiffHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            prevsnapshot: prevSnapshot,
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(result);
      },
    );
  }

  /**
   * getPageRangesDiffSegment returns a single segment of page ranges starting from the
   * specified Marker for difference between previous snapshot and the target page blob.
   * Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call getPageRangesDiffSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param marker - A string value that identifies the portion of the get to be returned with the next get operation.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private async listPageRangesDiffSegment(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    marker?: string,
    options: PageBlobListPageRangesDiffSegmentOptions = {},
  ): Promise<PageBlobGetPageRangesResponseModel> {
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesDiffSegment",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options?.abortSignal,
            leaseAccessConditions: options?.conditions,
            modifiedAccessConditions: {
              ...options?.conditions,
              ifTags: options?.conditions?.tagConditions,
            },
            prevsnapshot: prevSnapshotOrUrl,
            range: rangeToString({
              offset: offset,
              count: count,
            }),
            marker: marker,
            maxPageSize: options?.maxPageSize,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
  /**
   * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesDiffResponseModel}
   *
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param marker - A string value that identifies the portion of
   *                          the get of page ranges to be returned with the next getting operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          getting operation did not return all page ranges remaining within the current page.
   *                          The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of get
   *                          items. The marker value is opaque to the client.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private async *listPageRangeDiffItemSegments(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    marker?: string,
    options?: PageBlobListPageRangesDiffSegmentOptions,
  ): AsyncIterableIterator<PageBlobGetPageRangesDiffResponseModel> {
    let getPageRangeItemSegmentsResponse: PageBlobGetPageRangesResponseModel;
    if (!!marker || marker === undefined) {
      do {
        getPageRangeItemSegmentsResponse = await this.listPageRangesDiffSegment(
          offset,
          count,
          prevSnapshotOrUrl,
          marker,
          options,
        );
        marker = getPageRangeItemSegmentsResponse.continuationToken;
        yield await getPageRangeItemSegmentsResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private async *listPageRangeDiffItems(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    options?: PageBlobListPageRangesDiffSegmentOptions,
  ): AsyncIterableIterator<PageRangeInfo> {
    let marker: string | undefined;
    for await (const getPageRangesSegment of this.listPageRangeDiffItemSegments(
      offset,
      count,
      prevSnapshotOrUrl,
      marker,
      options,
    )) {
      yield* ExtractPageRangeInfoItems(getPageRangesSegment);
    }
  }

  /**
   * Returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   *  .byPage() returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
   *
   * ```ts snippet:ClientsListPageBlobsDiff
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
   * const pageBlobClient = containerClient.getPageBlobClient(blobName);
   *
   * const offset = 0;
   * const count = 1024;
   * const previousSnapshot = "<previous snapshot>";
   * // Example using `for await` syntax
   * let i = 1;
   * for await (const pageRange of pageBlobClient.listPageRangesDiff(offset, count, previousSnapshot)) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   *
   * // Example using `iter.next()` syntax
   * i = 1;
   * const iter = pageBlobClient.listPageRangesDiff(offset, count, previousSnapshot);
   * let { value, done } = await iter.next();
   * while (!done) {
   *   console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
   *   ({ value, done } = await iter.next());
   * }
   *
   * // Example using `byPage()` syntax
   * i = 1;
   * for await (const page of pageBlobClient
   *   .listPageRangesDiff(offset, count, previousSnapshot)
   *   .byPage({ maxPageSize: 20 })) {
   *   for (const pageRange of page.pageRange || []) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   *
   * // Example using paging with a marker
   * i = 1;
   * let iterator = pageBlobClient
   *   .listPageRangesDiff(offset, count, previousSnapshot)
   *   .byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   * // Prints 2 page ranges
   * if (response.pageRange) {
   *   for (const pageRange of response.pageRange) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = pageBlobClient
   *   .listPageRangesDiff(offset, count, previousSnapshot)
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   * // Prints 10 page ranges
   * if (response.pageRange) {
   *   for (const pageRange of response.pageRange) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * ```
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  public listPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobListPageRangesDiffOptions = {},
  ): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesDiffResponseModel> {
    options.conditions = options.conditions || {};

    // AsyncIterableIterator to iterate over blobs
    const iter = this.listPageRangeDiffItems(offset, count, prevSnapshot, {
      ...options,
    });
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listPageRangeDiffItemSegments(
          offset,
          count,
          prevSnapshot,
          settings.continuationToken,
          {
            maxPageSize: settings.maxPageSize,
            ...options,
          },
        );
      },
    };
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob for managed disks.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page blob
   * @param count - Number of bytes to get ranges diff.
   * @param prevSnapshotUrl - URL of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   * @returns Response data for the Page Blob Get Page Range Diff operation.
   */
  public async getPageRangesDiffForManagedDisks(
    offset: number,
    count: number,
    prevSnapshotUrl: string,
    options: PageBlobGetPageRangesDiffOptions = {},
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-GetPageRangesDiffForManagedDisks",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          PageBlobGetPageRangesDiffResponseInternal,
          PageBlobGetPageRangesDiffHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            prevSnapshotUrl,
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(response);
      },
    );
  }

  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param size - Target size
   * @param options - Options to the Page Blob Resize operation.
   * @returns Response data for the Page Blob Resize operation.
   */
  public async resize(
    size: number,
    options: PageBlobResizeOptions = {},
  ): Promise<PageBlobResizeResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("PageBlobClient-resize", options, async (updatedOptions) => {
      return assertResponse<PageBlobResizeHeaders, PageBlobResizeHeaders>(
        await this.pageBlobContext.resize(size, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets a page blob's sequence number.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param sequenceNumberAction - Indicates how the service should modify the blob's sequence number.
   * @param sequenceNumber - Required if sequenceNumberAction is max or update
   * @param options - Options to the Page Blob Update Sequence Number operation.
   * @returns Response data for the Page Blob Update Sequence Number operation.
   */
  public async updateSequenceNumber(
    sequenceNumberAction: SequenceNumberActionType,
    sequenceNumber?: number,
    options: PageBlobUpdateSequenceNumberOptions = {},
  ): Promise<PageBlobUpdateSequenceNumberResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-updateSequenceNumber",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobUpdateSequenceNumberHeaders,
          PageBlobUpdateSequenceNumberHeaders
        >(
          await this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
            abortSignal: options.abortSignal,
            blobSequenceNumber: sequenceNumber,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
   * The snapshot is copied such that only the differential changes between the previously
   * copied snapshot are transferred to the destination.
   * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
   * @see https://learn.microsoft.com/rest/api/storageservices/incremental-copy-blob
   * @see https://learn.microsoft.com/azure/virtual-machines/windows/incremental-snapshots
   *
   * @param copySource - Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param options - Options to the Page Blob Copy Incremental operation.
   * @returns Response data for the Page Blob Copy Incremental operation.
   */
  public async startCopyIncremental(
    copySource: string,
    options: PageBlobStartCopyIncrementalOptions = {},
  ): Promise<PageBlobCopyIncrementalResponse> {
    return tracingClient.withSpan(
      "PageBlobClient-startCopyIncremental",
      options,
      async (updatedOptions) => {
        return assertResponse<PageBlobCopyIncrementalHeaders, PageBlobCopyIncrementalHeaders>(
          await this.pageBlobContext.copyIncremental(copySource, {
            abortSignal: options.abortSignal,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
}
