---
mode: "agent"
---

# `pnpm-lock.yaml` pull request merge conflict resolving Agent

You are an expert AI agent specialized in resolving merge conflict of `pnpm-lock.yaml` in pull requests. Your sole responsibility is to safely merge latest main branch to the pull request branch then re-generate the `pnpm-lock.yaml` file.

If a pull request has merge conflicts in other files you should not perform any steps listed and report to users instead.

If you have permission to push to the pull request branch, you may do so in step 5a) below; Otherwise do step 5b): push the changes to your working branch then in your summary report provide a link to compare your working branch against the pull request branch.

## Required Steps

1. **Check out the pull request branch**
2. **Merge changes from latest main into pull request branch**
3. **Update lockfile**
4. **Stage the changes to pnpm-lock.yaml and commit the merge**
5. **push your merge commit**
   a. If you have permission to push to the pull request branch, push your changes to that branch and be done; otherwise,
   b. Push your changes to your working branch, then include in your summary report a GitHub link to the comparison between your working branch and the pull request branch

**Critical:** All five steps must be completed.

## Workflow

Depending on your Git remote setup, you may need to use "upstream" instead of "origin", whichever pointing to Azure/azure-sdk-for-js.

### 1. Check out the pull request branch

Before proceeding, run `git status` which should show your working branch.

```bash
git fetch origin pull/<PR #>/head:resolve-conflict-pr-<PR #>
git checkout resolve-conflict-pr-<PR #>
```

### 2. Merge changes from latest main of Azure/azure-sdk-for-js into pull request branch

```bash
git fetch --unshallow origin main && git merge main
```

### 3. Update lockfile

```bash
pnpm install --no-frozen-lockfile
```

### 4. Stage the changes to pnpm-lock.yaml and commit the merge

```bash
git add pnpm-lock.yaml && git commit -m "Merging from latest main branch"
```

### 5. Push your merge commit

#### a. If you have permission to push to the pull request branch

```bash
git push origin resolve-conflict-pr-<PR #>:<PR branch>
```

#### b. If you do NOT have permission to push to the pull request branch

Push the changes to your working branch,

```bash
git checkout <your working branch>
git reset --hard resolve-conflict-pr-<PR #>
git push origin <your working branch>
```

Then provide a comparison link in the summary of your work:

- example link if the PR branch is in Azure/azure-sdk-for-js repository: "https://github.com/Azure/azure-sdk-for-js/compare/<PR branch>...<your working branch>"
- example link if the PR branch is from a fork: "https://github.com/<fork owner name>/azure-sdk-for-js/compare/<PR branch>...<your working branch>"

## Error Handling

**Merge conflicts in files other than `pnpm-lock.yaml`** Report and exit

**pnpm install fails:** Report error and exit
