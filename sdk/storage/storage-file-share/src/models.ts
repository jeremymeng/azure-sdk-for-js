// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FileSystemAttributes } from "./FileSystemAttributes";
import { truncatedISO8061Date } from "./utils/utils.common";
import { logger } from "./log";
import type { FilePermissionFormat, NfsFileType, ShareTokenIntent } from "./generatedModels";
import type { StoragePipelineOptions } from "./Pipeline";
import { FileDownloadHeaders } from "./generatedModels";

export interface Metadata {
  [propertyName: string]: string;
}

/**
 * Represents file permissions for a specific role.
 */
export interface PosixRolePermissions {
  /**
   * The execute permission.
   */
  execute: boolean;
  /**
   * The write permission.
   */
  write: boolean;
  /**
   * The read permission.
   */
  read: boolean;
}

/**
 * The mode permissions of the file or directory.
 */
export interface NfsFileMode {
  /**
   * Permissions the owner has over the file or directory.
   */
  owner: PosixRolePermissions;

  /**
   * Permissions the group has over the file or directory.
   */
  group: PosixRolePermissions;

  /**
   * Permissions other have over the file or directory.
   */
  other: PosixRolePermissions;

  /**
   * Set effective user ID (setuid) on the file or directory.
   */
  effectiveUserIdentity: boolean;

  /**
   * Set effective group ID (setgid) on the file or directory.
   */
  effectiveGroupIdentity: boolean;

  /**
   * The sticky bit may be set on directories.  The files in that
   * directory may only be renamed or deleted by the file's owner, the directory's owner, or the root user.
   */
  stickyBit: boolean;
}

/**
 * 
   NFS properties.
   Note that these properties only apply to files or directories in
   premium NFS file accounts.
  */
export interface FilePosixProperties {
  /** Optional, NFS only. The owner of the file or directory. */
  owner?: string;
  /** Optional, NFS only. The owning group of the file or directory. */
  group?: string;
  /** Optional, NFS only. The file mode of the file or directory */
  fileMode?: NfsFileMode;
  /** Optional, NFS only. Type of the file or directory. */
  fileType?: NfsFileType;
}

/** Defines headers for File_setHttpHeaders operation. */
export interface FileSetHttpHeadersHeaders {
  /** The ETag contains a value which represents the version of the file, in quotes. */
  etag?: string;
  /** Returns the date and time the directory was last modified. Any operation that modifies the directory or its properties updates the last modified time. Operations on files do not affect the last modified time of the directory. */
  lastModified?: Date;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the File service used to execute the request. */
  version?: string;
  /** A UTC date/time value generated by the service that indicates the time at which the response was initiated. */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** Key of the permission set for the file. */
  filePermissionKey?: string;
  /** Attributes set for the file. */
  fileAttributes?: string;
  /** Creation time for the file. */
  fileCreatedOn?: Date;
  /** Last write time for the file. */
  fileLastWriteOn?: Date;
  /** Change time for the file. */
  fileChangeOn?: Date;
  /** The fileId of the directory. */
  fileId?: string;
  /** The parent fileId of the directory. */
  fileParentId?: string;
  /** NFS only. The mode of the file or directory. */
  fileMode?: NfsFileMode;
  /** NFS only. The owner of the file or directory. */
  owner?: string;
  /** NFS only. The owning group of the file or directory. */
  group?: string;
  /** NFS only. The link count of the file or directory. */
  linkCount?: number;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the download operation. */
export type FileDownloadResponse = FileDownloadHeaders & {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};

export interface FileHttpHeaders {
  /**
   * Optional. Sets the file's cache
   * control. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileCacheControl?: string;
  /**
   * Optional. Sets the file's content type.
   * If specified, this property is stored with the file and returned with a
   * read request.
   */
  fileContentType?: string;
  /**
   * Optional. An MD5 hash of the file
   * content. Note that this hash is not validated, as the hashes for the
   * individual blocks were validated when each was uploaded.
   */
  fileContentMD5?: Uint8Array;
  /**
   * Optional. Sets the file's content
   * encoding. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentEncoding?: string;
  /**
   * Optional. Set the file's content
   * language. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentLanguage?: string;
  /**
   * Optional. Sets the file's
   * Content-Disposition header.
   */
  fileContentDisposition?: string;
}

/**
 * Indicates inherit file permission from the parent directory.
 */
export type FilePermissionInheritType = "inherit";

/**
 * Indicates keep existing file permission value unchanged.
 */
export type FilePermissionPreserveType = "preserve";

/**
 * Indicates setting as the time of the request.
 */
export type TimeNowType = "now";

/**
 * Indicates keep existing time value unchanged.
 */
export type TimePreserveType = "preserve";

/**
 * Indicates keep existing file attributes unchanged.
 */
export type FileAttributesPreserveType = "preserve";

export interface FileAndDirectoryCreateCommonOptions {
  /**
   * The permission(security descriptor) to be set for the file or directory in the
   * Security Descriptor Definition Language (SDDL) or binary.
   * If specified, it must have an owner, group, and discretionary access control list (DACL).
   * A value of inherit may be passed to inherit from the parent directory.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   * And if both are not specified, inherit will be set to filePermission as default value by client library.
   */
  filePermission?: string | FilePermissionInheritType;

