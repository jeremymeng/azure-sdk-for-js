/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
  QueryCollectionFormat
} from "@azure/core-http";
import {
  FileServiceProperties as FileServicePropertiesMapper,
  SharePermission as SharePermissionMapper
} from "../models/mappers";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/xml",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const properties: OperationParameter = {
  parameterPath: "properties",
  mapper: FileServicePropertiesMapper
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/xml",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const url: OperationURLParameter = {
  parameterPath: "url",
  mapper: {
    serializedName: "url",
    required: true,
    xmlName: "url",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const restype: OperationQueryParameter = {
  parameterPath: "restype",
  mapper: {
    defaultValue: "service",
    isConstant: true,
    serializedName: "restype",
    type: {
      name: "String"
    }
  }
};

export const comp: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "properties",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const timeoutInSeconds: OperationQueryParameter = {
  parameterPath: ["options", "timeoutInSeconds"],
  mapper: {
    constraints: {
      InclusiveMinimum: 0
    },
    serializedName: "timeout",
    xmlName: "timeout",
    type: {
      name: "Number"
    }
  }
};

export const version: OperationParameter = {
  parameterPath: "version",
  mapper: {
    defaultValue: "2020-10-02",
    isConstant: true,
    serializedName: "x-ms-version",
    type: {
      name: "String"
    }
  }
};

export const accept1: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/xml",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const comp1: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "list",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const prefix: OperationQueryParameter = {
  parameterPath: ["options", "prefix"],
  mapper: {
    serializedName: "prefix",
    xmlName: "prefix",
    type: {
      name: "String"
    }
  }
};

export const marker: OperationQueryParameter = {
  parameterPath: ["options", "marker"],
  mapper: {
    serializedName: "marker",
    xmlName: "marker",
    type: {
      name: "String"
    }
  }
};

export const maxResults: OperationQueryParameter = {
  parameterPath: ["options", "maxResults"],
  mapper: {
    constraints: {
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    xmlName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const include: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "include",
    xmlName: "include",
    xmlElementName: "ListSharesIncludeType",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "Enum",
          allowedValues: ["snapshots", "metadata", "deleted"]
        }
      }
    }
  },
  collectionFormat: QueryCollectionFormat.Csv
};

export const restype1: OperationQueryParameter = {
  parameterPath: "restype",
  mapper: {
    defaultValue: "share",
    isConstant: true,
    serializedName: "restype",
    type: {
      name: "String"
    }
  }
};

export const metadata: OperationParameter = {
  parameterPath: ["options", "metadata"],
  mapper: {
    serializedName: "x-ms-meta",
    xmlName: "x-ms-meta",
    type: {
      name: "Dictionary",
      value: { type: { name: "String" } }
    },
    headerCollectionPrefix: "x-ms-meta-"
  }
};

export const quota: OperationParameter = {
  parameterPath: ["options", "quota"],
  mapper: {
    constraints: {
      InclusiveMinimum: 1
    },
    serializedName: "x-ms-share-quota",
    xmlName: "x-ms-share-quota",
    type: {
      name: "Number"
    }
  }
};

export const accessTier: OperationParameter = {
  parameterPath: ["options", "accessTier"],
  mapper: {
    serializedName: "x-ms-access-tier",
    xmlName: "x-ms-access-tier",
    type: {
      name: "Enum",
      allowedValues: ["TransactionOptimized", "Hot", "Cool"]
    }
  }
};

export const enabledProtocols: OperationParameter = {
  parameterPath: ["options", "enabledProtocols"],
  mapper: {
    serializedName: "x-ms-enabled-protocols",
    xmlName: "x-ms-enabled-protocols",
    type: {
      name: "String"
    }
  }
};

export const rootSquash: OperationParameter = {
  parameterPath: ["options", "rootSquash"],
  mapper: {
    serializedName: "x-ms-root-squash",
    xmlName: "x-ms-root-squash",
    type: {
      name: "Enum",
      allowedValues: ["NoRootSquash", "RootSquash", "AllSquash"]
    }
  }
};

