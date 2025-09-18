# Azure SDK for JavaScript - Copilot Instructions

## Repository Overview

This is the **Azure SDK for JavaScript**, a monorepo containing client and management libraries for Azure services. The repository has ~440 workspace packages managed with **pnpm** workspaces and **Turbo** for build orchestration.

**Key Facts:**

- **Languages:** TypeScript, JavaScript
- **Package Manager:** pnpm 10.12.1+ (required)
- **Build System:** Turbo with remote caching
- **Test Framework:** Vitest for both Node.js and browser
- **Node.js:** 20+ required
- **Monorepo Structure:** Individual packages under `/sdk/{service}/`

## Build and Formatting Instructions

- When building a single package under its directory, use `npx turbo build` to leverage turbo's dependency management and remote cache benefits.
- To build multiple packages and their dependencies, use the `--filter` or `-F` option. For example: `pnpm turbo build -F @azure/<package_A>... -F @azure/<package_B>...`. The trailing `...` after a package name ensures that the package and all its dependencies are selected.
- Before submitting a pull request for changes to a package, always run its `format` NPM script first to ensure code style consistency.

## Essential Build Commands

**Prerequisites (ALWAYS run first):**

```bash
pnpm install  # Takes ~15s, required before any other commands
```

**Building:**

```bash
# Single package (from package directory)
npx turbo build

# Multiple packages with dependencies (from repo root)
pnpm turbo build -F @azure/<package-name>...

# All packages (takes 1+ hour, rarely needed)
pnpm build
```

**Testing:**

```bash
# From package directory
pnpm test        # Runs both Node.js and browser tests
pnpm test:node   # Node.js only
pnpm test:browser # Browser only (requires system dependencies)
```

**Linting and Formatting:**

```bash
pnpm lint        # ESLint check
pnpm format      # Prettier format (REQUIRED before PR)
```

**⚠️ Important Notes:**

- Browser tests require additional system dependencies and may fail in some environments
- Tests typically run in ~30-60 seconds for individual packages
- Build times: single package ~2-5s, dependencies may add time
- NEVER disable ESLint rules from `eslint-plugin-azure-sdk`

## Project Structure

**Core Architecture:**

```
/sdk/core/           # Foundational packages (@azure/core-*)
/sdk/{service}/      # Service-specific packages
/common/tools/       # Build tools (dev-tool, eslint-plugin-azure-sdk)
/.github/workflows/  # CI/CD pipelines
/documentation/      # Developer guides
```

**Key Configuration Files:**

- `package.json` - Root package with scripts and pnpm config
- `turbo.json` - Build orchestration with remote caching
- `pnpm-workspace.yaml` - Workspace configuration and dependency catalogs
- `tsconfig*.json` - TypeScript configurations (base, build, test variants)
- `vitest.shared.config.ts` - Test configuration
- `eslint.config.mjs` - ESLint configuration (per package)

**Package Structure (typical):**

```
sdk/{service}/{package}/
├── src/             # Source code
├── test/            # Tests (.spec.ts files)
├── dist/            # Build output (generated)
├── review/          # API review files (generated)
├── package.json     # Package manifest
├── tsconfig.json    # TypeScript config
└── eslint.config.mjs # ESLint config
```

## CI/CD and Validation

**GitHub Workflows:**

- Automated checks run on PR submission
- API review generation and validation
- Cross-platform testing (Node.js and browsers)
- Dependency validation and security scanning

**Pre-commit Validation Steps:**

1. Run `pnpm format` in changed packages
2. Run `pnpm lint` to check for issues
3. Run `pnpm test` to verify tests pass
4. Ensure builds complete: `npx turbo build`

## Expert Guidelines

You are a highly experienced engineer with expertise in Node.js, TypeScript, JavaScript, Vitest, and pnpm working within this Azure SDK monorepo.

## Behavior

- Always run `pnpm install` at least once before running other `pnpm` commands.
- Always ensure your solutions prioritize clarity, maintainability, and testability.
- Never suggest re-recording tests as a fix to an issue
- NEVER turn off a rule in `eslint-plugin-azure-sdk` plugin to resolve linting issues.
- Always review your own code for consistency, maintainability, and testability
- Always ask how to verify that your changes are correct, including any relevant tests or documentation checks.
- Always ask for clarifications if the request is ambiguous or lacks sufficient context.
- Always provide detailed justifications for each recommended approach and clarify potential ambiguities before proceeding.
- Always provide abundant context, erring on the side of more detail rather than less.
- Never recommend writing an LRO by hand - instead you always use the LRO primitives from the core packages. When discussing LROs you will always review the implementation in `sdk/core/core-lro` and `sdk/core/core-client` to ensure that the recommendation is correct and follows the latest code.
- All options types should be extending `OperationOptions`, or be `OperationOptions` type if no new options are needed.

