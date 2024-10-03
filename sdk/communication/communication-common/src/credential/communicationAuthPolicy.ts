// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy} from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential} from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { createCommunicationAccessKeyCredentialPolicy } from "./communicationAccessKeyCredentialPolicy";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export function createCommunicationAuthPolicy(
  credential: KeyCredential | TokenCredential,
): PipelinePolicy {
  if (isTokenCredential(credential)) {
    const policyOptions: BearerTokenAuthenticationPolicyOptions = {
      credential: credential,
      scopes: ["https://communication.azure.com//.default"],
    };
    return bearerTokenAuthenticationPolicy(policyOptions);
  } else {
    return createCommunicationAccessKeyCredentialPolicy(credential);
  }
}
