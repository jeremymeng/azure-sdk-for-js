// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { isNodeLike, randomUUID } from "@azure/core-util";
import { AnonymousCredential, StorageSharedKeyCredential } from "@azure/storage-common";
import type { Blob as StorageBlob } from "./generated/src/operationsInterfaces/index.js";
import type {
  CpkInfo,
  LeaseAccessConditions,
  BlobHTTPHeaders,
  BlobCopySourceTags,
  FileShareTokenIntent,
} from "./generatedModels.js";
import type {
  BlobRequestConditions,
  BlockBlobTier,
  Metadata,
  Tags,
  TagConditions,
  ModifiedAccessConditions,
  BlobImmutabilityPolicy,
  HttpAuthorization,
} from "./models.js";
import { ensureCpkIfSpecified, toAccessTier } from "./models.js";
import type { PipelineLike, StoragePipelineOptions } from "./Pipeline.js";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import { rangeToString } from "./Range.js";
import type { CommonOptions } from "./StorageClient.js";
import { Batch } from "./utils/Batch.js";
import { DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES, URLConstants } from "./utils/constants.js";
import { tracingClient } from "./utils/tracing.js";
import type { WithResponse } from "./utils/utils.common.js";
import {
  appendToURLPath,
  assertResponse,
  extractConnectionStringParts,
  httpAuthorizationToString,
  setURLParameter,
  toBlobTagsString,
} from "./utils/utils.common.js";

import { type RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import { BufferScheduler } from "@azure/storage-common";
import type { Readable } from "node:stream";
import { BlobQueryResponse } from "./BlobQueryResponse.js";
import { BlobClient } from "./Clients.js";
import type {
  BlockBlob,
  BlobQueryResponse as BlobQueryResponseInternal,
  BlockBlobGetBlockListResponse as BlockBlobGetBlockListResponseInternal,
} from "./generated/src/index.js";
import type {
  BlockBlobUploadHeaders,
  BlobQueryHeaders,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockListType,
  BlockBlobGetBlockListHeaders,
} from "./generatedModels.js";
import type {
  BlobDownloadResponseModel,
  BlockBlobUploadResponse,
  BlockBlobPutBlobFromUrlResponse,
  BlockBlobStageBlockResponse,
  BlockBlobStageBlockFromURLResponse,
  BlockBlobCommitBlockListResponse,
  BlockBlobGetBlockListResponse,
} from "./index.js";
import { type BlobQueryArrowField } from "./models.js";
import { type Range } from "./Range.js";
import {
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  BLOCK_BLOB_MAX_BLOCKS,
  DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
} from "./utils/constants.js";
import { toQuerySerialization, generateBlockID } from "./utils/utils.common.js";
import { fsStat, fsCreateReadStream } from "./utils/utils.js";

/**
 * Options to configure {@link BlockBlobClient.upload} operation.
 */

export interface BlockBlobUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading to the block blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when uploading to a block blob. A common header to set is
   * `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when uploading to a block blob.
   */
  metadata?: Metadata;
  /**
   * Callback to receive events on the progress of upload operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
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
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
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
 * Options to configure {@link BlockBlobClient.syncUploadFromURL} operation.
 */

export interface BlockBlobSyncUploadFromURLOptions extends CommonOptions {
  /**
   * Server timeout in seconds.
   * For more information, @see https://learn.microsoft.com/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations
   */
  timeoutInSeconds?: number;
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
   * pairs are specified, the operation will copy the metadata from the source blob or file to the
   * destination blob. If one or more name-value pairs are specified, the destination blob is
   * created with the specified metadata, and metadata is not copied from the source blob or file.
   * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
   * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
   * information.
   */
  metadata?: Metadata;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
  /**
   * Specify the md5 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Optional, default is true.  Indicates if properties from the source blob should be copied.
   */
  copySourceBlobProperties?: boolean;
  /**
   * HTTP headers to set when uploading to a block blob.
   *
   * A common header to set is `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * Conditions to meet for the destination Azure Blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Conditions to meet for the source Azure Blob.
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
  /**
   * Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
   */
  copySourceTags?: BlobCopySourceTags;
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
}
/**
 * Blob query error type.
 */

