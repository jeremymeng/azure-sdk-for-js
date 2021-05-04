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
} from "@azure/core-http";
import {
  DetectRequest as DetectRequestMapper,
  DetectChangePointRequest as DetectChangePointRequestMapper,
  ModelInfo as ModelInfoMapper,
  DetectionRequest as DetectionRequestMapper
} from "../models/mappers";

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

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: DetectRequestMapper
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

export const endpoint: OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "Endpoint",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const body1: OperationParameter = {
  parameterPath: "body",
  mapper: DetectChangePointRequestMapper
};

export const modelRequest: OperationParameter = {
  parameterPath: "modelRequest",
  mapper: ModelInfoMapper
};

export const modelId: OperationURLParameter = {
  parameterPath: "modelId",
  mapper: {
    serializedName: "modelId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const detectionRequest: OperationParameter = {
  parameterPath: "detectionRequest",
  mapper: DetectionRequestMapper
};

export const resultId: OperationURLParameter = {
  parameterPath: "resultId",
  mapper: {
    serializedName: "resultId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const accept1: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/zip",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "$skip",
    type: {
      name: "Number"
    }
  }
};

export const top: OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    defaultValue: 5,
    serializedName: "$top",
    type: {
      name: "Number"
    }
  }
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