export const shareSnapshot: OperationQueryParameter = {
  parameterPath: ["options", "shareSnapshot"],
  mapper: {
    serializedName: "sharesnapshot",
    xmlName: "sharesnapshot",
    type: {
      name: "String"
    }
  }
};

export const leaseId: OperationParameter = {
  parameterPath: ["options", "leaseAccessConditions", "leaseId"],
  mapper: {
    serializedName: "x-ms-lease-id",
    xmlName: "x-ms-lease-id",
    type: {
      name: "String"
    }
  }
};

export const deleteSnapshots: OperationParameter = {
  parameterPath: ["options", "deleteSnapshots"],
  mapper: {
    serializedName: "x-ms-delete-snapshots",
    xmlName: "x-ms-delete-snapshots",
    type: {
      name: "Enum",
      allowedValues: ["include", "include-leased"]
    }
  }
};

export const comp2: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "lease",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const action: OperationParameter = {
  parameterPath: "action",
  mapper: {
    defaultValue: "acquire",
    isConstant: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "String"
    }
  }
};

export const duration: OperationParameter = {
  parameterPath: ["options", "duration"],
  mapper: {
    serializedName: "x-ms-lease-duration",
    xmlName: "x-ms-lease-duration",
    type: {
      name: "Number"
    }
  }
};

export const proposedLeaseId: OperationParameter = {
  parameterPath: ["options", "proposedLeaseId"],
  mapper: {
    serializedName: "x-ms-proposed-lease-id",
    xmlName: "x-ms-proposed-lease-id",
    type: {
      name: "String"
    }
  }
};

export const requestId: OperationParameter = {
  parameterPath: ["options", "requestId"],
  mapper: {
    serializedName: "x-ms-client-request-id",
    xmlName: "x-ms-client-request-id",
    type: {
      name: "String"
    }
  }
};

export const action1: OperationParameter = {
  parameterPath: "action",
  mapper: {
    defaultValue: "release",
    isConstant: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "String"
    }
  }
};

export const leaseId1: OperationParameter = {
  parameterPath: "leaseId",
  mapper: {
    serializedName: "x-ms-lease-id",
    required: true,
    xmlName: "x-ms-lease-id",
    type: {
      name: "String"
    }
  }
};

export const action2: OperationParameter = {
  parameterPath: "action",
  mapper: {
    defaultValue: "change",
    isConstant: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "String"
    }
  }
};

export const action3: OperationParameter = {
  parameterPath: "action",
  mapper: {
    defaultValue: "renew",
    isConstant: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "String"
    }
  }
};

export const action4: OperationParameter = {
  parameterPath: "action",
  mapper: {
    defaultValue: "break",
    isConstant: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "String"
    }
  }
};

export const breakPeriod: OperationParameter = {
  parameterPath: ["options", "breakPeriod"],
  mapper: {
    serializedName: "x-ms-lease-break-period",
    xmlName: "x-ms-lease-break-period",
    type: {
      name: "Number"
    }
  }
};

export const comp3: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "snapshot",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const sharePermission: OperationParameter = {
  parameterPath: "sharePermission",
  mapper: SharePermissionMapper
};

export const comp4: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "filepermission",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const accept2: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const filePermissionKey: OperationParameter = {
  parameterPath: "filePermissionKey",
  mapper: {
    serializedName: "x-ms-file-permission-key",
    required: true,
    xmlName: "x-ms-file-permission-key",
    type: {
      name: "String"
    }
  }
};

export const comp5: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "metadata",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const comp6: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "acl",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const shareAcl: OperationParameter = {
  parameterPath: ["options", "shareAcl"],
  mapper: {
    serializedName: "shareAcl",
    xmlName: "SignedIdentifiers",
    xmlIsWrapped: true,
    xmlElementName: "SignedIdentifier",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "Composite",
          className: "SignedIdentifier"
        }
      }
    }
  }
};

