// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { readFile, stat, constants } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Project } from "./dev-tool/node_modules/ts-morph/dist/ts-morph.js";

export async function resolve(specifier, context, defaultResolve) {
  console.log("resolving...");
  console.dir({specifier, context});
  const resolved = await defaultResolve(specifier, context, defaultResolve);
  console.dir({resolved});
  // Let Node.js handle all other specifiers.
  if (resolved.url.includes("dist-esm/")) {
    resolved.format = "module";
  }
  return resolved;
}

async function addJsExtensionToRelativeModules(source, path) {
  const base = dirname(path);
  const project = new Project({ useInMemoryFileSystem: true });
  const text =  source.toString("utf-8");
  const f = project.createSourceFile("file.ts", text);
  const imports = f.getImportDeclarations();
  const exports = f.getExportDeclarations();
  console.dir({l: "input", path, head: text.substring(0, 1200), imports, exports});
  for (const i of imports) {
    const specifierValue = i.getModuleSpecifierValue();
    console.dir({base, specifierValue});
    if (specifierValue.startsWith(".")) {
      const sourcePath = join(base, specifierValue);
      try {
        const s = await stat(sourcePath, constants.R_OK);
        // console.dir({sourcePath, stat: s});
        if (s.isDirectory()) {
          i.setModuleSpecifier?.(`${specifierValue}/index.js`);
        } else {
          i.setModuleSpecifier?.(`${specifierValue}.js`);
        }
      } catch (e) {
        console.dir({error: e});
        i.setModuleSpecifier?.(`${specifierValue}.js`);
      }
    }
  }
  for (const e of exports) {
    const specifierValue = e.getModuleSpecifierValue();
    console.dir({base, specifierValue});
    if (specifierValue.startsWith(".")) {
      const sourcePath = join(base, specifierValue);
      try {
        const s = await stat(sourcePath, constants.R_OK);
        // console.dir({sourcePath, stat: s});
        if (s.isDirectory()) {
          e.setModuleSpecifier?.(`${specifierValue}/index.js`);
        } else {
          e.setModuleSpecifier?.(`${specifierValue}.js`);
        }
      } catch (e) {
        console.dir({error: e});
        e.setModuleSpecifier?.(`${specifierValue}.js`);
      }
    }
  }

  console.dir({l:"output", head: f.getFullText().substring(0, 1200)});
  return f.getFullText();
}

export async function load(url, context, defaultLoad) {
  console.log("loading...");
  console.dir({url, context});

  if (url.includes("dist-esm/")) {
    const path = url.replace("file://", "");
    const source = await readFile(path);
    const transformed = await addJsExtensionToRelativeModules(source, path);
    // console.dir({path, head: transformed.substring(0,200)});
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
//   console.log("getting format...");
//     return {
//       format: "module",
//     };
// }


// export function transformSource(source, context, defaultTransformSource) {
//   const { url } = context;
//   console.log("transforming...");
//   console.dir({context});
//   if (url.include("dist-esm/test")) {
//     return {
//       source: source.replaceAll("import", "require")
//     };
//   }

//   // Let Node.js handle all other sources.
//   return defaultTransformSource(source, context, defaultTransformSource);
// }
