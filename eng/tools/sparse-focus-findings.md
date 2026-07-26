# Sparse-Focus Validation Report: `@azure/storage-queue`

**Date:** 2026-07-26  
**Script:** `eng/tools/sparse-focus.mjs`  
**Target package:** `@azure/storage-queue`  
**Temp dir:** `/tmp/focus-test` (git worktree, left on disk)

---

## 1. Manifest-Invariant Result ✅ HOLDS

**Question:** After sparse-checkout, does every workspace `package.json` from `pnpm-lock.yaml`'s `importers:` still exist on disk?

| Metric | Value |
|--------|-------|
| `importers:` paths in lock file | **469** |
| `package.json` files present on disk after sparse-checkout | **469** |
| Missing | **0** |

**Result: INVARIANT HOLDS 100%.** Every workspace importer has its `package.json` present.

---

## 2. Size Reduction

The script was run in two modes:

### Mode A — Minimal pattern (workspace: deps only, good for install validation)
Keeps: root + eng/ + common/ + every workspace `package.json` + 9 full source dirs (direct workspace: closure).

| | Files (source, no node_modules) | Size (source only) |
|--|--|--|
| Full checkout (baseline) | 101,130 | 789 MB |
| After sparse-checkout | **3,383** | **25 MB** |
| Reduction | **96.7%** | **96.8%** |

### Mode B — Full linkWorkspacePackages closure (needed for build)
Adds full source for all 25 workspace-linked packages (see §4 below).

| | Files (source only) | Size (source only) |
|--|--|--|
| Full checkout (baseline) | 101,130 | 789 MB |
| After sparse-checkout | **10,679** | **126 MB** |
| Reduction | **89.4%** | **84.0%** |

---

## 3. Install: `pnpm install --frozen-lockfile` ✅ SUCCEEDED

```
Lockfile is up to date, resolution step is skipped
Progress: resolved 1434, reused 1432, downloaded 0, added 1434, done
Done in 11.7s using pnpm v11.9.0
```

**Classification: Not a lockfile failure.** The frozen lockfile passed validation 100% using Mode A (minimal, 25 MB checkout). The hypothesis is **PROVEN**: keeping all 469 workspace `package.json` files satisfies pnpm's importer-completeness check.

---

## 4. Build: `pnpm turbo run build --filter "@azure/storage-queue..."` 

### First attempt — Mode A pattern (workspace: deps only)
**Result: FAILED.** 4 packages failed (`@azure/core-xml`, `@azure/abort-controller`, `@typespec/ts-http-runtime`, `@azure/core-paging`).

**Root cause:** `pnpm-workspace.yaml` sets `linkWorkspacePackages: true`. This makes pnpm link **all** workspace packages into `node_modules/` instead of fetching pre-built versions from the registry — even for deps specified with plain semver ranges (e.g., `"^1.6.0"`), not just `workspace:^`. Turbo then includes all linked workspace packages in the build graph. When their `src/` is absent, the TypeScript compilation fails.

### Revised closure (script v2 — all workspace-linked deps)
The script was updated: `workspaceDepsOf()` now follows ALL deps that resolve to a workspace package (not just `workspace:` specifiers).

**Closure expanded from 9 → 25 packages:**

| Package | Path |
|---------|------|
| @azure/dev-tool | common/tools/dev-tool |
| @azure/eslint-plugin-azure-sdk | common/tools/eslint-plugin-azure-sdk |
| @azure-tools/vite-plugin-browser-test-map | common/tools/vite-plugin-browser-test-map |
| @microsoft/warp | common/tools/warp |
| @azure/abort-controller | sdk/core/abort-controller |
| @azure/core-auth | sdk/core/core-auth |
| @azure/core-client | sdk/core/core-client |
| @azure-rest/core-client | sdk/core/core-client-rest |
| @azure/core-http-compat | sdk/core/core-http-compat |
| @azure/core-lro | sdk/core/core-lro |
| @azure/core-paging | sdk/core/core-paging |
| @azure/core-rest-pipeline | sdk/core/core-rest-pipeline ← link override |
| @azure/core-tracing | sdk/core/core-tracing |
| @azure/core-util | sdk/core/core-util |
| @azure/core-xml | sdk/core/core-xml |
| @azure/logger | sdk/core/logger |
| @typespec/ts-http-runtime | sdk/core/ts-http-runtime |
| @azure/identity | sdk/identity/identity |
| @azure/keyvault-common | sdk/keyvault/keyvault-common |
| @azure/keyvault-keys | sdk/keyvault/keyvault-keys |
| @azure/storage-common | sdk/storage/storage-common |
| @azure/storage-queue | sdk/storage/storage-queue ← target |
| @azure-tools/test-recorder | sdk/test-utils/recorder |
| @azure-tools/test-credential | sdk/test-utils/test-credential |
| @azure-tools/test-utils-vitest | sdk/test-utils/test-utils-vitest |

