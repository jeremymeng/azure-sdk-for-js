// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FileContents,
  createFilePartDescriptor,
} from "../../../../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../../../../static-helpers/serialization/serialize-record.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The service properties. */
export interface StorageServiceProperties {
  /** The logging properties. */
  blobAnalyticsLogging?: Logging;
  /** The hour metrics properties. */
  hourMetrics?: Metrics;
  /** The minute metrics properties. */
  minuteMetrics?: Metrics;
  /** The CORS properties. */
  cors?: CorsRule[];
  /** The default service version. */
  defaultServiceVersion?: string;
  /** The delete retention policy. */
  deleteRetentionPolicy?: RetentionPolicy;
  /** The static website properties. */
  staticWebsite?: StaticWebsite;
}

export function storageServicePropertiesSerializer(item: StorageServiceProperties): any {
  return {
    blobAnalyticsLogging: !item["blobAnalyticsLogging"]
      ? item["blobAnalyticsLogging"]
      : loggingSerializer(item["blobAnalyticsLogging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsSerializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsSerializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArraySerializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : retentionPolicySerializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteSerializer(item["staticWebsite"]),
  };
}

export function storageServicePropertiesDeserializer(item: any): StorageServiceProperties {
  return {
    blobAnalyticsLogging: !item["blobAnalyticsLogging"]
      ? item["blobAnalyticsLogging"]
      : loggingDeserializer(item["blobAnalyticsLogging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsDeserializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsDeserializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArrayDeserializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : retentionPolicyDeserializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteDeserializer(item["staticWebsite"]),
  };
}

/** Azure Analytics Logging settings. */
export interface Logging {
  /** The version of the logging properties. */
  version: string;
  /** Whether delete operation is logged. */
  delete: boolean;
  /** Whether read operation is logged. */
  read: boolean;
  /** Whether write operation is logged. */
  write: boolean;
  /** The retention policy of the logs. */
  retentionPolicy: RetentionPolicy;
}

export function loggingSerializer(item: Logging): any {
  return {
    version: item["version"],
    delete: item["delete"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function loggingDeserializer(item: any): Logging {
  return {
    version: item["version"],
    delete: item["delete"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** The retention policy. */
export interface RetentionPolicy {
  /** Whether to enable the retention policy. */
  enabled: boolean;
  /** The number of days to retain the logs. */
  days?: number;
  /** Whether to allow permanent delete. */
  allowPermanentDelete?: boolean;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

/** The metrics properties. */
export interface Metrics {
  /** The version of the metrics properties. */
  version?: string;
  /** Whether it is enabled. */
  enabled: boolean;
  /** Whether to include API in the metrics. */
  includeApis?: boolean;
  /** The retention policy of the metrics. */
  retentionPolicy?: RetentionPolicy;
}

export function metricsSerializer(item: Metrics): any {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeApis: item["includeApis"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricsDeserializer(item: any): Metrics {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeApis: item["includeApis"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function corsRuleArraySerializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleSerializer(item);
  });
}

export function corsRuleArrayDeserializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleDeserializer(item);
  });
}

/** CORS is an HTTP feature that enables a web application running under one domain to access resources in another domain. Web browsers implement a security restriction known as same-origin policy that prevents a web page from calling APIs in a different domain; CORS provides a secure way to allow one domain (the origin domain) to call APIs in another domain */
export interface CorsRule {
  /** The allowed origins. */
  allowedOrigins: string;
  /** The allowed methods. */
  allowedMethods: string;
  /** The allowed headers. */
  allowedHeaders: string;
  /** The exposed headers. */
  exposedHeaders: string;
  /** The maximum age in seconds. */
  maxAgeInSeconds: number;
}

export function corsRuleSerializer(item: CorsRule): any {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsRuleDeserializer(item: any): CorsRule {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

/** The properties that enable an account to host a static website */
export interface StaticWebsite {
  /** Indicates whether this account is hosting a static website */
  enabled: boolean;
  /** The index document. */
  indexDocument?: string;
  /** The error document. */
  errorDocument404Path?: string;
  /** Absolute path of the default index page */
  defaultIndexDocumentPath?: string;
}

export function staticWebsiteSerializer(item: StaticWebsite): any {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    errorDocument404Path: item["errorDocument404Path"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
  };
}

export function staticWebsiteDeserializer(item: any): StaticWebsite {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    errorDocument404Path: item["errorDocument404Path"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
  };
}

/** The error response. */
export interface StorageError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** Copy source status code */
  copySourceStatusCode?: number;
  /** Copy source error code */
  copySourceErrorCode?: string;
  /** Copy source error message */
  copySourceErrorMessage?: string;
}

export function storageErrorDeserializer(item: any): StorageError {
  return {
    code: item["code"],
    message: item["message"],
    copySourceStatusCode: item["copySourceStatusCode"],
    copySourceErrorCode: item["copySourceErrorCode"],
    copySourceErrorMessage: item["copySourceErrorMessage"],
  };
}

/** Stats for the storage service. */
export interface StorageServiceStats {
  /** The geo replication stats. */
  geoReplication?: GeoReplication;
}

export function storageServiceStatsDeserializer(item: any): StorageServiceStats {
  return {
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : geoReplicationDeserializer(item["geoReplication"]),
  };
}

/** Geo-Replication information for the Secondary Storage Service */
export interface GeoReplication {
  /** The status of the secondary location */
  status: GeoReplicationStatusType;
  /** A GMT date/time value, to the second. All primary writes preceding this value are guaranteed to be available for read operations at the secondary. Primary writes after this point in time may or may not be available for reads. */
  lastSyncOn: Date;
}

export function geoReplicationDeserializer(item: any): GeoReplication {
  return {
    status: item["status"],
    lastSyncOn: new Date(item["lastSyncOn"]),
  };
}

/** The geo replication status. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";

/** The list container segment response */
export interface _ListContainersSegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The prefix of the containers. */
  prefix?: string;
  /** The marker of the containers. */
  marker?: string;
  /** The max results of the containers. */
  maxResults?: number;
  /** The container segment. */
  containerItems: ContainerItem[];
  /** The next marker of the containers. */
  nextMarker?: string;
}

export function _listContainersSegmentResponseDeserializer(
  item: any,
): _ListContainersSegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    containerItems: containerItemArrayDeserializer(item["containerItems"]),
    nextMarker: item["NextMarker"],
  };
}

export function containerItemArrayDeserializer(result: Array<ContainerItem>): any[] {
  return result.map((item) => {
    return containerItemDeserializer(item);
  });
}

/** An Azure Storage container. */
export interface ContainerItem {
  /** The name of the container. */
  name: string;
  /** Whether the container is deleted. */
  delete?: boolean;
  /** The version of the container. */
  version?: string;
  /** The properties of the container. */
  properties: ContainerProperties;
  /** The metadata of the container. */
  metadata?: Record<string, string>;
}

export function containerItemDeserializer(item: any): ContainerItem {
  return {
    name: item["name"],
    delete: item["delete"],
    version: item["version"],
    properties: containerPropertiesDeserializer(item["properties"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of a container. */
export interface ContainerProperties {
  /** The date-time the container was last modified in RFC1123 format. */
  lastModified: Date;
  /** The ETag of the container. */
  eTag: string;
  /** The lease status of the container. */
  leaseStatus?: LeaseStatus;
  /** The lease state of the container. */
  leaseState?: LeaseState;
  /** The lease duration of the container. */
  leaseDuration?: LeaseDuration;
  /** The public access type of the container. */
  publicAccess?: PublicAccessType;
  /** Whether it has an immutability policy. */
  hasImmutabilityPolicy?: boolean;
  /** The has legal hold status of the container. */
  hasLegalHold?: boolean;
  /** The default encryption scope of the container. */
  defaultEncryptionScope?: string;
  /** Whether to prevent encryption scope override. */
  preventEncryptionScopeOverride?: boolean;
  /** The deleted time of the container. */
  deletedOn?: Date;
  /** The remaining retention days of the container. */
  remainingRetentionDays?: number;
  /** Whether immutable storage with versioning is enabled. */
  isImmutableStorageWithVersioningEnabled?: boolean;
}

export function containerPropertiesDeserializer(item: any): ContainerProperties {
  return {
    lastModified: new Date(item["lastModified"]),
    eTag: item["eTag"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    publicAccess: item["publicAccess"],
    hasImmutabilityPolicy: item["hasImmutabilityPolicy"],
    hasLegalHold: item["hasLegalHold"],
    defaultEncryptionScope: item["defaultEncryptionScope"],
    preventEncryptionScopeOverride: item["PreventEncryptionScopeOverride"],
    deletedOn: !item["deletedOn"] ? item["deletedOn"] : new Date(item["deletedOn"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    isImmutableStorageWithVersioningEnabled: item["IsImmutableStorageWithVersioningEnabled"],
  };
}

/** The lease status. */
export type LeaseStatus = "unlocked" | "locked";
/** The lease state. */
export type LeaseState = "available" | "leased" | "expired" | "breaking" | "broken";
/** The lease duration. */
export type LeaseDuration = "infinite" | "fixed";
/** The public access types. */
export type PublicAccessType = "blob" | "container";

/** Key information */
export interface KeyInfo {
  /** The date-time the key is active. */
  startsOn: string;
  /** The date-time the key expires. */
  expiresOn: string;
  /** The delegated user tenant id in Azure AD. */
  delegatedUserTid?: string;
}

export function keyInfoSerializer(item: KeyInfo): any {
  return {
    startsOn: item["startsOn"],
    expiresOn: item["expiresOn"],
    delegatedUserTid: item["delegatedUserTid"],
  };
}

/** A user delegation key. */
export interface UserDelegationKey {
  /** The Azure Active Directory object ID in GUID format. */
  signedObjectId: string;
  /** The Azure Active Directory tenant ID in GUID format. */
  signedTenantId: string;
  /** The date-time the key is active. */
  signedStartsOn: string;
  /** The date-time the key expires. */
  signedExpiresOn: string;
  /** Abbreviation of the Azure Storage service that accepts the key. */
  signedService: string;
  /** The service version that created the key. */
  signedVersion: string;
  /** The delegated user tenant id in Azure AD. Return if DelegatedUserTid is specified. */
  signedDelegatedUserTid?: string;
  /** The key as a base64 string. */
  value: Uint8Array;
}

export function userDelegationKeyDeserializer(item: any): UserDelegationKey {
  return {
    signedObjectId: item["signedObjectId"],
    signedTenantId: item["signedTenantId"],
    signedStartsOn: item["signedStartsOn"],
    signedExpiresOn: item["signedExpiresOn"],
    signedService: item["signedService"],
    signedVersion: item["signedVersion"],
    signedDelegatedUserTid: item["signedDelegatedUserTid"],
    value:
      typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** model interface _SubmitBatchRequest */
export interface _SubmitBatchRequest {
  name: string;
  body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function _submitBatchRequestSerializer(item: _SubmitBatchRequest): any {
  return [
    { name: "name", body: item["name"] },
    createFilePartDescriptor("body", item["body"], "application/octet-stream"),
  ];
}

export function _submitBatchRequestDeserializer(item: any): _SubmitBatchRequest {
  return {
    name: item["name"],
    body:
      typeof item["body"] === "string" ? stringToUint8Array(item["body"], "base64") : item["body"],
  };
}

/** The result of a Filter Blobs API call */
export interface FilterBlobSegment {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The filter for the blobs. */
  where: string;
  /** The blob segment. */
  blobs: FilterBlobItem[];
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function filterBlobSegmentDeserializer(item: any): FilterBlobSegment {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    where: item["where"],
    blobs: filterBlobItemArrayDeserializer(item["blobs"]),
    nextMarker: item["nextMarker"],
  };
}

export function filterBlobItemArrayDeserializer(result: Array<FilterBlobItem>): any[] {
  return result.map((item) => {
    return filterBlobItemDeserializer(item);
  });
}

/** The filter blob item. */
export interface FilterBlobItem {
  /** The name of the blob. */
  name: string;
  /** The properties of the blob. */
  containerName: string;
  /** The metadata of the blob. */
  tags?: BlobTags;
  /** The version ID of the blob. */
  versionId?: string;
  /** Whether it is the current version of the blob */
  isCurrentVersion?: boolean;
}

export function filterBlobItemDeserializer(item: any): FilterBlobItem {
  return {
    name: item["name"],
    containerName: item["containerName"],
    tags: !item["tags"] ? item["tags"] : blobTagsDeserializer(item["tags"]),
    versionId: item["versionId"],
    isCurrentVersion: item["isCurrentVersion"],
  };
}

/** Represents blob tags. */
export interface BlobTags {
  /** Represents the blob tags. */
  blobTagSet: BlobTag[];
}

export function blobTagsSerializer(item: BlobTags): any {
  return { blobTagSet: blobTagArraySerializer(item["blobTagSet"]) };
}

export function blobTagsDeserializer(item: any): BlobTags {
  return {
    blobTagSet: blobTagArrayDeserializer(item["blobTagSet"]),
  };
}

export function blobTagArraySerializer(result: Array<BlobTag>): any[] {
  return result.map((item) => {
    return blobTagSerializer(item);
  });
}

export function blobTagArrayDeserializer(result: Array<BlobTag>): any[] {
  return result.map((item) => {
    return blobTagDeserializer(item);
  });
}

/** The blob tags. */
export interface BlobTag {
  /** The key of the tag. */
  key: string;
  /** The value of the tag. */
  value: string;
}

export function blobTagSerializer(item: BlobTag): any {
  return { key: item["key"], value: item["value"] };
}

export function blobTagDeserializer(item: any): BlobTag {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The signed identifier. */
export interface SignedIdentifier {
  /** The unique ID for the signed identifier. */
  id: string;
  /** The access policy for the signed identifier. */
  accessPolicy: AccessPolicy;
}

export function signedIdentifierSerializer(item: SignedIdentifier): any {
  return { id: item["id"], accessPolicy: accessPolicySerializer(item["accessPolicy"]) };
}

export function signedIdentifierDeserializer(item: any): SignedIdentifier {
  return {
    id: item["id"],
    accessPolicy: accessPolicyDeserializer(item["accessPolicy"]),
  };
}

/** Represents an access policy. */
export interface AccessPolicy {
  /** The date-time the policy is active. */
  startsOn: Date;
  /** The date-time the policy expires. */
  expiresOn: Date;
  /** The permissions for acl the policy. */
  permissions: string;
}

export function accessPolicySerializer(item: AccessPolicy): any {
  return {
    startsOn: item["startsOn"].toUTCString(),
    expiresOn: item["expiresOn"].toUTCString(),
    permissions: item["permissions"],
  };
}

export function accessPolicyDeserializer(item: any): AccessPolicy {
  return {
    startsOn: new Date(item["startsOn"]),
    expiresOn: new Date(item["expiresOn"]),
    permissions: item["permissions"],
  };
}

/** An enumeration of blobs. */
export interface _ListBlobsFlatSegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The container name. */
  containerName: string;
  /** The prefix of the blobs. */
  prefix?: string;
  /** The marker of the blobs. */
  marker?: string;
  /** The max results of the blobs. */
  maxResults?: number;
  /** The blob segment. */
  segment: BlobFlatListSegment;
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function _listBlobsFlatSegmentResponseDeserializer(
  item: any,
): _ListBlobsFlatSegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    containerName: item["containerName"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    segment: blobFlatListSegmentDeserializer(item["segment"]),
    nextMarker: item["nextMarker"],
  };
}

/** The blob flat list segment. */
export interface BlobFlatListSegment {
  /** The blob items. */
  blobItems: BlobItemInternal[];
}

export function blobFlatListSegmentDeserializer(item: any): BlobFlatListSegment {
  return {
    blobItems: blobItemInternalArrayDeserializer(item["blobItems"]),
  };
}

export function blobItemInternalArrayDeserializer(result: Array<BlobItemInternal>): any[] {
  return result.map((item) => {
    return blobItemInternalDeserializer(item);
  });
}

/** An Azure Storage Blob */
export interface BlobItemInternal {
  /** The name of the blob. */
  name: BlobName;
  /** Whether the blob is deleted. */
  deleted: boolean;
  /** The snapshot of the blob. */
  snapshot: string;
  /** The version id of the blob. */
  versionId?: string;
  /** Whether the blob is the current version. */
  isCurrentVersion?: boolean;
  /** The properties of the blob. */
  properties: BlobPropertiesInternal;
  /** The metadata of the blob. */
  metadata?: BlobMetadata;
  /** The tags of the blob. */
  blobTags?: BlobTags;
  /** The object replication metadata of the blob. */
  objectReplicationMetadata?: ObjectReplicationMetadata;
  /** Whether the blob has versions only. */
  hasVersionsOnly?: boolean;
}

export function blobItemInternalDeserializer(item: any): BlobItemInternal {
  return {
    name: blobNameDeserializer(item["name"]),
    deleted: item["deleted"],
    snapshot: item["snapshot"],
    versionId: item["versionId"],
    isCurrentVersion: item["isCurrentVersion"],
    properties: blobPropertiesInternalDeserializer(item["properties"]),
    metadata: !item["metadata"] ? item["metadata"] : blobMetadataDeserializer(item["metadata"]),
    blobTags: !item["blobTags"] ? item["blobTags"] : blobTagsDeserializer(item["blobTags"]),
    objectReplicationMetadata: !item["objectReplicationMetadata"]
      ? item["objectReplicationMetadata"]
      : objectReplicationMetadataDeserializer(item["objectReplicationMetadata"]),
    hasVersionsOnly: item["hasVersionsOnly"],
  };
}

/** Represents a blob name. */
export interface BlobName {
  /** Whether the blob name is encoded. */
  encoded?: boolean;
  /** The blob name. */
  content?: string;
}

export function blobNameDeserializer(item: any): BlobName {
  return {
    encoded: item["encoded"],
    content: item["content"],
  };
}

/** The properties of a blob. */
export interface BlobPropertiesInternal {
  /** The date-time the blob was created in RFC1123 format. */
  createdOn?: Date;
  /** The date-time the blob was last modified in RFC1123 format. */
  lastModified: Date;
  /** The blob ETag. */
  eTag: string;
  /** The content length of the blob. */
  contentLength?: number;
  /** The content type of the blob. */
  contentType?: string;
  /** The content encoding of the blob. */
  contentEncoding?: string;
  /** The content language of the blob. */
  contentLanguage?: string;
  /** The content MD5 of the blob. */
  contentMd5?: Uint8Array;
  /** The content disposition of the blob. */
  contentDisposition?: string;
  /** The cache control of the blob. */
  cacheControl?: string;
  /** The sequence number of the blob. */
  blobSequenceNumber?: number;
  /** The blob type. */
  blobType?: BlobType;
  /** The lease status of the blob. */
  leaseStatus?: LeaseStatus;
  /** The lease state of the blob. */
  leaseState?: LeaseState;
  /** The lease duration of the blob. */
  leaseDuration?: LeaseDuration;
  /** The copy ID of the blob. */
  copyId?: string;
  /** The copy status of the blob. */
  copyStatus?: CopyStatus;
  /** The copy source of the blob. */
  copySource?: string;
  /** The copy progress of the blob. */
  copyProgress?: string;
  /** The copy completion time of the blob. */
  copyCompletedOn?: Date;
  /** The copy status description of the blob. */
  copyStatusDescription?: string;
  /** Whether the blob is encrypted on the server. */
  serverEncrypted?: boolean;
  /** Whether the blob is incremental copy. */
  incrementalCopy?: boolean;
  /** The name of the destination snapshot. */
  destinationSnapshot?: string;
  /** The time the blob was deleted. */
  deletedOn?: Date;
  /** The remaining retention days of the blob. */
  remainingRetentionDays?: number;
  /** The access tier of the blob. */
  accessTier?: AccessTier;
  /** Whether the access tier is inferred. */
  accessTierInferred?: boolean;
  /** The archive status of the blob. */
  archiveStatus?: ArchiveStatus;
  /** Customer provided key sha256 */
  customerProvidedKeySha256?: string;
  /** The encryption scope of the blob. */
  encryptionScope?: string;
  /** The access tier change time of the blob. */
  accessTierChangedOn?: Date;
  /** The number of tags for the blob. */
  tagCount?: number;
  /** The expire time of the blob. */
  expiresOn?: Date;
  /** Whether the blob is sealed. */
  isSealed?: boolean;
  /** The rehydrate priority of the blob. */
  rehydratePriority?: RehydratePriority;
  /** The last access time of the blob. */
  lastAccessedOn?: Date;
  /** The immutability policy until time of the blob. */
  immutabilityPolicyExpiresOn?: Date;
  /** The immutability policy mode of the blob. */
  immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
  /** Whether the blob is under legal hold. */
  legalHold?: boolean;
}

export function blobPropertiesInternalDeserializer(item: any): BlobPropertiesInternal {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastModified: new Date(item["lastModified"]),
    eTag: item["eTag"],
    contentLength: item["contentLength"],
    contentType: item["contentType"],
    contentEncoding: item["contentEncoding"],
    contentLanguage: item["contentLanguage"],
    contentMd5: !item["contentMd5"]
      ? item["contentMd5"]
      : typeof item["contentMd5"] === "string"
        ? stringToUint8Array(item["contentMd5"], "base64")
        : item["contentMd5"],
    contentDisposition: item["contentDisposition"],
    cacheControl: item["cacheControl"],
    blobSequenceNumber: item["blobSequenceNumber"],
    blobType: item["blobType"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    copyId: item["copyId"],
    copyStatus: item["copyStatus"],
    copySource: item["copySource"],
    copyProgress: item["copyProgress"],
    copyCompletedOn: !item["copyCompletedOn"]
      ? item["copyCompletedOn"]
      : new Date(item["copyCompletedOn"]),
    copyStatusDescription: item["copyStatusDescription"],
    serverEncrypted: item["serverEncrypted"],
    incrementalCopy: item["incrementalCopy"],
    destinationSnapshot: item["destinationSnapshot"],
    deletedOn: !item["deletedOn"] ? item["deletedOn"] : new Date(item["deletedOn"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierInferred: item["accessTierInferred"],
    archiveStatus: item["archiveStatus"],
    customerProvidedKeySha256: item["customerProvidedKeySha256"],
    encryptionScope: item["encryptionScope"],
    accessTierChangedOn: !item["accessTierChangedOn"]
      ? item["accessTierChangedOn"]
      : new Date(item["accessTierChangedOn"]),
    tagCount: item["tagCount"],
    expiresOn: !item["ExpiresOn"] ? item["ExpiresOn"] : new Date(item["ExpiresOn"]),
    isSealed: item["IsSealed"],
    rehydratePriority: item["rehydratePriority"],
    lastAccessedOn: !item["LastAccessedOn"]
      ? item["LastAccessedOn"]
      : new Date(item["LastAccessedOn"]),
    immutabilityPolicyExpiresOn: !item["ImmutabilityPolicyExpiresOn"]
      ? item["ImmutabilityPolicyExpiresOn"]
      : new Date(item["ImmutabilityPolicyExpiresOn"]),
    immutabilityPolicyMode: item["immutabilityPolicyMode"],
    legalHold: item["legalHold"],
  };
}

/** The blob type. */
export type BlobType = "BlockBlob" | "PageBlob" | "AppendBlob";
/** The copy status. */
export type CopyStatus = "pending" | "success" | "failed" | "aborted";
/** The access tiers. */
export type AccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80"
  | "Hot"
  | "Cool"
  | "Archive"
  | "Premium"
  | "Cold";
/** The archive status. */
export type ArchiveStatus =
  | "rehydrate-pending-to-hot"
  | "rehydrate-pending-to-cool"
  | "rehydrate-pending-to-cold";
/** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. Valid values are High and Standard. */
export type RehydratePriority = "High" | "Standard";
/** The immutability policy mode. */
export type BlobImmutabilityPolicyMode = "Mutable" | "Locked" | "Unlocked";

/** The blob metadata. */
export interface BlobMetadata {
  /** Whether the blob metadata is encrypted. */
  encrypted?: string;
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function blobMetadataDeserializer(item: any): BlobMetadata {
  return {
    additionalProperties: serializeRecord(item, ["encrypted"]),
    encrypted: item["encrypted"],
  };
}

/** The object replication metadata. */
export interface ObjectReplicationMetadata {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function objectReplicationMetadataDeserializer(item: any): ObjectReplicationMetadata {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

/** An enumeration of blobs */
export interface _ListBlobsHierarchySegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The container name. */
  containerName: string;
  /** The delimiter of the blobs. */
  delimiter?: string;
  /** The prefix of the blobs. */
  prefix?: string;
  /** The marker of the blobs. */
  marker?: string;
  /** The max results of the blobs. */
  maxResults?: number;
  /** The blob segment. */
  segment: BlobHierarchyListSegment;
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function _listBlobsHierarchySegmentResponseDeserializer(
  item: any,
): _ListBlobsHierarchySegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    containerName: item["containerName"],
    delimiter: item["delimiter"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    segment: blobHierarchyListSegmentDeserializer(item["segment"]),
    nextMarker: item["nextMarker"],
  };
}

/** Represents an array of blobs. */
export interface BlobHierarchyListSegment {
  /** The blob items */
  blobItems: BlobItemInternal[];
  /** The blob prefixes. */
  blobPrefixes?: BlobPrefix[];
}

export function blobHierarchyListSegmentDeserializer(item: any): BlobHierarchyListSegment {
  return {
    blobItems: blobItemInternalArrayDeserializer(item["blobItems"]),
    blobPrefixes: !item["blobPrefixes"]
      ? item["blobPrefixes"]
      : blobPrefixArrayDeserializer(item["blobPrefixes"]),
  };
}

export function blobPrefixArrayDeserializer(result: Array<BlobPrefix>): any[] {
  return result.map((item) => {
    return blobPrefixDeserializer(item);
  });
}

/** Represents a blob prefix. */
export interface BlobPrefix {
  /** The blob name. */
  name: BlobName;
}

export function blobPrefixDeserializer(item: any): BlobPrefix {
  return {
    name: blobNameDeserializer(item["name"]),
  };
}

/** Represents a page list. */
export interface PageList {
  /** The page ranges. */
  pageRange?: PageRange[];
  /** The clear ranges. */
  clearRange?: ClearRange[];
  /** The next marker. */
  nextMarker?: string;
}

export function pageListDeserializer(item: any): PageList {
  return {
    pageRange: !item["pageRange"]
      ? item["pageRange"]
      : pageRangeArrayDeserializer(item["pageRange"]),
    clearRange: !item["clearRange"]
      ? item["clearRange"]
      : clearRangeArrayDeserializer(item["clearRange"]),
    nextMarker: item["nextMarker"],
  };
}

export function pageRangeArrayDeserializer(result: Array<PageRange>): any[] {
  return result.map((item) => {
    return pageRangeDeserializer(item);
  });
}

/** The page range. */
export interface PageRange {
  /** The start of the byte range. */
  start: number;
  /** The end of the byte range. */
  end: number;
}

export function pageRangeDeserializer(item: any): PageRange {
  return {
    start: item["start"],
    end: item["end"],
  };
}

export function clearRangeArrayDeserializer(result: Array<ClearRange>): any[] {
  return result.map((item) => {
    return clearRangeDeserializer(item);
  });
}

/** The clear range. */
export interface ClearRange {
  /** The start of the byte range. */
  start: number;
  /** The end of the byte range. */
  end: number;
}

export function clearRangeDeserializer(item: any): ClearRange {
  return {
    start: item["start"],
    end: item["end"],
  };
}

/** The Block lookup list. */
export interface BlockLookupList {
  /** The committed blocks */
  committed?: Uint8Array[];
  /** The uncommitted blocks */
  uncommitted?: Uint8Array[];
  /** The latest blocks */
  latest?: Uint8Array[];
}

export function blockLookupListSerializer(item: BlockLookupList): any {
  return {
    committed: !item["committed"]
      ? item["committed"]
      : item["committed"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
    uncommitted: !item["uncommitted"]
      ? item["uncommitted"]
      : item["uncommitted"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
    latest: !item["latest"]
      ? item["latest"]
      : item["latest"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
  };
}

/** Contains the committed and uncommitted blocks in a block blob. */
export interface BlockList {
  /** The list of committed blocks. */
  committedBlocks?: Block[];
  /** The list of uncommitted blocks. */
  uncommittedBlocks?: Block[];
}

export function blockListDeserializer(item: any): BlockList {
  return {
    committedBlocks: !item["committedBlocks"]
      ? item["committedBlocks"]
      : blockArrayDeserializer(item["committedBlocks"]),
    uncommittedBlocks: !item["uncommittedBlocks"]
      ? item["uncommittedBlocks"]
      : blockArrayDeserializer(item["uncommittedBlocks"]),
  };
}

export function blockArrayDeserializer(result: Array<Block>): any[] {
  return result.map((item) => {
    return blockDeserializer(item);
  });
}

/** Represents a single block in a block blob. It describes the block's ID and size. */
export interface Block {
  /** The base64 encoded block ID. */
  name: Uint8Array;
  /** The block size in bytes. */
  size: number;
}

export function blockDeserializer(item: any): Block {
  return {
    name:
      typeof item["name"] === "string" ? stringToUint8Array(item["name"], "base64") : item["name"],
    size: item["size"],
  };
}

/** Groups the set of query request settings. */
export interface QueryRequest {
  /** Required. The type of the provided query expression. */
  queryType: QueryRequestType;
  /** The query expression in SQL. The maximum size of the query expression is 256KiB. */
  expression: string;
  /** The input serialization settings. */
  inputSerialization?: QuerySerialization;
  /** The output serialization settings. */
  outputSerialization?: QuerySerialization;
}

export function queryRequestSerializer(item: QueryRequest): any {
  return {
    queryType: item["queryType"],
    expression: item["expression"],
    inputSerialization: !item["inputSerialization"]
      ? item["inputSerialization"]
      : querySerializationSerializer(item["inputSerialization"]),
    outputSerialization: !item["outputSerialization"]
      ? item["outputSerialization"]
      : querySerializationSerializer(item["outputSerialization"]),
  };
}

/** The query request, note only SQL supported */
export type QueryRequestType = "SQL";

/** The query serialization settings. */
export interface QuerySerialization {
  /** The query format. */
  format: QueryFormat;
}

export function querySerializationSerializer(item: QuerySerialization): any {
  return { format: queryFormatSerializer(item["format"]) };
}

/** The query format settings. */
export interface QueryFormat {
  /** The query type. */
  type: QueryType;
  /** The delimited text configuration. */
  delimitedTextConfiguration?: DelimitedTextConfiguration;
  /** The JSON text configuration. */
  jsonTextConfiguration?: JsonTextConfiguration;
  /** The Apache Arrow configuration. */
  arrowConfiguration?: ArrowConfiguration;
  /** The Parquet configuration. */
  parquetTextConfiguration?: ParquetConfiguration;
}

export function queryFormatSerializer(item: QueryFormat): any {
  return {
    type: item["type"],
    delimitedTextConfiguration: !item["delimitedTextConfiguration"]
      ? item["delimitedTextConfiguration"]
      : delimitedTextConfigurationSerializer(item["delimitedTextConfiguration"]),
    jsonTextConfiguration: !item["jsonTextConfiguration"]
      ? item["jsonTextConfiguration"]
      : jsonTextConfigurationSerializer(item["jsonTextConfiguration"]),
    arrowConfiguration: !item["arrowConfiguration"]
      ? item["arrowConfiguration"]
      : arrowConfigurationSerializer(item["arrowConfiguration"]),
    parquetTextConfiguration: !item["parquetTextConfiguration"]
      ? item["parquetTextConfiguration"]
      : parquetConfigurationSerializer(item["parquetTextConfiguration"]),
  };
}

/** The query format type. */
export type QueryType = "delimited" | "json" | "arrow" | "parquet";

/** Represents the delimited text configuration. */
export interface DelimitedTextConfiguration {
  /** The string used to separate columns. */
  columnSeparator?: string;
  /** The string used to quote a specific field. */
  fieldQuote?: string;
  /** The string used to separate records. */
  recordSeparator?: string;
  /** The string used to escape a quote character in a field. */
  escapeChar?: string;
  /** Represents whether the data has headers. */
  headersPresent?: boolean;
}

export function delimitedTextConfigurationSerializer(item: DelimitedTextConfiguration): any {
  return {
    columnSeparator: item["columnSeparator"],
    fieldQuote: item["fieldQuote"],
    recordSeparator: item["recordSeparator"],
    escapeChar: item["escapeChar"],
    headersPresent: item["headersPresent"],
  };
}

/** Represents the JSON text configuration. */
export interface JsonTextConfiguration {
  /** The string used to separate records. */
  recordSeparator?: string;
}

export function jsonTextConfigurationSerializer(item: JsonTextConfiguration): any {
  return { recordSeparator: item["recordSeparator"] };
}

/** Represents the Apache Arrow configuration. */
export interface ArrowConfiguration {
  /** The Apache Arrow schema */
  schema: ArrowField[];
}

export function arrowConfigurationSerializer(item: ArrowConfiguration): any {
  return { schema: arrowFieldArraySerializer(item["schema"]) };
}

export function arrowFieldArraySerializer(result: Array<ArrowField>): any[] {
  return result.map((item) => {
    return arrowFieldSerializer(item);
  });
}

/** Represents an Apache Arrow field. */
export interface ArrowField {
  /** The arrow field type. */
  type: string;
  /** The arrow field name. */
  name?: string;
  /** The arrow field precision. */
  precision?: number;
  /** The arrow field scale. */
  scale?: number;
}

export function arrowFieldSerializer(item: ArrowField): any {
  return {
    type: item["type"],
    name: item["name"],
    precision: item["precision"],
    scale: item["scale"],
  };
}

/** Represents the Parquet configuration. */
export interface ParquetConfiguration {
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function parquetConfigurationSerializer(item: ParquetConfiguration): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

/** Include this parameter to specify that the container's metadata be returned as part of the response body. */
export type ListContainersIncludeType = "metadata" | "deleted" | "system";
/** The SKU types */
export type SkuName =
  | "Standard_LRS"
  | "Standard_GRS"
  | "Standard_RAGRS"
  | "Standard_ZRS"
  | "Premium_LRS"
  | "Standard_GZRS"
  | "Premium_ZRS"
  | "Standard_RAGZRS";
/** The account kind. */
export type AccountKind =
  | "Storage"
  | "BlobStorage"
  | "StorageV2"
  | "FileStorage"
  | "BlockBlobStorage";
/** The filter blobs includes. */
export type FilterBlobsIncludeItem = "none" | "versions";
/** The list blob includes parameter values. */
export type ListBlobsIncludeItem =
  | "copy"
  | "deleted"
  | "metadata"
  | "snapshots"
  | "uncommittedblobs"
  | "versions"
  | "tags"
  | "immutabilitypolicy"
  | "legalhold"
  | "deletedwithversions";
/** The algorithm used to produce the encryption key hash. Currently, the only accepted value is \"AES256\". Must be provided if the x-ms-encryption-key header is provided. */
export type EncryptionAlgorithmType = "AES256";
/** The delete snapshots option type. */
export type DeleteSnapshotsOptionType = "only" | "include";
/** The type of blob deletions. */
export type BlobDeleteType = "Permanent";
/** The blob expiration options. */
export type BlobExpiryOptions = "NeverExpire" | "RelativeToCreation" | "RelativeToNow" | "Absolute";
/** The immutability policy mode used in requests. */
export type ImmutabilityPolicyMode = "Locked" | "Unlocked";
/** The blob copy source tags types. */
export type BlobCopySourceTags = "REPLACE" | "COPY";
/** The file share token intent types. */
export type FileShareTokenIntent = "backup";
/** The premium page blob access tier types. */
export type PremiumPageBlobAccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80";
/** The sequence number actions. */
export type SequenceNumberActionType = "increment" | "max" | "update";
/** The block list types. */
export type BlockListType = "committed" | "uncommitted" | "all";

/** The Azure.Storage.Blob service versions. */
export enum KnownVersions {
  /** The 2025-11-05 version of the Azure.Storage.Blob service. */
  V20251105 = "2025-11-05",
  /** The 2026-02-06 version of the Azure.Storage.Blob service. */
  V20260206 = "2026-02-06",
  /** The 2026-04-06 version of the Azure.Storage.Blob service. */
  V20260406 = "2026-04-06",
}

export function signedIdentifierArraySerializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierSerializer(item);
  });
}

export function signedIdentifierArrayDeserializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierDeserializer(item);
  });
}
