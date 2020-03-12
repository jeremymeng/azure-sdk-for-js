// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get Model
 */

const { CustomFormRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running GetModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "9bc687af-5b25-4fb8-8f2d-afbae9e8e43d";

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.getModel(modelId, { includeKeys: true });
  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
