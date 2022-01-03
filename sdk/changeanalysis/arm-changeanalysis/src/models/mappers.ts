/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

export const ResourceProviderOperationList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ResourceProviderOperationList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ResourceProviderOperationDefinition"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ResourceProviderOperationDefinition: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ResourceProviderOperationDefinition",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "ResourceProviderOperationDisplay"
        }
      }
    }
  }
};

export const ResourceProviderOperationDisplay: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ResourceProviderOperationDisplay",
    modelProperties: {
      provider: {
        serializedName: "provider",
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ErrorResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorDetail"
        }
      }
    }
  }
};

export const ErrorDetail: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorDetail",
    modelProperties: {
      code: {
        serializedName: "code",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorDetail"
            }
          }
        }
      },
      additionalInfo: {
        serializedName: "additionalInfo",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorAdditionalInfo"
            }
          }
        }
      }
    }
  }
};

export const ErrorAdditionalInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorAdditionalInfo",
    modelProperties: {
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      info: {
        serializedName: "info",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      }
    }
  }
};

export const ChangeList: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ChangeList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Change"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ChangeProperties: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ChangeProperties",
    modelProperties: {
      resourceId: {
        serializedName: "resourceId",
        type: {
          name: "String"
        }
      },
      timeStamp: {
        serializedName: "timeStamp",
        type: {
          name: "DateTime"
        }
      },
      initiatedByList: {
        serializedName: "initiatedByList",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      changeType: {
        serializedName: "changeType",
        type: {
          name: "String"
        }
      },
      propertyChanges: {
        serializedName: "propertyChanges",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PropertyChange"
            }
          }
        }
      }
    }
  }
};

export const PropertyChange: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PropertyChange",
    modelProperties: {
      changeType: {
        serializedName: "changeType",
        type: {
          name: "String"
        }
      },
      changeCategory: {
        serializedName: "changeCategory",
        type: {
          name: "Enum",
          allowedValues: ["User", "System"]
        }
      },
      jsonPath: {
        serializedName: "jsonPath",
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      level: {
        serializedName: "level",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      oldValue: {
        serializedName: "oldValue",
        type: {
          name: "String"
        }
      },
      newValue: {
        serializedName: "newValue",
        type: {
          name: "String"
        }
      },
      isDataMasked: {
        serializedName: "isDataMasked",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const Resource: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProxyResource: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProxyResource",
    modelProperties: {
      ...Resource.type.modelProperties
    }
  }
};

export const Change: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Change",
    modelProperties: {
      ...ProxyResource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "ChangeProperties"
        }
      }
    }
  }
};
