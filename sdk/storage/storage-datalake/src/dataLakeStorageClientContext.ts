/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as Models from "./models";
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";

const packageName = "@azure/storage-datalake";
const packageVersion = "0.2.0";

export class DataLakeStorageClientContext extends msRestAzure.AzureServiceClient {
  credentials: msRest.ServiceClientCredentials;
  xMsVersion?: string;
  accountName: string;
  dnsSuffix?: string;

  /**
   * Initializes a new instance of the DataLakeStorageClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param accountName The Azure Storage account name.
   * @param options - The parameter options
   */
  constructor(
    credentials: msRest.ServiceClientCredentials,
    accountName: string,
    options?: Models.DataLakeStorageClientOptions
  ) {
    if (credentials == undefined) {
      throw new Error("'credentials' cannot be null.");
    }
    if (accountName == undefined) {
      throw new Error("'accountName' cannot be null.");
    }

    if (!options) {
      options = {};
    }
    if (!options.userAgent) {
      const defaultUserAgent = msRestAzure.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(credentials, options);

    this.dnsSuffix = "dfs.core.windows.net";
    this.acceptLanguage = "en-US";
    this.longRunningOperationRetryTimeout = 30;
    this.baseUri = "https://{accountName}.{dnsSuffix}";
    this.requestContentType = "application/json; charset=utf-8";
    this.credentials = credentials;
    this.accountName = accountName;

    if (options.xMsVersion !== null && options.xMsVersion !== undefined) {
      this.xMsVersion = options.xMsVersion;
    }
    if (options.dnsSuffix !== null && options.dnsSuffix !== undefined) {
      this.dnsSuffix = options.dnsSuffix;
    }
    if (options.acceptLanguage !== null && options.acceptLanguage !== undefined) {
      this.acceptLanguage = options.acceptLanguage;
    }
    if (
      options.longRunningOperationRetryTimeout !== null &&
      options.longRunningOperationRetryTimeout !== undefined
    ) {
      this.longRunningOperationRetryTimeout = options.longRunningOperationRetryTimeout;
    }
  }
}
