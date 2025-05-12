// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit } from "octokit";
import { DefaultAzureCredential } from "@azure/identity";
import { getDataplanePackages } from "./packages.js";
import { getBuildTimeline, getBuild } from "./urlHelpers.js";
import type {
  CheckStatusCode,
  CheckTypes,
  Packages,
  PackageStatus,
  PackageStatusCode,
  PackagesWithStatus,
  PipelineResults,
  PipelineResultsUnion,
  Status,
} from "./interfaces.js";

import "dotenv/config";
import { readFileSync, writeFileSync } from "fs";

const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";

const RELEASE_BLOCKERS = ["lint", "ci"];

const MANDATORY_CHECKS = ["lint", "ci"];

// TODO: do we have JS equivalent? const INACTIVE_CLASSIFIER = "Development Status :: 7 - Inactive";

// TODO: add to package details
const SDK_OWNED = [
  "@azure/app-configuration",
  "@azure/container-registry",
  // core
  "@azure/abort-controller",
  "@azure-rest/core-client",
  "@azure/core-auth",
  "@azure/core-amqp",
  "@azure/core-client",
  "@azure/core-http-compat",
  "@azure/core-lro",
  "@azure/core-paging",
  "@azure/core-rest-pipeline",
  "@azure/core-sse",
  "@azure/core-tracing",
  "@azure/core-xml",
  "@azure/core-util",
  "@azure/logger",
  "@typespec/ts-http-runtime",
  // eventgrid
  "@azure/eventgrid",
  "@azure/eventgrid-namespaces",
  "@azure/eventgrid-systemevents",
  // eventhubs
  "@azure/event-hubs",
  "@azure/eventhubs-checkpointstore-table",
  "@azure/eventhubs-checkpointstore-blob",

  "@azure/ai-form-recognizer",

  // identity
  "@azure/identity",
  "@azure/identity-broker",
  "@azure/identity-cache-persistence",
  "@azure/identity-vscode",

  "@azure/opentelemetry-instrumentation-azure-sdk",
  // keyvault
  "@azure/keyvault-admin",
  "@azure/keyvault-common",
  "@azure/keyvault-keys",
  "@azure/keyvault-certificates",
  "@azure/keyvault-secrets",
  // ...
  "@azure/ai-metrics-advisor",
  // ...
  "@azure/monitor-ingestion",
  "@azure/monitor-query",

  "@azure/notification-hubs",

  "@azure/schema-registry-json",
  "@azure/schema-registry-avro",
  "@azure/schema-registry",

  "@azure/search-documents",

  "@azure/service-bus",

  "@azure/data-tables",

  "@azure/template-dpg",
  "@azure/template",
];

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
  runTaskKind: "build" | "ci" | "tests" | "weeklyTests" | "samples" | "docs" | "lint",
  pipeline: PipelineResultsUnion,
): void {
  if (!pipeline[runTaskKind]) {
    pipeline[runTaskKind] = { status: "UNKNOWN" };
  }
  const unsuccessful = ["failed", "canceled", "abandoned", "skip", "succeededWithIssues"];
  const old = pipeline[runTaskKind];
  if (task["result"] === "succeeded") {
    if (!unsuccessful.includes(pipeline[runTaskKind].status)) {
      // None of same task from other legs has issues so far
      pipeline[runTaskKind] = { ...old, status: "succeeded" };
    }
  } else if (task["result"] === "failed") {
    pipeline[runTaskKind] = { ...old, status: "failed" };
    if (task["log"]) {
      pipeline[runTaskKind].log = task["log"].url;
    }
  } else if (
    pipeline[runTaskKind].status !== "failed" &&
    (task["result"] !== "skipped" ||
      task["resultCode"] !== "Skipping step due to condition evaluation.")
  ) {
    pipeline[runTaskKind] = { ...old, status: task["result"] };
    if (task["log"]) {
      pipeline[runTaskKind].log = task["log"].url;
    }
  }
}

