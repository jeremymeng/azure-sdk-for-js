/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SystemVersion,
  SystemVersionsListByLocationOptionalParams,
  SystemVersionsGetOptionalParams,
  SystemVersionsGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SystemVersions. */
export interface SystemVersions {
  /**
   * List SystemVersion resources by Location
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  listByLocation(
    location: string,
    options?: SystemVersionsListByLocationOptionalParams,
  ): PagedAsyncIterableIterator<SystemVersion>;
  /**
   * Get a SystemVersion
   * @param location The name of the Azure region.
   * @param systemversionname SystemVersion name
   * @param options The options parameters.
   */
  get(
    location: string,
    systemversionname: string,
    options?: SystemVersionsGetOptionalParams,
  ): Promise<SystemVersionsGetResponse>;
}
