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
  Fleet as FleetMapper,
  FleetPatch as FleetPatchMapper,
  AutoUpgradeProfile as AutoUpgradeProfileMapper,
  FleetMember as FleetMemberMapper,
  FleetMemberUpdate as FleetMemberUpdateMapper,
  UpdateRun as UpdateRunMapper,
  SkipProperties as SkipPropertiesMapper,
  FleetUpdateStrategy as FleetUpdateStrategyMapper,
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
    defaultValue: "2024-05-02-preview",
    isConstant: true,
    serializedName: "api-version",
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

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "subscriptionId",
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

export const fleetName: OperationURLParameter = {
  parameterPath: "fleetName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"),
      MaxLength: 63,
      MinLength: 1,
    },
    serializedName: "fleetName",
    required: true,
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

export const resource: OperationParameter = {
  parameterPath: "resource",
  mapper: FleetMapper,
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

export const properties: OperationParameter = {
  parameterPath: "properties",
  mapper: FleetPatchMapper,
};

export const autoUpgradeProfileName: OperationURLParameter = {
  parameterPath: "autoUpgradeProfileName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"),
      MaxLength: 50,
      MinLength: 1,
    },
    serializedName: "autoUpgradeProfileName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resource1: OperationParameter = {
  parameterPath: "resource",
  mapper: AutoUpgradeProfileMapper,
};

export const fleetMemberName: OperationURLParameter = {
  parameterPath: "fleetMemberName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"),
      MaxLength: 50,
      MinLength: 1,
    },
    serializedName: "fleetMemberName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resource2: OperationParameter = {
  parameterPath: "resource",
  mapper: FleetMemberMapper,
};

export const properties1: OperationParameter = {
  parameterPath: "properties",
  mapper: FleetMemberUpdateMapper,
};

export const updateRunName: OperationURLParameter = {
  parameterPath: "updateRunName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"),
      MaxLength: 50,
      MinLength: 1,
    },
    serializedName: "updateRunName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resource3: OperationParameter = {
  parameterPath: "resource",
  mapper: UpdateRunMapper,
};

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: SkipPropertiesMapper,
};

export const updateStrategyName: OperationURLParameter = {
  parameterPath: "updateStrategyName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"),
      MaxLength: 50,
      MinLength: 1,
    },
    serializedName: "updateStrategyName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resource4: OperationParameter = {
  parameterPath: "resource",
  mapper: FleetUpdateStrategyMapper,
};
