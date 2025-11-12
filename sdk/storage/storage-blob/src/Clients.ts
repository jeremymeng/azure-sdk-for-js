// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";
import type { PollOperationState } from "@azure/core-lro";
import { BlobDownloadResponse } from "./BlobDownloadResponse.js";
import { AnonymousCredential, StorageSharedKeyCredential } from "@azure/storage-common";
import type { Blob as StorageBlob } from "./generated/src/operationsInterfaces/index.js";
import type {
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobGetAccountInfoHeaders,
  BlobGetPropertiesResponse as BlobGetPropertiesResponseInternal,
  BlobGetTagsResponse as BlobGetTagsResponseInternal,
  BlobSetHttpHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
} from "./generated/src/index.js";
import type {
  BlobAbortCopyFromURLResponse,
  BlobCopyFromURLResponse,
  BlobCreateSnapshotResponse,
  BlobDeleteResponse,
  BlobDownloadOptionalParams,
  BlobGetAccountInfoResponse,
  BlobGetPropertiesResponseModel,
  BlobGetTagsHeaders,
  BlobSetHTTPHeadersResponse,
  BlobSetTagsResponse,
  BlobSetTierResponse,
  BlobStartCopyFromURLResponse,
  BlobTags,
  BlobUndeleteResponse,
  CpkInfo,
  DeleteSnapshotsOptionType,
  LeaseAccessConditions,
  RehydratePriority,
  BlobHTTPHeaders,
  BlobCopySourceTags,
  BlobDownloadResponseInternal,
  BlobDownloadHeaders,
  BlobGetPropertiesHeaders,
  BlobDeleteImmutabilityPolicyResponse,
  BlobSetImmutabilityPolicyResponse,
  BlobSetLegalHoldResponse,
  BlobSetMetadataResponse,
  FileShareTokenIntent,
} from "./generatedModels.js";
import type {
  BlobDownloadResponseParsed,
  BlobRequestConditions,
  BlockBlobTier,
  Metadata,
  ObjectReplicationPolicy,
  PremiumPageBlobTier,
  Tags,
  TagConditions,
  MatchConditions,
  ModificationConditions,
  ModifiedAccessConditions,
  BlobImmutabilityPolicy,
  HttpAuthorization,
  PollerLikeWithCancellation,
} from "./models.js";
import { ensureCpkIfSpecified, toAccessTier } from "./models.js";
import type { PipelineLike, StoragePipelineOptions } from "./Pipeline.js";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import type {
  BlobBeginCopyFromUrlPollState,
  CopyPollerBlobClient,
} from "./pollers/BlobStartCopyFromUrlPoller.js";
import { BlobBeginCopyFromUrlPoller } from "./pollers/BlobStartCopyFromUrlPoller.js";
import { rangeToString } from "./Range.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import { Batch } from "./utils/Batch.js";
import {
  BlobDoesNotUseCustomerSpecifiedEncryption,
  BlobUsesCustomerSpecifiedEncryptionMsg,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES,
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  URLConstants,
} from "./utils/constants.js";
import { tracingClient } from "./utils/tracing.js";
import type { WithResponse } from "./utils/utils.common.js";
import {
  appendToURLPath,
  appendToURLQuery,
  assertResponse,
  extractConnectionStringParts,
  getURLParameter,
  httpAuthorizationToString,
  isIpEndpointStyle,
  parseObjectReplicationRecord,
  setURLParameter,
  toBlobTags,
  toBlobTagsString,
  toTags,
} from "./utils/utils.common.js";
import { readStreamToLocalFile, streamToBuffer } from "./utils/utils.js";
import type { SASProtocol } from "./sas/SASQueryParameters.js";
import type { SasIPRange } from "./sas/SasIPRange.js";
import {
  generateBlobSASQueryParameters,
  generateBlobSASQueryParametersInternal,
} from "./sas/BlobSASSignatureValues.js";
import type { BlobSASPermissions } from "./sas/BlobSASPermissions.js";
import { BlobLeaseClient } from "./BlobLeaseClient.js";
import type { UserDelegationKey } from "./BlobServiceClient.js";
import { AppendBlobClient } from "./AppendBlobClient.js";
import { PageBlobClient } from "./PageBlobClient.js";
import { BlockBlobClient } from "./BlockBlobClient.js";

/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
  /**
   * The amount of time in milliseconds the poller should wait between
   * calls to the service to determine the status of the Blob copy.
   * Defaults to 15 seconds.
   */
  intervalInMs?: number;
  /**
   * Callback to receive the state of the copy progress.
   */
  onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
  /**
   * Serialized poller state that can be used to resume polling from.
   * This may be useful when starting a copy on one process or thread
   * and you wish to continue polling on another process or thread.
   *
   * To get serialized poller state, call `poller.toString()` on an existing
   * poller.
   */
  resumeFrom?: string;
}

