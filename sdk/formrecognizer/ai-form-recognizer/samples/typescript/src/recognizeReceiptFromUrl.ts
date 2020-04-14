// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize receipt from url
 */

//import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, AzureKeyCredential, toUSReceipt } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";

  const poller = await client.beginRecognizeReceiptsFromUrl(
    imageUrl, {
      includeTextDetails: true,
      onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
    });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }
  console.log(`### Response status ${response.status}`);

  if (!response.recognizedReceipts || response.recognizedReceipts.length <= 0)
  {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  console.log("### First receipt:")
  console.log(response.recognizedReceipts[0]);
  console.log("### Items:")
  const usReceipt = toUSReceipt(response.recognizedReceipts[0]);
  console.table(usReceipt.items, ["name", "quantity", "price", "totalPrice"]);
  console.log("### Raw 'MerchantAddress' fields:");
  console.log(usReceipt.recognizedForm.fields["MerchantAddress"]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
