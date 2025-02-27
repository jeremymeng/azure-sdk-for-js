/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";
import {
  ManagedCluster as ManagedClusterMapper,
  TagsObject as TagsObjectMapper,
  ManagedClusterServicePrincipalProfile as ManagedClusterServicePrincipalProfileMapper,
  ManagedClusterAADProfile as ManagedClusterAADProfileMapper,
  RunCommandRequest as RunCommandRequestMapper,
  MaintenanceConfiguration as MaintenanceConfigurationMapper,
  AgentPool as AgentPoolMapper,
  AgentPoolDeleteMachinesParameter as AgentPoolDeleteMachinesParameterMapper,
  PrivateEndpointConnection as PrivateEndpointConnectionMapper,
  PrivateLinkResource as PrivateLinkResourceMapper,
  Snapshot as SnapshotMapper,
  TrustedAccessRoleBinding as TrustedAccessRoleBindingMapper,
} from "../models/mappers.js";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2024-10-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "Uuid",
    },
  },
};

export const location: OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "location",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1,
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resourceName: OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    constraints: {
      Pattern: new RegExp(
        "^[a-zA-Z0-9]$|^[a-zA-Z0-9][-_a-zA-Z0-9]{0,61}[a-zA-Z0-9]$",
      ),
      MaxLength: 63,
      MinLength: 1,
    },
    serializedName: "resourceName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const roleName: OperationURLParameter = {
  parameterPath: "roleName",
  mapper: {
    serializedName: "roleName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const serverFqdn: OperationQueryParameter = {
  parameterPath: ["options", "serverFqdn"],
  mapper: {
    serializedName: "server-fqdn",
    type: {
      name: "String",
    },
  },
};

export const format: OperationQueryParameter = {
  parameterPath: ["options", "format"],
  mapper: {
    serializedName: "format",
    type: {
      name: "String",
    },
  },
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: ManagedClusterMapper,
};

export const ifMatch: OperationParameter = {
  parameterPath: ["options", "ifMatch"],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String",
    },
  },
};

export const ifNoneMatch: OperationParameter = {
  parameterPath: ["options", "ifNoneMatch"],
  mapper: {
    serializedName: "If-None-Match",
    type: {
      name: "String",
    },
  },
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: TagsObjectMapper,
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: ManagedClusterServicePrincipalProfileMapper,
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: ManagedClusterAADProfileMapper,
};

export const requestPayload: OperationParameter = {
  parameterPath: "requestPayload",
  mapper: RunCommandRequestMapper,
};

export const commandId: OperationURLParameter = {
  parameterPath: "commandId",
  mapper: {
    serializedName: "commandId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const mode: OperationURLParameter = {
  parameterPath: "mode",
  mapper: {
    constraints: {
      Pattern: new RegExp(
        "^[a-zA-Z0-9]$|^[a-zA-Z0-9][-_a-zA-Z0-9]{0,61}[a-zA-Z0-9]$",
      ),
      MaxLength: 24,
      MinLength: 1,
    },
    serializedName: "mode",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const configName: OperationURLParameter = {
  parameterPath: "configName",
  mapper: {
    serializedName: "configName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: MaintenanceConfigurationMapper,
};

export const agentPoolName: OperationURLParameter = {
  parameterPath: "agentPoolName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z][a-z0-9]{0,11}$"),
      MaxLength: 12,
      MinLength: 1,
    },
    serializedName: "agentPoolName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: AgentPoolMapper,
};

export const ignorePodDisruptionBudget: OperationQueryParameter = {
  parameterPath: ["options", "ignorePodDisruptionBudget"],
  mapper: {
    serializedName: "ignore-pod-disruption-budget",
    type: {
      name: "Boolean",
    },
  },
};

export const machines: OperationParameter = {
  parameterPath: "machines",
  mapper: AgentPoolDeleteMachinesParameterMapper,
};

export const privateEndpointConnectionName: OperationURLParameter = {
  parameterPath: "privateEndpointConnectionName",
  mapper: {
    serializedName: "privateEndpointConnectionName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters6: OperationParameter = {
  parameterPath: "parameters",
  mapper: PrivateEndpointConnectionMapper,
};

export const parameters7: OperationParameter = {
  parameterPath: "parameters",
  mapper: PrivateLinkResourceMapper,
};

export const parameters8: OperationParameter = {
  parameterPath: "parameters",
  mapper: SnapshotMapper,
};

export const trustedAccessRoleBindingName: OperationURLParameter = {
  parameterPath: "trustedAccessRoleBindingName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^([A-Za-z0-9-])+$"),
      MaxLength: 24,
      MinLength: 1,
    },
    serializedName: "trustedAccessRoleBindingName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const trustedAccessRoleBinding: OperationParameter = {
  parameterPath: "trustedAccessRoleBinding",
  mapper: TrustedAccessRoleBindingMapper,
};

export const machineName: OperationURLParameter = {
  parameterPath: "machineName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9][-_a-zA-Z0-9]{0,39}$"),
    },
    serializedName: "machineName",
    required: true,
    type: {
      name: "String",
    },
  },
};
