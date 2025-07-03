// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { helloWorldSchema, helloWorld } from "./tools/helloWorld.js";
import { createLogger } from "./logger.js";
import registerResolvePnpmLockConflictTool from "./tools/resolvePnpmLockConflict.js";

const server = new McpServer({
  name: "Azure SDK MCP Server",
  version: "1.0.0-beta.1",
});
const logger = createLogger();

// Register a tool
server.tool("hello_world", "Prints hello world", helloWorldSchema.shape, (args) =>
  helloWorld(args),
);

registerResolvePnpmLockConflictTool(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.log("Server started");
}

main().catch((error) => {
  logger.log(`Fatal error running server: ${error}`);
  process.exit(1);
});
