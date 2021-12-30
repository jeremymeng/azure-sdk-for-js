/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DetectorResponse,
  CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
  CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
  CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a CertificateOrdersDiagnostics. */
export interface CertificateOrdersDiagnostics {
  /**
   * Description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param certificateOrderName The certificate order name for which the response is needed.
   * @param options The options parameters.
   */
  listAppServiceCertificateOrderDetectorResponse(
    resourceGroupName: string,
    certificateOrderName: string,
    options?: CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams
  ): PagedAsyncIterableIterator<DetectorResponse>;
  /**
   * Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param certificateOrderName The certificate order name for which the response is needed.
   * @param detectorName The detector name which needs to be run.
   * @param options The options parameters.
   */
  getAppServiceCertificateOrderDetectorResponse(
    resourceGroupName: string,
    certificateOrderName: string,
    detectorName: string,
    options?: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams
  ): Promise<
    CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseResponse
  >;
}
