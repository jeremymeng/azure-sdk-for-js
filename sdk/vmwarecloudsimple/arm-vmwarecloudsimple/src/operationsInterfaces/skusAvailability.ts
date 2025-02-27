/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SkuAvailability, SkusAvailabilityListOptionalParams } from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SkusAvailability. */
export interface SkusAvailability {
  /**
   * Returns list of available resources in region
   * @param regionId The region Id (westus, eastus)
   * @param options The options parameters.
   */
  list(
    regionId: string,
    options?: SkusAvailabilityListOptionalParams
  ): PagedAsyncIterableIterator<SkuAvailability>;
}
