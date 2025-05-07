// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit } from "octokit";
import { DefaultAzureCredential } from "@azure/identity";
import { getDataplanePackages } from "./packages.js";
import { getAllBuilds, getBuildTimeline, getBuild } from "./urlHelpers.js";
import type {
  CheckStatusCode,
  CheckTypes,
  PackageStatus,
  PackageStatusCode,
  PipelineResults,
  PipelineResultsUnion,
} from "./interfaces.js";

import "dotenv/config";

const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";

const RELEASE_BLOCKERS = ["lint", "ci"];

const MANDATORY_CHECKS = ["lint", "ci"];

// TODO: do we have JS equivalent? const INACTIVE_CLASSIFIER = "Development Status :: 7 - Inactive";

// TODO: add to package details
const SDK_OWNED = [
  "@azure/abort-controller",
  // ...
  "@azure/identity",
  // ...
  "@azure/keyvault-keys",
  "@azure/keyvault-secrets",
  // ...
  "@azure/service-bus",
  // ...
];

/**
 * Returns 1 if TF_BUILD env var is set (azure devops);
 *         2 if CI env var is set (github actions);
 *         0 if neither is set.
 */
function runType() {
  if (process.env.TF_BUILD) {
    return "azure-devops";
  } else if (process.env.CI) {
    return "github-actions";
  } else {
    return "unknown";
  }
}

function recordCheckResult(
  task: Map<string, string>,
  kind: string,
  pipeline: PipelineResultsUnion,
): void {
  pipeline[kind] = task["result"];
  if (task["log"]) {
    pipeline[kind].log = task["log"].url;
  }
}

function recordTestResult(
  task,
  kind: "build" | "ci" | "tests" | "weeklyTests" | "samples" | "docs" | "lint",
  pipeline: PipelineResultsUnion,
): void {
  const unsuccessful = ["failed", "canceled", "abandoned", "skipped", "succeededWithIssues"];
  if (task["result"] === "succeeded") {
    if (!unsuccessful.includes(pipeline[kind].status)) {
      pipeline[kind] = { status: "succeeded" };
    }
  } else if (task["result"] === "failed") {
    pipeline[kind] = { status: "failed" };
    if (task["log"]) {
      pipeline[kind].log = task["log"].url;
    }
  } else if (pipeline[kind].status !== "failed") {
    pipeline[kind] = { status: task["result"] };
    if (task["log"]) {
      pipeline[kind].log = task["log"].url;
    }
  }
}

function recordAllPipeline(
  kind: "ci" | "tests" | "weeklyTests",
  pipeline: PipelineResults,
  status: "succeeded" | "UNKNOWN",
): void {
  if (kind === "ci") {
    const ci = pipeline.ci;
    pipeline.ci = {
      ...ci,
      result: status,
      lint: { status: status },
      ci: { status: status },
    };
  } else if (kind === "tests") {
    const tests = pipeline.tests;
    pipeline.tests = {
      ...tests,
      result: status,
      tests: { status: status },
      samples: { status: status },
    };
  } else if (kind === "weeklyTests") {
    const weeklyTest = pipeline.weeklyTest;
    pipeline.weeklyTest = {
      ...weeklyTest,
      result: status,
      weeklyTest: { status: status },
    };
  }
}

function recordAllPackage(details: PackageStatus, status: CheckStatusCode): void {
  details = {
    ...details,
    lint: { status },
    ci: { status },
    tests: { status },
    samples: { status },
    sdkOwned: true, // TODO: set this based on the package
  };
}

async function getBuildResult(
  kind: "ci" | "tests" | "weeklyTests",
  service: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  if (!pipelineId) {
    console.warn(`No ${kind} pipeline ID found for ${service}`);
    recordAllPipeline(kind, pipelines[service], "UNKNOWN");
    return;
  }

  const buildResponse = await getBuild(pipelineId, token);
  const buildResult = await buildResponse.json();
  if (!buildResponse.ok || !buildResult["value"]) {
    console.warn(`No ${kind} result for ${service}`);
    recordAllPipeline(kind, pipelines[service], "UNKNOWN");
    return;
  }

  const result = buildResult["value"][0];
  pipelines[service][kind].link = result["_links"]["web"]["href"];
  if (result["result"] === "succeeded") {
    recordAllPipeline(kind, pipelines[service], "succeeded");
    return;
  }

  const orig = pipelines[service];
  pipelines[service] = { ...orig, [kind]: { ...orig[kind], result: result["result"] } };
  const buildId = result["id"];
  const timelineResponse = await getBuildTimeline(buildId, token);
  if (!timelineResponse.ok) {
    recordAllPipeline("tests", pipelines[service], "UNKNOWN");
    return;
  }
  const timelineResult = await timelineResponse.json();
  for (const task of timelineResult["records"]) {
    if (kind === "ci") {
      // TODO: need to get the Build/Analyze/unit tests(linux-node and windows-browser)/legs?
      if (task["name"].includes("Build libraries")) {
        recordTestResult(task, "build", pipelines[service][kind]);
      } else if (task["name"].includes("Build ESLint Plugin and Lint Libraries")) {
        recordTestResult(task, "lint", pipelines[service][kind]);
      } else if (task["name"].includes("Test libraries")) {
        // TODO: NodeJS version, browser tests
        recordTestResult(task, "ci", pipelines[service][kind]);
      }
    } else if (kind === "tests") {
      // TODO: need to get linux-node and windows-browser, min/max legs
      if (task["name"].includes("Test libraries")) {
        recordTestResult(task, "tests", pipelines[service]["tests"]);
      } else if (task["name"].includes("Execute Samples")) {
        recordTestResult(task, "samples", pipelines[service]["tests"]);
      }
    } else if (kind === "weeklyTests") {
      // TODO: NodeJS version, browser tests
      if (task["name"].includes("Integration Tests")) {
        recordTestResult(task, "tests", pipelines[service]["weeklyTest"]);
      }
    }
  }
}

