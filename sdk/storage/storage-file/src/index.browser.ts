// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RestError } from "@azure/core-http";

import * as Models from "../src/generated/lib/models";

export * from "./Aborter";
export * from "./ShareClient";
export * from "./DirectoryClient";
export * from "./FileClient";
export * from "./credentials/AnonymousCredential";
export * from "./credentials/Credential";
export { IPRange as IPRange } from "./IPRange";
export { Range } from "./Range";
export * from "./Pipeline";
export * from "./policies/AnonymousCredentialPolicy";
export * from "./policies/CredentialPolicy";
export * from "./RetryPolicyFactory";
export * from "./LoggingPolicyFactory";
export * from "./TelemetryPolicyFactory";
export * from "./UniqueRequestIDPolicyFactory";
export * from "./BrowserPolicyFactory";
export * from "./FileServiceClient";
export { Models, RestError };

// async iterator polyfill.
if (typeof Symbol === undefined || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}
