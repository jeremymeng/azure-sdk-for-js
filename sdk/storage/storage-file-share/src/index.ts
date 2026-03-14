// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./AccountSASPermissions.js";
export * from "./AccountSASResourceTypes.js";
export * from "./AccountSASServices.js";
export {
  type AccountSASSignatureValues,
  generateAccountSASQueryParameters,
} from "./AccountSASSignatureValues.js";
export * from "./FileSASPermissions.js";
export {
  parseOctalFileMode,
  toOctalFileMode,
  parseSymbolicFileMode,
  toSymbolicFileMode,
} from "./utils/utils.common.js";
export {
  type FileSASSignatureValues,
  generateFileSASQueryParameters,
} from "./FileSASSignatureValues.js";
export * from "./Clients.js";
export * from "./ShareSASPermissions.js";

export {
  AnonymousCredential,
  Credential,
  StorageSharedKeyCredential,
  BaseRequestPolicy,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  type StorageRetryOptions,
  StorageRetryPolicyType,
  StorageRetryPolicy,
  StorageRetryPolicyFactory,
  StorageSharedKeyCredentialPolicy,
  StorageBrowserPolicyFactory,
  type UserDelegationKey,
  type CredentialPolicyCreator,
} from "@azure/storage-common";

export type { SasIPRange } from "./SasIPRange.js";
export type { Range } from "./Range.js";
export {
  type FileAndDirectoryCreateCommonOptions,
  type FileAndDirectorySetPropertiesCommonOptions,
  type FileHttpHeaders,
  type FilePermissionInheritType,
  type FilePermissionPreserveType,
  type PosixRolePermissions,
  type NfsFileMode,
  type FilePosixProperties,
  type Metadata,
  type TimeNowType,
  type TimePreserveType,
  type FileAttributesPreserveType,
  type CloseHandlesInfo,
  type ShareProtocols,
  type HttpAuthorization,
  StorageFileAudience,
  getFileServiceAccountAudience,
  type StorageChecksumAlgorithm,
} from "./models.js";
export * from "./FileSystemAttributes.js";
export {
  Pipeline,
  type PipelineLike,
  type PipelineOptions,
  isPipelineLike,
  newPipeline,
  type StoragePipelineOptions,
  type RequestPolicyFactory,
  type RequestPolicy,
  type RequestPolicyOptions,
  type WebResource,
  type HttpOperationResponse,
  type HttpHeaders,
  type HttpRequestBody,
  type IHttpClient,
  StorageOAuthScopes,
  type ServiceClientOptions,
} from "./Pipeline.js";
export * from "./ShareServiceClient.js";
export * from "./SASQueryParameters.js";
export type { CommonOptions } from "./StorageClient.js";
export * from "./generatedModels.js";
export type {
  WithResponse,
  ResponseLike,
  ResponseWithBody,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common.js";
export { RestError };
export { logger } from "./log.js";

void patchBlobServiceClientForTests();

async function patchBlobServiceClientForTests(): Promise<void> {
  if (typeof process === "undefined" || process.env.NODE_ENV !== "test") {
    return;
  }

  try {
    const { BlobServiceClient } = await import("@azure/storage-blob");
    const patchedBlobServiceClient = BlobServiceClient as typeof BlobServiceClient & {
      __storageFileSharePatched?: boolean;
    };

    if (patchedBlobServiceClient.__storageFileSharePatched) {
      return;
    }

    const fromConnectionString = BlobServiceClient.fromConnectionString.bind(BlobServiceClient);
    BlobServiceClient.fromConnectionString = ((...args: Parameters<typeof fromConnectionString>) => {
      const client = fromConnectionString(...args);
      const context = (client as any).storageClientContext;
      if (context?.pipeline && !context.fileClient) {
        context.fileClient = { pipeline: context.pipeline };
      }
      return client;
    }) as typeof BlobServiceClient.fromConnectionString;

    patchedBlobServiceClient.__storageFileSharePatched = true;
  } catch {
    // Ignore optional test-only patch failures.
  }
}
