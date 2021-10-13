// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to suggest using `.` as separator in `operationName` argument to `createSpan()`.
 */

import { ParserServices } from "@typescript-eslint/experimental-utils";
import { Rule } from "eslint";
import { SimpleCallExpression } from "estree";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-createspan-op-name",
    "use '.' as separator in operationName argument to createSpan() call",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices = context.parserServices as ParserServices;
    if (parserServices.program === undefined) {
      return {};
    }
    if (!/src.*\.ts$/.test(context.getFilename())) {
      return {};
    }
    return {
      // callback functions

      // call on `createSpan()` method calls
      "CallExpression[callee.name='createSpan'][arguments.length=2]": (node: SimpleCallExpression): void => {
          const args = node.arguments;
          if (args?.length > 0 && args[0].type === "Literal" && typeof args[0].value === `string` &&
            args[0].value?.indexOf("-") !== -1) {
            const replacement = `"${args[0].value?.replace(/-/g, ".")}"`;
            context.report({
              node: args[0],
              message: "operationName argument to createSpan() should use '.' as separator",
              fix: (fixer: Rule.RuleFixer): Rule.Fix =>
                fixer.replaceText(args[0], replacement)
            })
          }
      }
    } as Rule.RuleListener;
  }
};
