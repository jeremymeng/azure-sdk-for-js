import path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../../../../util/synthesizedRushJson";
import { sortPackageJson } from "../../../../util/sortPackageJson";

export default async function listPackageCallback(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  tryAddDep(packageJson, "clean", "rimraf", "rimraf");
  tryAddDep(packageJson, "lint", "eslint", "eslint");
  tryAddDep(packageJson, "format", "prettier", "prettier");
  packageJson.devDependencies["cross-env"] = "catalog:";
  if (packageJson["tshy"]) {
    packageJson.devDependencies["tshy"] = "catalog:";
  }

  sortPackageJson(packageJson);

  await writeFile(
    path.join(fullProjectPath, "package.json"),
    JSON.stringify(packageJson, undefined, 2) + "\n",
  );
}

function tryAddDep(
  packageJson: PackageJson,
  scriptName: string,
  commandName: string,
  depName: string,
): boolean {
  const script = packageJson.scripts[scriptName];
  if (!script) {
    console.warn(`    no ${scriptName} script in ${packageJson.name}`);
    return false;
  }
  if (script?.includes(commandName)) {
    if (!packageJson.devDependencies[depName]) {
      packageJson.devDependencies[depName] = "catalog:";
      return true;
    }
  }
  return false;
}
