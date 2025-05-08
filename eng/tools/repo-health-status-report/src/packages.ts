// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getPackageJsons } from "@azure-tools/eng-package-utils";
import { getBaseDir } from "./env.js";

export async function getDataplanePackages() {
  const workspaceRoot = getBaseDir();
  const packages = await getPackageJsons(workspaceRoot);
  const dataplanePackages: Awaited<ReturnType<typeof getPackageJsons>> = {};
  for (const [key, value] of Object.entries(packages)) {
    if (value.versionPolicy === "client") {
      delete value.json;
      delete value.newVer;
      dataplanePackages[key] = value;
    }
  }
  return dataplanePackages;
}
