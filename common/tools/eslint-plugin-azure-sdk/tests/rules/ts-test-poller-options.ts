// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-test-poller-options rule.
 *
 */

import { createRuleTester } from "../ruleTester.js";
import rule from "../../src/rules/ts-test-poller-options.js";

//------------------------------------------------------------------------------
// Type definitions for tests
//------------------------------------------------------------------------------

const typeDefinitions = `
interface OperationState<TResult> {
  status: string;
  result?: TResult;
}

interface PollerLike<TState extends OperationState<TResult>, TResult> extends Promise<TResult> {
  isDone: boolean;
  poll(): Promise<TState>;
  pollUntilDone(): Promise<TResult>;
}

interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  isDone(): boolean;
  getOperationState(): TState;
  pollUntilDone(): Promise<TResult>;
}

interface PollerOptions {
  updateIntervalInMs?: number;
  abortSignal?: AbortSignal;
}

interface CreateOptions {
  name: string;
  updateIntervalInMs?: number;
}

interface NoPollingOptions {
  name: string;
  abortSignal?: AbortSignal;
}

interface GetLongRunningPollerOptions {
  updateIntervalInMs?: number;
  abortSignal?: AbortSignal;
}

interface GetLongRunningPollerOptionsWithIntervalInMs {
  intervalInMs?: number;
  abortSignal?: AbortSignal;
}

interface Client {
  path: string;
}

interface HttpResponse {
  status: number;
  body: unknown;
}

const testPollingOptions = { updateIntervalInMs: 0 };

declare function beginCreate(name: string, options?: CreateOptions): PollerLike<OperationState<string>, string>;
declare function beginDelete(name: string, options?: PollerOptions): PollerLike<OperationState<void>, void>;
declare function beginCreateAndWait(name: string, options?: CreateOptions): Promise<string>;

declare function getLongRunningPoller(
  client: Client,
  initialResponse: HttpResponse,
  options?: GetLongRunningPollerOptions
): Promise<SimplePollerLike<OperationState<HttpResponse>, HttpResponse>>;

declare function getLongRunningPoller4Params(
  client: Client,
  processResponseBody: (result: HttpResponse) => Promise<string>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptionsWithIntervalInMs
): PollerLike<OperationState<string>, string>;

declare function normalFunction(name: string): string;
declare function normalAsyncFunction(name: string): Promise<string>;

declare const client: Client;
declare const response: HttpResponse;
`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-test-poller-options", rule, {
  valid: [
    // Valid: getLongRunningPoller with testPollingOptions
    {
      code: `${typeDefinitions}
        getLongRunningPoller(client, response, testPollingOptions);
      `,
      filename: "tests/test.ts",
    },
    // Valid: getLongRunningPoller with inline updateIntervalInMs
    {
      code: `${typeDefinitions}
        getLongRunningPoller(client, response, { updateIntervalInMs: 0 });
      `,
      filename: "tests/test.ts",
    },
    // Valid: method that doesn't return PollerLike
    {
      code: `${typeDefinitions}
        normalFunction("test");
      `,
      filename: "tests/test.ts",
    },
    // Valid: async method that doesn't return PollerLike
    {
      code: `${typeDefinitions}
        normalAsyncFunction("test");
      `,
      filename: "tests/test.ts",
    },
    // Valid: non-test file is ignored (src directory, no .spec or .test suffix)
    {
      code: `${typeDefinitions}
        getLongRunningPoller(client, response);
      `,
      filename: "src/test.ts",
    },
  ],
  invalid: [
    // Invalid: getLongRunningPoller without options (3-param variant)
    {
      code: `${typeDefinitions}
        getLongRunningPoller(client, response);
      `,
      filename: "tests/test.ts",
      errors: [{ messageId: "MissingPollingOptions" }],
    },
    // Invalid: getLongRunningPoller with empty options
    {
      code: `${typeDefinitions}
        getLongRunningPoller(client, response, {});
      `,
      filename: "tests/test.ts",
      errors: [{ messageId: "MissingPollingOptions" }],
    },
  ],
});
