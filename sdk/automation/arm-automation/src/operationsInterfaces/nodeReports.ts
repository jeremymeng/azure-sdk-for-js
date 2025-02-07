/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DscNodeReport,
  NodeReportsListByNodeOptionalParams,
  NodeReportsGetOptionalParams,
  NodeReportsGetResponse,
  NodeReportsGetContentOptionalParams,
  NodeReportsGetContentResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a NodeReports. */
export interface NodeReports {
  /**
   * Retrieve the Dsc node report list by node id.
   * @param resourceGroupName Name of an Azure Resource group.
   * @param automationAccountName The name of the automation account.
   * @param nodeId The parameters supplied to the list operation.
   * @param options The options parameters.
   */
  listByNode(
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: NodeReportsListByNodeOptionalParams
  ): PagedAsyncIterableIterator<DscNodeReport>;
  /**
   * Retrieve the Dsc node report data by node id and report id.
   * @param resourceGroupName Name of an Azure Resource group.
   * @param automationAccountName The name of the automation account.
   * @param nodeId The Dsc node id.
   * @param reportId The report id.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    reportId: string,
    options?: NodeReportsGetOptionalParams
  ): Promise<NodeReportsGetResponse>;
  /**
   * Retrieve the Dsc node reports by node id and report id.
   * @param resourceGroupName Name of an Azure Resource group.
   * @param automationAccountName The name of the automation account.
   * @param nodeId The Dsc node id.
   * @param reportId The report id.
   * @param options The options parameters.
   */
  getContent(
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    reportId: string,
    options?: NodeReportsGetContentOptionalParams
  ): Promise<NodeReportsGetContentResponse>;
}
