// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    include: ["test/**/etags.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts"],
    coverage: {
      reporter: ['text', 'html', 'clover', 'json'],
    },
  },
});
