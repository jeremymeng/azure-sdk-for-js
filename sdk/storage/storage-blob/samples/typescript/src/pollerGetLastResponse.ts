// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/

import { ContainerClient, StorageSharedKeyCredential } from "../../../src"; // TODO: from "@azure/storage-blob";
import { AbortController } from "@azure/abort-controller";
import { delay } from "@azure/core-http";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Fill in following settings before running this sample
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const sourceUrl = "http://releases.ubuntu.com/18.04.3/ubuntu-18.04.3-desktop-amd64.iso"; // TOOD: replace with "<url to a large data file>"

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = new ContainerClient(
    `https://${account}.blob.core.windows.net/${containerName}`,
    sharedKeyCredential
  );

  try {
    console.log(`Creating ${containerName}`);
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
    intervalInMs: 2500,
    onProgress(state) {
      if (state.copyProgress) {
        const parts = state.copyProgress.split("/");
        const ratio = Number.parseFloat(parts[0]) / Number.parseInt(parts[1]);
        console.log(`Copy progress: ${ratio * 100} %`);
        if (ratio > 0.1) {
          // For demostration purpose, cancel the poll operation. We should see the BlobAbortCopyFromURLResponse from
          // getLastResponse() call below.
          copyPoller.cancelOperation();
        }
      }
    }
  });

  while (!copyPoller.isDone()) {
    await copyPoller.poll();
    await delay(5000);
    const last = copyPoller.getLastResponse();
    if (last instanceof Error) {
      console.log(`Error ${last.message}`);
      break;
    } else {
      console.log(last);
    }
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
