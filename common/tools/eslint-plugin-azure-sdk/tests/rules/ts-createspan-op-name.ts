// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-createspan-op-name rule.
 */

import rule from "../../src/rules/ts-createspan-op-name";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json"
  }
});

ruleTester.run("ts-createspan-op-name", rule, {
  valid: [
    {
      code: `const { span, updatedOptions } = createSpan("DataLakePathClient.setHttpHeaders", options);`,
      filename: "src/test.ts"
    },
  ],
  invalid: [
    {
      code: `const { span, updatedOptions } = createSpan("DataLakePathClient-setHttpHeaders", options);`,
      filename: "src/test.ts",
      errors: [
        {
          message: "operationName argument to createSpan() should use '.' as separator"
        }
      ],
      output: `const { span, updatedOptions } = createSpan("DataLakePathClient.setHttpHeaders", options);`
    },
    {
      code: `const { span, updatedOptions } = createSpan("Client-operation-subMethod", options);`,
      filename: "src/test.ts",
      errors: [
        {
          message: "operationName argument to createSpan() should use '.' as separator"
        }
      ],
      output: `const { span, updatedOptions } = createSpan("Client.operation.subMethod", options);`
    }
  ]
});
