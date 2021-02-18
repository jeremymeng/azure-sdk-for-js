/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import { RequestBodyType } from "@azure/core-https";
import * as Models from "../models";
import * as Mappers from "../models/containerMappers";
import * as Parameters from "../models/parameters";
import { StorageClientContext } from "../storageClientContext";

/** Class representing a Container. */
export class Container {
  private readonly client: StorageClientContext;

  /**
   * Create a Container.
   * @param {StorageClientContext} client Reference to the service client.
   */
  constructor(client: StorageClientContext) {
    this.client = client;
  }

  /**
   * creates a new container under the specified account. If the container with the same name already
   * exists, the operation fails
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerCreateResponse>
   */
  create(options?: Models.ContainerCreateOptionalParams): Promise<Models.ContainerCreateResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      createOperationSpec) as Promise<Models.ContainerCreateResponse>;
  }

  /**
   * returns all user-defined metadata and system properties for the specified container. The data
   * returned does not include the container's list of blobs
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGetPropertiesResponse>
   */
  getProperties(options?: Models.ContainerGetPropertiesOptionalParams): Promise<Models.ContainerGetPropertiesResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getPropertiesOperationSpec) as Promise<Models.ContainerGetPropertiesResponse>;
  }

  /**
   * operation marks the specified container for deletion. The container and any blobs contained
   * within it are later deleted during garbage collection
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerDeleteResponse>
   */
  deleteMethod(options?: Models.ContainerDeleteMethodOptionalParams): Promise<Models.ContainerDeleteResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      deleteMethodOperationSpec) as Promise<Models.ContainerDeleteResponse>;
  }

  /**
   * operation sets one or more user-defined name-value pairs for the specified container.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerSetMetadataResponse>
   */
  setMetadata(options?: Models.ContainerSetMetadataOptionalParams): Promise<Models.ContainerSetMetadataResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      setMetadataOperationSpec) as Promise<Models.ContainerSetMetadataResponse>;
  }

  /**
   * gets the permissions for the specified container. The permissions indicate whether container
   * data may be accessed publicly.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGetAccessPolicyResponse>
   */
  getAccessPolicy(options?: Models.ContainerGetAccessPolicyOptionalParams): Promise<Models.ContainerGetAccessPolicyResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getAccessPolicyOperationSpec) as Promise<Models.ContainerGetAccessPolicyResponse>;
  }

  /**
   * sets the permissions for the specified container. The permissions indicate whether blobs in a
   * container may be accessed publicly.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerSetAccessPolicyResponse>
   */
  setAccessPolicy(options?: Models.ContainerSetAccessPolicyOptionalParams): Promise<Models.ContainerSetAccessPolicyResponse>{
    return this.client.sendOperationRequest(
      {
        options
      },
      setAccessPolicyOperationSpec) as Promise<Models.ContainerSetAccessPolicyResponse>;
  }

  /**
   * Restores a previously-deleted container.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerRestoreResponse>
   */
  restore(options?: Models.ContainerRestoreOptionalParams): Promise<Models.ContainerRestoreResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      restoreOperationSpec) as Promise<Models.ContainerRestoreResponse>;
  }

  /**
   * Renames an existing container.
   * @param sourceContainerName Required.  Specifies the name of the container to rename.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerRenameResponse>
   */
  rename(sourceContainerName: string, options?: Models.ContainerRenameOptionalParams): Promise<Models.ContainerRenameResponse> {
    return this.client.sendOperationRequest(
      {
        sourceContainerName,
        options
      },
      renameOperationSpec) as Promise<Models.ContainerRenameResponse>;
  }

  /**
   * The Batch operation allows multiple API calls to be embedded into a single HTTP request.
   * @param body Initial data
   * @param contentLength The length of the request.
   * @param multipartContentType Required. The value of this header must be multipart/mixed with a
   * batch boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerSubmitBatchResponse>
   */
  submitBatch(body: RequestBodyType, contentLength: number, multipartContentType: string, options?: Models.ContainerSubmitBatchOptionalParams): Promise<Models.ContainerSubmitBatchResponse> {
    return this.client.sendOperationRequest(
      {
        body,
        contentLength,
        multipartContentType,
        options
      },
      submitBatchOperationSpec) as Promise<Models.ContainerSubmitBatchResponse>;
  }

  /**
   * [Update] establishes and manages a lock on a container for delete operations. The lock duration
   * can be 15 to 60 seconds, or can be infinite
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerAcquireLeaseResponse>
   */
  acquireLease(options?: Models.ContainerAcquireLeaseOptionalParams): Promise<Models.ContainerAcquireLeaseResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      acquireLeaseOperationSpec) as Promise<Models.ContainerAcquireLeaseResponse>;
  }

  /**
   * [Update] establishes and manages a lock on a container for delete operations. The lock duration
   * can be 15 to 60 seconds, or can be infinite
   * @param leaseId Specifies the current lease ID on the resource.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerReleaseLeaseResponse>
   */
  releaseLease(leaseId: string, options?: Models.ContainerReleaseLeaseOptionalParams): Promise<Models.ContainerReleaseLeaseResponse> {
    return this.client.sendOperationRequest(
      {
        leaseId,
        options
      },
      releaseLeaseOperationSpec) as Promise<Models.ContainerReleaseLeaseResponse>;
  }

  /**
   * [Update] establishes and manages a lock on a container for delete operations. The lock duration
   * can be 15 to 60 seconds, or can be infinite
   * @param leaseId Specifies the current lease ID on the resource.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerRenewLeaseResponse>
   */
  renewLease(leaseId: string, options?: Models.ContainerRenewLeaseOptionalParams): Promise<Models.ContainerRenewLeaseResponse> {
    return this.client.sendOperationRequest(
      {
        leaseId,
        options
      },
      renewLeaseOperationSpec) as Promise<Models.ContainerRenewLeaseResponse>;
  }

  /**
   * [Update] establishes and manages a lock on a container for delete operations. The lock duration
   * can be 15 to 60 seconds, or can be infinite
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerBreakLeaseResponse>
   */
  breakLease(options?: Models.ContainerBreakLeaseOptionalParams): Promise<Models.ContainerBreakLeaseResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      breakLeaseOperationSpec) as Promise<Models.ContainerBreakLeaseResponse>;
  }

  /**
   * [Update] establishes and manages a lock on a container for delete operations. The lock duration
   * can be 15 to 60 seconds, or can be infinite
   * @param leaseId Specifies the current lease ID on the resource.
   * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
   * (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
   * (String) for a list of valid GUID string formats.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerChangeLeaseResponse>
   */
  changeLease(leaseId: string, proposedLeaseId: string, options?: Models.ContainerChangeLeaseOptionalParams): Promise<Models.ContainerChangeLeaseResponse> {
    return this.client.sendOperationRequest(
      {
        leaseId,
        proposedLeaseId,
        options
      },
      changeLeaseOperationSpec) as Promise<Models.ContainerChangeLeaseResponse>;
  }

  /**
   * [Update] The List Blobs operation returns a list of the blobs under the specified container
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerListBlobFlatSegmentResponse>
   */
  listBlobFlatSegment(options?: Models.ContainerListBlobFlatSegmentOptionalParams): Promise<Models.ContainerListBlobFlatSegmentResponse>{
    return this.client.sendOperationRequest(
      {
        options
      },
      listBlobFlatSegmentOperationSpec) as Promise<Models.ContainerListBlobFlatSegmentResponse>;
  }

  /**
   * [Update] The List Blobs operation returns a list of the blobs under the specified container
   * @param delimiter When the request includes this parameter, the operation returns a BlobPrefix
   * element in the response body that acts as a placeholder for all blobs whose names begin with the
   * same substring up to the appearance of the delimiter character. The delimiter may be a single
   * character or a string.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerListBlobHierarchySegmentResponse>
   */
  listBlobHierarchySegment(delimiter: string, options?: Models.ContainerListBlobHierarchySegmentOptionalParams): Promise<Models.ContainerListBlobHierarchySegmentResponse> {
    return this.client.sendOperationRequest(
      {
        delimiter,
        options
      },
      listBlobHierarchySegmentOperationSpec) as Promise<Models.ContainerListBlobHierarchySegmentResponse>;
  }

  /**
   * Returns the sku name and account kind
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGetAccountInfoResponse>
   */
  getAccountInfo(options?: OperationOptions): Promise<Models.ContainerGetAccountInfoResponse>{
    return this.client.sendOperationRequest(
      {
        options
      },
      getAccountInfoOperationSpec) as Promise<Models.ContainerGetAccountInfoResponse>;
  }
}

