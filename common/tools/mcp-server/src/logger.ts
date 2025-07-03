// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type LoggingLevel =
  | "debug"
  | "info"
  | "notice"
  | "warning"
  | "error"
  | "critical"
  | "alert"
  | "emergency";

let logger:
  | {
      log: (message: string, level?: LoggingLevel) => void;
    }
  | undefined;

export function createLogger() {
  if (logger) {
    return logger;
  }
  return (logger = {
    log: (message: string, level: LoggingLevel = "info") => {
      console.log(`[${level.toUpperCase()}] ${message}`);
    },
  });
}
