/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ComponentPolicyStates } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { PolicyInsightsClient } from "../policyInsightsClient";
import {
  ComponentPolicyStatesResource,
  ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionResponse,
  ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceGroupResponse,
  ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceResponse,
  ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ComponentPolicyStatesListQueryResultsForPolicyDefinitionResponse,
  ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentResponse,
  ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentResponse
} from "../models";

/** Class containing ComponentPolicyStates operations. */
export class ComponentPolicyStatesImpl implements ComponentPolicyStates {
  private readonly client: PolicyInsightsClient;

  /**
   * Initialize a new instance of the class ComponentPolicyStates class.
   * @param client Reference to the service client
   */
  constructor(client: PolicyInsightsClient) {
    this.client = client;
  }

  /**
   * Queries component policy states under subscription scope.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForSubscription(
    subscriptionId: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams
  ): Promise<ComponentPolicyStatesListQueryResultsForSubscriptionResponse> {
    return this.client.sendOperationRequest(
      { subscriptionId, componentPolicyStatesResource, options },
      listQueryResultsForSubscriptionOperationSpec
    );
  }

  /**
   * Queries component policy states under resource group scope.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForResourceGroup(
    subscriptionId: string,
    resourceGroupName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams
  ): Promise<ComponentPolicyStatesListQueryResultsForResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        componentPolicyStatesResource,
        options
      },
      listQueryResultsForResourceGroupOperationSpec
    );
  }

  /**
   * Queries component policy states for the resource.
   * @param resourceId Resource ID.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForResource(
    resourceId: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceOptionalParams
  ): Promise<ComponentPolicyStatesListQueryResultsForResourceResponse> {
    return this.client.sendOperationRequest(
      { resourceId, componentPolicyStatesResource, options },
      listQueryResultsForResourceOperationSpec
    );
  }

  /**
   * Queries component policy states for the subscription level policy definition.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyDefinitionName Policy definition name.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForPolicyDefinition(
    subscriptionId: string,
    policyDefinitionName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams
  ): Promise<ComponentPolicyStatesListQueryResultsForPolicyDefinitionResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        policyDefinitionName,
        componentPolicyStatesResource,
        options
      },
      listQueryResultsForPolicyDefinitionOperationSpec
    );
  }

  /**
   * Queries component policy states for the subscription level policy assignment.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param policyAssignmentName Policy assignment name.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForSubscriptionLevelPolicyAssignment(
    subscriptionId: string,
    policyAssignmentName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams
  ): Promise<
    ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentResponse
  > {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        policyAssignmentName,
        componentPolicyStatesResource,
        options
      },
      listQueryResultsForSubscriptionLevelPolicyAssignmentOperationSpec
    );
  }

  /**
   * Queries component policy states for the resource group level policy assignment.
   * @param subscriptionId Microsoft Azure subscription ID.
   * @param resourceGroupName Resource group name.
   * @param policyAssignmentName Policy assignment name.
   * @param componentPolicyStatesResource The virtual resource under ComponentPolicyStates resource type.
   *                                      In a given time range, 'latest' represents the latest component policy state(s).
   * @param options The options parameters.
   */
  listQueryResultsForResourceGroupLevelPolicyAssignment(
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams
  ): Promise<
    ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentResponse
  > {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        componentPolicyStatesResource,
        options
      },
      listQueryResultsForResourceGroupLevelPolicyAssignmentOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listQueryResultsForSubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.componentPolicyStatesResource
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listQueryResultsForResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId1,
    Parameters.componentPolicyStatesResource
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listQueryResultsForResourceOperationSpec: coreClient.OperationSpec = {
  path:
    "/{resourceId}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1,
    Parameters.expand1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceId,
    Parameters.componentPolicyStatesResource
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listQueryResultsForPolicyDefinitionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyDefinitions/{policyDefinitionName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.authorizationNamespace,
    Parameters.componentPolicyStatesResource,
    Parameters.policyDefinitionName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listQueryResultsForSubscriptionLevelPolicyAssignmentOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.authorizationNamespace,
    Parameters.componentPolicyStatesResource,
    Parameters.policyAssignmentName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listQueryResultsForResourceGroupLevelPolicyAssignmentOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/componentPolicyStates/{componentPolicyStatesResource}/queryResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentPolicyStatesQueryResults
    },
    default: {
      bodyMapper: Mappers.ErrorResponseAutoGenerated
    }
  },
  queryParameters: [
    Parameters.apiVersion4,
    Parameters.top1,
    Parameters.orderBy1,
    Parameters.select1,
    Parameters.from1,
    Parameters.to1,
    Parameters.filter1,
    Parameters.apply1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId1,
    Parameters.authorizationNamespace,
    Parameters.componentPolicyStatesResource,
    Parameters.policyAssignmentName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