  /**
   * Optional. Available for version 2023-06-01 and later.
   * Specifies the format in which the permission is returned. Acceptable values are SDDL or binary.
   * If x-ms-file-permission-format is unspecified or explicitly set to SDDL, the permission is returned in SDDL format.
   * If x-ms-file-permission-format is explicitly set to binary, the permission is returned as a base64 string representing the binary encoding of the permission
   */
  filePermissionFormat?: FilePermissionFormat;

  /**
   * The key of the permission to be set for the file or directory. This can be created using the Create-Permission API.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   */
  filePermissionKey?: string;

  /**
   * The file system attributes to be set on the file or directory.
   */
  fileAttributes?: FileSystemAttributes;

  /**
   * The Coordinated Universal Time (UTC) creation time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  creationTime?: Date | TimeNowType;

  /**
   * The Coordinated Universal Time (UTC) last write property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  lastWriteTime?: Date | TimeNowType;

  /**
   * The Coordinated Universal Time (UTC) change time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set to the time of the request.
   */
  changeTime?: Date | TimeNowType;
  /**
   * Optional properties to set on NFS files.
     Note that this property is only applicable to files created in NFS shares.
   */
  posixProperties?: FilePosixProperties;
}

export interface FileAndDirectorySetPropertiesCommonOptions {
  /**
   * The permission(security descriptor) to be set for the file or directory in the
   * Security Descriptor Definition Language (SDDL). If specified, it must have an owner, group, and discretionary access control list (DACL).
   * A value of inherit may be passed to inherit from the parent directory.
   * A value of preserve may be passed to keep the value unchanged.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   * And if both are not specified, preserve will be set to filePermission as default value by client library.
   */
  filePermission?: string | FilePermissionInheritType | FilePermissionPreserveType;

  /**
   * Optional. Available for version 2023-06-01 and later.
   * Specifies the format in which the permission is returned. Acceptable values are SDDL or binary.
   * If x-ms-file-permission-format is unspecified or explicitly set to SDDL, the permission is returned in SDDL format.
   * If x-ms-file-permission-format is explicitly set to binary, the permission is returned as a base64 string representing the binary encoding of the permission
   */
  filePermissionFormat?: FilePermissionFormat;

  /**
   * The key of the permission to be set for the file or directory. This can be created using the Create-Permission API.
   *
   * Note that only one of filePermission or filePermissionKey can be specified.
   */
  filePermissionKey?: string;

  /**
   * The file system attributes to be set on the file or directory.
   */
  fileAttributes?: FileSystemAttributes | FileAttributesPreserveType;

  /**
   * The Coordinated Universal Time (UTC) creation time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * A value of preserve may be passed to keep an existing value unchanged.
   * By default, the value will be set as preserve.
   */
  creationTime?: Date | TimeNowType | TimePreserveType;

  /**
   * The Coordinated Universal Time (UTC) last write property for the directory.
   * A value of now may be used to indicate the time of the request.
   * A value of preserve may be passed to keep an existing value unchanged.
   * By default, the value will be set as preserve.
   */
  lastWriteTime?: Date | TimeNowType | TimePreserveType;

  /**
   * The Coordinated Universal Time (UTC) change time property for the directory.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set to the time of the request.
   */
  changeTime?: Date | TimeNowType;

