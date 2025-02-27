/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  SqlAgentGetOptionalParams,
  SqlAgentGetResponse,
  SqlAgentConfiguration,
  SqlAgentCreateOrUpdateOptionalParams,
  SqlAgentCreateOrUpdateResponse,
} from "../models/index.js";

/** Interface representing a SqlAgent. */
export interface SqlAgent {
  /**
   * Gets current instance sql agent configuration.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    options?: SqlAgentGetOptionalParams,
  ): Promise<SqlAgentGetResponse>;
  /**
   * Puts new sql agent configuration to instance.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param parameters A recoverable managed database resource.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: SqlAgentConfiguration,
    options?: SqlAgentCreateOrUpdateOptionalParams,
  ): Promise<SqlAgentCreateOrUpdateResponse>;
}
