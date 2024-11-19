/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Diagnostics,
  ContainerAppsDiagnosticsListDetectorsOptionalParams,
  Revision,
  ContainerAppsDiagnosticsListRevisionsOptionalParams,
  ContainerAppsDiagnosticsGetDetectorOptionalParams,
  ContainerAppsDiagnosticsGetDetectorResponse,
  ContainerAppsDiagnosticsGetRevisionOptionalParams,
  ContainerAppsDiagnosticsGetRevisionResponse,
  ContainerAppsDiagnosticsGetRootOptionalParams,
  ContainerAppsDiagnosticsGetRootResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ContainerAppsDiagnostics. */
export interface ContainerAppsDiagnostics {
  /**
   * Get the list of diagnostics for a given Container App.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param containerAppName Name of the Container App for which detector info is needed.
   * @param options The options parameters.
   */
  listDetectors(
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsListDetectorsOptionalParams,
  ): PagedAsyncIterableIterator<Diagnostics>;
  /**
   * Get the Revisions for a given Container App.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param containerAppName Name of the Container App for which Revisions are needed.
   * @param options The options parameters.
   */
  listRevisions(
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsListRevisionsOptionalParams,
  ): PagedAsyncIterableIterator<Revision>;
  /**
   * Get a diagnostics result of a Container App.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param containerAppName Name of the Container App.
   * @param detectorName Name of the Container App Detector.
   * @param options The options parameters.
   */
  getDetector(
    resourceGroupName: string,
    containerAppName: string,
    detectorName: string,
    options?: ContainerAppsDiagnosticsGetDetectorOptionalParams,
  ): Promise<ContainerAppsDiagnosticsGetDetectorResponse>;
  /**
   * Get a revision of a Container App.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param containerAppName Name of the Container App.
   * @param revisionName Name of the Container App Revision.
   * @param options The options parameters.
   */
  getRevision(
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsDiagnosticsGetRevisionOptionalParams,
  ): Promise<ContainerAppsDiagnosticsGetRevisionResponse>;
  /**
   * Get the properties of a Container App.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param containerAppName Name of the Container App.
   * @param options The options parameters.
   */
  getRoot(
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsGetRootOptionalParams,
  ): Promise<ContainerAppsDiagnosticsGetRootResponse>;
}
