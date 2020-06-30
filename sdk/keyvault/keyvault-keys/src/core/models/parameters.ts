/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};
export const keyName0: coreHttp.OperationURLParameter = {
  parameterPath: "keyName",
  mapper: {
    required: true,
    serializedName: "key-name",
    constraints: {
      Pattern: /^[0-9a-zA-Z-]+$/
    },
    type: {
      name: "String"
    }
  }
};
export const keyName1: coreHttp.OperationURLParameter = {
  parameterPath: "keyName",
  mapper: {
    required: true,
    serializedName: "key-name",
    type: {
      name: "String"
    }
  }
};
export const keyVersion: coreHttp.OperationURLParameter = {
  parameterPath: "keyVersion",
  mapper: {
    required: true,
    serializedName: "key-version",
    type: {
      name: "String"
    }
  }
};
export const maxresults: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "maxresults"
  ],
  mapper: {
    serializedName: "maxresults",
    constraints: {
      InclusiveMaximum: 25,
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const vaultBaseUrl: coreHttp.OperationURLParameter = {
  parameterPath: "vaultBaseUrl",
  mapper: {
    required: true,
    serializedName: "vaultBaseUrl",
    defaultValue: '',
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
