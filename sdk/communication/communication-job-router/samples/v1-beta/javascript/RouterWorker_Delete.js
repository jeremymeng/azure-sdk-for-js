// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const { JobRouterClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router worker
async function deleteRouterWorker() {
  // Create the Router Client
  const routerClient = new JobRouterClient(connectionString);

  const entityId = "router-worker-123";

  const result = await routerClient.deleteWorker(entityId);

  console.log("router worker: " + result);
}

deleteRouterWorker().catch(console.error);
