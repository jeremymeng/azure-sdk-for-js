import base from "../eslint.config.mjs";
export default [
  ...base,
  {
    rules: {
      "no-console": "off",
      "space-before-function-paren": "off",
    },
  },
];