export interface BlobQueryError {
  /**
   * Whether error is fatal. Fatal error will stop query.
   */
  isFatal: boolean;
  /**
   * Error name.
   */
  name: string;
  /**
   * Position in bytes of the query.
   */
  position: number;
  /**
   * Error description.
   */
  description: string;
}
/**
 * Options to query blob with JSON format.
 */

export interface BlobQueryJsonTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a JSON format blob.
   */
  kind: "json";
}
/**
 * Options to query blob with CSV format.
 */

export interface BlobQueryCsvTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a CSV format blob.
   */
  kind: "csv";
  /**
   * Column separator. Default is ",".
   */
  columnSeparator?: string;
  /**
   * Field quote.
   */
  fieldQuote?: string;
  /**
   * Escape character.
   */
  escapeCharacter?: string;
  /**
   * Has headers. Default is false.
   */
  hasHeaders?: boolean;
}
/**
 * Options to query blob with Apache Arrow format. Only valid for {@link BlockBlobQueryOptions.outputTextConfiguration}.
 */

export interface BlobQueryArrowConfiguration {
  /**
   * Kind.
   */
  kind: "arrow";

  /**
   * List of {@link BlobQueryArrowField} describing the schema of the data.
   */
  schema: BlobQueryArrowField[];
}
/**
 * Options to query blob with Parquet format. Only valid for {@link BlockBlobQueryOptions.inputTextConfiguration}.
 */

export interface BlobQueryParquetConfiguration {
  /**
   * Kind.
   */
  kind: "parquet";
}
/**
 * Options to configure {@link BlockBlobClient.query} operation.
 */

export interface BlockBlobQueryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Configurations for the query input.
   */
  inputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryParquetConfiguration;
  /**
   * Configurations for the query output.
   */
  outputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryArrowConfiguration;
  /**
   * Callback to receive events on the progress of query operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Callback to receive error events during the query operaiton.
   */
  onError?: (error: BlobQueryError) => void;
  /**
   * Conditions to meet when uploading to the block blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure {@link BlockBlobClient.stageBlock} operation.
 */

export interface BlockBlobStageBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
  /**
   * Callback to receive events on the progress of stage block operation.
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
   * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport.
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
 * Options to configure {@link BlockBlobClient.stageBlockFromURL} operation.
 */

export interface BlockBlobStageBlockFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the bytes of the source Blob/File to upload.
   * If not specified, the entire content is uploaded as a single block.
   */
  range?: Range;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
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
 * Options to configure {@link BlockBlobClient.commitBlockList} operation.
 */

export interface BlockBlobCommitBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when committing the block list.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when committing block list.
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when committing block list.
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
  tier?: BlockBlobTier | string;

  /**
   * Blob tags.
   */
  tags?: Tags;
}
/**
 * Options to configure {@link BlockBlobClient.getBlockList} operation.
 */

export interface BlockBlobGetBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions & TagConditions;
}
/**
 * Option interface for the {@link BlockBlobClient.uploadStream} operation.
 */

export interface BlockBlobUploadStreamOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Blob HTTP Headers.
   *
   * A common header to set is `blobContentType`, enabling the
   * browser to provide functionality based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;

  /**
   * Metadata of block blob.
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;

  /**
   * Blob tags.
   */
  tags?: Tags;

  /**
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
}
/**
 * Option interface for {@link BlockBlobClient.uploadFile} and {@link BlockBlobClient.uploadSeekableStream}.
 */