export const comp7: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "stats",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const comp8: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "undelete",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const deletedShareName: OperationParameter = {
  parameterPath: ["options", "deletedShareName"],
  mapper: {
    serializedName: "x-ms-deleted-share-name",
    xmlName: "x-ms-deleted-share-name",
    type: {
      name: "String"
    }
  }
};

export const deletedShareVersion: OperationParameter = {
  parameterPath: ["options", "deletedShareVersion"],
  mapper: {
    serializedName: "x-ms-deleted-share-version",
    xmlName: "x-ms-deleted-share-version",
    type: {
      name: "String"
    }
  }
};

export const restype2: OperationQueryParameter = {
  parameterPath: "restype",
  mapper: {
    defaultValue: "directory",
    isConstant: true,
    serializedName: "restype",
    type: {
      name: "String"
    }
  }
};

export const filePermission: OperationParameter = {
  parameterPath: ["options", "filePermission"],
  mapper: {
    serializedName: "x-ms-file-permission",
    xmlName: "x-ms-file-permission",
    type: {
      name: "String"
    }
  }
};

export const filePermissionKey1: OperationParameter = {
  parameterPath: ["options", "filePermissionKey"],
  mapper: {
    serializedName: "x-ms-file-permission-key",
    xmlName: "x-ms-file-permission-key",
    type: {
      name: "String"
    }
  }
};

export const fileAttributes: OperationParameter = {
  parameterPath: "fileAttributes",
  mapper: {
    serializedName: "x-ms-file-attributes",
    required: true,
    xmlName: "x-ms-file-attributes",
    type: {
      name: "String"
    }
  }
};

export const fileCreatedOn: OperationParameter = {
  parameterPath: "fileCreatedOn",
  mapper: {
    serializedName: "x-ms-file-creation-time",
    required: true,
    xmlName: "x-ms-file-creation-time",
    type: {
      name: "String"
    }
  }
};

export const fileLastWriteOn: OperationParameter = {
  parameterPath: "fileLastWriteOn",
  mapper: {
    serializedName: "x-ms-file-last-write-time",
    required: true,
    xmlName: "x-ms-file-last-write-time",
    type: {
      name: "String"
    }
  }
};

export const include1: OperationQueryParameter = {
  parameterPath: ["options", "include"],
  mapper: {
    serializedName: "include",
    xmlName: "include",
    xmlElementName: "ListFilesIncludeType",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "Enum",
          allowedValues: ["Timestamps", "Etag", "Attributes", "PermissionKey"]
        }
      }
    }
  },
  collectionFormat: QueryCollectionFormat.Csv
};

export const includeExtendedInfo: OperationParameter = {
  parameterPath: ["options", "includeExtendedInfo"],
  mapper: {
    serializedName: "x-ms-file-extended-info",
    xmlName: "x-ms-file-extended-info",
    type: {
      name: "Boolean"
    }
  }
};

export const comp9: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "listhandles",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const recursive: OperationParameter = {
  parameterPath: ["options", "recursive"],
  mapper: {
    serializedName: "x-ms-recursive",
    xmlName: "x-ms-recursive",
    type: {
      name: "Boolean"
    }
  }
};

export const comp10: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "forceclosehandles",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const handleId: OperationParameter = {
  parameterPath: "handleId",
  mapper: {
    serializedName: "x-ms-handle-id",
    required: true,
    xmlName: "x-ms-handle-id",
    type: {
      name: "String"
    }
  }
};

export const fileContentLength: OperationParameter = {
  parameterPath: "fileContentLength",
  mapper: {
    serializedName: "x-ms-content-length",
    required: true,
    xmlName: "x-ms-content-length",
    type: {
      name: "Number"
    }
  }
};

export const fileTypeConstant: OperationParameter = {
  parameterPath: "fileTypeConstant",
  mapper: {
    defaultValue: "file",
    isConstant: true,
    serializedName: "x-ms-type",
    type: {
      name: "String"
    }
  }
};

