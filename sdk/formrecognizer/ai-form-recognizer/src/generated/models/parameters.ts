/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";

export const trainRequest: coreHttp.OperationParameter = {
  parameterPath: "trainRequest",
  mapper: Mappers.TrainRequest
};

export const endpoint: coreHttp.OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "endpoint",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const op: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "op"],
  mapper: {
    defaultValue: "full",
    serializedName: "op",
    type: {
      name: "String"
    }
  }
};

export const modelId: coreHttp.OperationURLParameter = {
  parameterPath: "modelId",
  mapper: {
    serializedName: "modelId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const includeKeys: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "includeKeys"],
  mapper: {
    serializedName: "includeKeys",
    type: {
      name: "Boolean"
    }
  }
};

export const contentType: coreHttp.OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    serializedName: "Content-Type",
    type: {
      name: "Enum",
      allowedValues: [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/tiff"
      ]
    }
  }
};

export const fileStream: coreHttp.OperationParameter = {
  parameterPath: ["options", "fileStream"],
  mapper: {
    serializedName: "fileStream",
    type: {
      name: "Stream"
    }
  }
};

export const fileStream1: coreHttp.OperationParameter = {
  parameterPath: ["options", "fileStream"],
  mapper: Mappers.SourcePath
};

export const includeTextDetails: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "includeTextDetails"],
  mapper: {
    serializedName: "includeTextDetails",
    type: {
      name: "Boolean"
    }
  }
};

export const resultId: coreHttp.OperationURLParameter = {
  parameterPath: "resultId",
  mapper: {
    serializedName: "resultId",
    required: true,
    type: {
      name: "Uuid"
    }
  }
};

export const nextLink: coreHttp.OperationURLParameter = {
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
