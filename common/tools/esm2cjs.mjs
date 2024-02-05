// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { readFile, stat, constants } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Project } from "./dev-tool/node_modules/ts-morph/dist/ts-morph.js";

function consoleLog(...args) {
  if (process.env.DEBUG) {
    console.log(args);
  }
}

function consoleDir(...args) {
  if (process.env.DEBUG) {
    console.dir(args);
  }
}

export async function resolve(specifier, context, defaultResolve) {
  consoleLog("resolving...");
  consoleDir({specifier, context});
  const resolved = await defaultResolve(specifier, context, defaultResolve);
  consoleDir({resolved});
  if (resolved.url.includes("dist-esm/")) {
    resolved.format = "module";
  }
  return resolved;
}

async function updateSpecifierValueIfRelative(declaration, base) {
    const specifierValue = declaration.getModuleSpecifierValue();
    consoleDir({base, specifierValue});
    if (specifierValue?.startsWith(".")) {
      const sourcePath = join(base, specifierValue);
      try {
        const s = await stat(sourcePath, constants.R_OK);
        consoleDir({sourcePath});
        if (s.isDirectory()) {
          declaration.setModuleSpecifier(`${specifierValue}/index.js`);
        } else {
          declaration.setModuleSpecifier(`${specifierValue}.js`);
        }
      } catch (ex) {
        consoleDir({error: ex});
        declaration.setModuleSpecifier(`${specifierValue}.js`);
      }
      consoleLog(`  specifier updated to ${declaration.getModuleSpecifierValue()}`);
    }  
}

async function addJsExtensionToRelativeModules(source, path) {
  const base = dirname(path);
  const project = new Project({ useInMemoryFileSystem: true });
  const text =  source.toString("utf-8");
  const f = project.createSourceFile("file.ts", text);
  const imports = f.getImportDeclarations();
  const exports = f.getExportDeclarations();
  consoleDir({l: "input",
               path,
               head: text.substring(0, 1200),
               imports: imports.map(i => i.getText()),
               exports: exports.map(e => e.getText()),
              });
  for (const i of imports) {
    await updateSpecifierValueIfRelative(i, base);
  }
  for (const e of exports) {
    await updateSpecifierValueIfRelative(e, base);
  }

  consoleDir({l:"output", head: f.getFullText().substring(0, 1200)});
  return f.getFullText();
}

export async function load(url, context, defaultLoad) {
  consoleLog("loading...");
  consoleDir({url, context});

  if (url.includes("dist-esm/")) {
    const path = url.replace("file://", "");
    const source = await readFile(path);
    const transformed = await addJsExtensionToRelativeModules(source, path);
    return {
      format: context.format,
      source: transformed,
      shortCircuit: true
    };
  }
  const { source } = await defaultLoad(
    url,
    context,
    defaultLoad
  );

  return { format: context.format, source, shortCircuit: true };
}

// export function getFormat(url, context, defaultGetFormat) {
//   consoleLog("getting format...");
//     return {
//       format: "module",
//     };
// }

// export function transformSource(source, context, defaultTransformSource) {
//   const { url } = context;
//   consoleLog("transforming...");
//   consoleDir({context});
//   if (url.include("dist-esm/test")) {
//     return {
//       source: source.replaceAll("import", "require")
//     };
//   }

//   // Let Node.js handle all other sources.
//   return defaultTransformSource(source, context, defaultTransformSource);
// }
