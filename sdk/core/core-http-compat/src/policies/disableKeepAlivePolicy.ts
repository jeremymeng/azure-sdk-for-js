// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  type Pipeline,
  type PipelinePolicy,
  type PipelineRequest,
  type PipelineResponse,
  type SendRequest,
} from "@azure/core-rest-pipeline";

export const disableKeepAlivePolicyName = "DisableKeepAlivePolicy";

export function createDisableKeepAlivePolicy(): PipelinePolicy {
  return {
    name: disableKeepAlivePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.disableKeepAlive = true;
      return next(request);
    },
  };
}

/**
 * @internal
 */
export function pipelineContainsDisableKeepAlivePolicy(pipeline: Pipeline): boolean {
  return pipeline.getOrderedPolicies().some((policy) => policy.name === disableKeepAlivePolicyName);
}