// Operation Specifications
const serializer = createSerializer(Mappers, true);
const createOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.metadata,
    Parameters.access,
    Parameters.version,
    Parameters.requestId,
    Parameters.defaultEncryptionScope,
    Parameters.preventEncryptionScopeOverride
  ],
  responses: {
    201: {
      headersMapper: Mappers.ContainerCreateHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerCreateHeaders
    }
  },
  isXML: true,
  serializer
};

const getPropertiesOperationSpec: OperationSpec = {
  httpMethod: "GET",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId0
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerGetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerGetPropertiesHeaders
    }
  },
  isXML: true,
  serializer
};

const deleteMethodOperationSpec: OperationSpec = {
  httpMethod: "DELETE",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId0,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    202: {
      headersMapper: Mappers.ContainerDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerDeleteHeaders
    }
  },
  isXML: true,
  serializer
};

const setMetadataOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp6
  ],
  headerParameters: [
    Parameters.metadata,
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId0,
    Parameters.ifModifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerSetMetadataHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerSetMetadataHeaders
    }
  },
  isXML: true,
  serializer
};

const getAccessPolicyOperationSpec: OperationSpec = {
  httpMethod: "GET",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp7
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId0
  ],
  responses: {
    200: {
      bodyMapper: {
        xmlElementName: "SignedIdentifier",
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SignedIdentifier"
            }
          }
        }
      },
      headersMapper: Mappers.ContainerGetAccessPolicyHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerGetAccessPolicyHeaders
    }
  },
  isXML: true,
  serializer
};

const setAccessPolicyOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp7
  ],
  headerParameters: [
    Parameters.access,
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId0,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  requestBody: {
    parameterPath: [
      "options",
      "containerAcl"
    ],
    mapper: {
      xmlName: "SignedIdentifiers",
      xmlElementName: "SignedIdentifier",
      serializedName: "containerAcl",
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
  },
  contentType: "application/xml; charset=utf-8",
  responses: {
    200: {
      headersMapper: Mappers.ContainerSetAccessPolicyHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerSetAccessPolicyHeaders
    }
  },
  isXML: true,
  serializer
};

const restoreOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp8
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.deletedContainerName,
    Parameters.deletedContainerVersion
  ],
  responses: {
    201: {
      headersMapper: Mappers.ContainerRestoreHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerRestoreHeaders
    }
  },
  isXML: true,
  serializer
};

const renameOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp9
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.sourceContainerName,
    Parameters.sourceLeaseId
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerRenameHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerRenameHeaders
    }
  },
  isXML: true,
  serializer
};

const submitBatchOperationSpec: OperationSpec = {
  httpMethod: "POST",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp4
  ],
  headerParameters: [
    Parameters.contentLength,
    Parameters.multipartContentType,
    Parameters.version,
    Parameters.requestId
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      required: true,
      serializedName: "body",
      type: {
        name: "Stream"
      }
    }
  },
  contentType: "application/xml; charset=utf-8",
  responses: {
    202: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Stream"
        }
      },
      headersMapper: Mappers.ContainerSubmitBatchHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerSubmitBatchHeaders
    }
  },
  isXML: true,
  serializer
};

const acquireLeaseOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp10,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.duration,
    Parameters.proposedLeaseId0,
    Parameters.version,
    Parameters.requestId,
    Parameters.action0,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    201: {
      headersMapper: Mappers.ContainerAcquireLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerAcquireLeaseHeaders
    }
  },
  isXML: true,
  serializer
};

const releaseLeaseOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp10,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.leaseId1,
    Parameters.version,
    Parameters.requestId,
    Parameters.action1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerReleaseLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerReleaseLeaseHeaders
    }
  },
  isXML: true,
  serializer
};

const renewLeaseOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp10,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.leaseId1,
    Parameters.version,
    Parameters.requestId,
    Parameters.action2,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerRenewLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerRenewLeaseHeaders
    }
  },
  isXML: true,
  serializer
};

const breakLeaseOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp10,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.breakPeriod,
    Parameters.version,
    Parameters.requestId,
    Parameters.action3,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    202: {
      headersMapper: Mappers.ContainerBreakLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerBreakLeaseHeaders
    }
  },
  isXML: true,
  serializer
};

const changeLeaseOperationSpec: OperationSpec = {
  httpMethod: "PUT",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp10,
    Parameters.restype2
  ],
  headerParameters: [
    Parameters.leaseId1,
    Parameters.proposedLeaseId1,
    Parameters.version,
    Parameters.requestId,
    Parameters.action4,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerChangeLeaseHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerChangeLeaseHeaders
    }
  },
  isXML: true,
  serializer
};

const listBlobFlatSegmentOperationSpec: OperationSpec = {
  httpMethod: "GET",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.prefix,
    Parameters.marker0,
    Parameters.maxPageSize,
    Parameters.include1,
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp2
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ListBlobsFlatSegmentResponse,
      headersMapper: Mappers.ContainerListBlobFlatSegmentHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerListBlobFlatSegmentHeaders
    }
  },
  isXML: true,
  serializer
};

const listBlobHierarchySegmentOperationSpec: OperationSpec = {
  httpMethod: "GET",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.prefix,
    Parameters.delimiter,
    Parameters.marker0,
    Parameters.maxPageSize,
    Parameters.include1,
    Parameters.timeoutInSeconds,
    Parameters.restype2,
    Parameters.comp2
  ],
  headerParameters: [
    Parameters.version,
    Parameters.requestId
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ListBlobsHierarchySegmentResponse,
      headersMapper: Mappers.ContainerListBlobHierarchySegmentHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerListBlobHierarchySegmentHeaders
    }
  },
  isXML: true,
  serializer
};

const getAccountInfoOperationSpec: OperationSpec = {
  httpMethod: "GET",
  path: "{containerName}",
  urlParameters: [
    Parameters.url
  ],
  queryParameters: [
    Parameters.restype1,
    Parameters.comp0
  ],
  headerParameters: [
    Parameters.version
  ],
  responses: {
    200: {
      headersMapper: Mappers.ContainerGetAccountInfoHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ContainerGetAccountInfoHeaders
    }
  },
  isXML: true,
  serializer
};