export interface BlockBlobParallelUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Destination block blob size in bytes.
   */
  blockSize?: number;

  /**
   * Blob size threshold in bytes to start concurrency uploading.
   * Default value is 256MB, blob size less than this option will
   * be uploaded via one I/O operation without concurrency.
   * You can customize a value less equal than the default value.
   */
  maxSingleShotSize?: number;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Blob HTTP Headers. A common header to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;

  /**
   * Concurrency of parallel uploading. Must be greater than or equal to 0.
   */
  concurrency?: number;

  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;

  /**
   * Blob tags.
   */
  tags?: Tags;

  /**
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
}
/**
 * Response type for {@link BlockBlobClient.uploadFile}, {@link BlockBlobClient.uploadStream}, and
 * {@link BlockBlobClient.uploadBrowserDate}.
 */

export type BlobUploadCommonResponse = WithResponse<BlockBlobUploadHeaders>;
/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 */

export class BlockBlobClient extends BlobClient {
  /**
   * blobContext provided by protocol layer.
   *
   * Note. Ideally BlobClient should set BlobClient.blobContext to protected. However, API
   * extractor has issue blocking that. Here we redecelare _blobContext in BlockBlobClient.
   */
  private _blobContext: StorageBlob;

  /**
   * blockBlobContext provided by protocol layer.
   */
  private blockBlobContext: BlockBlob;

  /**
   *
   * Creates an instance of BlockBlobClient.
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
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
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
    credentialOrPipelineOrContainerName?:
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
      if (blobNameOrOptions && typeof blobNameOrOptions !== "string") {
        options = blobNameOrOptions as StoragePipelineOptions;
      }
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
    this.blockBlobContext = this.storageClientContext.blockBlob;
    this._blobContext = this.storageClientContext.blob;
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): BlockBlobClient {
    return new BlockBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Quick query for a JSON or CSV formatted blob.
   *
   * Example usage (Node.js):
   *
   * ```ts snippet:ClientsQuery
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
   * const blockBlobClient = containerClient.getBlockBlobClient(blobName);
   *
   * // Query and convert a blob to a string
   * const queryBlockBlobResponse = await blockBlobClient.query("select from BlobStorage");
   * if (queryBlockBlobResponse.readableStreamBody) {
   *   const downloadedBuffer = await streamToBuffer(queryBlockBlobResponse.readableStreamBody);
   *   const downloaded = downloadedBuffer.toString();
   *   console.log(`Query blob content: ${downloaded}`);
   * }
   *
   * async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
   *   return new Promise((resolve, reject) => {
   *     const chunks: Buffer[] = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   *     });
   *     readableStream.on("end", () => {
   *       resolve(Buffer.concat(chunks));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * @param query -
   * @param options -
   */
  public async query(
    query: string,
    options: BlockBlobQueryOptions = {},
  ): Promise<BlobDownloadResponseModel> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    if (!isNodeLike) {
      throw new Error("This operation currently is only supported in Node.js.");
    }