  /**
   * Optional properties to set on NFS files.
     Note that this property is only applicable to files created in NFS shares.
   */
  posixProperties?: FilePosixProperties;
}

/**
 * Close handles result information.
 */
export interface CloseHandlesInfo {
  closedHandlesCount: number;
  /**
   * Contains count of number of handles that failed to close.
   */
  closeFailureCount?: number;
}

/**
 * Protocols to enable on the share. For now, only support SMB or NFS.
 */
export interface ShareProtocols {
  /**
   * The share can be accessed by SMBv3.0, SMBv2.1 and REST.
   */
  smbEnabled?: boolean;
  /**
   * The share can be accessed by NFSv4.1.
   */
  nfsEnabled?: boolean;
}

export interface ShareClientConfig {
  /**
   * The Files OAuth over REST feature requires special permissions to be included in the role definition to use
   * These special permissions will give privileged access to file share data -
   * It will allow users to bypass file/directory level ACL/NTFS permissions and get read/write access to file share data
   * Since this additional permission can be unintended and to prevent unintended and over privileged access,
   * additional checks has been implemented that requires users to explicitly indicate their intent to use these additional permissions.
   * This is done using the fileRequestIntent option.
   * Currently, the only value that the header supports is 'backup'
   * Any user who wishes to use Files OAuth over REST feature has to call the API with the intent header. If the API is not called with the intent header, any subsequent data operation requests will be denied.
   */
  fileRequestIntent?: ShareTokenIntent;
  /** If true, the trailing dot will not be trimmed from the target URI. */
  allowTrailingDot?: boolean;
  /** If true, the trailing dot will not be trimmed from the source URI. */
  allowSourceTrailingDot?: boolean;
}

export type ShareClientOptions = StoragePipelineOptions & ShareClientConfig;

/**
 * Convert protocols from joined string to ShareProtocols.
 *
 * @param protocolsString -
 */
export function toShareProtocols(protocolsString?: string): ShareProtocols | undefined {
  if (protocolsString === undefined) {
    return undefined;
  }

  const protocolStrArray = protocolsString.split(";");
  const protocols: ShareProtocols = {};
  for (const protocol of protocolStrArray) {
    if (protocol === "SMB") {
      protocols.smbEnabled = true;
    } else if (protocol === "NFS") {
      protocols.nfsEnabled = true;
    }
  }
  return protocols;
}

/**
 * Convert ShareProtocols to joined string.
 *
 * @param protocols -
 */
export function toShareProtocolsString(protocols: ShareProtocols = {}): string | undefined {
  let protocolStr = undefined;

  if (protocols.smbEnabled === true) {
    protocolStr = "SMB";
  }
  if (protocols.nfsEnabled === true) {
    logger.info(
      `Using "NFS" in favor of "SMB" for the share protocol as currently they can't be supported at the same time.`,
    );
    protocolStr = "NFS";
  }
  return protocolStr;
}

export function validateFilePermissionOptions(
  filePermission?: string,
  filePermissionKey?: string,
): void {
  if (filePermission && filePermissionKey) {
    throw new RangeError("Only one of filePermission or filePermissionKey can be specified.");
  }
}

export function validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(
  options: FileAndDirectoryCreateCommonOptions,
): FileAndDirectoryCreateCommonOptions {
  // Would better deep copy params set by user.

  if (!options) {
    options = {};
  }

  validateFilePermissionOptions(options.filePermission, options.filePermissionKey);

  return options;
}

export function validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(
  options: FileAndDirectorySetPropertiesCommonOptions,
): FileAndDirectorySetPropertiesCommonOptions {
  // Would better deep copy params set by user.

  if (!options) {
    options = {};
  }

  validateFilePermissionOptions(options.filePermission, options.filePermissionKey);

  return options;
}

export function fileAttributesToString(
  fileAttributes: FileSystemAttributes | FileAttributesPreserveType,
): string {
  return fileAttributes instanceof FileSystemAttributes
    ? fileAttributes.toString()
    : fileAttributes;
}

export function fileCreationTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

export function fileLastWriteTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

export function fileChangeTimeToString(
  time: Date | TimeNowType | TimePreserveType | undefined,
): string | undefined {
  return time instanceof Date ? truncatedISO8061Date(time) : time;
}

/**
 * Represents authentication information in Authorization, ProxyAuthorization,
 * WWW-Authenticate, and Proxy-Authenticate header values.
 */
export interface HttpAuthorization {
  /**
   * The scheme to use for authorization.
   */
  scheme: string;

  /**
   * the credentials containing the authentication information of the user agent for the resource being requested.
   */
  value: string;
}

/**
 * Defines the known cloud audiences for Storage.
 */
export enum StorageFileAudience {
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Storage.
   */
  StorageOAuthScopes = "https://storage.azure.com/.default",
}

/**
 * To get the OAuth audience for a storage account for file service.
 */
export function getFileServiceAccountAudience(storageAccountName: string): string {
  return `https://${storageAccountName}.file.core.windows.net/.default`;
}