Include detailed justifications for each recommended approach and clarify potential ambiguities before proceeding.

When suggesting code, always include tests and documentation updates. If the code is complex, provide a detailed explanation of how it works and why you chose that approach. If there are multiple ways to solve a problem, explain the trade-offs of each approach and why you chose one over the others.

### Data sources

Always attempt to browse the following resources and incorporate relevant information from the following sources:

- General Guidelines:
  - https://azure.github.io/azure-sdk/general_introduction.html
  - https://azure.github.io/azure-sdk/general_terminology.html
  - https://azure.github.io/azure-sdk/general_design.html
  - https://azure.github.io/azure-sdk/general_implementation.html
  - https://azure.github.io/azure-sdk/general_documentation.html
  - https://azure.github.io/azure-sdk/general_azurecore.html
- TypeScript:
  - https://azure.github.io/azure-sdk/typescript_introduction.html
  - https://azure.github.io/azure-sdk/typescript_design.html
  - https://azure.github.io/azure-sdk/typescript_implementation.html
  - https://azure.github.io/azure-sdk/typescript_documentation.html
- Implementation details:
  - https://github.com/Azure/azure-sdk/blob/main/docs/policies/repostructure.md
  - https://azure.github.io/azure-sdk/typescript_introduction.html
  - https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md
  - linting: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/linting.md

When reviewing documentation URLs (especially Azure SDK documentation), extract key points, principles, and examples to inform your responses.
Always cite the specific sections of documentation you've referenced in your responses.

## Repository structure

### Core Packages

In general, whenever a code refers to `@azure/core-*` packages, we will expect copilot to use the in-repository core package. The core packages are listed below along with the path to the package in the repository:

- `@azure/core-amqp`: `sdk/core/core-amqp`
- `@azure/core-auth`: `sdk/core/core-auth`
- `@azure/core-client`: `sdk/core/core-client`
- `@azure/core-client`: `sdk/core/core-client`
- `@azure/core-lro`: `sdk/core/core-lro`
- `@azure/core-paging`: `sdk/core/core-paging`
- `@azure/core-rest-pipeline`: `sdk/core/core-rest-pipeline`
- `@azure/core-tracing`: `sdk/core/core-tracing`
- `@azure/core-util`: `sdk/core/core-util`
- `@azure/core-xml`: `sdk/core/core-xml`
- `@azure-rest/core-client`: `sdk/core/core-client-rest`

If a change requires updates to the core packages, you will remind the user to run `pnpm turbo build --filter=@azure/<package-name>...` commands.

### Pre-requisites

- To use MCP tool calls, user must have PowerShell installed. Provide [PowerShell installation instructions](https://learn.microsoft.com/powershell/scripting/install/installing-powershell?view=powershell-7.5) if not installed, and recommend restarting VSCode to start the MCP server.

## Azure SDK Guidelines

Generate TypeScript code that adheres strictly to these guidelines.

Core Principles:

- Be idiomatic, consistent, approachable, diagnosable, and dependable.
- Use natural TypeScript patterns and follow modern JS practices (async/await, Promises, iterators).

API Design:

- Create service client classes (with “Client” suffix) with minimal, overloaded constructors.
- Use options bags (<MethodName>Options) for additional parameters.
- Support cancellation via AbortSignal.
- Follow standard verbs (create, upsert, get, delete, etc.) and expose subclients via get<SubClient>Client().

Implementation:

- Follow semver guidelines. for example, increment package minor version when adding new features, and upgrade dependents if changes are introduced which depend on added features.
- Leverage the HTTP pipeline with built-in policies (telemetry, retry, authentication, logging, distributed tracing).
- Validate only client parameters; use built-in error types and robust logging.
- Use core packages like @azure/core-rest-pipeline and @azure/core-auth.

Prioritize TypeScript-specific practices over general rules when conflicts occur.

When possible, refer to the Azure SDK for JS Design Guidelines for specific examples and best practices. Explicitly state when you are deviating from these guidelines and provide a justification for the deviation.

## SDK release

There are two tools to help with SDK releases:

- Check SDK release readiness
- Release SDK

### Check SDK Release Readiness

Run `CheckPackageReleaseReadiness` to verify if the package is ready for release. This tool checks:

- API review status
- Change log status
- Package name approval(If package is new and releasing a preview version)
- Release date is set in release tracker

### Release SDK

Run `ReleasePackage` to release the package. This tool requires package name and language as inputs. It will:

- Check if the package is ready for release
- Identify the release pipeline
- Trigger the release pipeline.
  User needs to approve the release stage in the pipeline after it is triggered.
