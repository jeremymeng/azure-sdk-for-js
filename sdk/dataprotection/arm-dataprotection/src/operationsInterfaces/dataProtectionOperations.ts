/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ClientDiscoveryValueForSingleApi,
  DataProtectionOperationsListOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DataProtectionOperations. */
export interface DataProtectionOperations {
  /**
   * Returns the list of available operations.
   * @param options The options parameters.
   */
  list(
    options?: DataProtectionOperationsListOptionalParams,
  ): PagedAsyncIterableIterator<ClientDiscoveryValueForSingleApi>;
}
