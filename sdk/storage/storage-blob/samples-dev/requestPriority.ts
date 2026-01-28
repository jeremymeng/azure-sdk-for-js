// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnonymousCredential,
  ContainerClient,
  BaseRequestPolicy,
  newPipeline,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse,
} from "../src/index.js";

class MyPolicyFactory {
  constructor(private priority: "high" | "low" | "auto") {
    this.priority = priority;
  }
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPriorityPolicy {
    return new RequestPriorityPolicy(nextPolicy, options, this.priority);
  }
}

class RequestPriorityPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private priority: "high" | "low" | "auto",
  ) {
    super(nextPolicy, options);
  }
  async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.requestOverrides = { priority: this.priority };
    const response = await this._nextPolicy.sendRequest(request);

    return response;
  }
}

const containerUrl = "<container sas url>";
async function main() {
  const pipeline = newPipeline(new AnonymousCredential());
  // add our policy factory
  pipeline.factories.unshift(new MyPolicyFactory("low"));

  const containerClient = new ContainerClient(containerUrl, pipeline);
  const properties = await containerClient.getProperties();
  console.log("Container properties:", properties);
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
