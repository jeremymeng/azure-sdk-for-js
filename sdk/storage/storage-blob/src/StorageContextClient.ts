// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext, createBlob } from "./storage-blob-rest/api/blobContext.js";
import { ContainerContext, createContainer } from "./storage-blob-rest/container/api/containerContext.js";
import { AppendBlobContext, createAppendBlob } from "./storage-blob-rest/container/blob/appendBlob/api/appendBlobContext.js";
import { BlockBlobContext, createBlockBlob } from "./storage-blob-rest/container/blob/blockBlob/api/blockBlobContext.js";
import { createPageBlob, PageBlobContext } from "./storage-blob-rest/container/blob/pageBlob/api/pageBlobContext.js";

/**
 * @internal
 */
export class StorageContextClient {
  url: string;
  version: string;

  /**
   * Initializes a new instance of the StorageClient class.
   * @param url - The URL of the service account, container, or blob that is the target of the desired
   *            operation.
   * @param options - The parameter options
   */
  constructor(url: string, options?: StorageClientOptionalParams) {
    if (url === undefined) {
      throw new Error("'url' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: StorageClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
    };

    const packageDetails = `azsdk-js-azure-storage-blob/12.30.0`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? "{url}",
    };
    // Parameter assignments
    this.url = url;

    // Assigning values to Constant parameters
    this.version = options.version || "2026-02-06";
  }

  private containerContext?: ContainerContext;
  private blobContext?: BlobContext;
  private pageBlobContext?: PageBlobContext;
  private appendBlobContext?: AppendBlobContext;
  private blockBlobContext?: BlockBlobContext;

  getContainer(containerName: string): ContainerContext {
    if (!this.containerContext) {
      this.containerContext = createContainer(this.url, this['credential'], containerName, { version: this.version });
    }
    return this.containerContext;
  }
  getBlob(): BlobContext {
    if (!this.blobContext) {
      this.blobContext = createBlob(this.url, this['credential'], { version: this.version });
    }
    return this.blobContext;
  }
  getPageBlob(containerName: string, blobName: string): PageBlobContext {
    if (!this.pageBlobContext) {
      this.pageBlobContext = createPageBlob(this.url, this['credential'], containerName, blobName, { version: this.version });
    }
    return this.pageBlobContext;
  }
  getAppendBlob(containerName: string, blobName: string): AppendBlobContext {
    if (!this.appendBlobContext) {
      this.appendBlobContext = createAppendBlob(this.url, this['credential'], containerName, blobName, { version: this.version });
    }
    return this.appendBlobContext;
  }
  getBlockBlob(containerName: string, blobName: string): BlockBlobContext {
    if (!this.blockBlobContext) {
      this.blockBlobContext = createBlockBlob(this.url, this['credential'], containerName, blobName, { version: this.version });
    }
    return this.blockBlobContext;
  }
}