export const fileContentType: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileContentType"],
  mapper: {
    serializedName: "x-ms-content-type",
    xmlName: "x-ms-content-type",
    type: {
      name: "String"
    }
  }
};

export const fileContentEncoding: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileContentEncoding"],
  mapper: {
    serializedName: "x-ms-content-encoding",
    xmlName: "x-ms-content-encoding",
    type: {
      name: "String"
    }
  }
};

export const fileContentLanguage: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileContentLanguage"],
  mapper: {
    serializedName: "x-ms-content-language",
    xmlName: "x-ms-content-language",
    type: {
      name: "String"
    }
  }
};

export const fileCacheControl: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileCacheControl"],
  mapper: {
    serializedName: "x-ms-cache-control",
    xmlName: "x-ms-cache-control",
    type: {
      name: "String"
    }
  }
};

export const fileContentMD5: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileContentMD5"],
  mapper: {
    serializedName: "x-ms-content-md5",
    xmlName: "x-ms-content-md5",
    type: {
      name: "ByteArray"
    }
  }
};

export const fileContentDisposition: OperationParameter = {
  parameterPath: ["options", "fileHttpHeaders", "fileContentDisposition"],
  mapper: {
    serializedName: "x-ms-content-disposition",
    xmlName: "x-ms-content-disposition",
    type: {
      name: "String"
    }
  }
};

export const range: OperationParameter = {
  parameterPath: ["options", "range"],
  mapper: {
    serializedName: "x-ms-range",
    xmlName: "x-ms-range",
    type: {
      name: "String"
    }
  }
};

export const rangeGetContentMD5: OperationParameter = {
  parameterPath: ["options", "rangeGetContentMD5"],
  mapper: {
    serializedName: "x-ms-range-get-content-md5",
    xmlName: "x-ms-range-get-content-md5",
    type: {
      name: "Boolean"
    }
  }
};

export const fileContentLength1: OperationParameter = {
  parameterPath: ["options", "fileContentLength"],
  mapper: {
    serializedName: "x-ms-content-length",
    xmlName: "x-ms-content-length",
    type: {
      name: "Number"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/octet-stream",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: {
    serializedName: "body",
    xmlName: "body",
    type: {
      name: "Stream"
    }
  }
};

export const accept3: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/xml",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const comp11: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "range",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const range1: OperationParameter = {
  parameterPath: "range",
  mapper: {
    serializedName: "x-ms-range",
    required: true,
    xmlName: "x-ms-range",
    type: {
      name: "String"
    }
  }
};

export const fileRangeWrite: OperationParameter = {
  parameterPath: "fileRangeWrite",
  mapper: {
    defaultValue: "update",
    serializedName: "x-ms-write",
    required: true,
    xmlName: "x-ms-write",
    type: {
      name: "Enum",
      allowedValues: ["update", "clear"]
    }
  }
};

export const contentLength: OperationParameter = {
  parameterPath: "contentLength",
  mapper: {
    serializedName: "Content-Length",
    required: true,
    xmlName: "Content-Length",
    type: {
      name: "Number"
    }
  }
};

export const contentMD5: OperationParameter = {
  parameterPath: ["options", "contentMD5"],
  mapper: {
    serializedName: "Content-MD5",
    xmlName: "Content-MD5",
    type: {
      name: "ByteArray"
    }
  }
};

export const copySource: OperationParameter = {
  parameterPath: "copySource",
  mapper: {
    serializedName: "x-ms-copy-source",
    required: true,
    xmlName: "x-ms-copy-source",
    type: {
      name: "String"
    }
  }
};

export const sourceRange: OperationParameter = {
  parameterPath: ["options", "sourceRange"],
  mapper: {
    serializedName: "x-ms-source-range",
    xmlName: "x-ms-source-range",
    type: {
      name: "String"
    }
  }
};

