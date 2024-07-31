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
  ImageTemplate as ImageTemplateMapper,
  ImageTemplateUpdateParameters as ImageTemplateUpdateParametersMapper,
  Trigger as TriggerMapper,
} from "../models/mappers";

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

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2024-02-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    serializedName: "resourceGroupName",
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

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: ImageTemplateMapper,
};

export const imageTemplateName: OperationURLParameter = {
  parameterPath: "imageTemplateName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9-_.]{1,64}$"),
    },
    serializedName: "imageTemplateName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: ImageTemplateUpdateParametersMapper,
};

export const runOutputName: OperationURLParameter = {
  parameterPath: "runOutputName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9-_.]{1,64}$"),
    },
    serializedName: "runOutputName",
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

export const triggerName: OperationURLParameter = {
  parameterPath: "triggerName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9-_.]{1,64}$"),
    },
    serializedName: "triggerName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: TriggerMapper,
};
