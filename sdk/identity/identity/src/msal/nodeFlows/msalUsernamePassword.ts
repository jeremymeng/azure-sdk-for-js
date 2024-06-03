// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type * as msalNode from "@azure/msal-node";

import { MsalNode, type MsalNodeOptions } from "./msalNodeCommon";

import { type AccessToken } from "@azure/core-auth";
import { type CredentialFlowGetTokenOptions } from "../credentials";
import { handleMsalError } from "../utils";

/**
 * Options that can be passed to configure MSAL to handle authentication through username and password.
 * @internal
 */
export interface MsalUsernamePasswordOptions extends MsalNodeOptions {
  username: string;
  password: string;
}

/**
 * MSAL username and password client. Calls to the MSAL's public application's `acquireTokenByUsernamePassword` during `doGetToken`.
 * @internal
 */
export class MsalUsernamePassword extends MsalNode {
  private username: string;
  private password: string;

  constructor(options: MsalUsernamePasswordOptions) {
    super(options);
    this.username = options.username;
    this.password = options.password;
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    try {
      const requestOptions: msalNode.UsernamePasswordRequest = {
        scopes,
        username: this.username,
        password: this.password,
        correlationId: options?.correlationId,
        authority: options?.authority,
        claims: options?.claims,
      };
      const result = await this.getApp("public", options?.enableCae).acquireTokenByUsernamePassword(
        requestOptions,
      );
      return this.handleResult(scopes, result || undefined);
    } catch (error: any) {
      throw handleMsalError(scopes, error, options);
    }
  }
}
