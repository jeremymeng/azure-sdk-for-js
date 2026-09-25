// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const jar = process.env.TLA2TOOLS_JAR;
if (!jar) {
  console.error("Set TLA2TOOLS_JAR to the absolute path of tla2tools.jar.");
  process.exit(1);
}

const directory = path.dirname(fileURLToPath(import.meta.url));
const result = spawnSync(
  "java",
  ["-jar", path.resolve(jar), "-workers", "auto", "-config", "LroPoller.cfg", "LroPoller.tla"],
  { cwd: directory, stdio: "inherit" },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
