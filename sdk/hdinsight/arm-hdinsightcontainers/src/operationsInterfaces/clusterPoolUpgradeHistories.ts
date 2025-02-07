/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ClusterPoolUpgradeHistory,
  ClusterPoolUpgradeHistoriesListOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ClusterPoolUpgradeHistories. */
export interface ClusterPoolUpgradeHistories {
  /**
   * Returns a list of upgrade history.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterPoolName The name of the cluster pool.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    clusterPoolName: string,
    options?: ClusterPoolUpgradeHistoriesListOptionalParams,
  ): PagedAsyncIterableIterator<ClusterPoolUpgradeHistory>;
}
