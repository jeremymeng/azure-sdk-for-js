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
  FarmBeats as FarmBeatsMapper,
  FarmBeatsUpdateRequestModel as FarmBeatsUpdateRequestModelMapper,
  CheckNameAvailabilityRequest as CheckNameAvailabilityRequestMapper,
  PrivateEndpointConnection as PrivateEndpointConnectionMapper
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

export const farmBeatsResourceName: OperationURLParameter = {
  parameterPath: "farmBeatsResourceName",
  mapper: {
    serializedName: "farmBeatsResourceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const extensionId: OperationURLParameter = {
  parameterPath: "extensionId",
  mapper: {
    serializedName: "extensionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2021-09-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const extensionIds: OperationQueryParameter = {
  parameterPath: ["options", "extensionIds"],
  mapper: {
    serializedName: "extensionIds",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const extensionCategories: OperationQueryParameter = {
  parameterPath: ["options", "extensionCategories"],
  mapper: {
    serializedName: "extensionCategories",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const maxPageSize: OperationQueryParameter = {
  parameterPath: ["options", "maxPageSize"],
  mapper: {
    defaultValue: 50,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 10
    },
    serializedName: "$maxPageSize",
    type: {
      name: "Number"
    }
  }
};

export const skipToken: OperationQueryParameter = {
  parameterPath: ["options", "skipToken"],
  mapper: {
    serializedName: "$skipToken",
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

export const farmBeatsExtensionIds: OperationQueryParameter = {
  parameterPath: ["options", "farmBeatsExtensionIds"],
  mapper: {
    serializedName: "farmBeatsExtensionIds",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const farmBeatsExtensionNames: OperationQueryParameter = {
  parameterPath: ["options", "farmBeatsExtensionNames"],
  mapper: {
    serializedName: "farmBeatsExtensionNames",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const publisherIds: OperationQueryParameter = {
  parameterPath: ["options", "publisherIds"],
  mapper: {
    serializedName: "publisherIds",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: "Multi"
};

export const farmBeatsExtensionId: OperationURLParameter = {
  parameterPath: "farmBeatsExtensionId",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z]{3,50}[.][a-zA-Z]{3,100}$")
    },
    serializedName: "farmBeatsExtensionId",
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

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: FarmBeatsMapper
};

export const body1: OperationParameter = {
  parameterPath: "body",
  mapper: FarmBeatsUpdateRequestModelMapper
};

export const operationResultsId: OperationURLParameter = {
  parameterPath: "operationResultsId",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$")
    },
    serializedName: "operationResultsId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body2: OperationParameter = {
  parameterPath: "body",
  mapper: CheckNameAvailabilityRequestMapper
};

export const body3: OperationParameter = {
  parameterPath: "body",
  mapper: PrivateEndpointConnectionMapper
};

export const privateEndpointConnectionName: OperationURLParameter = {
  parameterPath: "privateEndpointConnectionName",
  mapper: {
    serializedName: "privateEndpointConnectionName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const subResourceName: OperationURLParameter = {
  parameterPath: "subResourceName",
  mapper: {
    serializedName: "subResourceName",
    required: true,
    type: {
      name: "String"
    }
  }
};