### Second attempt — Mode B pattern (25 full source dirs)
**Result: ✅ BUILD SUCCEEDED** — 21/21 turbo tasks (4 cached, 17 compiled fresh).

```
Tasks:    21 successful, 21 total
Cached:    4 cached, 21 total
Time:    1m35.6s
```

---

## 5. Test: `pnpm turbo run test:node --filter "@azure/storage-queue"`

**Result: BLOCKED by sandbox network limitation.**

```
[test-proxy] Downloading test proxy binary from
  https://github.com/Azure/azure-sdk-tools/releases/download/.../test-proxy-standalone-linux-x64.tar.gz
[Internal Error] TypeError: fetch failed
[Internal Error Cause] Error: self-signed certificate in certificate chain
```

The test framework downloads the test-proxy binary from GitHub via HTTPS. The sandbox has a self-signed certificate intercepting TLS, which blocks the download.

**Classification: (b) Network/sandbox environment limitation — does NOT disprove the hypothesis.**

All test spec files (`aborter.spec.ts`, `queueclient.spec.ts`, etc.) rely on the test-proxy recording mechanism. This is expected for Azure SDK integration tests.

### What DID pass in test phase:
- `dev-tool run build-test` (TypeScript typecheck of test files): ✅ **PASSED**
- `pnpm run lint` (ESLint): ✅ **PASSED** (48 warnings, 0 errors)
- API extraction (`review/*.api.md` generation): ✅ **PASSED**

---

## 6. Repo-Specific Gotchas

### G1: Non-cone sparse-checkout required
Git sparse-checkout must be initialized with `--no-cone`. The cone mode only supports prefix patterns; non-cone mode allows the `!/sdk/` negation + `/sdk/*/package.json` patterns needed here.

### G2: `linkWorkspacePackages: true` expands the required closure
The most significant gotcha. With this setting, ANY workspace package that satisfies a dep (even a plain semver range) is linked. This means:
- For install validation only → Mode A (9 packages) is sufficient
- For full build → Mode B (25 packages + their transitive workspace deps) is required

The BFS must follow ALL deps (not just `workspace:` specifiers) when computing the build closure.

### G3: `overrides: '@azure/core-rest-pipeline': 'link:...'`
The global override forces `core-rest-pipeline` to always come from the workspace source. The script handles this explicitly, but its path must be included in the closure even when it isn't a direct `workspace:^` dep of the target.

### G4: Turbo's `...` filter resolves via workspace links
`--filter "@azure/storage-queue..."` causes turbo to include all transitive workspace-linked packages in its build scope. With `linkWorkspacePackages: true`, this can reach far into the monorepo (e.g., `@azure/identity`, `@azure/keyvault-keys`) even for packages that weren't expected to be in scope.

### G5: Test recordings require network access
All storage-queue tests use the `@azure-tools/test-recorder` / test-proxy system. Playback tests would work, but require downloading the test-proxy binary (~60 MB) from GitHub at runtime.

---

## 7. Recommendations — Option A Viability

### Verdict: **VIABLE with adjustments**

| Use Case | Pattern | Outcome |
|----------|---------|---------|
| Lockfile validation only | Mode A (9 pkgs, 25 MB) | ✅ Fully works |
| `pnpm install --frozen-lockfile` | Mode A | ✅ Succeeds in 11.7s |
| TypeScript build + API extraction | Mode B (25 pkgs, 126 MB) | ✅ Succeeds in 95s |
| Integration tests (playback) | Mode B + network | ⚠️ Blocked by TLS in sandbox |
| Integration tests (live) | Full checkout | ❌ Always needs live credentials |

### Adjustments needed:
1. **Script must follow ALL deps** (not just `workspace:`/`link:`) when computing the build closure, because `linkWorkspacePackages: true` makes pnpm link any matching workspace package.
2. **For install-only validation**, the minimal Mode A pattern (96.8% size reduction) is ideal.
3. **For building**, Mode B is required (~84% reduction vs baseline). Still a worthwhile saving for large monorepos.
4. **Test-proxy download** should be handled separately (cache the binary, or use `SKIP_LIVE_TEST=true` / offline mode) for CI environments without full internet access.
5. **Consider `linkWorkspacePackages: false`** as an alternative: it would use registry versions for plain-semver deps and reduce the required closure to only explicit `workspace:` deps. However, this is a significant pnpm-workspace.yaml change with broader implications.

### Suggested script improvement:
Add a `--build-closure` flag to `sparse-focus.mjs` that switches between Mode A (install validation) and Mode B (build). Currently the script always uses Mode B (all workspace-linked deps) after the fix.
