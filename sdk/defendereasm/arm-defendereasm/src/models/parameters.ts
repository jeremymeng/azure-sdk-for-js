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
  WorkspaceResource as WorkspaceResourceMapper,
  WorkspacePatchResource as WorkspacePatchResourceMapper,
  LabelResource as LabelResourceMapper,
  LabelPatchResource as LabelPatchResourceMapper
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
    defaultValue: "2023-04-01-preview",
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
    constraints: {
      MinLength: 1
    },
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

export const workspaceName: OperationURLParameter = {
  parameterPath: "workspaceName",
  mapper: {
    serializedName: "workspaceName",
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

export const workspaceResource: OperationParameter = {
  parameterPath: ["options", "workspaceResource"],
  mapper: WorkspaceResourceMapper
};

export const workspacePatchResource: OperationParameter = {
  parameterPath: ["options", "workspacePatchResource"],
  mapper: WorkspacePatchResourceMapper
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

export const labelName: OperationURLParameter = {
  parameterPath: "labelName",
  mapper: {
    serializedName: "labelName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const labelResource: OperationParameter = {
  parameterPath: ["options", "labelResource"],
  mapper: LabelResourceMapper
};

export const labelPatchResource: OperationParameter = {
  parameterPath: ["options", "labelPatchResource"],
  mapper: LabelPatchResourceMapper
};

export const taskId: OperationURLParameter = {
  parameterPath: "taskId",
  mapper: {
    serializedName: "taskId",
    required: true,
    type: {
      name: "String"
    }
  }
};
