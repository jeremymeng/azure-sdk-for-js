# Useful Commands while Testing your packages

If you're not familiar with the recorder, refer to the [recorder README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

If you're looking to be onboarded to the asset-sync workflow to push test recordings to the `Azure/azure-sdk-assets` repository, refer to the [asset-sync workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).

## Workspace commands

| command | What does it do? |
|:--|:--|
| `pnpm install` | Installs or refreshes workspace dependencies from the repo root. |
| `pnpm turbo build --filter=<package-name>... --token 1` | Builds a package and its dependency tree from the repo root. |

## Commands to run inside the package directory

| script name | command (usually) |
|:--|:--|
| `pnpm test:browser` | `dev-tool run test:vitest --browser` |
| `pnpm test:node` | `dev-tool run test:vitest` |
| `pnpm unit-test` | Runs the package's unit-test script when the package defines one. |
| `pnpm integration-test` | Runs the package's integration-test script when the package defines one. |

## After migrating to asset-sync

This expects that your package has `dev-tool` in `devDependencies` and that you have [PowerShell][powershell] installed.

| command | What does it do? |
| :-- | :-- |
| `npx dev-tool test-proxy init` | **Only once per package.** Generates `assets.json` with an empty tag. After `init`, run test commands such as `pnpm test:node` or the package's `unit-test`/`integration-test` scripts to generate recordings, then push them. |
| `npx dev-tool test-proxy migrate --initial-push` | **Only once per package.** Migrates test recordings to the assets repo for the first time and also generates `assets.json`. |
| `npx dev-tool test-proxy push` | Pushes test recordings to the assets repo. |
| `npx dev-tool test-proxy reset` | Reverts local recording changes and resets to what is currently referenced in `assets.json`. This is destructive. |
| `npx dev-tool test-proxy restore` | Downloads the recordings referenced by `assets.json`. Playback usually restores automatically, but you can run this in advance for offline work. |

## Debug logs from the test proxy tool

| command | What does it do? |
| :-- | :-- |
| `dev-tool run test:vitest --test-proxy-debug` | Provides helpful test-proxy debug logs that include sanitization changes from both the central sanitizers and user-specified ones. |

## Run a single test instead of the whole test suite

### Method 1: the `.only` way

1. Update `vitest.config.ts` to include the test file you're interested in.
2. Set `.only` on the test you're interested in.
3. Run a node-targeted test command that exists in your package, such as `pnpm test:node` or `pnpm unit-test`.

### Method 2: filter by test name

```bash
pnpm test:node -- --testNamePattern "simple"
```

Reference: [Filtering Tests — Introduction to Testing JavaScript with Vitest](https://stevekinney.net/courses/testing/filtering-tests)

### Method 3: run a single test file

```bash
pnpm test:node -- test/public/metricsClient.spec.ts
```

[powershell]: https://github.com/PowerShell/PowerShell
