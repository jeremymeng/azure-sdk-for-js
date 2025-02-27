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
  OperationQueryParameter
} from "@azure/core-client";
import {
  Solution as SolutionMapper,
  SolutionPatch as SolutionPatchMapper,
  ManagementAssociation as ManagementAssociationMapper,
  ManagementConfiguration as ManagementConfigurationMapper
} from "../models/mappers.js";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: SolutionMapper
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-\\w\\._\\(\\)]+$"),
      MaxLength: 90,
      MinLength: 1
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2015-11-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const solutionName: OperationURLParameter = {
  parameterPath: "solutionName",
  mapper: {
    serializedName: "solutionName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: SolutionPatchMapper
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: ManagementAssociationMapper
};

export const providerName: OperationURLParameter = {
  parameterPath: "providerName",
  mapper: {
    serializedName: "providerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceType: OperationURLParameter = {
  parameterPath: "resourceType",
  mapper: {
    serializedName: "resourceType",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceName: OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    serializedName: "resourceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const managementAssociationName: OperationURLParameter = {
  parameterPath: "managementAssociationName",
  mapper: {
    serializedName: "managementAssociationName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: ManagementConfigurationMapper
};

export const managementConfigurationName: OperationURLParameter = {
  parameterPath: "managementConfigurationName",
  mapper: {
    serializedName: "managementConfigurationName",
    required: true,
    type: {
      name: "String"
    }
  }
};
