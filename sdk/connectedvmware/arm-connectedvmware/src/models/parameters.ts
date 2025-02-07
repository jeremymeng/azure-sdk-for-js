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
  ResourcePool as ResourcePoolMapper,
  ResourcePatch as ResourcePatchMapper,
  Cluster as ClusterMapper,
  Host as HostMapper,
  Datastore as DatastoreMapper,
  VCenter as VCenterMapper,
  VirtualMachineTemplate as VirtualMachineTemplateMapper,
  VirtualNetwork as VirtualNetworkMapper,
  InventoryItem as InventoryItemMapper,
  VirtualMachineInstance as VirtualMachineInstanceMapper,
  VirtualMachineInstanceUpdate as VirtualMachineInstanceUpdateMapper,
  StopVirtualMachineOptions as StopVirtualMachineOptionsMapper,
  GuestAgent as GuestAgentMapper
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
    defaultValue: "2023-10-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
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
  parameterPath: ["options", "body"],
  mapper: ResourcePoolMapper
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
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourcePoolName: OperationURLParameter = {
  parameterPath: "resourcePoolName",
  mapper: {
    serializedName: "resourcePoolName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body1: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: ResourcePatchMapper
};

export const force: OperationQueryParameter = {
  parameterPath: ["options", "force"],
  mapper: {
    serializedName: "force",
    type: {
      name: "Boolean"
    }
  }
};

export const body2: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: ClusterMapper
};

export const clusterName: OperationURLParameter = {
  parameterPath: "clusterName",
  mapper: {
    serializedName: "clusterName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body3: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: HostMapper
};

export const hostName: OperationURLParameter = {
  parameterPath: "hostName",
  mapper: {
    serializedName: "hostName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body4: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: DatastoreMapper
};

export const datastoreName: OperationURLParameter = {
  parameterPath: "datastoreName",
  mapper: {
    serializedName: "datastoreName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body5: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: VCenterMapper
};

export const vcenterName: OperationURLParameter = {
  parameterPath: "vcenterName",
  mapper: {
    serializedName: "vcenterName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body6: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: VirtualMachineTemplateMapper
};

export const virtualMachineTemplateName: OperationURLParameter = {
  parameterPath: "virtualMachineTemplateName",
  mapper: {
    serializedName: "virtualMachineTemplateName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body7: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: VirtualNetworkMapper
};

export const virtualNetworkName: OperationURLParameter = {
  parameterPath: "virtualNetworkName",
  mapper: {
    serializedName: "virtualNetworkName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body8: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: InventoryItemMapper
};

export const inventoryItemName: OperationURLParameter = {
  parameterPath: "inventoryItemName",
  mapper: {
    serializedName: "inventoryItemName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body9: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: VirtualMachineInstanceMapper
};

export const resourceUri: OperationURLParameter = {
  parameterPath: "resourceUri",
  mapper: {
    serializedName: "resourceUri",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const body10: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: VirtualMachineInstanceUpdateMapper
};

export const deleteFromHost: OperationQueryParameter = {
  parameterPath: ["options", "deleteFromHost"],
  mapper: {
    serializedName: "deleteFromHost",
    type: {
      name: "Boolean"
    }
  }
};

export const body11: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: StopVirtualMachineOptionsMapper
};

export const body12: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GuestAgentMapper
};