export const fileRangeWriteFromUrl: OperationParameter = {
  parameterPath: "fileRangeWriteFromUrl",
  mapper: {
    defaultValue: "update",
    isConstant: true,
    serializedName: "x-ms-write",
    type: {
      name: "String"
    }
  }
};

export const sourceContentCrc64: OperationParameter = {
  parameterPath: ["options", "sourceContentCrc64"],
  mapper: {
    serializedName: "x-ms-source-content-crc64",
    xmlName: "x-ms-source-content-crc64",
    type: {
      name: "ByteArray"
    }
  }
};

export const sourceIfMatchCrc64: OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfMatchCrc64"
  ],
  mapper: {
    serializedName: "x-ms-source-if-match-crc64",
    xmlName: "x-ms-source-if-match-crc64",
    type: {
      name: "ByteArray"
    }
  }
};

export const sourceIfNoneMatchCrc64: OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfNoneMatchCrc64"
  ],
  mapper: {
    serializedName: "x-ms-source-if-none-match-crc64",
    xmlName: "x-ms-source-if-none-match-crc64",
    type: {
      name: "ByteArray"
    }
  }
};

export const copySourceAuthorization: OperationParameter = {
  parameterPath: ["options", "copySourceAuthorization"],
  mapper: {
    serializedName: "x-ms-copy-source-authorization",
    xmlName: "x-ms-copy-source-authorization",
    type: {
      name: "String"
    }
  }
};

export const comp12: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "rangelist",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const prevsharesnapshot: OperationQueryParameter = {
  parameterPath: ["options", "prevsharesnapshot"],
  mapper: {
    serializedName: "prevsharesnapshot",
    xmlName: "prevsharesnapshot",
    type: {
      name: "String"
    }
  }
};

export const filePermissionCopyMode: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "filePermissionCopyMode"],
  mapper: {
    serializedName: "x-ms-file-permission-copy-mode",
    xmlName: "x-ms-file-permission-copy-mode",
    type: {
      name: "Enum",
      allowedValues: ["source", "override"]
    }
  }
};

export const ignoreReadOnly: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "ignoreReadOnly"],
  mapper: {
    serializedName: "x-ms-file-copy-ignore-read-only",
    xmlName: "x-ms-file-copy-ignore-read-only",
    type: {
      name: "Boolean"
    }
  }
};

export const fileAttributes1: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "fileAttributes"],
  mapper: {
    serializedName: "x-ms-file-attributes",
    xmlName: "x-ms-file-attributes",
    type: {
      name: "String"
    }
  }
};

export const fileCreationTime: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "fileCreationTime"],
  mapper: {
    serializedName: "x-ms-file-creation-time",
    xmlName: "x-ms-file-creation-time",
    type: {
      name: "String"
    }
  }
};

export const fileLastWriteTime: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "fileLastWriteTime"],
  mapper: {
    serializedName: "x-ms-file-last-write-time",
    xmlName: "x-ms-file-last-write-time",
    type: {
      name: "String"
    }
  }
};

export const setArchiveAttribute: OperationParameter = {
  parameterPath: ["options", "copyFileSmbInfo", "setArchiveAttribute"],
  mapper: {
    serializedName: "x-ms-file-copy-set-archive",
    xmlName: "x-ms-file-copy-set-archive",
    type: {
      name: "Boolean"
    }
  }
};

export const comp13: OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    defaultValue: "copy",
    isConstant: true,
    serializedName: "comp",
    type: {
      name: "String"
    }
  }
};

export const copyId: OperationQueryParameter = {
  parameterPath: "copyId",
  mapper: {
    serializedName: "copyid",
    required: true,
    xmlName: "copyid",
    type: {
      name: "String"
    }
  }
};

export const copyActionAbortConstant: OperationParameter = {
  parameterPath: "copyActionAbortConstant",
  mapper: {
    defaultValue: "abort",
    isConstant: true,
    serializedName: "x-ms-copy-action",
    type: {
      name: "String"
    }
  }
};
