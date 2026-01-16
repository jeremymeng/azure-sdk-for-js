// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface BlobContext extends Client {
  /** Specifies the version of the operation to use for this request. */
  version: string;
}

/** Optional parameters for the client. */
export interface BlobClientOptionalParams extends ClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

export function createBlob(
  endpointParam: string,
  credential: TokenCredential,
  options: BlobClientOptionalParams = {},
): BlobContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-storage-blob/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { version, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: { scopes: options.credentials?.scopes ?? ["https://storage.azure.com/.default"] },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version")) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${version}`;
      }

      return next(req);
    },
  });
  return { ...clientContext, version } as BlobContext;
}
