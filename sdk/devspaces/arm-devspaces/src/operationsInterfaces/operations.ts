/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ResourceProviderOperationDefinition,
  OperationsListOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Operations. */
export interface Operations {
  /**
   * Lists all the supported operations by the Microsoft.DevSpaces resource provider along with their
   * description.
   * @param options The options parameters.
   */
  list(
    options?: OperationsListOptionalParams
  ): PagedAsyncIterableIterator<ResourceProviderOperationDefinition>;
}
