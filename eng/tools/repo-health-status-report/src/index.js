// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { Octokit, App } from "octokit";
import "dotenv/config";

/** @type {string} */
const DEVOPS_RESOURCE_UUID = "499b84ac-1321-427f-aa17-267ca6975798";
/** @type {string} */
const LIST_BUILDS_URL = "https://dev.azure.com/azure-sdk/internal/_apis/pipelines?api-version=7.0";

/** @type {string[]} */
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
 * * @returns {0 | 1 | 2}
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
 * @param {string} pipelineId
 * @return {string} - the url to get the latest build for the pipeline
 */
function buildUrl(pipelineId) {
  return `https://dev.azure.com/azure-sdk/internal/_apis/build/builds?definitions=${pipelineId}&$top=1&queryOrder=finishTimeDescending&reasonFilter=schedule&api-version=7.0`;
}

/**
 * @param {string} buildId
 * @return {string} - the timeline url for the build
 */
function buildTimelineUrl(buildId) {
  return `https://dev.azure.com/azure-sdk/internal/_apis/build/builds/${buildId}/Timeline?api-version=7.0`;
}

/**
 *
 * @param {string} label - space separated github labels
 * @param {"bug" | "question"} kind - issue kind
 * @param {string} created - issue created date in ISO format
 * @returns {string} - the github issue link
 */
function githubIssueLinkUrl(label, kind, created) {
  const minus = kind === "question" ? "bug" : "question";
  return `https://github.com/Azure/azure-sdk-for-python/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+-label%3Aissue-addressed+-label%3A${minus}+-label%3Aneeds-author-feedback+-label%3Afeature-request+label%3A%22${label.replace(" ", "+")}%22+created%3A%22${created}%22`;
}

/**
 *
 * @param {string} label - space separated github labels
 * @returns {string} - the github issue link
 */
function githubTotalIssueLink(label) {
  return `https://github.com/Azure/azure-sdk-for-python/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+label%3A%22${label.replace(" ", "+")}%22`;
}

/**
 *
 * @param {Map<string, Map<string, Record<string, any>>>} dataplane
 * @param {string} authToken
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
