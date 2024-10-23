import * as path from "node:path";
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

  const files = packageJson.files;
  if (files && files.some(f => f.toUpperCase() === "CHANGELOG.MD" || f.toUpperCase() === "./CHANGELOG.MD")) {
    console.dir({
      packageName,
      // fullProjectPath,
      // files,
    });
  }
}
