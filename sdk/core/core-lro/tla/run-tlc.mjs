// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

const jar = process.env.TLA2TOOLS_JAR;
if (!jar) {
  console.error("Set TLA2TOOLS_JAR to the absolute path of tla2tools.jar.");
  process.exit(1);
}

const directory = path.dirname(fileURLToPath(import.meta.url));
const metaDirectory = mkdtempSync(path.join(os.tmpdir(), "core-lro-tlc-"));
let result;
try {
  result = spawnSync(
    "java",
    [
      "-jar",
      path.resolve(jar),
      "-workers",
      "auto",
      "-metadir",
      metaDirectory,
      "-config",
      "LroPoller.cfg",
      "LroPoller.tla",
    ],
    { cwd: directory, stdio: "inherit" },
  );
} finally {
  rmSync(metaDirectory, { force: true, recursive: true });
}

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
