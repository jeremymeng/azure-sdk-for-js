// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit } from "octokit";
import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";

// GitHub
let octokit;
function getOctokit() {
  if (!octokit) {
    const gitHubToken = process.env.GITHUB_TOKEN;
    if (!gitHubToken) {
      console.error("GITHUB_TOKEN is not set. Please set it in your environment variables.");
      process.exit(1);
    }

    octokit = new Octokit({
      auth: gitHubToken,
    });

    return octokit;
  }
}

export async function uploadResultToGitHubJsRepo(csvPath: string) {
  const octokit = getOctokit();
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  const path = `/eng/tools/repo-health-status-report/health_report.csv`;
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: login,
    repo: "azure-sdk-for-js",
    branch: "js-sdk-health-report",
    path,
    message: "Update health report",
    content: await readFile(csvPath, "utf-8"),
  });
  console.log(`Health report uploaded to azure-sdk-for-js ${path}`);
}

export async function getIssues() {
  const content = await readFile("issues-static.json", "utf-8");
  if (content) {
    const issues = JSON.parse(content);
    return issues.issues;
  }
  return [];
  const issues = [];
  const octokit = getOctokit();

  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: "Azure",
    repo: "azure-sdk-for-js",
    state: "open",
    labels: "customer-reported,Client",
    per_page: 100,
  });
  for await (const { data } of iterator) {
    // Filter out issues that are addressed, questions, or feature requests
    issues.push(
      ...data.filter((issue) =>
        issue.labels.some(
          (label) =>
            !["issue-addressed", "needs-author-feedback", "feature-request"].includes(label.name),
        ),
      ),
    );
  }
  return issues;
}

async function test() {
  //   const gitHubToken = process.env.GITHUB_TOKEN;
  //   if (!gitHubToken) {
  //     console.error("GITHUB_TOKEN is not set. Please set it in your environment variables.");
  //     process.exit(1);
  //   }

  //   // GitHub
  //   const octokit = new Octokit({
  //     auth: gitHubToken,
  //   });

  //   const issues = await getIssues(octokit);
  //   console.dir({ issues }, { depth: 10 });

  //   await writeFile("issues-static.json", JSON.stringify({ issues }, null, 2), "utf-8");
  //   return;

  const filtered = await getIssues();
  const today = Date.now();
  const thirtyDaysAgo = today - 30 * 24 * 60 * 60 * 1000;
  const ninetyDaysAgo = today - 90 * 24 * 60 * 60 * 1000;

  for (const issue of filtered) {
    const createdDate = new Date(issue.created_at);
    if (issue.labels.some((l) => l.name === "question") && createdDate.getTime() < thirtyDaysAgo) {
      console.log(
        `Question #${issue.number} created on ${createdDate.toISOString()} is older than 30 days. ${issue.html_url}`,
      );
    } else if (
      issue.labels.some((l) => l.name === "bug") &&
      createdDate.getTime() < ninetyDaysAgo
    ) {
      console.log(
        `Bug #${issue.number} created on ${createdDate.toISOString()} is older than 90 days. ${issue.html_url}`,
      );
    }
  }
}

test().catch((error) => {
  console.error("Error fetching issues:", error);
  process.exit(1);
});
