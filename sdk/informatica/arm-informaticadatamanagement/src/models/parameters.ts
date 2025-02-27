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
  InformaticaOrganizationResource as InformaticaOrganizationResourceMapper,
  InformaticaOrganizationResourceUpdate as InformaticaOrganizationResourceUpdateMapper,
  InformaticaServerlessRuntimeResource as InformaticaServerlessRuntimeResourceMapper,
  InformaticaServerlessRuntimeResourceUpdate as InformaticaServerlessRuntimeResourceUpdateMapper,
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
    defaultValue: "2024-05-08",
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

export const organizationName: OperationURLParameter = {
  parameterPath: "organizationName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9_-]*$"),
    },
    serializedName: "organizationName",
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
  mapper: InformaticaOrganizationResourceMapper,
};

export const properties: OperationParameter = {
  parameterPath: "properties",
  mapper: InformaticaOrganizationResourceUpdateMapper,
};

export const serverlessRuntimeName: OperationURLParameter = {
  parameterPath: "serverlessRuntimeName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9_-]*$"),
    },
    serializedName: "serverlessRuntimeName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resource1: OperationParameter = {
  parameterPath: "resource",
  mapper: InformaticaServerlessRuntimeResourceMapper,
};

export const properties1: OperationParameter = {
  parameterPath: "properties",
  mapper: InformaticaServerlessRuntimeResourceUpdateMapper,
};
