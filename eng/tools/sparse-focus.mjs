#!/usr/bin/env node
/**
 * sparse-focus.mjs — zero-dependency Node >=22 script
 *
 * Generates and applies a git NON-CONE sparse-checkout pattern that:
 *  1. Keeps ALL root / eng / common files
 *  2. Keeps every workspace package.json (so pnpm frozen-lockfile stays valid)
 *  3. Keeps FULL directories for the target package and its workspace/link closure
 *
 * Usage:
 *   node eng/tools/sparse-focus.mjs [--apply] <pkg-name-or-path> [<pkg2> ...]
 *
 *   --apply   actually writes .git/info/sparse-checkout and runs git sparse-checkout reapply
 *             (omit to just print the pattern without touching git state)
 *
 * Examples:
 *   node eng/tools/sparse-focus.mjs @azure/storage-queue
 *   node eng/tools/sparse-focus.mjs --apply sdk/storage/storage-queue
 */

import fs   from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

// ─────────────────────────────────────────────
// 1.  Minimal YAML helpers (hand-rolled)
// ─────────────────────────────────────────────

/**
 * Extract the `importers:` block keys from pnpm-lock.yaml.
 * The block starts at "importers:\n" and each importer path lives on lines
 * indented with exactly two spaces followed by a non-space char and a colon:
 *
 *   importers:
 *     .:
 *     sdk/storage/storage-queue:
 *     ...
 *   packages:          ← stops here
 */
function parseLockfileImporters(lockfilePath) {
  const text = fs.readFileSync(lockfilePath, 'utf8');
  const lines = text.split('\n');

  const importers = [];
  let inImporters = false;

  for (const line of lines) {
    if (line === 'importers:') { inImporters = true; continue; }

    if (inImporters) {
      // A top-level section key (no leading spaces) ends the importers block
      if (line.length > 0 && line[0] !== ' ') { break; }

      // Importer paths are indented with exactly 2 spaces and end with ":"
      const m = line.match(/^  ([^: ][^:]*):$/);
      if (m) importers.push(m[1]);
    }
  }
  return importers;
}

/**
 * Read a package.json and return all dep paths that resolve to workspace packages.
 *
 * Because pnpm-workspace.yaml sets `linkWorkspacePackages: true`, pnpm links
 * ANY package in the workspace to node_modules instead of fetching from the
 * registry — even if the package.json spec is a plain version range like "^1.6.0"
 * rather than "workspace:^". We must therefore include ALL deps that have a
 * matching workspace package, not just `workspace:` / `link:` specifiers.
 */
function workspaceDepsOf(pkgJsonPath, nameToPath, linkOverrides) {
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')); }
  catch { return []; }

  const allDeps = {
    ...pkg.dependencies    ?? {},
    ...pkg.devDependencies ?? {},
    ...pkg.peerDependencies ?? {},
  };

  const result = [];
  const seen = new Set();
  const add = (rel) => { if (!seen.has(rel)) { seen.add(rel); result.push(rel); } };

  for (const [name] of Object.entries(allDeps)) {
    // Any dep that exists as a workspace package will be linked (linkWorkspacePackages: true)
    if (nameToPath.has(name)) add(nameToPath.get(name));
    // Also check link overrides (pnpm-workspace.yaml `overrides`)
    if (linkOverrides.has(name) && nameToPath.has(name)) add(nameToPath.get(name));
  }
  return result;
}

// ─────────────────────────────────────────────
// 2.  Build name → relative-path map from all workspace package.json files
// ─────────────────────────────────────────────

function buildNameToPath(importerPaths, repoRoot) {
  const map = new Map();
  for (const rel of importerPaths) {
    if (rel === '.') continue; // root workspace
    const pjPath = path.join(repoRoot, rel, 'package.json');
    if (!fs.existsSync(pjPath)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
      if (pkg.name) map.set(pkg.name, rel);
    } catch { /* skip malformed */ }
  }
  return map;
}

// ─────────────────────────────────────────────
// 3.  Compute the transitive workspace-dep closure (BFS)
// ─────────────────────────────────────────────

function computeClosure(startPaths, nameToPath, linkOverrides, repoRoot) {
  const visited = new Set(startPaths);
  const queue   = [...startPaths];

  while (queue.length > 0) {
    const rel = queue.shift();
    const pjPath = path.join(repoRoot, rel, 'package.json');
    const deps = workspaceDepsOf(pjPath, nameToPath, linkOverrides);
    for (const dep of deps) {
      if (!visited.has(dep)) {
        visited.add(dep);
        queue.push(dep);
      }
    }
  }
  return [...visited];
}

// ─────────────────────────────────────────────
// 4.  Parse link overrides from pnpm-workspace.yaml (hand-rolled)
// ─────────────────────────────────────────────

function parseLinkOverrides(workspaceYamlPath) {
  // We only care about `link:` values in the overrides block.
  // Format:
  //   overrides:
  //     '@azure/core-rest-pipeline': 'link:sdk/core/core-rest-pipeline'
  const text = fs.readFileSync(workspaceYamlPath, 'utf8');
  const lines = text.split('\n');
  const overrides = new Map(); // pkgName -> relative path
  let inOverrides = false;

  for (const line of lines) {
    if (line.match(/^overrides:/)) { inOverrides = true; continue; }
    if (inOverrides) {
      if (line.length > 0 && line[0] !== ' ') break;
      // "  'pkg-name': 'link:some/path'"
      const m = line.match(/^\s+['"]?([^'":\s]+)['"]?:\s*['"]?link:([^'"]+)['"]?/);
      if (m) overrides.set(m[1].trim(), m[2].trim());
    }
  }
  return overrides;
}

