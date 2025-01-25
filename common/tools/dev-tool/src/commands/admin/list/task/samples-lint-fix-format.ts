import concurrently from "concurrently";
import { RushJsonProject } from "../packages";
import { join } from "path";
import { existsSync } from "fs";

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

  if (!packageName.includes("arm-") && !packageName.includes("-rest")) {
    return;
  }

  const fullProjectDir = join(root, projectFolder);
  if (!existsSync(join(fullProjectDir, "samples-dev"))) {
    return;
  }

  const { result: lintFix } = concurrently([
    {
      command: `npx dev-tool run vendored eslint --no-inline-config --rule "@typescript-eslint/consistent-type-imports: error" --rule "@typescript-eslint/explicit-function-return-type: error" --rule "prefer-const: error" --rule "@azure/azure-sdk/github-source-headers: off" samples-dev --fix --fix-type [problem,suggestion]`,
      name: "lint:fix samples-dev",
      cwd: fullProjectDir,
    },
  ]);

  try {
    await lintFix;
    console.log(`Done fixing ${packageName} in ${projectFolder}`);
  } catch (ex: unknown) {
    console.log(`Error when fixing ${packageName} in ${projectFolder}: ${ex}`);
  }

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
