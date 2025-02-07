/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ArtifactSourcesCreateOrUpdateOptionalParams,
  ArtifactSourcesCreateOrUpdateResponse,
  ArtifactSourcesGetOptionalParams,
  ArtifactSourcesGetResponse,
  ArtifactSourcesDeleteOptionalParams,
  ArtifactSourcesListOptionalParams,
  ArtifactSourcesListResponse
} from "../models/index.js";

/** Interface representing a ArtifactSources. */
export interface ArtifactSources {
  /**
   * Synchronously creates a new artifact source or updates an existing artifact source.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param artifactSourceName The name of the artifact source.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    artifactSourceName: string,
    options?: ArtifactSourcesCreateOrUpdateOptionalParams
  ): Promise<ArtifactSourcesCreateOrUpdateResponse>;
  /**
   * Gets an artifact source.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param artifactSourceName The name of the artifact source.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    artifactSourceName: string,
    options?: ArtifactSourcesGetOptionalParams
  ): Promise<ArtifactSourcesGetResponse>;
  /**
   * Deletes an artifact source.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param artifactSourceName The name of the artifact source.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    artifactSourceName: string,
    options?: ArtifactSourcesDeleteOptionalParams
  ): Promise<void>;
  /**
   * Lists the artifact sources in a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: ArtifactSourcesListOptionalParams
  ): Promise<ArtifactSourcesListResponse>;
}
