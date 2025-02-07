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
  ForceState as ForceStateMapper,
  Tags as TagsMapper,
  AzureBareMetalStorageInstance as AzureBareMetalStorageInstanceMapper
} from "../models/mappers.js";

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

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2023-08-04-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
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

export const azureBareMetalInstanceName: OperationURLParameter = {
  parameterPath: "azureBareMetalInstanceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z0-9]+$")
    },
    serializedName: "azureBareMetalInstanceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

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

export const forceParameter: OperationParameter = {
  parameterPath: ["options", "forceParameter"],
  mapper: ForceStateMapper
};

export const tagsParameter: OperationParameter = {
  parameterPath: "tagsParameter",
  mapper: TagsMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const azureBareMetalStorageInstanceName: OperationURLParameter = {
  parameterPath: "azureBareMetalStorageInstanceName",
  mapper: {
    constraints: {
      Pattern: new RegExp(".*")
    },
    serializedName: "azureBareMetalStorageInstanceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const requestBodyParameters: OperationParameter = {
  parameterPath: "requestBodyParameters",
  mapper: AzureBareMetalStorageInstanceMapper
};
