/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SenderUsernameResource,
  SenderUsernamesListByDomainsOptionalParams,
  SenderUsernamesGetOptionalParams,
  SenderUsernamesGetResponse,
  SenderUsernamesCreateOrUpdateOptionalParams,
  SenderUsernamesCreateOrUpdateResponse,
  SenderUsernamesDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a SenderUsernames. */
export interface SenderUsernames {
  /**
   * List all valid sender usernames for a domains resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param emailServiceName The name of the EmailService resource.
   * @param domainName The name of the Domains resource.
   * @param options The options parameters.
   */
  listByDomains(
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: SenderUsernamesListByDomainsOptionalParams,
  ): PagedAsyncIterableIterator<SenderUsernameResource>;
  /**
   * Get a valid sender username for a domains resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param emailServiceName The name of the EmailService resource.
   * @param domainName The name of the Domains resource.
   * @param senderUsername The valid sender Username.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    options?: SenderUsernamesGetOptionalParams,
  ): Promise<SenderUsernamesGetResponse>;
  /**
   * Add a new SenderUsername resource under the parent Domains resource or update an existing
   * SenderUsername resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param emailServiceName The name of the EmailService resource.
   * @param domainName The name of the Domains resource.
   * @param senderUsername The valid sender Username.
   * @param parameters Parameters for the create or update operation
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    parameters: SenderUsernameResource,
    options?: SenderUsernamesCreateOrUpdateOptionalParams,
  ): Promise<SenderUsernamesCreateOrUpdateResponse>;
  /**
   * Operation to delete a SenderUsernames resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param emailServiceName The name of the EmailService resource.
   * @param domainName The name of the Domains resource.
   * @param senderUsername The valid sender Username.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    senderUsername: string,
    options?: SenderUsernamesDeleteOptionalParams,
  ): Promise<void>;
}