/**
 * Contains response data for the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {}

/**
 * Options to configure the {@link BlobClient.download} operation.
 */
export interface BlobDownloadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * An opaque DateTime string value that, when present, specifies the blob snapshot to retrieve.
   */
  snapshot?: string;
  /**
   * When this is set to true and download range of blob, the service returns the MD5 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   */
  rangeGetContentMD5?: boolean;
  /**
   * When this is set to true and download range of blob, the service returns the CRC64 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   */
  rangeGetContentCrc64?: boolean;
  /**
   * Conditions to meet when downloading blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * Call back to receive events on the progress of download operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional `FileClient.download()` request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   */
  maxRetryRequests?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.exists} operation.
 */
export interface BlobExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Conditions to meet.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure the {@link BlobClient.getProperties} operation.
 */
export interface BlobGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting blob properties.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.delete} operation.
 */
export interface BlobDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies options to delete blobs that have associated snapshots.
   * - `include`: Delete the base blob and all of its snapshots.
   * - `only`: Delete only the blob's snapshots and not the blob itself.
   */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.undelete} operation.
 */
export interface BlobUndeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.setHTTPHeaders} operation.
 */
export interface BlobSetHTTPHeadersOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob HTTP headers.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.setMetadata} operation.
 */
export interface BlobSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob metadata.
   */
  conditions?: BlobRequestConditions;
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
 * Options to configure the {@link BlobClient.setTags} operation.
 */
export interface BlobSetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet for the blob to perform this operation.
   */
  conditions?: TagConditions & LeaseAccessConditions;
}

/**
 * Options to configure the {@link BlobClient.getTags} operation.
 */
export interface BlobGetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet for the blob to perform this operation.
   */
  conditions?: TagConditions & LeaseAccessConditions;
}

/**
 * Contains response data for the {@link BlobClient.getTags} operation.
 */
export type BlobGetTagsResponse = WithResponse<
  { tags: Tags } & BlobGetTagsHeaders,
  BlobGetTagsHeaders,
  BlobTags
>;

/**
 * Options to configure Blob - Acquire Lease operation.
 */
export interface BlobAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Release Lease operation.
 */
export interface BlobReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Renew Lease operation.
 */
export interface BlobRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Change Lease operation.
 */
export interface BlobChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Break Lease operation.
 */
export interface BlobBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure the {@link BlobClient.createSnapshot} operation.
 */
export interface BlobCreateSnapshotOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet when creating blob snapshots.
   */
  conditions?: BlobRequestConditions;
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
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobStartCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the blob that are being copied.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   */
  rehydratePriority?: RehydratePriority;
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
  /**
   * Overrides the sealed state of the destination blob. Default true.
   */
  sealBlob?: boolean;
}

/**
 * Options to configure the {@link BlobClient.abortCopyFromURL} operation.
 */
export interface BlobAbortCopyFromURLOptions extends CommonOptions {
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
}

/**
 * Options to configure the {@link BlobClient.syncCopyFromURL} operation.
 */
export interface BlobSyncCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * Access tier.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Specify the md5 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentMD5?: Uint8Array;
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
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to encrypt the data provided in the request. If not specified, encryption is performed with the default account encryption scope.  For more information, see Encryption at Rest for Azure Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Default 'REPLACE'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
   */
  copySourceTags?: BlobCopySourceTags;
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
}

/**
 * Options to configure the {@link BlobClient.setAccessTier} operation.
 */
export interface BlobSetTierOptions extends CommonOptions {
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
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   */
  rehydratePriority?: RehydratePriority;
}

/**
 * Option interface for the {@link BlobClient.downloadToBuffer} operation.
 */
export interface BlobDownloadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * blockSize is the data every request trying to download.
   * Must be greater than or equal to 0.
   * If set to 0 or undefined, blockSize will automatically calculated according to the blob size.
   */
  blockSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original block download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested block has been successfully downloaded or
   * maxRetryRequestsPerBlock is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   */
  maxRetryRequestsPerBlock?: number;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;

  /**
   * Concurrency of parallel download.
   */
  concurrency?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Contains response data for the {@link BlobClient.deleteIfExists} operation.
 */
export interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
  /**
   * Indicate whether the blob is successfully deleted. Is false if the blob does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link BlobClient.getProperties} operation.
 */
export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
  /**
   * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
   */
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];

  /**
   * Object Replication Policy Id of the destination blob.
   */
  objectReplicationDestinationPolicyId?: string;
}

/**
 * Common options of {@link BlobGenerateSasUrlOptions} and {@link ContainerGenerateSasUrlOptions}.
 */
