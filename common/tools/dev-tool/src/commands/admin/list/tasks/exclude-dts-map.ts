import * as path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../packages";

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  if (packageJson["tshy"]) {
    const files = packageJson["files"];
    if (files === undefined) {
      console.warn(`no "files" field ${packageName} - ${projectFolder}`);
      return;
    }

    let index = files.indexOf("dist/");
    if (index === -1) {
      index = files.indexOf("dist");
    }
    if (index !== -1) {
      const newArray = files.slice();
      newArray.splice(index + 1, 0, "!dist/**/*.d.*ts.map");
      packageJson["files"] = newArray;
      console.log(`    updating ${packageName} ${fullProjectPath} files field`);
      await writeFile(
        path.join(fullProjectPath, "package.json"),
        JSON.stringify(packageJson, undefined, 2) + "\n",
      );
    }
  } else {
    console.warn(`no "tshy" field ${packageName} - ${projectFolder}`);
  }
}
