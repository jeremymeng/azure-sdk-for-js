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
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  const toReplace = ["@microsoft/api-extractor"] as const;
  // const toReplace = ["rimraf", "mkdirp"] as const;

  console.log(`updating ${packageName} ${fullProjectPath}`);
  let updated = false;
  for (const dep of toReplace) {
    for (const script of Object.keys(packageJson.scripts)) {
      if (packageJson.scripts[script].includes(dep)) {
        console.log(`    updating "${script}"`);
        packageJson.scripts[script] = packageJson.scripts[script].replaceAll(dep, `dev-tool run vendored ${dep}`);
        updated = true;
      }
    };
    if (packageJson.devDependencies[dep]) {
      console.log(`   removing "${dep}" dependency`);
      delete packageJson.devDependencies[dep];
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
