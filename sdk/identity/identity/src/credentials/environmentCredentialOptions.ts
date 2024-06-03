// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type AuthorityValidationOptions } from "./authorityValidationOptions";
import { type MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Enables authentication to Microsoft Entra ID depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
