// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require poller invocations in tests to pass testPollingOptions.
 *
 */

import { TSESTree, ESLintUtils } from "@typescript-eslint/utils";
import { Type, TypeChecker, Symbol as TSSymbol } from "typescript";
import { createRule } from "../utils/index.js";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/** Property names that indicate polling interval configuration */
const POLLING_INTERVAL_PROPERTIES = ["updateIntervalInMs", "intervalInMs"];

/**
 * Checks if a type is or contains PollerLike.
 * Handles Promise<PollerLike>, PollerLike, and SimplePollerLike.
 */
function isPollerLikeType(type: Type, typeChecker: TypeChecker): boolean {
  const typeString = typeChecker.typeToString(type);
  // Check for PollerLike or SimplePollerLike in the type string
  if (/PollerLike/.test(typeString)) {
    return true;
  }

  // Check if it's a Promise that resolves to PollerLike
  const symbol = type.getSymbol();
  if (symbol?.getName() === "Promise") {
    const typeArgs = (type as any).typeArguments;
    if (typeArgs && typeArgs.length > 0) {
      return isPollerLikeType(typeArgs[0], typeChecker);
    }
  }

  return false;
}

/**
 * Checks if a type has a polling interval property (updateIntervalInMs or intervalInMs).
 */
function hasPollingIntervalProperty(type: Type, _typeChecker: TypeChecker): boolean {
  const properties = type.getProperties();
  return properties.some((prop: TSSymbol) => POLLING_INTERVAL_PROPERTIES.includes(prop.getName()));
}

/**
 * Gets the options parameter type from a function signature.
 * For methods returning PollerLike, the options parameter is typically the last parameter.
 */
function getOptionsParameterType(
  callExpr: TSESTree.CallExpression,
  typeChecker: TypeChecker,
  converter: any,
): Type | undefined {
  const tsNode = converter.get(callExpr.callee as TSESTree.Node);
  if (!tsNode) {
    return undefined;
  }

  const type = typeChecker.getTypeAtLocation(tsNode);
  const callSignatures = type.getCallSignatures();
console.dir({callSignatures});
  if (callSignatures.length === 0) {
    return undefined;
  }

  // Get the last parameter from the first call signature
  const signature = callSignatures[0];
  const parameters = signature.getParameters();

  if (parameters.length === 0) {
    return undefined;
  }

  // Find the options parameter (typically the last one)
  const lastParam = parameters[parameters.length - 1];
  if (!lastParam.valueDeclaration) {
    return undefined;
  }

  return typeChecker.getTypeAtLocation(lastParam.valueDeclaration);
}

/**
 * Checks if the passed options argument contains a polling interval property.
 */
function optionsArgHasPollingInterval(
  arg: TSESTree.Node,
  typeChecker: TypeChecker,
  converter: any,
): boolean {
  const tsNode = converter.get(arg as TSESTree.Node);
  if (!tsNode) {
    return false;
  }

  const type = typeChecker.getTypeAtLocation(tsNode);
  return hasPollingIntervalProperty(type, typeChecker);
}

/**
 * Checks if a call is to getLongRunningPoller function.
 */
function isGetLongRunningPollerCall(node: TSESTree.CallExpression): boolean {
  if (node.callee.type === "Identifier") {
    return node.callee.name === "getLongRunningPoller";
  }
  if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier") {
    return node.callee.property.name === "getLongRunningPoller";
  }
  return false;
}

/**
 * Gets the options argument index for getLongRunningPoller based on the number of arguments.
 * - 3-param variant: (client, initialResponse, options?) -> options at index 2
 * - 4-param variant: (client, processResponseBody, expectedStatuses, options) -> options at index 3
 */
function getOptionsArgIndexForGetLongRunningPoller(argCount: number): number {
  // For 3-param variant, options is at index 2
  // For 4-param variant, options is at index 3
  return argCount >= 4 ? 3 : 2;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-test-poller-options",
  meta: {
    type: "suggestion",
    docs: {
      description: "require poller invocations in tests to pass testPollingOptions",
    },
    messages: {
      MissingPollingOptions:
        "Poller invocation should pass testPollingOptions to set polling interval to 0 in PLAYBACK mode for test efficiency. For example, import and use testPollingOptions from @azure-tools/test-recorder.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Only apply to test files
    // Matches files in test/ directory with .spec.ts or .test.ts extension
    // Also matches files directly in tests/ directory (for test framework)
    const filename = context.filename;

    // Check for test/**/*.spec.ts or test/**/*.test.ts patterns
    const isInTestDir = /[/\\]test[/\\].*\.(spec|test)\.ts$/.test(filename);

    // Check for files directly under a tests/ directory at the end of path (for ESLint fixture tests)
    // This matches "tests/test.ts" but not "tests/fixture/src/test.ts"
    const isDirectlyInTestsDir = /[/\\]tests[/\\][^/\\]+\.ts$/.test(filename);

    if (!isInTestDir && !isDirectlyInTestsDir) {
      return {};
    }

    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;

    return {
      CallExpression(node: TSESTree.CallExpression): void {
        // Case 1: Check for getLongRunningPoller calls
        if (isGetLongRunningPollerCall(node)) {
          const optionsIndex = getOptionsArgIndexForGetLongRunningPoller(node.arguments.length);
          const optionsArg = node.arguments[optionsIndex];

          // Check if options argument is missing or doesn't have polling interval
          if (!optionsArg) {
            context.report({
              node,
              messageId: "MissingPollingOptions",
            });
            return;
          }

          if (!optionsArgHasPollingInterval(optionsArg, typeChecker, converter)) {
            context.report({
              node,
              messageId: "MissingPollingOptions",
            });
          }
          return;
        }

        // Case 2: Check for methods returning PollerLike
        const tsNode = converter.get(node as TSESTree.Node);
        if (!tsNode) {
          return;
        }

        const returnType = typeChecker.getTypeAtLocation(tsNode);
        if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name.endsWith("AndWait")) {
          console.dir({
            object: node.callee.object,
            property: node.callee.property,
            returnType: typeChecker.typeToString(returnType),
          })
        }
        if (!isPollerLikeType(returnType, typeChecker)) {
          // no-op
        }

        // Get the options parameter type to verify it has updateIntervalInMs
        const optionsType = getOptionsParameterType(node, typeChecker, converter);
        if (!optionsType || !hasPollingIntervalProperty(optionsType, typeChecker)) {
          // The method doesn't accept updateIntervalInMs, skip it
          return;
        }

        // Check the last argument (options argument)
        const lastArg = node.arguments[node.arguments.length - 1];

        if (!lastArg) {
          // No options argument provided
          context.report({
            node,
            messageId: "MissingPollingOptions",
          });
          return;
        }

        // Check if the options argument has the polling interval property
        if (!optionsArgHasPollingInterval(lastArg, typeChecker, converter)) {
          context.report({
            node,
            messageId: "MissingPollingOptions",
          });
        }
      },
    };
  },
});
