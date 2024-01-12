// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import concurrently from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";

const log = createPrinter("vitest:browser");

export const commandInfo = makeCommandInfo(
  "vitest:browser",
  "runs the browser tests using vitest",
);

export default leafCommand(commandInfo, async (options) => {
  const stdoutChunks: string[] = [];
  const { result, commands } = concurrently([{
    command: "npx playwright install chrome",
    name: "Ensure chrome for playwright",
  }]);

  commands[0].stdout.subscribe({
    next(x) {
      stdoutChunks.push(x);
    }
  });

  try {
    await result;
  }catch(e) {
    const errMessage = stdoutChunks.reduce((prev, cur) => prev + cur, "");
    if (!errMessage.includes(`ATTENTION: "chrome" is already installed on the system!`)) {
      throw e;
    } else {
      log.success("playwright chrome installed");
    }
  }

  const args = options["--"]?.length
    ? options["--"].join(" ")
    : "";
  const command = {
    command: `vitest -c vitest.browser.config.mts ${args}`,
    name: "vitest-browser-tests",
  };
  await concurrently([command]).result;
  return true;
});
