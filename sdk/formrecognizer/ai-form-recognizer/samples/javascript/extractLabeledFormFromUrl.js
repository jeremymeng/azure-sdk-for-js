// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Custom Form
 */

const { CustomFormRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractCustomForm sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "e28ad0da-aa55-46dc-ade9-839b0d819189"; // trained with labels
  const url = process.env["FR_INVOICE_URL"] || "<sample invoice url>";

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractLabeledFormFromUrl(modelId, url,{
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("### Document results:")
  for (const document of response.analyzeResult.documentResults || []) {
    console.log(`${document.docType}, pages ${document.pageRange}`);
    console.log("Fields");
  }

  console.log("### Page results:")
  for (const page of response.analyzeResult.pageResults || []) {
    console.log(`Page number: ${page.page}`);
    console.log(`cluster Id: ${page.clusterId}`);
    console.log("key-value pairs");
    for (const pair of page.keyValuePairs || []) {
      console.log(`\tkey: ${pair.key}, value: ${pair.value}`);
    }
  }


  console.log("### Read results:")
  console.log(response.analyzeResult.readResults);
  console.log("### Errors:")
  console.log(response.analyzeResult.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
