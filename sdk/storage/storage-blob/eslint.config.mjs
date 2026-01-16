import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    ignores: ["./src/storage-blob-rest/**"],
  },
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "@typescript-eslint/no-redeclare": "warn",
    },
  },
]);
