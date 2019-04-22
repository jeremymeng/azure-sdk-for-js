import * as assert from "assert";

import { AppendBlobURL } from "../src/AppendBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { bodyToString, getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("AppendBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let appendBlobURL = AppendBlobURL.fromContainerURL(containerURL, blobName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create();
    blobName = getUniqueName("blob");
    appendBlobURL = AppendBlobURL.fromContainerURL(containerURL, blobName);
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  it("create with default parameters", async () => {
    await appendBlobURL.create();
    await appendBlobURL.download(0);
  });

  it("create with parameters configured", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      }
    };
    await appendBlobURL.create(options);
    const properties = await appendBlobURL.getProperties();
    assert.equal(
      properties.cacheControl,
      options.blobHTTPHeaders.blobCacheControl
    );
    assert.equal(
      properties.contentDisposition,
      options.blobHTTPHeaders.blobContentDisposition
    );
    assert.equal(
      properties.contentEncoding,
      options.blobHTTPHeaders.blobContentEncoding
    );
    assert.equal(
      properties.contentLanguage,
      options.blobHTTPHeaders.blobContentLanguage
    );
    assert.equal(
      properties.contentType,
      options.blobHTTPHeaders.blobContentType
    );
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("appendBlock", async () => {
    await appendBlobURL.create();

    const content = "Hello World!";
    await appendBlobURL.appendBlock(content, content.length);

    const downloadResponse = await appendBlobURL.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });
});
