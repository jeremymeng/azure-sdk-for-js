// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecoverDeletedSecretPollOperationState} from "./operation";
import {
  RecoverDeletedSecretPollOperation
} from "./operation";
import type { SecretProperties } from "../../secretsModels";
import type { KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller";
import { KeyVaultSecretPoller } from "../keyVaultSecretPoller";

/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export class RecoverDeletedSecretPoller extends KeyVaultSecretPoller<
  RecoverDeletedSecretPollOperationState,
  SecretProperties
> {
  constructor(options: KeyVaultSecretPollerOptions) {
    const { vaultUrl, client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new RecoverDeletedSecretPollOperation(
      {
        ...state,
        name,
      },
      vaultUrl,
      client,
      operationOptions,
    );

    super(operation);

    this.intervalInMs = intervalInMs;
  }
}