async function getCiResult(
  service: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  await getBuildResult("ci", service, pipelines, token, pipelineId);
}

async function getTestsResult(
  service: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  getBuildResult("tests", service, pipelines, token, pipelineId);
}

async function getWeeklyTestsResult(
  service: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  getBuildResult("weeklyTests", service, pipelines, token, pipelineId);
}

/**
 * Retrieves the "js - ..." pipelines from Azure DevOps.
 */
async function getPipelines(dataplane, authToken): Promise<Record<string, PipelineResults>> {
  const response = await getAllBuilds(authToken);
  if (!response.ok) {
    console.error(`Error fetching pipelines: ${response.statusText}`);
    return;
  }
  const responseJson = await response.json();
  const jsPipelines = responseJson.value.filter((p) => p.name.startsWith("js -"));
  const pipelines = {};
  for (const p of jsPipelines) {
    const pipelineName = p.name;
    for (const name of Object.keys(dataplane)) {
      const serviceDir = name.split("/")[1];
      if (serviceDir.includes("conversations") && pipelineName.includes("conversations")) {
        console.dir({ l: "missing", serviceDir, pipelineName }, { depth: 4 });
      }
      const original = pipelines[name];
      if (serviceDir === pipelineName.split("js - ")[1]) {
        pipelines[name] = { ...original, ci: { id: p.id, link: "" } };
        recordAllPipeline("ci", pipelines[name], "UNKNOWN");
      } else if (`${serviceDir} - tests` === pipelineName.split("js - ")[1]) {
        pipelines[name] = { ...original, tests: { id: p.id, link: "" } };
        recordAllPipeline("tests", pipelines[name], "UNKNOWN");
      } else if (`${serviceDir} - tests-weekly` === pipelineName.split("js - ")[1]) {
        pipelines[name] = { ...original, weeklyTest: { id: p.id, link: "" } };
        recordAllPipeline("weeklyTests", pipelines[name], "UNKNOWN");
      }
    }
  }
  return pipelines;
}

function reportOverallStatus(packageDetails: PackageStatus): void {
  let overallStatus: PackageStatusCode = "GOOD";
  for (const [check, status] of Object.entries(packageDetails)) {
    if (!RELEASE_BLOCKERS.includes(check)) {
      continue;
    }
    if (status.status === "failed") {
      overallStatus = "BLOCKED";
      break;
    }
    if (["DISABLED", "WARNING", "UNKNOWN"].includes(status.status)) {
      overallStatus = "NEEDS_ACTION";
      break;
    }
  }
  packageDetails.status = overallStatus;
}

function reportTestResult(
  testKind: "ci" | "tests",
  pipeline: PipelineResults,
  packageDetails: PackageStatus,
): void {
  const testStatus = pipeline[testKind][testKind].status;
  if (testStatus === "succeeded" || testStatus === "partiallySucceeded") {
    packageDetails[testKind] = { status: "PASS", link: pipeline[testKind].link };
  } else if (testStatus === "failed") {
    packageDetails[testKind] = { status: "FAIL", link: pipeline[testKind].link };
  } else {
    packageDetails[testKind] = { status: "UNKNOWN", link: pipeline[testKind].link };
  }
}

function reportCheckStatus(
  check: CheckTypes,
  pipeline: PipelineResults,
  packageDetails: PackageStatus,
): void {
  const enabled = true; // TODO: set this based on the package
  if (!enabled) {
    packageDetails[check] = { status: "DISABLED" };
    return;
  }

  const ciCheck = pipeline[check].ci.status;
  if (ciCheck === "succeeded") {
    packageDetails[check] = { status: "PASS", link: pipeline[check].link };
  } else if (ciCheck === "failed") {
    packageDetails[check] = { status: "FAIL", link: pipeline[check].link };
  } else {
    packageDetails[check] = { status: "UNKNOWN", link: pipeline[check].link };
  }
}

function reportStatus(dataplane, pipelines: Record<string, PipelineResults>): void {}

async function main() {
  const gitHubToken = process.env.GITHUB_TOKEN;
  if (!gitHubToken) {
    console.error("GITHUB_TOKEN is not set. Please set it in your environment variables.");
    process.exit(1);
  }

  // GitHub
  const octokit = new Octokit({
    auth: gitHubToken,
  });
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  let token;
  if (runType() !== "unknown") {
    token = process.env["SYSTEM_ACCESSTOKEN"];
  } else {
    const credential = new DefaultAzureCredential();
    token = (await credential.getToken(`${DEVOPS_RESOURCE_UUID}/.default`)).token;
  }

  const dataplane = await getDataplanePackages();
  const pipelines = await getPipelines(dataplane, token);
  for (const [pkgName, pipelineIds] of Object.entries(pipelines)) {
    console.dir({ l: "get results", pkgName, pipelineIds }, { depth: 4 });
    getCiResult(pkgName, pipelines, token, pipelineIds.ci?.id);
    getTestsResult(pkgName, pipelines, token, pipelineIds.tests?.id);
    getWeeklyTestsResult(pkgName, pipelines, token, pipelineIds.weeklyTest?.id);
  }

  reportStatus(dataplane, pipelines);

  if (runType() !== "unknown") {
    const path = `/eng/tools/repo-health-status-report/health_report.csv`;
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: "azure-sdk-for-js",
      branch: "js-sdk-health-report",
      path,
      message: "Update health report",
      content: "placeholder", // TODO: replace with actual content
    });
  }
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