export interface CommonGenerateSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;

  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
}

/**
 * Options to configure {@link BlobClient.generateSasUrl} operation.
 */
export interface BlobGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: BlobSASPermissions;
}

/**
 * Options for deleting immutability policy {@link BlobClient.deleteImmutabilityPolicy} operation.
 */
export interface BlobDeleteImmutabilityPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options for setting immutability policy {@link BlobClient.setImmutabilityPolicy} operation.
 */
export interface BlobSetImmutabilityPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  modifiedAccessCondition?: ModificationConditions;
}

/**
 * Options for setting legal hold {@link BlobClient.setLegalHold} operation.
 */
export interface BlobSetLegalHoldOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobClient.getAccountInfo} operation.
 */
export interface BlobGetAccountInfoOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * A BlobClient represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 */
export class BlobClient extends StorageClient {
  /**
   * blobContext provided by protocol layer.
   */
  private blobContext: StorageBlob;

  private _name: string;
  private _containerName: string;

  private _versionId?: string;
  private _snapshot?: string;

  /**
   * The name of the blob.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * The name of the storage container the blob is associated with.
   */
  public get containerName(): string {
    return this._containerName;
  }

  /**
   *
   * Creates an instance of BlobClient from connection string.
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
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
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
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
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
    options = options || {};
    let pipeline: PipelineLike;
    let url: string;
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
    ({ blobName: this._name, containerName: this._containerName } =
      this.getBlobAndContainerNamesFromUrl());
    this.blobContext = this.storageClientContext.blob;

    this._snapshot = getURLParameter(this.url, URLConstants.Parameters.SNAPSHOT) as string;
    this._versionId = getURLParameter(this.url, URLConstants.Parameters.VERSIONID) as string;
  }

  /**
   * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlobClient object identical to the source but with the specified snapshot timestamp
   */
  public withSnapshot(snapshot: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a new BlobClient object pointing to a version of this blob.
   * Provide "" will remove the versionId and return a Client to the base blob.
   *
   * @param versionId - The versionId.
   * @returns A new BlobClient object pointing to the version of this blob.
   */
  public withVersion(versionId: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.VERSIONID,
        versionId.length === 0 ? undefined : versionId,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a AppendBlobClient object.
   *
   */
  public getAppendBlobClient(): AppendBlobClient {
    return new AppendBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a BlockBlobClient object.
   *
   */
  public getBlockBlobClient(): BlockBlobClient {
    return new BlockBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a PageBlobClient object.
   *
   */
  public getPageBlobClient(): PageBlobClient {
    return new PageBlobClient(this.url, this.pipeline);
  }

  /**
   * Reads or downloads a blob from the system, including its metadata and properties.
   * You can also call Get Blob to read a snapshot.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/get-blob
   *
   * @param offset - From which position of the blob to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Optional options to Blob Download operation.
   *
   *
   * Example usage (Node.js):
   *
   * ```ts snippet:ReadmeSampleDownloadBlob_Node
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
   * const blobClient = containerClient.getBlobClient(blobName);
   *
   * // Get blob content from position 0 to the end
   * // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
   * const downloadBlockBlobResponse = await blobClient.download();
   * if (downloadBlockBlobResponse.readableStreamBody) {
   *   const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
   *   console.log(`Downloaded blob content: ${downloaded}`);
   * }
   *
   * async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
   *   const result = await new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
   *     const chunks: Buffer[] = [];
   *     stream.on("data", (data) => {
   *       chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
   *     });
   *     stream.on("end", () => {
   *       resolve(Buffer.concat(chunks));
   *     });
   *     stream.on("error", reject);
   *   });
   *   return result.toString();
   * }
   * ```
   *
   * Example usage (browser):
   *
   * ```ts snippet:ReadmeSampleDownloadBlob_Browser
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
   * const blobClient = containerClient.getBlobClient(blobName);
   *
   * // Get blob content from position 0 to the end
   * // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
   * const downloadBlockBlobResponse = await blobClient.download();
   * const blobBody = await downloadBlockBlobResponse.blobBody;
   * if (blobBody) {
   *   const downloaded = await blobBody.text();
   *   console.log(`Downloaded blob content: ${downloaded}`);
   * }
   * ```
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {},
  ): Promise<BlobDownloadResponseParsed> {
    options.conditions = options.conditions || {};
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return tracingClient.withSpan("BlobClient-download", options, async (updatedOptions) => {
      const res = assertResponse<BlobDownloadResponseInternal, BlobDownloadHeaders>(
        await this.blobContext.download({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onDownloadProgress: isNodeLike ? undefined : options.onProgress, // for Node.js, progress is reported by RetriableReadableStream
          },
          range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
          rangeGetContentMD5: options.rangeGetContentMD5,
          rangeGetContentCRC64: options.rangeGetContentCrc64,
          snapshot: options.snapshot,
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );

      const wrappedRes: BlobDownloadResponseParsed = {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules),
      };
      // Return browser response immediately
      if (!isNodeLike) {
        return wrappedRes;
      }

      // We support retrying when download stream unexpected ends in Node.js runtime
      // Following code shouldn't be bundled into browser build, however some
      // bundlers may try to bundle following code and "FileReadResponse.ts".
      // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
      // The config is in package.json "browser" field
      if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
        // TODO: Default value or make it a required parameter?
        options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
      }

      if (res.contentLength === undefined) {
        throw new RangeError(`File download response doesn't contain valid content length header`);
      }

      if (!res.etag) {
        throw new RangeError(`File download response doesn't contain valid etag header`);
      }

      return new BlobDownloadResponse(
        wrappedRes,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          const updatedDownloadOptions: BlobDownloadOptionalParams = {
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ifMatch: options.conditions!.ifMatch || res.etag,
              ifModifiedSince: options.conditions!.ifModifiedSince,
              ifNoneMatch: options.conditions!.ifNoneMatch,
              ifUnmodifiedSince: options.conditions!.ifUnmodifiedSince,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({
              count: offset + res.contentLength! - start,
              offset: start,
            }),
            rangeGetContentMD5: options.rangeGetContentMD5,
            rangeGetContentCRC64: options.rangeGetContentCrc64,
            snapshot: options.snapshot,
            cpkInfo: options.customerProvidedKey,
          };

          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     updatedOptions.range
          //   }, options: ${JSON.stringify(updatedOptions)}`
          // );

          return (
            await this.blobContext.download({
              abortSignal: options.abortSignal,
              ...updatedDownloadOptions,
            })
          ).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress,
        },
      );
    });
  }

  /**
   * Returns true if the Azure blob resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing blob might be deleted by other clients or
   * applications. Vice versa new blobs might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: BlobExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("BlobClient-exists", options, async (updatedOptions) => {
      try {
        ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
        await this.getProperties({
          abortSignal: options.abortSignal,
          customerProvidedKey: options.customerProvidedKey,
          conditions: options.conditions,
          tracingOptions: updatedOptions.tracingOptions,
        });
        return true;
      } catch (e: any) {
        if (e.statusCode === 404) {
          // Expected exception when checking blob existence
          return false;
        } else if (
          e.statusCode === 409 &&
          (e.details.errorCode === BlobUsesCustomerSpecifiedEncryptionMsg ||
            e.details.errorCode === BlobDoesNotUseCustomerSpecifiedEncryption)
        ) {
          // Expected exception when checking blob existence
          return true;
        }
        throw e;
      }
    });
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-blob-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the methods of {@link ContainerClient} that list blobs using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param options - Optional options to Get Properties operation.
   */
  public async getProperties(
    options: BlobGetPropertiesOptions = {},
  ): Promise<BlobGetPropertiesResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-getProperties", options, async (updatedOptions) => {
      const res = assertResponse<BlobGetPropertiesResponseInternal, BlobGetPropertiesHeaders>(
        await this.blobContext.getProperties({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );

      return {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules),
      };
    });
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  public async delete(options: BlobDeleteOptions = {}): Promise<BlobDeleteResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("BlobClient-delete", options, async (updatedOptions) => {
      return assertResponse<BlobDeleteHeaders, BlobDeleteHeaders>(
        await this.blobContext.delete({
          abortSignal: options.abortSignal,
          deleteSnapshots: options.deleteSnapshots,
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
   * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  public async deleteIfExists(
    options: BlobDeleteOptions = {},
  ): Promise<BlobDeleteIfExistsResponse> {
    return tracingClient.withSpan("BlobClient-deleteIfExists", options, async (updatedOptions) => {
      try {
        const res = assertResponse(await this.delete(updatedOptions));
        return {
          succeeded: true,
          ...res,
          _response: res._response, // _response is made non-enumerable
        };
      } catch (e: any) {
        if (e.details?.errorCode === "BlobNotFound") {
          return {
            succeeded: false,
            ...e.response?.parsedHeaders,
            _response: e.response,
          };
        }
        throw e;
      }
    });
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://learn.microsoft.com/rest/api/storageservices/undelete-blob
   *
   * @param options - Optional options to Blob Undelete operation.
   */
  public async undelete(options: BlobUndeleteOptions = {}): Promise<BlobUndeleteResponse> {
    return tracingClient.withSpan("BlobClient-undelete", options, async (updatedOptions) => {
      return assertResponse<BlobUndeleteHeaders, BlobUndeleteHeaders>(
        await this.blobContext.undelete({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specified blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param blobHTTPHeaders - If no value provided, or no value provided for
   *                                                   the specified blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   *                                                   A common header to set is `blobContentType`
   *                                                   enabling the browser to provide functionality
   *                                                   based on file type.
   * @param options - Optional options to Blob Set HTTP Headers operation.
   */
  public async setHTTPHeaders(
    blobHTTPHeaders?: BlobHTTPHeaders,
    options: BlobSetHTTPHeadersOptions = {},
  ): Promise<BlobSetHTTPHeadersResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-setHTTPHeaders", options, async (updatedOptions) => {
      return assertResponse<BlobSetHttpHeadersHeaders, BlobSetHttpHeadersHeaders>(
        await this.blobContext.setHttpHeaders({
          abortSignal: options.abortSignal,
          blobHttpHeaders: blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          // cpkInfo: options.customerProvidedKey, // CPK is not included in Swagger, should change this back when this issue is fixed in Swagger.
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the blob
   * metadata will be removed.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-metadata
   *
   * @param metadata - Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param options - Optional options to Set Metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: BlobSetMetadataOptions = {},
  ): Promise<BlobSetMetadataResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-setMetadata", options, async (updatedOptions) => {
      return assertResponse<BlobSetMetadataHeaders, BlobSetMetadataHeaders>(
        await this.blobContext.setMetadata({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets tags on the underlying blob.
   * A blob can have up to 10 tags. Tag keys must be between 1 and 128 characters.  Tag values must be between 0 and 256 characters.
   * Valid tag key and value characters include lower and upper case letters, digits (0-9),
   * space (' '), plus ('+'), minus ('-'), period ('.'), foward slash ('/'), colon (':'), equals ('='), and underscore ('_').
   *
   * @param tags -
   * @param options -
   */
  public async setTags(tags: Tags, options: BlobSetTagsOptions = {}): Promise<BlobSetTagsResponse> {
    return tracingClient.withSpan("BlobClient-setTags", options, async (updatedOptions) => {
      return assertResponse<BlobSetTagsHeaders, BlobSetTagsHeaders>(
        await this.blobContext.setTags({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
          tags: toBlobTags(tags),
        }),
      );
    });
  }

  /**
   * Gets the tags associated with the underlying blob.
   *
   * @param options -
   */
  public async getTags(options: BlobGetTagsOptions = {}): Promise<BlobGetTagsResponse> {
    return tracingClient.withSpan("BlobClient-getTags", options, async (updatedOptions) => {
      const response = assertResponse<BlobGetTagsResponseInternal, BlobGetTagsHeaders, BlobTags>(
        await this.blobContext.getTags({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
      const wrappedResponse: BlobGetTagsResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        tags: toTags({ blobTagSet: response.blobTagSet }) || {},
      };
      return wrappedResponse;
    });
  }

  /**
   * Get a {@link BlobLeaseClient} that manages leases on the blob.
   *
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new BlobLeaseClient object for managing leases on the blob.
   */
  public getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient {
    return new BlobLeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/snapshot-blob
   *
   * @param options - Optional options to the Blob Create Snapshot operation.
   */
  public async createSnapshot(
    options: BlobCreateSnapshotOptions = {},
  ): Promise<BlobCreateSnapshotResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-createSnapshot", options, async (updatedOptions) => {
      return assertResponse<BlobCreateSnapshotHeaders, BlobCreateSnapshotHeaders>(
        await this.blobContext.createSnapshot({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Asynchronously copies a blob to a destination within the storage account.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob
   *
   * ```ts snippet:ClientsBeginCopyFromURL
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
   * const blobClient = containerClient.getBlobClient(blobName);
   *
   * // Example using automatic polling
   * const automaticCopyPoller = await blobClient.beginCopyFromURL("url");
   * const automaticResult = await automaticCopyPoller.pollUntilDone();
   *
   * // Example using manual polling
   * const manualCopyPoller = await blobClient.beginCopyFromURL("url");
   * while (!manualCopyPoller.isDone()) {
   *   await manualCopyPoller.poll();
   * }
   * const manualResult = manualCopyPoller.getResult();
   *
   * // Example using progress updates
   * const progressUpdatesCopyPoller = await blobClient.beginCopyFromURL("url", {
   *   onProgress(state) {
   *     console.log(`Progress: ${state.copyProgress}`);
   *   },
   * });
   * const progressUpdatesResult = await progressUpdatesCopyPoller.pollUntilDone();
   *
   * // Example using a changing polling interval (default 15 seconds)
   * const pollingIntervalCopyPoller = await blobClient.beginCopyFromURL("url", {
   *   intervalInMs: 1000, // poll blob every 1 second for copy progress
   * });
   * const pollingIntervalResult = await pollingIntervalCopyPoller.pollUntilDone();
   *
   * // Example using copy cancellation:
   * const cancelCopyPoller = await blobClient.beginCopyFromURL("url");
   * // cancel operation after starting it.
   * try {
   *   await cancelCopyPoller.cancelOperation();
   *   // calls to get the result now throw PollerCancelledError
   *   cancelCopyPoller.getResult();
   * } catch (err: any) {
   *   if (err.name === "PollerCancelledError") {
   *     console.log("The copy was cancelled.");
   *   }
   * }
   * ```
   *
   * @param copySource - url to the source Azure Blob/File.
   * @param options - Optional options to the Blob Start Copy From URL operation.
   */
  public async beginCopyFromURL(
    copySource: string,
    options: BlobBeginCopyFromURLOptions = {},
  ): Promise<
    PollerLikeWithCancellation<
      PollOperationState<BlobBeginCopyFromURLResponse>,
      BlobBeginCopyFromURLResponse
    >
  > {
    const client: CopyPollerBlobClient = {
      abortCopyFromURL: (...args) => this.abortCopyFromURL(...args),
      getProperties: (...args) => this.getProperties(...args),
      startCopyFromURL: (...args) => this.startCopyFromURL(...args),
    };
    const poller = new BlobBeginCopyFromUrlPoller({
      blobClient: client,
      copySource,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      startCopyFromURLOptions: options,
    });

    // Trigger the startCopyFromURL call by calling poll.
    // Any errors from this method should be surfaced to the user.
    await poller.poll();

    return poller;
  }

  /**
   * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob
   *
   * @param copyId - Id of the Copy From URL operation.
   * @param options - Optional options to the Blob Abort Copy From URL operation.
   */
  public async abortCopyFromURL(
    copyId: string,
    options: BlobAbortCopyFromURLOptions = {},
  ): Promise<BlobAbortCopyFromURLResponse> {
    return tracingClient.withSpan(
      "BlobClient-abortCopyFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlobAbortCopyFromURLHeaders, BlobAbortCopyFromURLHeaders>(
          await this.blobContext.abortCopyFromURL(copyId, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob-from-url
   *
   * @param copySource - The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param options -
   */
  public async syncCopyFromURL(
    copySource: string,
    options: BlobSyncCopyFromURLOptions = {},
  ): Promise<BlobCopyFromURLResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    return tracingClient.withSpan("BlobClient-syncCopyFromURL", options, async (updatedOptions) => {
      return assertResponse<BlobCopyFromURLHeaders, BlobCopyFromURLHeaders>(
        await this.blobContext.copyFromURL(copySource, {
          abortSignal: options.abortSignal,
          metadata: options.metadata,
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
          },
          sourceContentMD5: options.sourceContentMD5,
          copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          encryptionScope: options.encryptionScope,
          copySourceTags: options.copySourceTags,
          fileRequestIntent: options.sourceShareTokenIntent,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-tier
   *
   * @param tier - The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
   * @param options - Optional options to the Blob Set Tier operation.
   */
  public async setAccessTier(
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options: BlobSetTierOptions = {},
  ): Promise<BlobSetTierResponse> {
    return tracingClient.withSpan("BlobClient-setAccessTier", options, async (updatedOptions) => {
      return assertResponse<BlobSetTierHeaders, BlobSetTierHeaders>(
        await this.blobContext.setTier(toAccessTier(tier)!, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          rehydratePriority: options.rehydratePriority,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  // High level function

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob in parallel to a buffer.
   * Offset and count are optional, downloads the entire blob if they are not provided.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param offset - From which position of the block blob to download(in bytes)
   * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param options - BlobDownloadToBufferOptions
   */
  public async downloadToBuffer(
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions,
  ): Promise<Buffer>;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob in parallel to a buffer.
   * Offset and count are optional, downloads the entire blob if they are not provided.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param buffer - Buffer to be fill, must have length larger than count
   * @param offset - From which position of the block blob to download(in bytes)
   * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param options - BlobDownloadToBufferOptions
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions,
  ): Promise<Buffer>;

  public async downloadToBuffer(
    param1?: Buffer | number,
    param2?: number,
    param3?: BlobDownloadToBufferOptions | number,
    param4: BlobDownloadToBufferOptions = {},
  ): Promise<Buffer | undefined> {
    let buffer: Buffer | undefined;
    let offset = 0;
    let count = 0;
    let options = param4;
    if (param1 instanceof Buffer) {
      buffer = param1;
      offset = param2 || 0;
      count = typeof param3 === "number" ? param3 : 0;
    } else {
      offset = typeof param1 === "number" ? param1 : 0;
      count = typeof param2 === "number" ? param2 : 0;
      options = (param3 as BlobDownloadToBufferOptions) || {};
    }

    let blockSize = options.blockSize ?? 0;

    if (blockSize < 0) {
      throw new RangeError("blockSize option must be >= 0");
    }
    if (blockSize === 0) {
      blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
    }

    if (offset < 0) {
      throw new RangeError("offset option must be >= 0");
    }

    if (count && count <= 0) {
      throw new RangeError("count option must be greater than 0");
    }

    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlobClient-downloadToBuffer",
      options,
      async (updatedOptions) => {
        // Customer doesn't specify length, get it
        if (!count) {
          const response = await this.getProperties({
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          });
          count = response.contentLength! - offset;
          if (count < 0) {
            throw new RangeError(
              `offset ${offset} shouldn't be larger than blob size ${response.contentLength!}`,
            );
          }
        }

        // Allocate the buffer of size = count if the buffer is not provided
        if (!buffer) {
          try {
            buffer = Buffer.alloc(count);
          } catch (error: any) {
            throw new Error(
              `Unable to allocate the buffer of size: ${count}(in bytes). Please try passing your own buffer to the "downloadToBuffer" method or try using other methods like "download" or "downloadToFile".\t ${error.message}`,
            );
          }
        }

        if (buffer.length < count) {
          throw new RangeError(
            `The buffer's size should be equal to or larger than the request count of bytes: ${count}`,
          );
        }

        let transferProgress: number = 0;
        const batch = new Batch(options.concurrency);
        for (let off = offset; off < offset + count; off = off + blockSize) {
          batch.addOperation(async () => {
            // Exclusive chunk end position
            let chunkEnd = offset + count!;
            if (off + blockSize < chunkEnd) {
              chunkEnd = off + blockSize;
            }
            const response = await this.download(off, chunkEnd - off, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              maxRetryRequests: options.maxRetryRequestsPerBlock,
              customerProvidedKey: options.customerProvidedKey,
              tracingOptions: updatedOptions.tracingOptions,
            });
            const stream = response.readableStreamBody!;
            await streamToBuffer(stream, buffer!, off - offset, chunkEnd - offset);
            // Update progress after block is downloaded, in case of block trying
            // Could provide finer grained progress updating inside HTTP requests,
            // only if convenience layer download try is enabled
            transferProgress += chunkEnd - off;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          });
        }
        await batch.do();
        return buffer;
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param filePath -
   * @param offset - From which position of the block blob to download.
   * @param count - How much data to be downloaded. Will download to the end when passing undefined.
   * @param options - Options to Blob download options.
   * @returns The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   */
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {},
  ): Promise<BlobDownloadResponseParsed> {
    return tracingClient.withSpan("BlobClient-downloadToFile", options, async (updatedOptions) => {
      const response = await this.download(offset, count, {
        ...options,
        tracingOptions: updatedOptions.tracingOptions,
      });
      if (response.readableStreamBody) {
        await readStreamToLocalFile(response.readableStreamBody, filePath);
      }

      // The stream is no longer accessible so setting it to undefined.
      (response as any).blobDownloadStream = undefined;
      return response;
    });
  }

  private getBlobAndContainerNamesFromUrl(): { blobName: string; containerName: string } {
    let containerName;
    let blobName;
    try {
      //  URL may look like the following
      // "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob/a.txt?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob/a.txt";
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10000/devstoreaccount1/containername/blob`
      // http://localhost:10001/devstoreaccount1/containername/blob

      const parsedUrl = new URL(this.url);

      if (parsedUrl.host.split(".")[1] === "blob") {
        // "https://myaccount.blob.core.windows.net/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/containername/blob
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/containername/blob
        // .getPath() -> /devstoreaccount1/containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)/([^/]*)(/(.*))?");
        containerName = pathComponents![2];
        blobName = pathComponents![4];
      } else {
        // "https://customdomain.com/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      }

      // decode the encoded blobName, containerName - to get all the special characters that might be present in them
      containerName = decodeURIComponent(containerName);
      blobName = decodeURIComponent(blobName);

      // Azure Storage Server will replace "\" with "/" in the blob names
      //   doing the same in the SDK side so that the user doesn't have to replace "\" instances in the blobName
      blobName = blobName.replace(/\\/g, "/");

      if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return { blobName, containerName };
    } catch (error: any) {
      throw new Error("Unable to extract blobName and containerName with provided information.");
    }
  }

  /**
   * Asynchronously copies a blob to a destination within the storage account.
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob
   *
   * @param copySource - url to the source Azure Blob/File.
   * @param options - Optional options to the Blob Start Copy From URL operation.
   */
  private async startCopyFromURL(
    copySource: string,
    options: BlobStartCopyFromURLOptions = {},
  ): Promise<BlobStartCopyFromURLResponse> {
    return tracingClient.withSpan(
      "BlobClient-startCopyFromURL",
      options,
      async (updatedOptions) => {
        options.conditions = options.conditions || {};
        options.sourceConditions = options.sourceConditions || {};
        return assertResponse<BlobStartCopyFromURLHeaders, BlobStartCopyFromURLHeaders>(
          await this.blobContext.startCopyFromURL(copySource, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            metadata: options.metadata,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions.ifMatch,
              sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince,
              sourceIfTags: options.sourceConditions.tagConditions,
            },
            immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
            immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
            legalHold: options.legalHold,
            rehydratePriority: options.rehydratePriority,
            tier: toAccessTier(options.tier),
            blobTagsString: toBlobTagsString(options.tags),
            sealBlob: options.sealBlob,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates a Blob Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw new RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential",
        );
      }

      const sas = generateBlobSASQueryParameters(
        {
          containerName: this._containerName,
          blobName: this._name,
          snapshotTime: this._snapshot,
          versionId: this._versionId,
          ...options,
        },
        this.credential,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
  public generateSasStringToSign(options: BlobGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw new RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    return generateBlobSASQueryParametersInternal(
      {
        containerName: this._containerName,
        blobName: this._name,
        snapshotTime: this._snapshot,
        versionId: this._versionId,
        ...options,
      },
      this.credential,
    ).stringToSign;
  }

  /**
   *
   * Generates a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateUserDelegationSasUrl(
    options: BlobGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): Promise<string> {
    return new Promise((resolve) => {
      const sas = generateBlobSASQueryParameters(
        {
          containerName: this._containerName,
          blobName: this._name,
          snapshotTime: this._snapshot,
          versionId: this._versionId,
          ...options,
        },
        userDelegationKey,
        this.accountName,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */

  public generateUserDelegationSasStringToSign(
    options: BlobGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): string {
    return generateBlobSASQueryParametersInternal(
      {
        containerName: this._containerName,
        blobName: this._name,
        snapshotTime: this._snapshot,
        versionId: this._versionId,
        ...options,
      },
      userDelegationKey,
      this.accountName,
    ).stringToSign;
  }

  /**
   * Delete the immutablility policy on the blob.
   *
   * @param options - Optional options to delete immutability policy on the blob.
   */
  public async deleteImmutabilityPolicy(
    options: BlobDeleteImmutabilityPolicyOptions = {},
  ): Promise<BlobDeleteImmutabilityPolicyResponse> {
    return tracingClient.withSpan(
      "BlobClient-deleteImmutabilityPolicy",
      options,
      async (updatedOptions) => {
        return assertResponse<
          BlobDeleteImmutabilityPolicyHeaders,
          BlobDeleteImmutabilityPolicyHeaders
        >(
          await this.blobContext.deleteImmutabilityPolicy({
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Set immutability policy on the blob.
   *
   * @param options - Optional options to set immutability policy on the blob.
   */
  public async setImmutabilityPolicy(
    immutabilityPolicy: BlobImmutabilityPolicy,
    options: BlobSetImmutabilityPolicyOptions = {},
  ): Promise<BlobSetImmutabilityPolicyResponse> {
    return tracingClient.withSpan(
      "BlobClient-setImmutabilityPolicy",
      options,
      async (updatedOptions) => {
        return assertResponse<BlobSetImmutabilityPolicyHeaders, BlobSetImmutabilityPolicyHeaders>(
          await this.blobContext.setImmutabilityPolicy({
            immutabilityPolicyExpiry: immutabilityPolicy.expiriesOn,
            immutabilityPolicyMode: immutabilityPolicy.policyMode,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Set legal hold on the blob.
   *
   * @param options - Optional options to set legal hold on the blob.
   */
  public async setLegalHold(
    legalHoldEnabled: boolean,
    options: BlobSetLegalHoldOptions = {},
  ): Promise<BlobSetLegalHoldResponse> {
    return tracingClient.withSpan("BlobClient-setLegalHold", options, async (updatedOptions) => {
      return assertResponse<BlobSetLegalHoldHeaders, BlobSetLegalHoldHeaders>(
        await this.blobContext.setLegalHold(legalHoldEnabled, {
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-account-information
   *
   * @param options - Options to the Service Get Account Info operation.
   * @returns Response data for the Service Get Account Info operation.
   */
  public async getAccountInfo(
    options: BlobGetAccountInfoOptions = {},
  ): Promise<BlobGetAccountInfoResponse> {
    return tracingClient.withSpan("BlobClient-getAccountInfo", options, async (updatedOptions) => {
      return assertResponse<BlobGetAccountInfoHeaders, BlobGetAccountInfoHeaders>(
        await this.blobContext.getAccountInfo({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }
}
