import * as path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../packages";


// replace a dependency with vendor version in dev-tool

export default async function updatePackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  if (packageName === "@azure/dev-tool") {
    return;
  }
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  const toReplace = [{name: "uglify-js", command: "uglifyjs"}] as const;
  // const toReplace = ["rimraf", "mkdirp"] as const;

  console.log(`updating ${packageName} ${fullProjectPath}`);
  let updated = false;
  for (const dep of toReplace) {
    const depName = typeof dep === "string" ? dep : dep.name;
    for (const script of Object.keys(packageJson.scripts)) {
      const depCommand = typeof dep === "string" ? dep: dep.command;
      if (packageJson.scripts[script].includes(depCommand)) {
        console.log(`    updating "${script}"`);
        packageJson.scripts[script] = packageJson.scripts[script].replaceAll(depCommand, `dev-tool run vendored ${depCommand}`);
        updated = true;
      }
    };
    if (packageJson.devDependencies[depName]) {
      console.log(`  removing "${depName}" dependency`);
      delete packageJson.devDependencies[depName];
      updated = true;
    }
  }

  if (updated) {
    await writeFile(
      path.join(fullProjectPath, "package.json"),
      JSON.stringify(packageJson, undefined, 2) + "\n",
    );
  }
}