// ─────────────────────────────────────────────
// 5.  Build the sparse-checkout pattern lines
// ─────────────────────────────────────────────

function buildPattern(importerPaths, closurePaths) {
  const lines = [];

  // Root files (non-directory entries at repo root)
  lines.push('/*');          // all top-level files
  lines.push('!/sdk/');      // exclude the full sdk tree …
  lines.push('!/common/');   // … and common …
  lines.push('!/eng/');      // … and eng (we'll re-include what we need)

  // Re-include common/ and eng/ fully (they're small and needed)
  lines.push('/common/');
  lines.push('/eng/');

  // Every workspace package.json — keeps the lockfile importers set intact
  for (const rel of importerPaths) {
    if (rel === '.') continue;
    lines.push(`/${rel}/package.json`);
  }

  // Full directories for targets + closure
  const closureSet = new Set(closurePaths);
  for (const rel of closureSet) {
    // Remove the package.json-only pattern if it was added, full dir wins
    lines.push(`/${rel}/`);
  }

  return lines;
}

// ─────────────────────────────────────────────
// 6.  main()
// ─────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node sparse-focus.mjs [--apply] <pkg-name-or-path> [...]');
    process.exit(1);
  }

  const applyIdx = args.indexOf('--apply');
  const shouldApply = applyIdx !== -1;
  if (shouldApply) args.splice(applyIdx, 1);

  // Locate repo root (the dir containing pnpm-lock.yaml)
  let repoRoot = process.cwd();
  while (!fs.existsSync(path.join(repoRoot, 'pnpm-lock.yaml'))) {
    const parent = path.dirname(repoRoot);
    if (parent === repoRoot) { console.error('Cannot find repo root (pnpm-lock.yaml)'); process.exit(1); }
    repoRoot = parent;
  }

  const lockfilePath   = path.join(repoRoot, 'pnpm-lock.yaml');
  const workspaceYaml  = path.join(repoRoot, 'pnpm-workspace.yaml');

  // ── 6a. Parse importers (authoritative workspace set)
  const importerPaths = parseLockfileImporters(lockfilePath);
  console.log(`\n✓ pnpm-lock.yaml importers: ${importerPaths.length} workspaces found`);

  // ── 6b. Build name→path map
  const nameToPath = buildNameToPath(importerPaths, repoRoot);
  console.log(`✓ name→path map: ${nameToPath.size} named packages`);

  // ── 6c. Parse link overrides
  const linkOverrides = parseLinkOverrides(workspaceYaml);
  console.log(`✓ link overrides: ${[...linkOverrides.entries()].map(([k,v]) => `${k} → ${v}`).join(', ')}`);

  // ── 6d. Resolve target CLI args → relative paths
  const startPaths = [];
  for (const arg of args) {
    if (arg.startsWith('@') || !arg.includes('/') || arg.split('/').length === 1) {
      // Package name
      if (nameToPath.has(arg)) {
        startPaths.push(nameToPath.get(arg));
      } else {
        console.error(`  ERROR: package "${arg}" not found in workspace`);
        process.exit(1);
      }
    } else {
      // Relative path
      const rel = arg.replace(/^\//, '').replace(/\/$/, '');
      if (importerPaths.includes(rel)) {
        startPaths.push(rel);
      } else {
        console.error(`  ERROR: path "${rel}" not in importers list`);
        process.exit(1);
      }
    }
  }
  console.log(`\n🎯 Target package(s): ${startPaths.join(', ')}`);

  // Add link override targets to start paths (they need full dirs too)
  for (const [pkgName, linkPath] of linkOverrides) {
    // linkPath e.g. "sdk/core/core-rest-pipeline"
    if (!startPaths.includes(linkPath) && importerPaths.includes(linkPath)) {
      console.log(`  + including link override target: ${linkPath} (for override of ${pkgName})`);
      // Only add if it's a dep of a target — we'll let BFS handle it
    }
  }

  // ── 6e. Compute closure
  const closure = computeClosure(startPaths, nameToPath, linkOverrides, repoRoot);
  console.log(`\n📦 Workspace-dep closure (${closure.length} dirs):`);
  for (const p of closure.sort()) console.log(`   ${p}`);

  // Always include link override targets in closure (the overrides applies globally)
  for (const [, linkPath] of linkOverrides) {
    if (!closure.includes(linkPath) && importerPaths.includes(linkPath)) {
      closure.push(linkPath);
      console.log(`   ${linkPath}  ← link override target (always needed)`);
    }
  }

  // ── 6f. Build pattern
  const pattern = buildPattern(importerPaths, closure);
  console.log(`\n📋 Sparse-checkout pattern (${pattern.length} lines):\n`);
  console.log(pattern.join('\n'));

  // ── 6g. Optionally apply
  if (shouldApply) {
    const sparseFile = path.join(repoRoot, '.git', 'info', 'sparse-checkout');

    // Ensure git is set to non-cone mode
    try {
      execSync('git sparse-checkout init --no-cone', { cwd: repoRoot, stdio: 'inherit' });
    } catch {
      console.error('git sparse-checkout init failed — is this a git repo?');
      process.exit(1);
    }

    fs.writeFileSync(sparseFile, pattern.join('\n') + '\n', 'utf8');
    console.log(`\n✍  Wrote ${pattern.length} lines to ${sparseFile}`);

    execSync('git sparse-checkout reapply', { cwd: repoRoot, stdio: 'inherit' });
    console.log('✓ git sparse-checkout reapply complete');
  } else {
    console.log('\n(Run with --apply to write .git/info/sparse-checkout and call git sparse-checkout reapply)');
  }
}

main();
