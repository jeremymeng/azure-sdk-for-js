// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingClient } from "@azure/core-tracing";

/**
 * A tracing client that can be used to manage spans.
 * @internal
 */
export const tracingClient: TracingClient = createTracingClient({
  namespace: "Microsoft.Data.Tables",
  packageName: "@azure/data-tables",
  packageVersion: "13.2.2",
});

export function tracing(className: string, optArgPosition: number) {

  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      console.log(`Entering method '${methodName}'.`)
      console.log("args:", args);
      const options = args[optArgPosition];
      return tracingClient!.withSpan(`${className}.${methodName}`, options, (updatedOptions) => {
        console.dir({ args: args.slice(0, optArgPosition), updatedOptions})
        return originalMethod.call(this, ...args.slice(0, optArgPosition), updatedOptions);
      });
    }

    return replacementMethod;
  }
}
