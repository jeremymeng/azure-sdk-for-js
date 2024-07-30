import azsdkEslint from "../common/tools/eslint-plugin-azure-sdk/dist-esm/src/index.js";

export default [
  {
    ignores: ["**/test/perf/track-1/**"],
  },
  ...azsdkEslint.configs.recommended,
];
