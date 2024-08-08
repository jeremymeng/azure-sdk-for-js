// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This file loads our monkey patch for module resolution in samples and
 * tests. We use this to make sure that TS/ES loading is supported and that
 * path-mapped imports work without rewriting them.
 *
 * As a forewarning to anyone who comes to this module and thinks: "Why can't
 * we rewrite this in TypeScript," keep in mind that this module is used to
 * bootstrap loading of typescript code at runtime within dev-tool. Rewriting
 * this module in TypeScript is likely possible, but challenging. In plain
 * old JavaScript, it is simple enough.
 */

const path = require("path");
const cwd = process.cwd();

// This is the calling module, which will be the node repl context.
const main = require.main || module.parent;

// We need to know which package name to monkey patch
const { name: hostPackageName } = main.require("./package.json");

// We need to use whatever version of TypeScript the calling package uses to inspect syntax nodes, because
// that is what the ts-node invocation will use, and we need to agree with it on syntax brands.
const ts =
  hostPackageName === "@azure/dev-tool"
    ? require(path.join(cwd, "node_modules", "typescript"))
    : main.require("typescript");

// If we're bootstrapping a dev-tool command, we need to patch the package from
// CWD instead.  This will still end up being dev-tool if we end up in a
// self-hosting situation where dev-tool calls itself from its own scripts.
const packageNameToPatch =
  hostPackageName === "@azure/dev-tool"
    ? require(path.join(cwd, "package.json")).name
    : hostPackageName;

if (process.env.DEBUG) {
  console.info(
    "[dev-tool/register] patching module loader from:",
    __dirname,
    "; package:",
    packageNameToPatch,
  );
}

require("dotenv").config();

/**
 * The transformer we will use to handle imports of the host package.
 *
 * For example, if an @azure/template sample needs to import @azure/template,
 * this transformer will handle rewriting the imports for us.
 */
const makeTransformers = () => ({
  before: [
    (transformationContext) => (sourceFile) => {
      const visitor = (node) => {
        // If the sample or test program is trying to import the host
        // package, we'll rewrite it on the fly to make the import work.
        if (ts.isImportDeclaration(node)) {
          if (node.moduleSpecifier.text === packageNameToPatch) {
            // rewrite the import to use a relative path
            const oldName = node.moduleSpecifier.text;
            const base = sourceFile.path.includes("dist-esm") ? path.join(cwd, "dist-esm") : cwd;
            const newSpecifierText = path.relative(
              // This is marked internal in the TS API, need to make sure there's not a better way
              // to get the path from the sourceFile node
              path.dirname(sourceFile.path),
              path.join(base, "src", "index"),
            );
            console.log(
              `[dev-tool/register] Rewrote import of "${oldName}" to "${newSpecifierText}".`,
            );
            const factory = ts.factory;
            const newNode = factory.createImportDeclaration(
              undefined,
              node.importClause,
              factory.createStringLiteral(newSpecifierText),
              undefined,
            );
            return newNode;
          } else if (node.moduleSpecifier.text === "@azure/identity") {
            if (
              node.importClause?.namedBindings?.elements?.length === 1 &&
              ts.isIdentifier(node.importClause.namedBindings.elements[0].name) &&
              node.importClause.namedBindings.elements[0].name.escapedText ===
                "DefaultAzureCredential"
            ) {
              const old = node.getFullText();
              const factory = ts.factory;
              const newNode = factory.createImportDeclaration(
                undefined,
                factory.createImportClause(
                  false,
                  undefined,
                  factory.createNamedImports([
                    factory.createImportSpecifier(
                      false,
                      undefined,
                      factory.createIdentifier("createTestCredential"),
                    ),
                  ]),
                ),
                factory.createStringLiteral("@azure-tools/test-credential"),
                undefined,
              );

              console.log(`[dev-tool/register] Rewrote DAC import to createTestCredential import`);
              return newNode;
            }
          }
          return node;
        } else if (ts.isNewExpression(node)) {
          if (
            ts.isIdentifier(node.expression) &&
            node.expression.escapedText === "DefaultAzureCredential"
          ) {
            const old = node.getFullText();
            const newNode = ts.factory.createCallExpression(
              ts.factory.createIdentifier("createTestCredential"),
              undefined,
              [],
            );

            console.log(
              `[dev-tool/register] Rewrote "new DefaultCredential()" to "createTestCredential()"`,
            );
            return newNode;
          }

          return node;
        }

        return ts.visitEachChild(node, visitor, transformationContext);
      };

      return ts.visitNode(sourceFile, visitor);
    },
  ],
});

require("ts-node").register({
  skipProject: true,
  transpileOnly: true,
  compilerOptions: {
    ...require("../../../tsconfig.json").compilerOptions,
    target: "es2019",
    module: "commonjs",
    allowJs: true,
    esModuleInterop: true,
    paths: {
      [packageNameToPatch]: ["./src/index"],
    },
  },
  transformers: makeTransformers(),
});
