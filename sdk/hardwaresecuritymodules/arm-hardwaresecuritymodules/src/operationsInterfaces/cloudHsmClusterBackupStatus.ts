/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  CloudHsmClusterBackupStatusGetOptionalParams,
  CloudHsmClusterBackupStatusGetResponse,
} from "../models/index.js";

/** Interface representing a CloudHsmClusterBackupStatus. */
export interface CloudHsmClusterBackupStatus {
  /**
   * Gets the backup operation status of the specified Cloud HSM Cluster
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudHsmClusterName The name of the Cloud HSM Cluster within the specified resource group.
   *                            Cloud HSM Cluster names must be between 3 and 23 characters in length.
   * @param jobId The id returned as part of the backup request
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cloudHsmClusterName: string,
    jobId: string,
    options?: CloudHsmClusterBackupStatusGetOptionalParams,
  ): Promise<CloudHsmClusterBackupStatusGetResponse>;
}