    return tracingClient.withSpan("BlockBlobClient-query", options, async (updatedOptions) => {
      const response = assertResponse<BlobQueryResponseInternal, BlobQueryHeaders>(
        await this._blobContext.query({
          abortSignal: options.abortSignal,
          queryRequest: {
            queryType: "SQL",
            expression: query,
            inputSerialization: toQuerySerialization(options.inputTextConfiguration),
            outputSerialization: toQuerySerialization(options.outputTextConfiguration),
          },
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
      return new BlobQueryResponse(response, {
        abortSignal: options.abortSignal,
        onProgress: options.onProgress,
        onError: options.onError,
      });
    });
  }

  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use {@link stageBlock} and {@link commitBlockList}.
   *
   * This is a non-parallel uploading method, please use {@link uploadFile},
   * {@link uploadStream} or {@link uploadBrowserData} for better performance
   * with concurrency uploading.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param options - Options to the Block Blob Upload operation.
   * @returns Response data for the Block Blob Upload operation.
   *
   * Example usage:
   *
   * ```ts snippet:ClientsUpload
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
   * const blockBlobClient = containerClient.getBlockBlobClient(blobName);
   *
   * const content = "Hello world!";
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  public async upload(
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {},
  ): Promise<BlockBlobUploadResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlockBlobClient-upload", options, async (updatedOptions) => {
      return assertResponse<BlockBlobUploadHeaders, BlockBlobUploadHeaders>(
        await this.blockBlobContext.upload(contentLength, body, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onUploadProgress: options.onProgress,
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
   * Creates a new Block Blob where the contents of the blob are read from a given URL.
   * This API is supported beginning with the 2020-04-08 version. Partial updates
   * are not supported with Put Blob from URL; the content of an existing blob is overwritten with
   * the content of the new blob.  To perform partial updates to a block blob’s contents using a
   * source URL, use {@link stageBlockFromURL} and {@link commitBlockList}.
   *
   * @param sourceURL - Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param options - Optional parameters.
   */
  public async syncUploadFromURL(
    sourceURL: string,
    options: BlockBlobSyncUploadFromURLOptions = {},
  ): Promise<BlockBlobPutBlobFromUrlResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-syncUploadFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobPutBlobFromUrlHeaders, BlockBlobPutBlobFromUrlHeaders>(
          await this.blockBlobContext.putBlobFromUrl(0, sourceURL, {
            ...options,
            blobHttpHeaders: options.blobHTTPHeaders,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions?.ifMatch,
              sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
              sourceIfTags: options.sourceConditions?.tagConditions,
            },
            cpkInfo: options.customerProvidedKey,
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            tier: toAccessTier(options.tier),
            blobTagsString: toBlobTagsString(options.tags),
            copySourceTags: options.copySourceTags,
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Uploads the specified block to the block blob's "staging area" to be later
   * committed by a call to commitBlockList.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-block
   *
   * @param blockId - A 64-byte value that is base64-encoded
   * @param body - Data to upload to the staging area.
   * @param contentLength - Number of bytes to upload.
   * @param options - Options to the Block Blob Stage Block operation.
   * @returns Response data for the Block Blob Stage Block operation.
   */
  public async stageBlock(
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobStageBlockOptions = {},
  ): Promise<BlockBlobStageBlockResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlockBlobClient-stageBlock", options, async (updatedOptions) => {
      return assertResponse<BlockBlobStageBlockHeaders, BlockBlobStageBlockHeaders>(
        await this.blockBlobContext.stageBlock(blockId, contentLength, body, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
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
    });
  }

  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-block-from-url
   *
   * @param blockId - A 64-byte value that is base64-encoded
   * @param sourceURL - Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param offset - From which position of the blob to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Options to the Block Blob Stage Block From URL operation.
   * @returns Response data for the Block Blob Stage Block From URL operation.
   */
  public async stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset: number = 0,
    count?: number,
    options: BlockBlobStageBlockFromURLOptions = {},
  ): Promise<BlockBlobStageBlockFromURLResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-stageBlockFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobStageBlockFromURLHeaders, BlockBlobStageBlockFromURLHeaders>(
          await this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            sourceContentMD5: options.sourceContentMD5,
            sourceContentCrc64: options.sourceContentCrc64,
            sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Writes a blob by specifying the list of block IDs that make up the blob.
   * In order to be written as part of a blob, a block must have been successfully written
   * to the server in a prior {@link stageBlock} operation. You can call {@link commitBlockList} to
   * update a blob by uploading only those blocks that have changed, then committing the new and existing
   * blocks together. Any blocks not specified in the block list and permanently deleted.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-block-list
   *
   * @param blocks -  Array of 64-byte value that is base64-encoded
   * @param options - Options to the Block Blob Commit Block List operation.
   * @returns Response data for the Block Blob Commit Block List operation.
   */
  public async commitBlockList(
    blocks: string[],
    options: BlockBlobCommitBlockListOptions = {},
  ): Promise<BlockBlobCommitBlockListResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-commitBlockList",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobCommitBlockListHeaders, BlockBlobCommitBlockListHeaders>(
          await this.blockBlobContext.commitBlockList(
            { latest: blocks },
            {
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
              tier: toAccessTier(options.tier),
              blobTagsString: toBlobTagsString(options.tags),
              tracingOptions: updatedOptions.tracingOptions,
            },
          ),
        );
      },
    );
  }

  /**
   * Returns the list of blocks that have been uploaded as part of a block blob
   * using the specified block list filter.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-block-list
   *
   * @param listType - Specifies whether to return the list of committed blocks,
   *                                        the list of uncommitted blocks, or both lists together.
   * @param options - Options to the Block Blob Get Block List operation.
   * @returns Response data for the Block Blob Get Block List operation.
   */
  public async getBlockList(
    listType: BlockListType,
    options: BlockBlobGetBlockListOptions = {},
  ): Promise<BlockBlobGetBlockListResponse> {
    return tracingClient.withSpan(
      "BlockBlobClient-getBlockList",
      options,
      async (updatedOptions) => {
        const res = assertResponse<
          BlockBlobGetBlockListResponseInternal,
          BlockBlobGetBlockListHeaders
        >(
          await this.blockBlobContext.getBlockList(listType, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );

        if (!res.committedBlocks) {
          res.committedBlocks = [];
        }

        if (!res.uncommittedBlocks) {
          res.uncommittedBlocks = [];
        }

        return res;
      },
    );
  }

  // High level functions
  /**
   * Uploads a Buffer(Node.js)/Blob(browsers)/ArrayBuffer/ArrayBufferView object to a BlockBlob.
   *
   * When data length is no more than the specifiled {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
   * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
   * to commit the block list.
   *
   * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   * @param data - Buffer(Node.js), Blob, ArrayBuffer or ArrayBufferView
   * @param options -
   */
  public async uploadData(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan("BlockBlobClient-uploadData", options, async (updatedOptions) => {
      if (isNodeLike) {
        let buffer: Buffer;
        if (data instanceof Buffer) {
          buffer = data;
        } else if (data instanceof ArrayBuffer) {
          buffer = Buffer.from(data);
        } else {
          data = data as ArrayBufferView;
          buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        }

        return this.uploadSeekableInternal(
          (offset: number, size: number): Buffer => buffer.slice(offset, offset + size),
          buffer.byteLength,
          updatedOptions,
        );
      } else {
        const browserBlob = new Blob([data as any]);
        return this.uploadSeekableInternal(
          (offset: number, size: number): Blob => browserBlob.slice(offset, offset + size),
          browserBlob.size,
          updatedOptions,
        );
      }
    });
  }

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
   *
   * When buffer length lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call
   * {@link commitBlockList} to commit the block list.
   *
   * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   * @deprecated Use {@link uploadData} instead.
   *
   * @param browserData - Blob, File, ArrayBuffer or ArrayBufferView
   * @param options - Options to upload browser data.
   * @returns Response data for the Blob Upload operation.
   */
  public async uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan(
      "BlockBlobClient-uploadBrowserData",
      options,
      async (updatedOptions) => {
        const browserBlob = new Blob([browserData as any]);
        return this.uploadSeekableInternal(
          (offset: number, size: number): Blob => browserBlob.slice(offset, offset + size),
          browserBlob.size,
          updatedOptions,
        );
      },
    );
  }

  /**
   *
   * Uploads data to block blob. Requires a bodyFactory as the data source,
   * which need to return a {@link HttpRequestBody} object with the offset and size provided.
   *
   * When data length is no more than the specified {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
   * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
   * to commit the block list.
   *
   * @param bodyFactory -
   * @param size - size of the data to upload.
   * @param options - Options to Upload to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  private async uploadSeekableInternal(
    bodyFactory: (offset: number, size: number) => HttpRequestBody,
    size: number,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    let blockSize = options.blockSize ?? 0;
    if (blockSize < 0 || blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`,
      );
    }

