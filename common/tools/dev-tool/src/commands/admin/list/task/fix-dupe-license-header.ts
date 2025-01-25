import { RushJsonProject } from "../packages";
import { join } from "path";
import { Project, Statement, SyntaxKind } from "ts-morph";

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  if (packageName === "@azure/dev-tool") {
    return;
  }

  // if (packageName !== "@azure/arm-eventgrid") {
  //   return;
  // }
  const fullProjectDir = join(root, projectFolder);

  const tsProject = new Project({
    tsConfigFilePath: join(fullProjectDir, "tsconfig.json"),
  });

  for (const f of tsProject.getSourceFiles()) {
    const filePath = f.getFilePath();
    if (filePath.endsWith(".d.ts")) {
      continue;
    }
    const firstNode = f.getChildAtIndex(0);
    const leadingComments = firstNode.getLeadingCommentRanges();
    if (leadingComments.length < 1) {
      console.error(`  no license header? ${f.getFilePath()}`);
    } else {
      let updated = false;
      if (
        leadingComments[0].getKind() === SyntaxKind.SingleLineCommentTrivia &&
        leadingComments[0].getText() === "// Copyright (c) Microsoft Corporation." &&
        leadingComments[1].getKind() === SyntaxKind.SingleLineCommentTrivia &&
        leadingComments[1].getText() === "// Licensed under the MIT License."
      ) {
        const statements = f.getStatementsWithComments();
        // keep the first two comments and remove rest
        for (let i = statements.length - 1; i >= 2; i--) {
          if (isLicenseText(statements[i])) {
            statements[i].remove();
            updated = true;
          }
        }
      } else if (
        leadingComments[0].getKind() === SyntaxKind.MultiLineCommentTrivia &&
        leadingComments[0].getText().includes(` * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
`)
      ) {
        const statements = f.getStatementsWithComments();
        // keep the first two comments and remove rest
        for (let i = statements.length - 1; i >= 1; i--) {
          if (isLicenseText(statements[i])) {
            statements[i].remove();
            updated = true;
          }
        }
      }

      if (updated) {
        await f.save();
        console.log(`  updated ${f.getFilePath()}`);
      }
    }
  }

  await tsProject.save();

  // const { result: format } = concurrently([
  //   {
  //     command: `npx dev-tool run vendored prettier --write --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore  "samples-dev/**/*.ts"`,
  //     name: "format samples-dev",
  //     cwd: fullProjectDir,
  //   },
  // ]);

  // try {
  //   await format;
  //   console.log(`Done formatting ${packageName} in ${projectFolder}`);
  // } catch (ex: unknown) {
  //   console.log(`Error when formatting ${packageName} in ${projectFolder}: ${ex}`);
  // }
}

function isLicenseText(comment: Statement) {
  const result =
    (comment.getKind() === SyntaxKind.SingleLineCommentTrivia &&
      comment.getText() === "// Copyright (c) Microsoft Corporation.") ||
    (comment.getKind() === SyntaxKind.SingleLineCommentTrivia &&
      (comment.getText() === "// Licensed under the MIT License." ||
        comment.getText() === "// Licensed under the MIT license.")) ||
    (comment.getKind() === SyntaxKind.MultiLineCommentTrivia &&
      comment.getText().includes(` * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
`));
  return result;
}
