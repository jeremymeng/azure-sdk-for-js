/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { DataCatalogRestClientContext } from "./dataCatalogRestClientContext";


class DataCatalogRestClient extends DataCatalogRestClientContext {
  // Operation groups
  aDCOperations: operations.ADCOperations;
  aDCCatalogs: operations.ADCCatalogs;

  /**
   * Initializes a new instance of the DataCatalogRestClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param subscriptionId Gets subscription credentials which uniquely identify the Microsoft Azure
   * subscription. The subscription ID forms part of the URI for every service call.
   * @param catalogName The name of the data catalog in the specified subscription and resource
   * group.
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials, subscriptionId: string, catalogName: string, options?: Models.DataCatalogRestClientOptions) {
    super(credentials, subscriptionId, catalogName, options);
    this.aDCOperations = new operations.ADCOperations(this);
    this.aDCCatalogs = new operations.ADCCatalogs(this);
  }
}

// Operation Specifications

export {
  DataCatalogRestClient,
  DataCatalogRestClientContext,
  Models as DataCatalogRestModels,
  Mappers as DataCatalogRestMappers
};
export * from "./operations";