function recordAllPipeline(
  kind: "ci" | "tests" | "weeklyTests",
  pipeline: PipelineResults,
  status: "succeeded" | "UNKNOWN",
): void {
  if (kind === "ci") {
    const old = pipeline.ci;
    pipeline.ci = {
      ...old,
      result: status,
      lint: { status: status },
      ci: { status: status },
    };
  } else if (kind === "tests") {
    const old = pipeline.tests;
    pipeline.tests = {
      ...old,
      result: status,
      tests: { status: status },
      samples: { status: status },
    };
  } else if (kind === "weeklyTests") {
    const old = pipeline.weeklyTests;
    pipeline.weeklyTests = {
      ...old,
      result: status,
      weeklyTests: { status: status },
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
  buildKind: "ci" | "tests" | "weeklyTests",
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  if (!pipelineId) {
    console.warn(`No ${buildKind} pipeline ID found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }
  const buildResponse = await getBuild(pipelineId, token);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("continue after 1 seconds delay");
  const buildResult = await buildResponse.json();
  console.log("### Build result:", buildResult);
  if (!buildResponse.ok || !buildResult["value"]) {
    console.warn(`No ${buildKind} build found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }

  const result = buildResult["value"][0];
  if (!result) {
    console.warn(`No ${buildKind} build result found for ${pkgName}`);
    recordAllPipeline(buildKind, pipelines[pkgName], "UNKNOWN");
    return;
  }

  const buildId = result["id"];
  pipelines[pkgName][buildKind] = {
    ...pipelines[pkgName][buildKind],
    id: buildId,
    link: result["_links"]["web"]["href"],
    buildNumber: result["buildNumber"],
  };
  // if (!pipelines[pkgName][buildKind]) {
  //   pipelines[pkgName][buildKind] = { id: buildId, link: result["_links"]["web"]["href"], buildNumber: result["buildNumber"] };
  // } else {
  //   pipelines[pkgName][buildKind].link = result["_links"]["web"]["href"];
  //   pipelines[pkgName][buildKind].buildNumber = result["buildNumber"];
  // }

  if (result["result"] === "succeeded") {
    recordAllPipeline(buildKind, pipelines[pkgName], "succeeded");
    return;
  }

  const orig = pipelines[pkgName];
  pipelines[pkgName] = { ...orig, [buildKind]: { ...orig[buildKind], result: result["result"] } };
  const timelineResponse = await getBuildTimeline(buildId, token);
  if (!timelineResponse.ok) {
    recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
    return;
  }
  let timelineResult;
  try {
    timelineResult = await timelineResponse.json();
  } catch (error) {
    console.warn("Error parsing timeline response:", error, buildId);
    recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
    return;
  }
  for (const task of timelineResult["records"]) {
    if (buildKind === "ci") {
      if (task["name"].includes("Build libraries")) {
        recordTestResult(task, "build", pipelines[pkgName][buildKind]);
      } else if (task["name"].includes("Build ESLint Plugin and Lint Libraries")) {
        recordTestResult(task, "lint", pipelines[pkgName][buildKind]);
      } else if (task["name"].includes("Test libraries")) {
        recordTestResult(task, "ci", pipelines[pkgName][buildKind]);
      }
    } else if (buildKind === "tests") {
      if (task["name"].includes("Test libraries")) {
        recordTestResult(task, "tests", pipelines[pkgName][buildKind]);
      } else if (task["name"].includes("Execute Samples")) {
        recordTestResult(task, "samples", pipelines[pkgName][buildKind]);
      }
    } else if (buildKind === "weeklyTests") {
      if (task["name"].includes("Integration test libraries")) {
        recordTestResult(task, "weeklyTests", pipelines[pkgName][buildKind]);
      }
    }
  }
}

async function getCiResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  await getBuildResult("ci", pkgName, pipelines, token, pipelineId);
}

async function getTestsResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  getBuildResult("tests", pkgName, pipelines, token, pipelineId);
}

async function getWeeklyTestsResult(
  pkgName: string,
  pipelines: Record<string, PipelineResults>,
  token: string,
  pipelineId?: number,
) {
  getBuildResult("weeklyTests", pkgName, pipelines, token, pipelineId);
}

/**
 * Retrieves the "js - ..." pipelines from Azure DevOps.
 */
async function getPipelines(
  dataplane: Packages,
  authToken,
): Promise<Record<string, PipelineResults>> {
  // const response = await getAllBuilds(authToken);
  // if (!response.ok) {
  //   console.error(`Error fetching pipelines: ${response.statusText}`);
  //   return;
  // }
  // const responseJson = await response.json();

  const responseJson = JSON.parse(readFileSync("./pipelines-static.json", "utf-8"));

  const jsPipelines = responseJson.value.filter((p) => p.name.startsWith("js -"));
  const pipelines: Record<string, PipelineResults> = {};
  for (const p of jsPipelines) {
    if (!p.name.includes("js - ") || p.name.includes(" - mgmt")) {
      continue;
    }
    const pipelineNameWithoutJsPrefix = p.name.split("js - ")[1];
    for (const [pkgName, pkgMetadata] of Object.entries(dataplane)) {
      const { serviceDir, packageDir } = pkgMetadata;
      console.log(
        `checking ${pkgName} - ${serviceDir} ${packageDir} against pipeline ${pipelineNameWithoutJsPrefix}`,
      );
      const original = pipelines[pkgName];
      if (serviceDir === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, ci: { id: p.id, link: "" } };
        recordAllPipeline("ci", pipelines[pkgName], "UNKNOWN");
      } else if (`${packageDir} - tests` === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, tests: { id: p.id, link: "" } };
        recordAllPipeline("tests", pipelines[pkgName], "UNKNOWN");
      } else if (`${packageDir} - tests-weekly` === pipelineNameWithoutJsPrefix) {
        pipelines[pkgName] = { ...original, weeklyTests: { id: p.id, link: "" } };
        recordAllPipeline("weeklyTests", pipelines[pkgName], "UNKNOWN");
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
    if (
      ["lint", "tests", "samples", "ci"].includes(check) &&
      (status as unknown as Status).status === "FAIL"
    ) {
      overallStatus = "BLOCKED";
      break;
    }
    if (
      ["lint", "tests", "samples", "ci"].includes(check) &&
      ["DISABLED", "WARNING", "UNKNOWN"].includes((status as unknown as Status).status)
    ) {
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
  if (!pipeline) {
    console.warn(`No ${testKind} pipeline found for ${packageDetails.projectFolder}`);
    packageDetails[testKind] = { status: "UNKNOWN" };
    return;
  }
  const testStatus = pipeline[testKind]?.[testKind]?.status;
  const old = packageDetails[testKind];
  if (testStatus === "succeeded" || testStatus === "partiallySucceeded") {
    packageDetails[testKind] = { ...old, status: "PASS", link: pipeline[testKind].link };
  } else if (testStatus === "failed") {
    packageDetails[testKind] = { ...old, status: "FAIL", link: pipeline[testKind].link };
  } else {
    packageDetails[testKind] = { ...old, status: "UNKNOWN", link: pipeline[testKind].link };
  }
  console.dir(
    {
      l: "### packageDetails reportTestResult",
      pipeline,
      testKind,
      pf: packageDetails.projectFolder,
      pd: packageDetails[testKind],
    },
    { depth: 4 },
  );
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
  const old = packageDetails[check];
  if (ciCheck === "succeeded") {
    packageDetails[check] = { ...old, status: "PASS", link: pipeline[check].link };
  } else if (ciCheck === "failed") {
    packageDetails[check] = { ...old, status: "FAIL", link: pipeline[check].link };
  } else {
    packageDetails[check] = { ...old, status: "UNKNOWN", link: pipeline[check].link };
  }
}

function reportStatus(dataplane: PackagesWithStatus, pipelines: Record<string, PipelineResults>) {
  for (const [packageName, packageDetails] of Object.entries(dataplane)) {
    reportTestResult("tests", pipelines[packageName], packageDetails);
    reportTestResult("ci", pipelines[packageName], packageDetails);
    reportOverallStatus(packageDetails);
  }
}

const CSV_REPORT_FILE_NAME = "health_report.csv";

function writeToCsv(
  dataplane: PackagesWithStatus,
  pipelines: Record<string, PipelineResults>,
): void {
  // our weekly runs aren't too different from nightly runs for now
  const columnNames = [
    "Service Directory",
    "Package",
    "Status",
    "Owned by SDK team",
    "Tests - CI",
    "Tests - Live",
    // "Tests - Live Weekly",
    "Tests - CI Link",
    "CI Build Number",
    "Tests - Live Link",
    "Tests Build Number",
    // "Tests - Live Weekly Link",
    // "Weekly Build Number",
  ];
  const csvData = Object.entries(dataplane).map(([pkgName, pkgDetails]) => {
    const status = pkgDetails.status;
    return [
      pkgDetails.serviceDir,
      pkgName,
      status,
      SDK_OWNED.includes(pkgName) ? "YES" : "NO",
      pipelines[pkgName].ci?.ci?.status ?? "",
      pipelines[pkgName].tests?.tests?.status ?? "",
      // pipelines[pkgName].weeklyTests?.weeklyTests?.status ?? "",
      pipelines[pkgName].ci?.link ?? "",
      pipelines[pkgName].ci?.buildNumber ?? "",
      pipelines[pkgName].tests?.link ?? "",
      pipelines[pkgName].tests?.buildNumber ?? "",
      // pipelines[pkgName].weeklyTests?.link ?? "",
      // pipelines[pkgName].weeklyTests?.buildNumber ?? "",
    ].join(",");
  });
  writeFileSync(
    CSV_REPORT_FILE_NAME,
    `${columnNames.join(",")}
${csvData.join("\n")}
`,
    "utf-8",
  );
  console.log(`CSV report written to ${CSV_REPORT_FILE_NAME}`);
  console.log(`${columnNames.join(",")}
${csvData.join("\n")}
`);
}

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
    await getCiResult(pkgName, pipelines, token, pipelineIds.ci?.id);
    await getTestsResult(pkgName, pipelines, token, pipelineIds.tests?.id);
    await getWeeklyTestsResult(pkgName, pipelines, token, pipelineIds.weeklyTests?.id);
  }

  reportStatus(dataplane as unknown as PackagesWithStatus, pipelines);

  console.dir({ l: "### status", dataplane, pipelines }, { depth: 4 });

  writeToCsv(dataplane as unknown as PackagesWithStatus, pipelines);

  if (runType() !== "unknown") {
    const path = `/eng/tools/repo-health-status-report/health_report.csv`;
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: login,
      repo: "azure-sdk-for-js",
      branch: "js-sdk-health-report",
      path,
      message: "Update health report",
      content: readFileSync(CSV_REPORT_FILE_NAME, "utf-8"),
    });
  }
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
