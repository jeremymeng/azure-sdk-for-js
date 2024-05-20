// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This task tries to identify tests that calls a LRO without passing the test polling options,
// which would causes unnecessary waits in playback testing mode.

import * as path from "node:path";
import { RushJsonProject } from "./packages";
import { MethodDeclaration, Project, SyntaxKind } from "ts-morph";

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder } = project;
  if (!projectFolder.startsWith("sdk")) {
    console.log(`skipping ${projectFolder}`);
    return;
  }
  const tsConfigFilePath = path.join(root, projectFolder, "tsconfig.json");
  const tsProject = new Project({
    tsConfigFilePath,
  })
  const testDirPath = path.join(root, projectFolder, "test");
  const tsFiles = tsProject.getSourceFiles();
  const typechecker = tsProject.getTypeChecker();
  for (const file of tsFiles) {
    const filePath = file.getFilePath();
    if (!filePath.includes(testDirPath) ||
      filePath.includes("perf-tests") ||
      filePath.includes("/test/internal") ||
      filePath.includes("/test/private")) {
      continue;
    }
    const callExpressions = file.getDescendantsOfKind(SyntaxKind.CallExpression);
    for (const call of callExpressions) {
      const resolvedSignature = typechecker.getResolvedSignature(call);
      const parent = call.getParent();
      if (call.getExpression()?.getText().includes(".begin") && parent?.getKindName() === "AwaitExpression") {
        const args = call.getArguments();
        if (args.length >= 1) {
          const lastArgument = args[args.length - 1];
          const lastArgText = lastArgument.getText();
          const decl = resolvedSignature?.getDeclaration() as MethodDeclaration;
          const params = decl.getParameters();
          const lastParam = params?.length >= 1 ? params[params.length - 1] : undefined;
          const lastParamType = lastParam ? typechecker.getTypeAtLocation(lastParam).getText() : "undefined";
          const relativePath = filePath.replace(root, "");
          const startLine = lastArgument.getStartLineNumber();
          const endLine = lastArgument.getEndLineNumber();
          const link = startLine == endLine
            ? `https://github.com/Azure/azure-sdk-for-js/blob/main/${relativePath}#L${startLine}`
            : `https://github.com/Azure/azure-sdk-for-js/blob/main/${relativePath}#L${startLine}-L${endLine}`
          if (["Options", "OptionalParams"].some(v => lastParamType.includes(v))) {
            if (!lastArgText.includes("testPoll") &&
              !lastArgText.includes("pollerSettings") &&
              lastArgText !== "options" &&
              !lastArgText.includes("updateIntervalInMs")) {
              console.log(`- [${relativePath}](${link})`);
            }
          } else {
            console.log(`- Questionable [${relativePath}](${link})`);
            console.dir({
              lastParamType,
              relativePath,
              lastArgument: lastArgument.getText(),
            });
          }
        }
      }
    }
  }
}
