// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import eslint from "@eslint/js";

export default [
  {
    files: ["src/**/*.ts"],
    rules: eslint.configs.recommended.rules,
  },
];
