import path from "node:path";
import { resolveProject } from "../../../../util/resolveProject";
import { execSync } from "node:child_process";
import { RushJsonProject } from "../../../../util/synthesizedRushJson";

export default async function listPackageCallback(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  if (packageJson.private) {
    return;
  }

  try {
    const dev = execSync(`npm view ${packageName}@dev -json`, { encoding: "utf8", });
    const parsed = JSON.parse(dev);
    if (!parsed.version.includes("alpha")) {
      console.log(`[BAD] ${parsed.name} ${parsed.version}`);
    }
    else {
      console.log(`[GOOD] ${parsed.name} ${parsed.version}`);
    }
  } catch (e: unknown) {
    console.log(`### ${e}`);
  }
}
