/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationsListOptionalParams,
  OperationsListResponse
} from "../models/index.js";

/** Interface representing a Operations. */
export interface Operations {
  /**
   * Lists all of the available operations from Microsoft.Insights provider.
   * @param options The options parameters.
   */
  list(options?: OperationsListOptionalParams): Promise<OperationsListResponse>;
}
