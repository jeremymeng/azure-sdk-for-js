// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Tags } from "./index.js";
import type { BlobPropertiesInternal as BlobProperties } from "./generated/src/models/index.js";
import {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDownloadResponse as BlobDownloadResponseInternal,
  BlobDownloadHeaders,
  BlobGetPropertiesHeaders,
  BlobGetTagsHeaders,
  BlobTags,
  BlobQueryResponse as BlobQueryResponseInternal,
  BlobQueryHeaders,
  BlobSetHttpHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockBlobGetBlockListResponse as BlockBlobGetBlockListResponseInternal,
  BlockBlobGetBlockListHeaders,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  BlockBlobUploadHeaders,
  ContainerCreateHeaders,
  ContainerDeleteHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesHeaders,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameHeaders,
  ContainerSetAccessPolicyHeaders,
  ContainerSetMetadataHeaders,
  ContainerRestoreHeaders as ContainerUndeleteHeaders,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
  PageList,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesResponse as ServiceGetPropertiesResponseInternal,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsResponse as ServiceGetStatisticsResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentResponse as ServiceListContainersSegmentResponseInternal,
  ServiceListContainersSegmentHeaders,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchResponse as ServiceSubmitBatchResponseInternal,
  ServiceSubmitBatchHeaders,
  SignedIdentifier as SignedIdentifierModel,
  UserDelegationKey as UserDelegationKeyModel,
  PageRange,
  BlobGetAccountInfoHeaders,
  ContainerGetAccountInfoHeaders,
} from "./generated-compat/src/models/index.js";
import {
//  HttpResponse,
} from "./utils/utils.common.js";

export {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobDownloadHeaders,
  BlobDownloadResponseInternal,
  BlobGetAccountInfoHeaders,
  BlobGetPropertiesHeaders,
  BlobGetTagsHeaders,
  BlobTags,
  BlobQueryHeaders,
  BlobQueryResponseInternal,
  BlobSetHttpHeadersHeaders as BlobSetHTTPHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockBlobGetBlockListHeaders,
  BlockBlobGetBlockListResponseInternal,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  BlockBlobUploadHeaders,
  ContainerCreateHeaders,
  ContainerDeleteHeaders,
  ContainerGetAccessPolicyHeaders,
  ContainerGetAccountInfoHeaders,
  ContainerGetPropertiesHeaders,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerRenameHeaders,
  ContainerSetAccessPolicyHeaders,
  ContainerSetMetadataHeaders,
  ContainerUndeleteHeaders,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesResponseInternal,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
  PageList as PageListInternal,
  ServiceGetAccountInfoHeaders,
  ServiceGetPropertiesHeaders,
  ServiceGetPropertiesResponseInternal,
  ServiceGetStatisticsHeaders,
  ServiceGetStatisticsResponseInternal,
  ServiceGetUserDelegationKeyHeaders,
  ServiceListContainersSegmentHeaders,
  ServiceListContainersSegmentResponseInternal,
  ServiceSetPropertiesHeaders,
  ServiceSubmitBatchHeaders,
  ServiceSubmitBatchResponseInternal,
  SignedIdentifierModel,
  UserDelegationKeyModel,
  PageRange,
};

export {
  AccessPolicy,
  AccessTier,
  AccountKind,
  ArchiveStatus,
  BlobImmutabilityPolicyMode,
  BlobCopySourceTags,
  BlobDownloadOptionalParams,
  BlobPropertiesInternal as BlobProperties,
  BlobHttpHeaders as BlobHTTPHeaders,
  BlobType,
  Block,
  BlockList,
  BlockListType,
  BlobServiceProperties,
  BlobServiceStatistics,
  BlobTag,
  ContainerFilterBlobsResponse,
  ContainerFilterBlobsHeaders,
  ContainerGetAccessPolicyResponse as ContainerGetAccessPolicyResponseModel,
  ContainerBreakLeaseOptionalParams,
  ContainerProperties,
  CopyStatusType,
  CorsRule,
  ClearRange,
  CpkInfo,
  DeleteSnapshotsOptionType,
  EncryptionAlgorithmType,
  GeoReplication,
  GeoReplicationStatusType,
  LeaseAccessConditions,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  ListContainersSegmentResponse,
  FilterBlobItem as FilterBlobItemModel,
  FilterBlobSegment as FilterBlobSegmentModel,
  FileShareTokenIntent,
  ServiceFilterBlobsHeaders,
  Logging,
  Metrics,
  ModifiedAccessConditions as ModifiedAccessConditionsModel,
  BlobModifiedAccessConditions,
  PublicAccessType,
  SequenceNumberActionType,
  RehydratePriority,
  RetentionPolicy,
  AppendPositionAccessConditions,
  SequenceNumberAccessConditions,
  SkuName,
  StaticWebsite,
  ContainerItem,
  ServiceSubmitBatchOptionalParams as ServiceSubmitBatchOptionalParamsModel,
  ContainerEncryptionScope,
  SyncCopyStatusType,
} from "./generated-compat/src/models/index.js";

// Following definitions are to avoid breaking change.
export interface BlobPrefix {
  name: string;
}

/** An enumeration of blobs */
export interface ListBlobsFlatSegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegmentModel;
  continuationToken?: string;
}

export interface BlobFlatListSegmentModel {
  blobItems: BlobItemInternal[];
}

/** An enumeration of blobs */
export interface ListBlobsHierarchySegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegmentModel;
  continuationToken?: string;
}

export interface BlobHierarchyListSegmentModel {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItemInternal[];
}

/** An Azure Storage blob */
export interface BlobItemInternal {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  /** Properties of a blob */
  properties: BlobProperties;
  /** Dictionary of <string> */
  metadata?: { [propertyName: string]: string };
  /** Blob tags */
  blobTags?: BlobTags;
  /** Dictionary of <string> */
  objectReplicationMetadata?: { [propertyName: string]: string };
  /** Inactive root blobs which have any versions would have such tag with value true. */
  hasVersionsOnly?: boolean;
}

/**
 * Blob info from a {@link BlobServiceClient.findBlobsByTags}
 */
export interface FilterBlobItem {
  /**
   * Blob Name.
   */
  name: string;

  /**
   * Container Name.
   */
  containerName: string;

  /**
   * Blob Tags.
   */
  tags?: Tags;

  /**
   * Tag value.
   *
   * @deprecated The service no longer returns this value. Use {@link tags} to fetch all matching Blob Tags.
   */
  tagValue: string;
}

/**
 * Segment response of {@link BlobServiceClient.findBlobsByTags} operation.
 */
export interface FilterBlobSegment {
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItem[];
  continuationToken?: string;
}

export interface PageRangeInfo {
  start: number;
  end: number;
  isClear: boolean;
}

/** Known values of {@link EncryptionAlgorithmType} that the service accepts. */
export enum KnownEncryptionAlgorithmType {
  AES256 = "AES256",
}
