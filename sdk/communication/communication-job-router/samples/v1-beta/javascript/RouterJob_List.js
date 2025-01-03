// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const { JobRouterClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List exception policies
async function listRouterJobs() {
  // Create the Router Client
  const routerClient = new JobRouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];

  for await (const page of routerClient
    .listJobs({ statusSelector: "queued", maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.job) {
        receivedPagedItems.push(policy);
        console.log("Listing router job with id: " + policy.job.id);
      }
    }
  }
}

listRouterJobs().catch(console.error);
