/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  AvailableBalancesGetByBillingAccountOptionalParams,
  AvailableBalancesGetByBillingAccountResponse,
  AvailableBalancesGetByBillingProfileOptionalParams,
  AvailableBalancesGetByBillingProfileResponse,
} from "../models/index.js";

/** Interface representing a AvailableBalances. */
export interface AvailableBalances {
  /**
   * The Available Credit or Payment on Account Balance for a billing account. The credit balance can be
   * used to settle due or past due invoices and is supported for billing accounts with agreement type
   * Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with
   * agreement type Microsoft Customer Agreement or Microsoft Online Services Program.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param options The options parameters.
   */
  getByBillingAccount(
    billingAccountName: string,
    options?: AvailableBalancesGetByBillingAccountOptionalParams,
  ): Promise<AvailableBalancesGetByBillingAccountResponse>;
  /**
   * The Available Credit or Payment on Account Balance for a billing profile. The credit balance can be
   * used to settle due or past due invoices and is supported for billing accounts with agreement type
   * Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with
   * agreement type Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param billingProfileName The ID that uniquely identifies a billing profile.
   * @param options The options parameters.
   */
  getByBillingProfile(
    billingAccountName: string,
    billingProfileName: string,
    options?: AvailableBalancesGetByBillingProfileOptionalParams,
  ): Promise<AvailableBalancesGetByBillingProfileResponse>;
}
