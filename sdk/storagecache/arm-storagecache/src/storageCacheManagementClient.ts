/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  AmlFilesystemsImpl,
  OperationsImpl,
  SkusImpl,
  UsageModelsImpl,
  AscOperationsImpl,
  AscUsagesImpl,
  CachesImpl,
  StorageTargetsImpl,
  StorageTargetOperationsImpl
} from "./operations";
import {
  AmlFilesystems,
  Operations,
  Skus,
  UsageModels,
  AscOperations,
  AscUsages,
  Caches,
  StorageTargets,
  StorageTargetOperations
} from "./operationsInterfaces";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import {
  StorageCacheManagementClientOptionalParams,
  CheckAmlFSSubnetsOptionalParams,
  GetRequiredAmlFSSubnetsSizeOptionalParams,
  GetRequiredAmlFSSubnetsSizeResponse
} from "./models";

export class StorageCacheManagementClient extends coreClient.ServiceClient {
  $host: string;
  apiVersion: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the StorageCacheManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: StorageCacheManagementClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: StorageCacheManagementClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials
    };

    const packageDetails = `azsdk-js-arm-storagecache/7.1.0-beta.2`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com"
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge
          }
        })
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.apiVersion = options.apiVersion || "2023-11-01-preview";
    this.amlFilesystems = new AmlFilesystemsImpl(this);
    this.operations = new OperationsImpl(this);
    this.skus = new SkusImpl(this);
    this.usageModels = new UsageModelsImpl(this);
    this.ascOperations = new AscOperationsImpl(this);
    this.ascUsages = new AscUsagesImpl(this);
    this.caches = new CachesImpl(this);
    this.storageTargets = new StorageTargetsImpl(this);
    this.storageTargetOperations = new StorageTargetOperationsImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      }
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  /**
   * Check that subnets will be valid for AML file system create calls.
   * @param options The options parameters.
   */
  checkAmlFSSubnets(options?: CheckAmlFSSubnetsOptionalParams): Promise<void> {
    return this.sendOperationRequest(
      { options },
      checkAmlFSSubnetsOperationSpec
    );
  }

  /**
   * Get the number of available IP addresses needed for the AML file system information provided.
   * @param options The options parameters.
   */
  getRequiredAmlFSSubnetsSize(
    options?: GetRequiredAmlFSSubnetsSizeOptionalParams
  ): Promise<GetRequiredAmlFSSubnetsSizeResponse> {
    return this.sendOperationRequest(
      { options },
      getRequiredAmlFSSubnetsSizeOperationSpec
    );
  }

  amlFilesystems: AmlFilesystems;
  operations: Operations;
  skus: Skus;
  usageModels: UsageModels;
  ascOperations: AscOperations;
  ascUsages: AscUsages;
  caches: Caches;
  storageTargets: StorageTargets;
  storageTargetOperations: StorageTargetOperations;
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const checkAmlFSSubnetsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/checkAmlFSSubnets",
  httpMethod: "POST",
  responses: {
    200: {},
    400: {
      bodyMapper: Mappers.AmlFilesystemCheckSubnetError,
      isError: true
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.amlFilesystemSubnetInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getRequiredAmlFSSubnetsSizeOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/getRequiredAmlFSSubnetsSize",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RequiredAmlFilesystemSubnetsSize
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.requiredAMLFilesystemSubnetsSizeInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
