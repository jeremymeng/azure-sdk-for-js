import azsdkEslint from "@azure/eslint-plugin-azure-sdk";
import nodePlugin from "eslint-plugin-n";

export default [
  {
    ignores: ["**/generated/**"],
  },
  nodePlugin.configs["flat/recommended-script"],
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "no-underscore-dangle": [
        "error",
        {
          "allowAfterThis": true
        }
      ],
      "n/no-unsupported-features/es-syntax": [
        "error",
        {
          "ignores": ["modules"]
        }
      ]
    },
  },
];
