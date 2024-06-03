// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type KeyCredential } from "../auth/keyCredential.js";
import { type PipelineRequest, type PipelineResponse, type SendRequest } from "../interfaces.js";
import { type PipelinePolicy } from "../pipeline.js";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";

export function keyCredentialAuthenticationPolicy(
  credential: KeyCredential,
  apiKeyHeaderName: string,
): PipelinePolicy {
  return {
    name: keyCredentialAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set(apiKeyHeaderName, credential.key);
      return next(request);
    },
  };
}
