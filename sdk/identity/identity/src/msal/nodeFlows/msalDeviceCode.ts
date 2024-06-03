// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type * as msalNode from "@azure/msal-node";

import { MsalNode, type MsalNodeOptions } from "./msalNodeCommon";

import { type AccessToken } from "@azure/core-auth";
import { type CredentialFlowGetTokenOptions } from "../credentials";
import { type DeviceCodePromptCallback } from "../../credentials/deviceCodeCredentialOptions";
import { handleMsalError } from "../utils";

/**
 * Options that can be passed to configure MSAL to handle authentication through device codes.
 * @internal
 */
export interface MsalDeviceCodeOptions extends MsalNodeOptions {
  userPromptCallback: DeviceCodePromptCallback;
}

/**
 * MSAL device code client. Calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`.
 * @internal
 */
export class MsalDeviceCode extends MsalNode {
  private userPromptCallback: DeviceCodePromptCallback;

  constructor(options: MsalDeviceCodeOptions) {
    super(options);
    this.userPromptCallback = options.userPromptCallback;
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken> {
    try {
      const requestOptions: msalNode.DeviceCodeRequest = {
        deviceCodeCallback: this.userPromptCallback,
        scopes,
        cancel: false,
        correlationId: options?.correlationId,
        authority: options?.authority,
        claims: options?.claims,
      };
      const promise = this.getApp("public", options?.enableCae).acquireTokenByDeviceCode(
        requestOptions,
      );
      const deviceResponse = await this.withCancellation(promise, options?.abortSignal, () => {
        requestOptions.cancel = true;
      });
      return this.handleResult(scopes, deviceResponse || undefined);
    } catch (error: any) {
      throw handleMsalError(scopes, error, options);
    }
  }
}
