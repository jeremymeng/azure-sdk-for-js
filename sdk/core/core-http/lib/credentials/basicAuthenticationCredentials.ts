// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpHeaders } from "../httpHeaders";
import * as base64 from "../util/base64";
import { Constants } from "../util/constants";
import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
const HeaderConstants = Constants.HeaderConstants;
const DEFAULT_AUTHORIZATION_SCHEME = "Basic";

export class BasicAuthenticationCredentials implements ServiceClientCredentials {
  userName: string;
  password: string;
  authorizationScheme: string = DEFAULT_AUTHORIZATION_SCHEME;

  /**
   * Creates a new BasicAuthenticationCredentials object.
   *
   * @constructor
   * @param {string} userName User name.
   * @param {string} password Password.
   * @param {string} [authorizationScheme] The authorization scheme.
   */
  constructor(userName: string, password: string, authorizationScheme: string = DEFAULT_AUTHORIZATION_SCHEME) {
    if (userName === null || userName === undefined || typeof userName.valueOf() !== "string") {
      throw new Error("userName cannot be null or undefined and must be of type string.");
    }
    if (password === null || password === undefined || typeof password.valueOf() !== "string") {
      throw new Error("password cannot be null or undefined and must be of type string.");
    }
    this.userName = userName;
    this.password = password;
    this.authorizationScheme = authorizationScheme;
  }

  /**
   * Signs a request with the Authentication header.
   *
   * @param {WebResource} webResource The WebResource to be signed.
   * @returns {Promise<WebResource>} The signed request object.
   */
  signRequest(webResource: WebResource) {
    const credentials = `${this.userName}:${this.password}`;
    const encodedCredentials = `${this.authorizationScheme} ${base64.encodeString(credentials)}`;
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    webResource.headers.set(HeaderConstants.AUTHORIZATION, encodedCredentials);
    return Promise.resolve(webResource);
  }
}
