/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  PoliciesImpl,
  ManagedRuleSetsImpl,
  FrontDoorNameAvailabilityImpl,
  FrontDoorNameAvailabilityWithSubscriptionImpl,
  FrontDoorsImpl,
  FrontendEndpointsImpl,
  EndpointsImpl,
  RulesEnginesImpl,
  NetworkExperimentProfilesImpl,
  PreconfiguredEndpointsImpl,
  ExperimentsImpl,
  ReportsImpl,
} from "./operations/index.js";
import {
  Policies,
  ManagedRuleSets,
  FrontDoorNameAvailability,
  FrontDoorNameAvailabilityWithSubscription,
  FrontDoors,
  FrontendEndpoints,
  Endpoints,
  RulesEngines,
  NetworkExperimentProfiles,
  PreconfiguredEndpoints,
  Experiments,
  Reports,
} from "./operationsInterfaces/index.js";
import { FrontDoorManagementClientOptionalParams } from "./models/index.js";

export class FrontDoorManagementClient extends coreClient.ServiceClient {
  $host: string;
  subscriptionId?: string;

  /**
   * Initializes a new instance of the FrontDoorManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The subscription credentials which uniquely identify the Microsoft Azure
   *                       subscription. The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: FrontDoorManagementClientOptionalParams,
  );
  constructor(
    credentials: coreAuth.TokenCredential,
    options?: FrontDoorManagementClientOptionalParams,
  );
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionIdOrOptions?: FrontDoorManagementClientOptionalParams | string,
    options?: FrontDoorManagementClientOptionalParams,
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }

    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: FrontDoorManagementClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-arm-frontdoor/5.3.1`;
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
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.policies = new PoliciesImpl(this);
    this.managedRuleSets = new ManagedRuleSetsImpl(this);
    this.frontDoorNameAvailability = new FrontDoorNameAvailabilityImpl(this);
    this.frontDoorNameAvailabilityWithSubscription =
      new FrontDoorNameAvailabilityWithSubscriptionImpl(this);
    this.frontDoors = new FrontDoorsImpl(this);
    this.frontendEndpoints = new FrontendEndpointsImpl(this);
    this.endpoints = new EndpointsImpl(this);
    this.rulesEngines = new RulesEnginesImpl(this);
    this.networkExperimentProfiles = new NetworkExperimentProfilesImpl(this);
    this.preconfiguredEndpoints = new PreconfiguredEndpointsImpl(this);
    this.experiments = new ExperimentsImpl(this);
    this.reports = new ReportsImpl(this);
  }

  policies: Policies;
  managedRuleSets: ManagedRuleSets;
  frontDoorNameAvailability: FrontDoorNameAvailability;
  frontDoorNameAvailabilityWithSubscription: FrontDoorNameAvailabilityWithSubscription;
  frontDoors: FrontDoors;
  frontendEndpoints: FrontendEndpoints;
  endpoints: Endpoints;
  rulesEngines: RulesEngines;
  networkExperimentProfiles: NetworkExperimentProfiles;
  preconfiguredEndpoints: PreconfiguredEndpoints;
  experiments: Experiments;
  reports: Reports;
}
