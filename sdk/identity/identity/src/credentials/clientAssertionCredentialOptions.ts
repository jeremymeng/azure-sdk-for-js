// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type AuthorityValidationOptions } from "./authorityValidationOptions";
import { type MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link ClientAssertionCredential}
 */
export interface ClientAssertionCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
