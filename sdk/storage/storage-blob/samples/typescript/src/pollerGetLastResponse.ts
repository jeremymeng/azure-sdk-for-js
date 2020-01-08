// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

import { AnonymousCredential, ContainerClient } from "../../../src";
import { AbortController } from "@azure/abort-controller";
import { delay } from "@azure/core-http";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

async function main() {
  // Fill in following settings before running this sample
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";
  const sourceUrl = "http://releases.ubuntu.com/18.04.3/ubuntu-18.04.3-desktop-amd64.iso";

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = new ContainerClient(
    `https://${account}.blob.core.windows.net/${containerName}${accountSas}`,
    new AnonymousCredential()
  );

  try {
    await containerClient.create();
  } catch (err) {
    console.log(
      `Creating a container fails, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
    );
  }

  // Create a blob
  const blobName = "newblob";
  const blobClient = containerClient.getBlobClient(blobName);

  const aborter = new AbortController();
  const copyPoller = await blobClient.beginCopyFromURL(sourceUrl, {
    abortSignal: aborter.signal,
    onProgress(state) {
      if (state.copyProgress) {
        const parts = state.copyProgress!.split("/");
        if (Number.parseFloat(parts[0]) / Number.parseInt(parts[1]) > 0.3) {
          copyPoller.cancelOperation();
        }
      }
    }
  });

  while (!copyPoller.isDone()) {
    await copyPoller.poll();
    await delay(5000);
    const last = copyPoller.getLastResponse();
    console.log(last);
  }

  const result = copyPoller.getResult();

  console.log(result);

  // Delete container
  await containerClient.delete();
  console.log("deleted container");
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
