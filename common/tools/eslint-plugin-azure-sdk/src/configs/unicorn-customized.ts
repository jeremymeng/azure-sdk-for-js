// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const recommendedRules = eslintPluginUnicorn.configs["flat/recommended"].rules || {};
const patchedRules = Object.keys(recommendedRules)
  .filter((s) => recommendedRules[s] === "error")
  .reduce<Record<string, SharedConfig.RuleEntry>>((accumulator, curr) => {
    accumulator[curr] = "warn";
    return accumulator;
  }, {});

export default {
  name: "unicorn-azsdk-customized",
  rules: {
    ...patchedRules,
    ...({
      "unicorn/filename-case": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-string-slice": "off",
      "unicorn/numeric-separators-style": [
        "warn",
        { onlyIfContainsSeparator: true, binary: { onlyIfContainsSeparator: false } },
      ],
    } as Record<string, SharedConfig.RuleEntry>),
  },
};
