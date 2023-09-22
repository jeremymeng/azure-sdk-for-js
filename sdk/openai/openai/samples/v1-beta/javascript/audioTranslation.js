// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to translate the content of an audio file.
 *
 * @summary audio translation.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { readFile } = require("fs/promises");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

async function main() {
  console.log("== Translate Audio Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "whisper-deployment";
  const audio = await readFile("./assets/audio/countdown.wav");
  const result = await client.getAudioTranslation(deploymentName, audio);

  console.log(`Translation: ${result.text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
