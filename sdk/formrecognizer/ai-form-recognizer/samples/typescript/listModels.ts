// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * List Form Recognizer custom models
 */

//import { CustomFormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
import { CustomFormRecognizerClient, CognitiveKeyCredential } from "../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listModels sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  const result = await client.listModels();
  let i = 0;
  for await (const model of result) {
    console.log(`model ${i++}:`);
    console.log(model);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
