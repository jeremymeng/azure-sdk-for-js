// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Octokit, App } from "octokit";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";
const LIST_BUILDS_URL = "https://dev.azure.com/azure-sdk/internal/_apis/pipelines?api-version=7.0";

const RELEASE_BLOCKERS = ["lint", "ci"];

const MANDATORY_CHECKS = ["lint", "ci"];

const INACTIVE_CLASSIFIER = "Development Status :: 7 - Inactive";

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
function inCI() {
  if (process.env.TF_BUILD) {
    return 1;
  } else if (process.env.CI) {
    return 2;
  } else {
    return 0;
  }
}

/**
 * Retrieves the "js - ..." pipelines from Azure DevOps.
 */
async function getPipelines(dataplane, authToken) {
  const response = await fetch(LIST_BUILDS_URL, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    console.error(`Error fetching pipelines: ${response.statusText}`);
    return;
  }
  const responseJson = await response.json();
  const jsPipelines = responseJson.value.filter((p) => p.name.startsWith("js -"));
  const pipelines = new Map();
  for (const p of jsPipelines) {
    const pipelineName = p.name;
    for (const serviceDir of dataplane.keys()) {
      pipelines.set(serviceDir, new Map());
      if (serviceDir === pipelineName.split("js - ")[1]) {
      } else if (`${serviceDir} - tests` === pipelineName.split("js - ")[1]) {
      } else if (`${serviceDir} - tests-weekly` === pipelineName.split("js - ")[1]) {
      }
    }
  }
  return pipelines;
}

/**
 *
 * @param task -
 * @param kind -
 * @param pipeline -
 */
function recordTestResults(task, kind, pipeline) {}

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
  if (inCI() !== 0) {
    token = process.env["SYSTEM_ACCESSTOKEN"];
  } else {
    const credential = new DefaultAzureCredential();
    token = await credential.getToken(`${DEVOPS_RESOURCE_UUID}/.default`);
  }
}
