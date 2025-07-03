// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createLogger } from "../logger.js";

const execAsync = promisify(exec);

// A basic schema can be used to describe parameters for the tool.
// All MCP tools use the Zod schema library to describe their parameters.
export const resolvePnpmLockConflictSchema = z.object({});

export type ResolvePnpmLockConflictSchema = z.infer<typeof resolvePnpmLockConflictSchema>;

export async function resolvePnpmLockConflict(
  _args: ResolvePnpmLockConflictSchema,
  logger: ReturnType<typeof createLogger>,
): Promise<CallToolResult> {
  logger.log(`Fetching latest Azure/azure-sdk-for-js main branch...`);
  const { stdout } = await execAsync(
    "git fetch https://github.com/Azure/azure-sdk-for-js.git main",
    { maxBuffer: 10 * 1024 * 1024 },
  );
  logger.log(stdout);
  const { stdout: repoRoot } = await execAsync("git rev-parse --show-toplevel", {
    maxBuffer: 10 * 1024 * 1024,
  });
  const repoRootTrimmed = repoRoot.trim();
  logger.log(`Repo root is ${repoRootTrimmed}`);
  logger.log(
    `Checking out main branch version of ${repoRootTrimmed}/common/config/rush/pnpm-lock.yaml...`,
  );
  const { stdout: checkoutOutput } = await execAsync(
    `git checkout FETCH_HEAD -- ${repoRootTrimmed}/common/config/rush/pnpm-lock.yaml`,
    {
      cwd: repoRootTrimmed,
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  logger.log(checkoutOutput);
  logger.log(`Running 'rush update'...`);
  await execAsync("rush update", {
    maxBuffer: 100 * 1024 * 1024,
  });
  logger.log(`Rush update finished successfully.`);
  await execAsync(`git add ${repoRootTrimmed}/common/config/rush/pnpm-lock.yaml`, {
    cwd: repoRootTrimmed,
    maxBuffer: 10 * 1024 * 1024,
  });
  logger.log(`Added pnpm-lock.yaml to git staging area.`);

  return {
    content: [
      {
        type: "text",
        text: `Done resolving pnpm-lock.yaml conflicts!`,
      },
    ],
  };
}

export default function registerTool(server: McpServer) {
  const logger = createLogger();
  // Register another tool
  server.tool(
    "resolve_pnpm_lock_conflict",
    "Resolves pnpm-lock.yaml conflicts",
    resolvePnpmLockConflictSchema.shape,
    (args) => resolvePnpmLockConflict(args, logger),
  );
}
