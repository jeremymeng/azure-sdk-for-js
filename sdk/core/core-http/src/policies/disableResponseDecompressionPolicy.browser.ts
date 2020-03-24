// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 */
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from './requestPolicy';
import { WebResource } from '../webResource';
import { HttpOperationResponse } from '../httpOperationResponse';

const DisbleResponseDecompressionNotSupportedInBrowser = new Error("DisableResponseDecompressionPolicy is not supported in browser environment");

export interface CompressOptions {
  enable: boolean;
}

export function disableResponseDecompressionPolicy(_compressOptions?: CompressOptions) {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      throw DisbleResponseDecompressionNotSupportedInBrowser;
    }
  };
}

export class DisableResponseDecompressionPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
  ) {
    super(nextPolicy, options);
    throw DisbleResponseDecompressionNotSupportedInBrowser;
  }

  public async sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
    throw DisbleResponseDecompressionNotSupportedInBrowser;
  }
}