    const maxSingleShotSize = options.maxSingleShotSize ?? BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;

    if (maxSingleShotSize < 0 || maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`,
      );
    }

    if (blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES * BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > maxSingleShotSize) {
        blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlockBlobClient-uploadSeekableInternal",
      options,
      async (updatedOptions) => {
        if (size <= maxSingleShotSize) {
          return assertResponse(await this.upload(bodyFactory(0, size), size, updatedOptions));
        }

        const numBlocks: number = Math.floor((size - 1) / blockSize) + 1;
        if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
          throw new RangeError(
            `The buffer's size is too big or the BlockSize is too small;` +
              `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`,
          );
        }

        const blockList: string[] = [];
        const blockIDPrefix = randomUUID();
        let transferProgress: number = 0;

        const batch = new Batch(options.concurrency);
        for (let i = 0; i < numBlocks; i++) {
          batch.addOperation(async (): Promise<any> => {
            const blockID = generateBlockID(blockIDPrefix, i);
            const start = blockSize * i;
            const end = i === numBlocks - 1 ? size : start + blockSize;
            const contentLength = end - start;
            blockList.push(blockID);
            await this.stageBlock(blockID, bodyFactory(start, contentLength), contentLength, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              encryptionScope: options.encryptionScope,
              tracingOptions: updatedOptions.tracingOptions,
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            // TODO: Hook with convenience layer progress event in finer level
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress!({
                loadedBytes: transferProgress,
              });
            }
          });
        }
        await batch.do();

        return this.commitBlockList(blockList, updatedOptions);
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file in blocks to a block blob.
   *
   * When file size lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param filePath - Full path of local file
   * @param options - Options to Upload to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  public async uploadFile(
    filePath: string,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan("BlockBlobClient-uploadFile", options, async (updatedOptions) => {
      const size = (await fsStat(filePath)).size;
      return this.uploadSeekableInternal(
        (offset, count) => {
          return () =>
            fsCreateReadStream(filePath, {
              autoClose: true,
              end: count ? offset + count - 1 : Infinity,
              start: offset,
            });
        },
        size,
        {
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        },
      );
    });
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a Node.js Readable stream into block blob.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with bufferSize
   *    parameter, which will avoid Buffer.concat() operations.
   *
   * @param stream - Node.js Readable stream
   * @param bufferSize - Size of every buffer allocated, also the block size in the uploaded block blob. Default value is 8MB
   * @param maxConcurrency -  Max concurrency indicates the max number of buffers that can be allocated,
   *                                 positive correlation with max uploading concurrency. Default value is 5
   * @param options - Options to Upload Stream to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  public async uploadStream(
    stream: Readable,
    bufferSize: number = DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
    maxConcurrency: number = 5,
    options: BlockBlobUploadStreamOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlockBlobClient-uploadStream",
      options,
      async (updatedOptions) => {
        let blockNum = 0;
        const blockIDPrefix = randomUUID();
        let transferProgress: number = 0;
        const blockList: string[] = [];

        const scheduler = new BufferScheduler(
          stream,
          bufferSize,
          maxConcurrency,
          async (body, length) => {
            const blockID = generateBlockID(blockIDPrefix, blockNum);
            blockList.push(blockID);
            blockNum++;

            await this.stageBlock(blockID, body, length, {
              customerProvidedKey: options.customerProvidedKey,
              conditions: options.conditions,
              encryptionScope: options.encryptionScope,
              tracingOptions: updatedOptions.tracingOptions,
            });

            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += length;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          },
          // concurrency should set a smaller value than maxConcurrency, which is helpful to
          // reduce the possibility when a outgoing handler waits for stream data, in
          // this situation, outgoing handlers are blocked.
          // Outgoing queue shouldn't be empty.
          Math.ceil((maxConcurrency / 4) * 3),
        );
        await scheduler.do();

        return assertResponse(
          await this.commitBlockList(blockList, {
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
}
