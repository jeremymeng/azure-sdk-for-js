// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */

import { TokenCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { AccessTokenCache, ExpiringAccessTokenCache } from "@azure/core-http";

type ValidParsedWWWAuthenticateProperties =
  // "authorization_uri" was used in the track 1 version of KeyVault.
  // This is not a relevant property anymore, since the service is consistently answering with "authorization".
  // | "authorization_uri"
  | "authorization"
  // Even though the service is moving to "scope", both "resource" and "scope" should be supported.
  | "resource"
  | "scope";

type ParsedWWWAuthenticate = {
  [Key in ValidParsedWWWAuthenticateProperties]?: string;
};

/**
 * Representation of the Authentication Challenge
 */
export class AuthenticationChallenge {
  constructor(public authorization: string, public scope: string) {}

  /**
   * Checks that this AuthenticationChallenge is equal to another one given.
   * Only compares the scope.
   * This is exactly what C# is doing, as we can see here:
   * https://github.com/Azure/azure-sdk-for-net/blob/70e54b878ff1d01a45266fb3674a396b4ab9c1d2/sdk/keyvault/Azure.Security.KeyVault.Shared/src/ChallengeBasedAuthenticationPolicy.cs#L143-L147
   * @param other - The other AuthenticationChallenge
   */
  public equalTo(other: AuthenticationChallenge | undefined): boolean {
    return other
      ? this.scope.toLowerCase() === other.scope.toLowerCase() &&
          this.authorization.toLowerCase() === other.authorization.toLowerCase()
      : false;
  }
}

/**
 * Helps keep a copy of any previous authentication challenges,
 * so that we can compare on any further request.
 */
export class AuthenticationChallengeCache {
  public challenge?: AuthenticationChallenge;

  public setCachedChallenge(challenge: AuthenticationChallenge): void {
    this.challenge = challenge;
  }
}

export const challengeBasedAuthenticationPolicyName = "challengeBasedAuthenticationPolicy";
/**
 * Creates a new ChallengeBasedAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the challenge token.
 */
export function challengeBasedAuthenticationPolicy(credential: TokenCredential): PipelinePolicy {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const challengeCache = new AuthenticationChallengeCache();
  return new ChallengeBasedAuthenticationPolicy(credential, tokenCache, challengeCache);
}

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `, ` or ` `.
  const parts = wwwAuthenticate.split(/,* +/);
  // Then we only keep the strings with an equal sign after a word and before a quote.
  // also splitting these sections by their equal sign
  const keyValues = parts.reduce<string[][]>(
    (acc, str) => (str.match(/\w="/) ? [...acc, str.split("=")] : acc),
    []
  );
  // Then we transform these key-value pairs back into an object.
  const parsed = keyValues.reduce<ParsedWWWAuthenticate>(
    (result, [key, value]: string[]) => ({
      ...result,
      [key]: value.slice(1, -1)
    }),
    {}
  );
  return parsed;
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class ChallengeBasedAuthenticationPolicy implements PipelinePolicy {
  public name: string = "challengeBasedAuthenticationPolicy";
  private parseWWWAuthenticate: (
    wwwAuthenticate: string
  ) => ParsedWWWAuthenticate = parseWWWAuthenticate;

  /**
   * Creates a new ChallengeBasedAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param credential - The TokenCredential implementation that can supply the bearer token.
   * @param tokenCache - The cache for the most recent AccessToken returned by the TokenCredential.
   */
  constructor(
    private credential: TokenCredential,
    private tokenCache: AccessTokenCache,
    private challengeCache: AuthenticationChallengeCache
  ) {}

  /**
   * Applies the Bearer token to the request through the Authorization header.
   * @param request - Ongoing HTTP request.
   * @param next -
   */
  public async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    // Ensure that we're about to use a secure connection.
    if (!request.url.startsWith("https:")) {
      throw new Error("The resource address for authorization must use the 'https' protocol.");
    }

    // The next request will happen differently whether we have a challenge or not.
    let response: PipelineResponse;

    if (
      this.challengeCache.challenge === undefined ||
      this.challengeCache.challenge === undefined
    ) {
      // If there's no challenge in cache, a blank body will start the challenge.
      const originalBody = request.body;
      request.body = "";
      response = await next(request);
      request.body = originalBody;
    } else {
      // If we did have a challenge in memory,
      // we attempt to load the token from the cache into the request before we try to send the request.
      await this.loadToken(request);
      response = await next(request);
    }

    // If we don't receive a response with a 401 status code,
    // then we can assume this response has nothing to do with the challenge authentication process.
    if (response.status !== 401) {
      return response;
    }

    // If the response status is 401, we only re-authenticate if the WWW-Authenticate header is present.
    const wwwAuthenticate = response.headers.get("WWW-Authenticate");
    if (!wwwAuthenticate) {
      return response;
    }

    // We re-generate the challenge and see if we have to re-authenticate.
    return this.regenerateChallenge(wwwAuthenticate, request, next);
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  private async loadToken(request: PipelineRequest): Promise<void> {
    let accessToken = this.tokenCache.getCachedToken();

    // If there's no cached token in the cache, we try to get a new one.
    if (accessToken === undefined) {
      const receivedToken = await this.credential.getToken(this.challengeCache.challenge!.scope);
      accessToken = receivedToken || undefined;
      this.tokenCache.setCachedToken(accessToken);
    }

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken.token}`);
    }
  }

  /**
   * Parses the given WWW-Authenticate header, generates a new AuthenticationChallenge,
   * then if the challenge is different from the one cached, resets the token and forces
   * a re-authentication, otherwise continues with the existing challenge and token.
   * @param wwwAuthenticate - Value of the incoming WWW-Authenticate header.
   * @param request - Ongoing HTTP request.
   */
  private async regenerateChallenge(
    wwwAuthenticate: string,
    request: PipelineRequest,
    next: SendRequest
  ): Promise<PipelineResponse> {
    // The challenge based authentication will contain both:
    // - An authorization URI with a token,
    // - The resource to which that token is valid against (also called the scope).
    const parsedWWWAuth = this.parseWWWAuthenticate(wwwAuthenticate);
    const authorization = parsedWWWAuth.authorization!;
    const resource = parsedWWWAuth.resource! || parsedWWWAuth.scope!;

    if (!(authorization && resource)) {
      return next(request);
    }

    const challenge = new AuthenticationChallenge(authorization, resource + "/.default");

    // Either if there's no cached challenge at this point (could have happen in parallel),
    // or if the cached challenge has a different scope,
    // we store the just received challenge and reset the cached token, to force a re-authentication.
    if (!this.challengeCache.challenge?.equalTo(challenge)) {
      this.challengeCache.setCachedChallenge(challenge);
      this.tokenCache.setCachedToken(undefined);
    }

    await this.loadToken(request);
    return next(request);
  }
}
